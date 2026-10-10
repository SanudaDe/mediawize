// lib/email.ts
// Email sending via Resend — server-side only

import { formatDateColombo, formatTimeSlot, formatLKR } from './booking-utils';

interface BookingRequestEmailData {
  bookingReference: string;
  clientName: string;
  clientEmail: string;
  packageName: string;
  requestedDate: string;
  requestedTime: string;
  estimatedTotal: number;
}

interface BookingConfirmationEmailData extends BookingRequestEmailData {
  adminNotes?: string;
}

interface BookingRejectionEmailData {
  bookingReference: string;
  clientName: string;
  clientEmail: string;
  packageName: string;
  requestedDate: string;
  requestedTime: string;
  rejectionReason?: string;
}

interface AdminNotificationData {
  bookingReference: string;
  clientName: string;
  clientEmail: string;
  packageName: string;
  requestedDate: string;
  requestedTime: string;
}

interface EmailResult {
  success: boolean;
  error?: string;
}

const FROM_EMAIL = process.env.BOOKING_FROM_EMAIL ?? 'bookings@wize.tv';
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL ?? 'info@wize.tv';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function sendEmail(to: string, subject: string, html: string): Promise<EmailResult> {
  const googlePass = process.env.GOOGLE_APP_PASSWORD || process.env.SMTP_PASS;
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.BOOKING_FROM_EMAIL || 'bookings@wize.tv';

  // 1. Try Google Mail / SMTP if configured
  if (googlePass) {
    try {
      const nodemailer = await import('nodemailer');
      const user = process.env.GOOGLE_EMAIL || process.env.SMTP_USER || 'bookings@wize.tv';
      const cleanPass = googlePass.replace(/\s+/g, '');

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: true,
        auth: {
          user,
          pass: cleanPass,
        },
      });

      await transporter.sendMail({
        from: `"WIZEtv Studios" <${user}>`,
        to,
        replyTo: 'bookings@wize.tv',
        subject,
        html,
      });

      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google SMTP error';
      console.error('[Email] Google SMTP send failed:', msg);
      return { success: false, error: msg };
    }
  }

  // 2. Fall back to Resend API
  if (!apiKey || apiKey === 're_xxxxxxxxx') {
    console.warn('[Email] Neither GOOGLE_APP_PASSWORD nor RESEND_API_KEY configured. Skipping email send.');
    return { success: false, error: 'Email service not configured.' };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const senderString = fromEmail.includes('@resend.dev')
      ? `WIZEtv Studios <${fromEmail}>`
      : `WIZEtv Studios <${fromEmail}>`;

    const replyToEmail = 'bookings@wize.tv';

    let { error } = await resend.emails.send({
      from: senderString,
      to,
      replyTo: replyToEmail,
      subject,
      html,
    });

    // If custom domain is not yet verified in Resend, retry with onboarding@resend.dev
    if (error && error.message && error.message.toLowerCase().includes('not verified')) {
      console.warn('[Email] Domain not verified in Resend. Retrying with onboarding@resend.dev fallback...');
      const fallback = await resend.emails.send({
        from: 'WIZEtv Studios <onboarding@resend.dev>',
        to,
        replyTo: replyToEmail,
        subject,
        html,
      });
      error = fallback.error;
    }

    if (error) {
      console.error('[Email] Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown email error';
    console.error('[Email] Error:', message);
    return { success: false, error: message };
  }
}

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
  body{font-family:'Helvetica Neue',Arial,sans-serif;background:#0F172A;margin:0;padding:20px;}
  .container{max-width:600px;margin:0 auto;background:#1E293B;border-radius:12px;overflow:hidden;border:1px solid #334155;}
  .header{background:#EC2328;padding:32px 40px;text-align:center;}
  .header h1{color:#fff;margin:0;font-size:24px;font-weight:700;letter-spacing:-0.5px;}
  .header p{color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;}
  .body{padding:40px;}
  .greeting{color:#F1F5F9;font-size:18px;font-weight:600;margin-bottom:16px;}
  .text{color:#CBD5E1;font-size:15px;line-height:1.7;margin-bottom:20px;}
  .card{background:#0F172A;border-radius:8px;padding:24px;margin:24px 0;border:1px solid #334155;}
  .card-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #1E293B;}
  .card-row:last-child{border-bottom:none;}
  .card-label{color:#64748B;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;}
  .card-value{color:#F1F5F9;font-size:14px;font-weight:500;text-align:right;}
  .badge{display:inline-block;background:#EC2328;color:#fff;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:0.5px;}
  .badge-amber{background:#F59E0B;}
  .badge-green{background:#22C55E;}
  .badge-red{background:#EF4444;}
  .highlight{background:rgba(236,35,40,0.1);border:1px solid rgba(236,35,40,0.3);border-radius:8px;padding:16px;margin:20px 0;color:#FCA5A5;font-size:14px;}
  .success{background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:8px;padding:16px;margin:20px 0;color:#86EFAC;font-size:14px;}
  .btn{display:inline-block;background:#EC2328;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;margin-top:16px;}
  .footer{background:#0F172A;padding:24px 40px;text-align:center;border-top:1px solid #1E293B;}
  .footer p{color:#475569;font-size:12px;margin:4px 0;}
  .footer a{color:#EC2328;text-decoration:none;}
  .ref{font-family:monospace;background:#0F172A;color:#EC2328;padding:8px 16px;border-radius:6px;font-size:16px;font-weight:700;border:1px solid #334155;}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>WIZEtv Studios</h1>
    <p>Sri Lanka's Leading Podcast & Media Production Studio</p>
  </div>
  <div class="body">
    ${content}
  </div>
  <div class="footer">
    <p>WIZEtv Studios · Colombo, Sri Lanka</p>
    <p><a href="https://wize.tv">wize.tv</a> · <a href="mailto:info@wize.tv">info@wize.tv</a></p>
    <p style="margin-top:12px;color:#334155;font-size:11px;">This is an automated message from WIZEtv booking system.</p>
  </div>
</div>
</body>
</html>`;
}

export async function sendBookingRequestEmail(data: BookingRequestEmailData): Promise<EmailResult> {
  const dateDisplay = formatDateColombo(new Date(data.requestedDate + 'T12:00:00+05:30'), {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const html = emailWrapper(`
    <p class="greeting">Hi ${data.clientName},</p>
    <p class="text">Thank you for your studio booking request! We've received your request and our production team will review it shortly.</p>
    <div class="highlight">
      <strong>⏳ Please note:</strong> Your booking is <strong>not confirmed</strong> until approved by our team. You will receive a separate confirmation email once approved.
    </div>
    <div class="card">
      <div class="card-row">
        <span class="card-label">Booking Reference</span>
        <span class="card-value"><span class="ref">${data.bookingReference}</span></span>
      </div>
      <div class="card-row">
        <span class="card-label">Status</span>
        <span class="card-value"><span class="badge badge-amber">PENDING REVIEW</span></span>
      </div>
      <div class="card-row">
        <span class="card-label">Package</span>
        <span class="card-value">${data.packageName}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Requested Date</span>
        <span class="card-value">${dateDisplay}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Requested Time</span>
        <span class="card-value">${formatTimeSlot(data.requestedTime)} (Sri Lanka Time)</span>
      </div>
      <div class="card-row">
        <span class="card-label">Estimated Total</span>
        <span class="card-value">${formatLKR(data.estimatedTotal)}</span>
      </div>
    </div>
    <p class="text">We typically review booking requests within 24 hours. If you have any urgent questions, feel free to reach us at <a href="mailto:info@wize.tv" style="color:#EC2328;">info@wize.tv</a>.</p>
  `);

  return sendEmail(data.clientEmail, `Booking Request Received — ${data.bookingReference}`, html);
}

export async function sendBookingConfirmationEmail(data: BookingConfirmationEmailData): Promise<EmailResult> {
  const dateDisplay = formatDateColombo(new Date(data.requestedDate + 'T12:00:00+05:30'), {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const html = emailWrapper(`
    <p class="greeting">Great news, ${data.clientName}! 🎉</p>
    <p class="text">Your studio booking has been <strong>confirmed</strong> by our production team. We're excited to have you at WIZEtv Studios!</p>
    <div class="success">
      <strong>✅ Booking Confirmed!</strong> Please arrive 10 minutes before your scheduled time.
    </div>
    <div class="card">
      <div class="card-row">
        <span class="card-label">Booking Reference</span>
        <span class="card-value"><span class="ref">${data.bookingReference}</span></span>
      </div>
      <div class="card-row">
        <span class="card-label">Status</span>
        <span class="card-value"><span class="badge badge-green">CONFIRMED</span></span>
      </div>
      <div class="card-row">
        <span class="card-label">Package</span>
        <span class="card-value">${data.packageName}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Date</span>
        <span class="card-value">${dateDisplay}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Time</span>
        <span class="card-value">${formatTimeSlot(data.requestedTime)} (Sri Lanka Time)</span>
      </div>
      <div class="card-row">
        <span class="card-label">Total</span>
        <span class="card-value">${formatLKR(data.estimatedTotal)}</span>
      </div>
      ${data.adminNotes ? `
      <div class="card-row">
        <span class="card-label">Note from Studio</span>
        <span class="card-value" style="color:#94A3B8;">${data.adminNotes}</span>
      </div>` : ''}
    </div>
    <p class="text">Please save your booking reference: <strong>${data.bookingReference}</strong>. To reschedule or cancel, contact us at <a href="mailto:info@wize.tv" style="color:#EC2328;">info@wize.tv</a>.</p>
    <p class="text">We look forward to producing something amazing with you!</p>
  `);

  return sendEmail(data.clientEmail, `Studio Booking Confirmed ✅ — ${data.bookingReference}`, html);
}

export async function sendBookingRejectionEmail(data: BookingRejectionEmailData): Promise<EmailResult> {
  const dateDisplay = formatDateColombo(new Date(data.requestedDate + 'T12:00:00+05:30'), {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const html = emailWrapper(`
    <p class="greeting">Hi ${data.clientName},</p>
    <p class="text">Thank you for your interest in WIZEtv Studios. Unfortunately, we're unable to confirm your booking request at this time.</p>
    <div class="card">
      <div class="card-row">
        <span class="card-label">Booking Reference</span>
        <span class="card-value"><span class="ref">${data.bookingReference}</span></span>
      </div>
      <div class="card-row">
        <span class="card-label">Status</span>
        <span class="card-value"><span class="badge badge-red">NOT CONFIRMED</span></span>
      </div>
      <div class="card-row">
        <span class="card-label">Package</span>
        <span class="card-value">${data.packageName}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Requested Date</span>
        <span class="card-value">${dateDisplay}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Requested Time</span>
        <span class="card-value">${formatTimeSlot(data.requestedTime)}</span>
      </div>
      ${data.rejectionReason ? `
      <div class="card-row">
        <span class="card-label">Reason</span>
        <span class="card-value" style="color:#94A3B8;">${data.rejectionReason}</span>
      </div>` : ''}
    </div>
    <p class="text">We encourage you to submit a new booking request for a different date or time. Our team is happy to help find a suitable slot.</p>
    <p class="text">Please contact us directly at <a href="mailto:info@wize.tv" style="color:#EC2328;">info@wize.tv</a> or visit our website to submit a new request.</p>
  `);

  return sendEmail(data.clientEmail, `Studio Booking Update — ${data.bookingReference}`, html);
}

export async function sendAdminNotificationEmail(data: AdminNotificationData): Promise<EmailResult> {
  const dateDisplay = formatDateColombo(new Date(data.requestedDate + 'T12:00:00+05:30'), {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  });

  const html = emailWrapper(`
    <p class="greeting">New Booking Request Received</p>
    <p class="text">A new studio booking request has been submitted and requires your review.</p>
    <div class="card">
      <div class="card-row">
        <span class="card-label">Reference</span>
        <span class="card-value"><span class="ref">${data.bookingReference}</span></span>
      </div>
      <div class="card-row">
        <span class="card-label">Client</span>
        <span class="card-value">${data.clientName}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Email</span>
        <span class="card-value">${data.clientEmail}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Package</span>
        <span class="card-value">${data.packageName}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Date</span>
        <span class="card-value">${dateDisplay}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Time</span>
        <span class="card-value">${formatTimeSlot(data.requestedTime)}</span>
      </div>
    </div>
    <p class="text">Log in to the admin dashboard to review and take action on this booking.</p>
    <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wize.tv'}/admin/bookings" class="btn">Review in Admin →</a>
  `);

  return sendEmail(ADMIN_EMAIL, `🎙️ New Booking Request — ${data.bookingReference}`, html);
}
