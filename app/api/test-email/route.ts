// app/api/test-email/route.ts
// Test endpoint to verify email delivery (Google Mail / Resend)
// Visit: http://localhost:3000/api/test-email or POST with { to: "your@email.com" }

import { NextRequest, NextResponse } from 'next/server';
import { sendBookingRequestEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  return handleSend(req);
}

export async function POST(req: NextRequest) {
  return handleSend(req);
}

async function handleSend(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let toEmail = searchParams.get('to');

  if (!toEmail && req.method === 'POST') {
    try {
      const body = await req.json();
      toEmail = body.to;
    } catch {
      // ignore
    }
  }

  toEmail = toEmail || 'bookings@wize.tv';

  const provider = process.env.GOOGLE_APP_PASSWORD 
    ? 'Google Workspace (SMTP)' 
    : (process.env.RESEND_API_KEY ? 'Resend API' : 'None configured');

  const result = await sendBookingRequestEmail({
    bookingReference: 'WT-TEST-001',
    clientName: 'WIZEtv Test Client',
    clientEmail: toEmail,
    packageName: 'Standard Podcast Package',
    requestedDate: '2026-10-15',
    requestedTime: '10:00 - 12:00',
    estimatedTotal: 45000,
  });

  if (!result.success) {
    return NextResponse.json({
      success: false,
      provider,
      error: result.error,
    }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    provider,
    message: `Test booking confirmation email sent successfully to ${toEmail}!`,
    sender: 'bookings@wize.tv',
  });
}
