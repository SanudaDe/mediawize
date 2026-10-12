// lib/email.ts
// Email sending via Resend — server-side only

import { formatDateColombo, formatTimeColombo, formatTimeSlot, formatLKR } from './booking-utils';

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

async function sendEmail(to: string, subject: string, html: string, replyTo?: string): Promise<EmailResult> {
  const googlePass = process.env.GOOGLE_APP_PASSWORD || process.env.SMTP_PASS;
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.BOOKING_FROM_EMAIL || 'bookings@wize.tv';
  const effectiveReplyTo = replyTo || 'bookings@wize.tv';

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
        replyTo: effectiveReplyTo,
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

    const replyToEmail = effectiveReplyTo;

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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

interface InquiryEmailTemplateOptions {
  inquiryType: string;
  emailHeadline: string;
  introHtml: string;
  packageName: string;
  packagePrice: string;
  packageAllocation?: string;
  idealUseCase?: string;
  userName: string;
  companyName?: string;
  phone: string;
  email: string;
  mailBody: string;
  requestId: string;
  submittedAt: string;
  currentYear: string;
  logoUrl: string;
  isClientConfirmation?: boolean;
}

function renderInquiryEmailTemplate(opt: InquiryEmailTemplateOptions): string {
  const safePkg = escapeHtml(opt.packageName);
  const safePrice = escapeHtml(opt.packagePrice);
  const safeUser = escapeHtml(opt.userName);
  const safeCompany = escapeHtml(opt.companyName || 'Not specified');
  const safePhone = escapeHtml(opt.phone);
  const safeEmail = escapeHtml(opt.email);
  const safeMessage = escapeHtml(opt.mailBody);
  const safeRequestId = escapeHtml(opt.requestId);
  const safeSubmittedAt = escapeHtml(opt.submittedAt);
  const safeCurrentYear = escapeHtml(opt.currentYear);
  const safeInquiryType = escapeHtml(opt.inquiryType);
  const safeHeadline = escapeHtml(opt.emailHeadline);

  const preheaderText = opt.isClientConfirmation
    ? `Your WIZEtv Studios inquiry for ${safePkg} has been received.`
    : `New WIZEtv Studios inquiry from ${safeUser} for ${safePkg}.`;

  const actionButtonsHtml = opt.isClientConfirmation
    ? `
      <!-- CALL HOTLINE -->
      <td class="mobile-stack" width="50%" valign="top" style="width:50%; padding-right:6px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" bgcolor="#EC2328" style="background-color:#EC2328; border-radius:9px;">
              <a href="tel:+94777352700" class="mobile-button" style="display:block; padding:15px 16px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:18px; font-weight:700; color:#FFFFFF; text-decoration:none;">
                Call Studio Hotline
              </a>
            </td>
          </tr>
        </table>
      </td>
      <td class="mobile-stack mobile-button-gap" width="12" style="width:12px; font-size:1px; line-height:1px;">&nbsp;</td>
      <!-- EMAIL DIRECT -->
      <td class="mobile-stack" width="50%" valign="top" style="width:50%; padding-left:6px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" bgcolor="#202126" style="background-color:#202126; border-radius:9px;">
              <a href="mailto:bookings@wize.tv" class="mobile-button" style="display:block; padding:15px 16px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:18px; font-weight:700; color:#FFFFFF; text-decoration:none;">
                Email Studio Team
              </a>
            </td>
          </tr>
        </table>
      </td>
    `
    : `
      <!-- EMAIL CTA -->
      <td class="mobile-stack" width="50%" valign="top" style="width:50%; padding-right:6px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" bgcolor="#EC2328" style="background-color:#EC2328; border-radius:9px;">
              <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(opt.packageName)}%20Inquiry" class="mobile-button" style="display:block; padding:15px 16px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:18px; font-weight:700; color:#FFFFFF; text-decoration:none;">
                Reply to Client
              </a>
            </td>
          </tr>
        </table>
      </td>
      <td class="mobile-stack mobile-button-gap" width="12" style="width:12px; font-size:1px; line-height:1px;">&nbsp;</td>
      <!-- CALL CTA -->
      <td class="mobile-stack" width="50%" valign="top" style="width:50%; padding-left:6px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" bgcolor="#202126" style="background-color:#202126; border-radius:9px;">
              <a href="tel:${safePhone}" class="mobile-button" style="display:block; padding:15px 16px; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; font-size:13px; line-height:18px; font-weight:700; color:#FFFFFF; text-decoration:none;">
                Call Client
              </a>
            </td>
          </tr>
        </table>
      </td>
    `;

  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">

  <title>WIZEtv Studios - ${safeHeadline}</title>

  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->

  <style type="text/css">
    html,
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      min-width: 100% !important;
    }

    table,
    td {
      border-collapse: collapse !important;
    }

    img {
      border: 0;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
      display: block;
    }

    a {
      text-decoration: none;
    }

    body {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    .email-container {
      width: 100%;
      max-width: 600px;
    }

    @media only screen and (max-width: 620px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
      }

      .mobile-padding {
        padding-left: 22px !important;
        padding-right: 22px !important;
      }

      .mobile-header-padding {
        padding-left: 22px !important;
        padding-right: 22px !important;
      }

      .mobile-title {
        font-size: 28px !important;
        line-height: 34px !important;
      }

      .mobile-stack {
        display: block !important;
        width: 100% !important;
      }

      .mobile-label {
        display: block !important;
        width: 100% !important;
        padding-bottom: 6px !important;
      }

      .mobile-value {
        display: block !important;
        width: 100% !important;
        text-align: left !important;
      }

      .mobile-button {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        text-align: center !important;
      }

      .mobile-button-gap {
        height: 10px !important;
        line-height: 10px !important;
        font-size: 10px !important;
      }

      .hide-mobile {
        display: none !important;
      }
    }
  </style>
</head>

<body style="margin:0; padding:0; background-color:#0B0C0F;">

  <!-- Hidden Preheader -->
  <div style="
    display:none;
    font-size:1px;
    color:#0B0C0F;
    line-height:1px;
    max-height:0;
    max-width:0;
    opacity:0;
    overflow:hidden;
    mso-hide:all;">
    ${preheaderText}
  </div>

  <table role="presentation"
         width="100%"
         cellpadding="0"
         cellspacing="0"
         border="0"
         bgcolor="#0B0C0F"
         style="width:100%; background-color:#0B0C0F;">

    <tr>
      <td align="center" style="padding:32px 12px;">

        <!-- MAIN CONTAINER -->
        <table role="presentation"
               class="email-container"
               width="600"
               cellpadding="0"
               cellspacing="0"
               border="0"
               align="center"
               style="
                 width:600px;
                 max-width:600px;
                 margin:0 auto;
                 background-color:#FFFFFF;
                 border-radius:18px;
                 overflow:hidden;
                 box-shadow:0 18px 60px rgba(0,0,0,0.28);
               ">

          <!-- =========================================
               HEADER
          ========================================== -->
          <tr>
            <td bgcolor="#111216"
                class="mobile-header-padding"
                style="
                  background-color:#111216;
                  padding:30px 36px 26px 36px;
                ">

              <table role="presentation"
                     width="100%"
                     cellpadding="0"
                     cellspacing="0"
                     border="0">

                <tr>
                  <td valign="middle" align="left">
                    <img src="${opt.logoUrl}"
                         width="178"
                         alt="WIZEtv Studios"
                         style="
                           display:block;
                           width:178px;
                           max-width:178px;
                           height:auto;
                           border:0;
                           font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                           font-size:22px;
                           font-weight:900;
                           color:#FFFFFF;
                           letter-spacing:1px;
                         ">
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding-top:15px;
                    font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-size:11px;
                    line-height:17px;
                    font-weight:600;
                    letter-spacing:1.4px;
                    text-transform:uppercase;
                    color:#A7A9B0;
                  ">
                    Sri Lanka's Leading Podcast &amp; Media Production Studio
                  </td>
                </tr>

              </table>

            </td>
          </tr>

          <!-- BRAND RED ACCENT -->
          <tr>
            <td bgcolor="#EC2328"
                height="5"
                style="
                  height:5px;
                  line-height:5px;
                  font-size:1px;
                  background-color:#EC2328;
                ">
              &nbsp;
            </td>
          </tr>

          <!-- =========================================
               INTRO / STATUS
          ========================================== -->
          <tr>
            <td class="mobile-padding"
                style="
                  padding:38px 36px 18px 36px;
                  background-color:#FFFFFF;
                ">

              <!-- STATUS BADGE -->
              <table role="presentation"
                     cellpadding="0"
                     cellspacing="0"
                     border="0">
                <tr>
                  <td bgcolor="#FDEBEC"
                      style="
                        background-color:#FDEBEC;
                        border-radius:999px;
                        padding:7px 12px;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:10px;
                        line-height:12px;
                        font-weight:700;
                        letter-spacing:1.2px;
                        color:#C9181D;
                        text-transform:uppercase;
                      ">
                    ${safeInquiryType}
                  </td>
                </tr>
              </table>

              <div style="
                height:18px;
                line-height:18px;
                font-size:18px;">
                &nbsp;
              </div>

              <div class="mobile-title"
                   style="
                     font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                     font-size:34px;
                     line-height:40px;
                     font-weight:700;
                     letter-spacing:-0.8px;
                     color:#111216;
                   ">
                ${safeHeadline}
              </div>

              <div style="
                padding-top:12px;
                font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                font-size:15px;
                line-height:24px;
                font-weight:400;
                color:#666971;
              ">
                ${opt.introHtml}
              </div>

            </td>
          </tr>

          <!-- =========================================
               PACKAGE SUMMARY HERO
          ========================================== -->
          <tr>
            <td class="mobile-padding"
                style="
                  padding:8px 36px 24px 36px;
                  background-color:#FFFFFF;
                ">

              <table role="presentation"
                     width="100%"
                     cellpadding="0"
                     cellspacing="0"
                     border="0"
                     bgcolor="#15161A"
                     style="
                       width:100%;
                       background-color:#15161A;
                       border-radius:14px;
                     ">

                <tr>
                  <td style="padding:22px 22px 20px 22px;">

                    <table role="presentation"
                           width="100%"
                           cellpadding="0"
                           cellspacing="0"
                           border="0">

                      <tr>
                        <td style="
                          font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                          font-size:10px;
                          line-height:14px;
                          font-weight:700;
                          letter-spacing:1.3px;
                          text-transform:uppercase;
                          color:#8D9098;
                        ">
                          Selected Package
                        </td>
                      </tr>

                      <tr>
                        <td style="
                          padding-top:7px;
                          font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                          font-size:22px;
                          line-height:28px;
                          font-weight:700;
                          color:#FFFFFF;
                        ">
                          ${safePkg}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding-top:14px;">

                          <table role="presentation"
                                 cellpadding="0"
                                 cellspacing="0"
                                 border="0">
                            <tr>
                              <td bgcolor="#EC2328"
                                  style="
                                    background-color:#EC2328;
                                    border-radius:6px;
                                    padding:7px 10px;
                                    font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                                    font-size:12px;
                                    line-height:15px;
                                    font-weight:700;
                                    color:#FFFFFF;
                                  ">
                                ${safePrice}
                              </td>
                            </tr>
                          </table>

                        </td>
                      </tr>

                    </table>

                  </td>
                </tr>

              </table>

            </td>
          </tr>

          <!-- =========================================
               DETAILS CARD
          ========================================== -->
          <tr>
            <td class="mobile-padding"
                style="
                  padding:0 36px 28px 36px;
                  background-color:#FFFFFF;
                ">

              <table role="presentation"
                     width="100%"
                     cellpadding="0"
                     cellspacing="0"
                     border="0"
                     style="
                       width:100%;
                       border:1px solid #E7E8EB;
                       border-radius:14px;
                     ">

                <!-- CARD TITLE -->
                <tr>
                  <td colspan="2"
                      style="
                        padding:20px 20px 14px 20px;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:11px;
                        line-height:14px;
                        font-weight:700;
                        letter-spacing:1.25px;
                        text-transform:uppercase;
                        color:#95979D;
                      ">
                    Inquiry Details
                  </td>
                </tr>

                <!-- PACKAGE -->
                <tr>
                  <td class="mobile-label"
                      width="42%"
                      valign="top"
                      style="
                        width:42%;
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:500;
                        color:#777A81;
                      ">
                    Package / Scope
                  </td>

                  <td class="mobile-value"
                      width="58%"
                      valign="top"
                      align="right"
                      style="
                        width:58%;
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:700;
                        color:#111216;
                      ">
                    <span style="
                      display:inline-block;
                      background-color:#FDEBEC;
                      color:#C9181D;
                      padding:4px 8px;
                      border-radius:5px;
                    ">
                      ${safePkg}
                    </span>
                  </td>
                </tr>

                <!-- RATE -->
                <tr>
                  <td class="mobile-label"
                      valign="top"
                      style="
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:500;
                        color:#777A81;
                      ">
                    Monthly Rate / Fee
                  </td>

                  <td class="mobile-value"
                      valign="top"
                      align="right"
                      style="
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:700;
                        color:#111216;
                      ">
                    ${safePrice}
                  </td>
                </tr>

                <!-- ALLOCATION -->
                ${opt.packageAllocation ? `
                <tr>
                  <td class="mobile-label"
                      valign="top"
                      style="
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:500;
                        color:#777A81;
                      ">
                    Allocation / Session Hours
                  </td>

                  <td class="mobile-value"
                      valign="top"
                      align="right"
                      style="
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:600;
                        color:#111216;
                      ">
                    ${escapeHtml(opt.packageAllocation)}
                  </td>
                </tr>` : ''}

                <!-- TARGET USE -->
                ${opt.idealUseCase ? `
                <tr>
                  <td class="mobile-label"
                      valign="top"
                      style="
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:500;
                        color:#777A81;
                      ">
                    Target Use
                  </td>

                  <td class="mobile-value"
                      valign="top"
                      align="right"
                      style="
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:600;
                        color:#111216;
                      ">
                    ${escapeHtml(opt.idealUseCase)}
                  </td>
                </tr>` : ''}

                <!-- CLIENT NAME -->
                <tr>
                  <td class="mobile-label"
                      valign="top"
                      style="
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:500;
                        color:#777A81;
                      ">
                    Client Name
                  </td>

                  <td class="mobile-value"
                      valign="top"
                      align="right"
                      style="
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:700;
                        color:#111216;
                      ">
                    ${safeUser}
                  </td>
                </tr>

                <!-- COMPANY -->
                <tr>
                  <td class="mobile-label"
                      valign="top"
                      style="
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:500;
                        color:#777A81;
                      ">
                    Company Name
                  </td>

                  <td class="mobile-value"
                      valign="top"
                      align="right"
                      style="
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:600;
                        color:#111216;
                      ">
                    ${safeCompany}
                  </td>
                </tr>

                <!-- PHONE -->
                <tr>
                  <td class="mobile-label"
                      valign="top"
                      style="
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:500;
                        color:#777A81;
                      ">
                    Phone / WhatsApp
                  </td>

                  <td class="mobile-value"
                      valign="top"
                      align="right"
                      style="
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:600;
                      ">
                    <a href="tel:${safePhone}"
                       style="
                         color:#EC2328;
                         text-decoration:none;
                         font-weight:700;
                       ">
                      ${safePhone}
                    </a>
                  </td>
                </tr>

                <!-- EMAIL -->
                <tr>
                  <td class="mobile-label"
                      valign="top"
                      style="
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:500;
                        color:#777A81;
                      ">
                    Email Address
                  </td>

                  <td class="mobile-value"
                      valign="top"
                      align="right"
                      style="
                        padding:15px 20px;
                        border-top:1px solid #EEEEF0;
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:13px;
                        line-height:20px;
                        font-weight:600;
                        word-break:break-word;
                      ">
                    <a href="mailto:${safeEmail}"
                       style="
                         color:#EC2328;
                         text-decoration:none;
                         font-weight:700;
                       ">
                      ${safeEmail}
                    </a>
                  </td>
                </tr>

              </table>

            </td>
          </tr>

          <!-- =========================================
               CLIENT MESSAGE
          ========================================== -->
          <tr>
            <td class="mobile-padding"
                style="
                  padding:0 36px 30px 36px;
                  background-color:#FFFFFF;
                ">

              <table role="presentation"
                     width="100%"
                     cellpadding="0"
                     cellspacing="0"
                     border="0"
                     bgcolor="#F7F7F8"
                     style="
                       width:100%;
                       background-color:#F7F7F8;
                       border-radius:12px;
                     ">

                <tr>
                  <td width="5"
                      bgcolor="#EC2328"
                      style="
                        width:5px;
                        background-color:#EC2328;
                        border-radius:12px 0 0 12px;
                      ">
                    &nbsp;
                  </td>

                  <td style="padding:20px 22px 22px 20px;">

                    <div style="
                      font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                      font-size:10px;
                      line-height:14px;
                      font-weight:700;
                      letter-spacing:1.2px;
                      text-transform:uppercase;
                      color:#8A8D94;
                    ">
                      ${opt.isClientConfirmation ? 'Your Message & Requirements' : 'Client Message'}
                    </div>

                    <div style="
                      padding-top:9px;
                      font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                      font-size:15px;
                      line-height:24px;
                      font-weight:400;
                      color:#26272B;
                      white-space:pre-line;
                    ">
                      ${safeMessage}
                    </div>

                  </td>
                </tr>

              </table>

            </td>
          </tr>

          <!-- =========================================
               ACTION AREA
          ========================================== -->
          <tr>
            <td class="mobile-padding"
                style="
                  padding:0 36px 38px 36px;
                  background-color:#FFFFFF;
                ">

              <table role="presentation"
                     width="100%"
                     cellpadding="0"
                     cellspacing="0"
                     border="0">

                <tr>
                  <td style="
                    padding-bottom:14px;
                    font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-size:11px;
                    line-height:15px;
                    font-weight:700;
                    letter-spacing:1.2px;
                    text-transform:uppercase;
                    color:#91939A;
                  ">
                    ${opt.isClientConfirmation ? 'Need Immediate Assistance?' : 'Quick Response'}
                  </td>
                </tr>

                <tr>
                  ${actionButtonsHtml}
                </tr>

              </table>

            </td>
          </tr>

          <!-- =========================================
               INTERNAL META STRIP
          ========================================== -->
          <tr>
            <td bgcolor="#F4F4F5"
                class="mobile-padding"
                style="
                  padding:18px 36px;
                  background-color:#F4F4F5;
                  border-top:1px solid #ECECEF;
                ">

              <table role="presentation"
                     width="100%"
                     cellpadding="0"
                     cellspacing="0"
                     border="0">
                <tr>

                  <td valign="middle"
                      style="
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:11px;
                        line-height:17px;
                        color:#777A81;
                      ">
                    Request ID:
                    <strong style="color:#2D2F34;">
                      ${safeRequestId}
                    </strong>
                  </td>

                  <td valign="middle"
                      align="right"
                      style="
                        font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size:11px;
                        line-height:17px;
                        color:#777A81;
                      ">
                    ${safeSubmittedAt}
                  </td>

                </tr>
              </table>

            </td>
          </tr>

          <!-- =========================================
               FOOTER
          ========================================== -->
          <tr>
            <td bgcolor="#111216"
                class="mobile-padding"
                style="
                  padding:30px 36px 32px 36px;
                  background-color:#111216;
                ">

              <table role="presentation"
                     width="100%"
                     cellpadding="0"
                     cellspacing="0"
                     border="0">

                <tr>
                  <td style="
                    font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-size:14px;
                    line-height:21px;
                    font-weight:700;
                    color:#FFFFFF;
                  ">
                    WIZEtv Studios
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding-top:5px;
                    font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-size:12px;
                    line-height:19px;
                    font-weight:400;
                    color:#A6A8AF;
                  ">
                    Colombo, Sri Lanka
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding-top:12px;
                    font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-size:12px;
                    line-height:20px;
                    color:#A6A8AF;
                  ">

                    <a href="https://wize.tv"
                       style="
                         color:#FFFFFF;
                         text-decoration:none;
                         font-weight:600;
                       ">
                      wize.tv
                    </a>

                    <span style="color:#555861;">&nbsp;&nbsp;•&nbsp;&nbsp;</span>

                    <a href="mailto:bookings@wize.tv"
                       style="
                         color:#FFFFFF;
                         text-decoration:none;
                         font-weight:600;
                       ">
                      bookings@wize.tv
                    </a>

                  </td>
                </tr>

                <tr>
                  <td style="padding-top:20px;">
                    <div style="
                      height:1px;
                      line-height:1px;
                      background-color:#292A2F;
                      font-size:1px;">
                      &nbsp;
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding-top:18px;
                    font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-size:10px;
                    line-height:17px;
                    font-weight:400;
                    color:#74767D;
                  ">
                    Automated notification from the WIZEtv Studios booking system.
                    Please do not forward this email outside the WIZEtv team if it contains private client information.
                  </td>
                </tr>

              </table>

            </td>
          </tr>

        </table>
        <!-- /MAIN CONTAINER -->

        <!-- SMALL OUTER FOOTER -->
        <table role="presentation"
               width="600"
               class="email-container"
               cellpadding="0"
               cellspacing="0"
               border="0"
               align="center"
               style="
                 width:600px;
                 max-width:600px;
               ">
          <tr>
            <td align="center"
                style="
                  padding:18px 20px 0 20px;
                  font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
                  font-size:10px;
                  line-height:16px;
                  color:#686A70;
                ">
              © ${safeCurrentYear} WIZEtv Studios. All rights reserved.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

export interface SubscriptionInquiryEmailData {
  userName: string;
  companyName?: string;
  phone: string;
  email: string;
  mailBody: string;
  packageName: string;
  packagePrice: string;
  packageAllocation?: string;
  idealUseCase?: string;
}

export async function sendSubscriptionInquiryEmail(data: SubscriptionInquiryEmailData): Promise<EmailResult> {
  const recipient = 'bookings@wize.tv';
  const isCustomQuote = Boolean(
    data.packagePrice.toLowerCase().includes('custom') ||
    data.packageName.toLowerCase().includes('custom')
  );
  const typeLabel = isCustomQuote ? 'CUSTOM PRODUCTION QUOTATION' : 'SUBSCRIPTION INQUIRY';
  const headline = isCustomQuote ? 'New Custom Quotation Request' : 'New Subscription Package Inquiry';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wize.tv';
  const logoUrl = `${siteUrl}/logo-white.png`;
  const now = new Date();
  const dateStr = formatDateColombo(now, { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = formatTimeColombo(now);
  const submittedAt = `${dateStr} · ${timeStr}`;
  const requestId = `WIZE-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const introHtml = `A new client has submitted a request for <strong style="color:#111216;">${escapeHtml(data.packageName)}</strong>. Review the details below and follow up with the client.`;

  const html = renderInquiryEmailTemplate({
    inquiryType: typeLabel,
    emailHeadline: headline,
    introHtml,
    packageName: data.packageName,
    packagePrice: data.packagePrice,
    packageAllocation: data.packageAllocation,
    idealUseCase: data.idealUseCase,
    userName: data.userName,
    companyName: data.companyName,
    phone: data.phone,
    email: data.email,
    mailBody: data.mailBody,
    requestId,
    submittedAt,
    currentYear: now.getFullYear().toString(),
    logoUrl,
    isClientConfirmation: false,
  });

  const subjectPrefix = isCustomQuote ? '🎬 New Custom Quotation Request' : '💎 New Subscription Inquiry';
  return sendEmail(recipient, `${subjectPrefix}: ${data.packageName} — ${data.userName}${data.companyName ? ` (${data.companyName})` : ''}`, html, data.email);
}

export async function sendSubscriptionConfirmationToClient(data: SubscriptionInquiryEmailData): Promise<EmailResult> {
  const isCustomQuote = Boolean(
    data.packagePrice.toLowerCase().includes('custom') ||
    data.packageName.toLowerCase().includes('custom')
  );
  const typeLabel = isCustomQuote ? 'QUOTATION REQUEST RECEIVED' : 'SUBSCRIPTION INQUIRY RECEIVED';
  const headline = `Thank you, ${data.userName}!`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wize.tv';
  const logoUrl = `${siteUrl}/logo-white.png`;
  const now = new Date();
  const dateStr = formatDateColombo(now, { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = formatTimeColombo(now);
  const submittedAt = `${dateStr} · ${timeStr}`;
  const requestId = `WIZE-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const introHtml = isCustomQuote
    ? `Thank you for requesting a custom quotation for <strong style="color:#111216;">${escapeHtml(data.packageName)}</strong> at WIZEtv Studios! Our executive studio producer has received your inquiry and will contact you within 24 hours with a tailored proposal.`
    : `Thank you for your interest in the <strong style="color:#111216;">${escapeHtml(data.packageName)}</strong> monthly subscription at WIZEtv Studios! Our executive studio producer has received your details and will contact you within 24 hours to confirm your membership onboarding.`;

  const html = renderInquiryEmailTemplate({
    inquiryType: typeLabel,
    emailHeadline: headline,
    introHtml,
    packageName: data.packageName,
    packagePrice: data.packagePrice,
    packageAllocation: data.packageAllocation,
    idealUseCase: data.idealUseCase,
    userName: data.userName,
    companyName: data.companyName,
    phone: data.phone,
    email: data.email,
    mailBody: data.mailBody,
    requestId,
    submittedAt,
    currentYear: now.getFullYear().toString(),
    logoUrl,
    isClientConfirmation: true,
  });

  const clientSubject = isCustomQuote
    ? `Custom Quotation Request Received: ${data.packageName} — WIZEtv Studios`
    : `Subscription Request Received: ${data.packageName} — WIZEtv Studios`;

  return sendEmail(data.email, clientSubject, html);
}
