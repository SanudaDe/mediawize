// app/api/subscription-inquiry/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseClient';
import { sendSubscriptionInquiryEmail, sendSubscriptionConfirmationToClient } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userName,
      companyName,
      phone,
      email,
      mailBody,
      packageName,
      packagePrice,
      packageAllocation,
      idealUseCase,
    } = body;

    // Validation
    if (!userName || typeof userName !== 'string' || !userName.trim()) {
      return NextResponse.json({ success: false, error: 'Full name is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'A valid email address is required' }, { status: 400 });
    }
    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json({ success: false, error: 'Phone / WhatsApp number is required' }, { status: 400 });
    }
    if (!mailBody || typeof mailBody !== 'string' || !mailBody.trim()) {
      return NextResponse.json({ success: false, error: 'Message / inquiry body is required' }, { status: 400 });
    }

    const trimmedData = {
      userName: userName.trim(),
      companyName: companyName && typeof companyName === 'string' ? companyName.trim() : undefined,
      phone: phone.trim(),
      email: email.trim(),
      mailBody: mailBody.trim(),
      packageName: packageName || 'Subscription Package',
      packagePrice: packagePrice || 'Custom',
      packageAllocation: packageAllocation || undefined,
      idealUseCase: idealUseCase || undefined,
    };

    // 1. Try to record in Supabase inquiries table for admin audit trail
    try {
      const supabase = createServerClient();
      await supabase.from('inquiries').insert([{
        name: trimmedData.userName,
        email: trimmedData.email,
        phone: trimmedData.phone,
        service_interest: `Subscription: ${trimmedData.packageName}`,
        budget_range: trimmedData.packagePrice,
        message: trimmedData.companyName
          ? `[Company: ${trimmedData.companyName}]\n\n${trimmedData.mailBody}`
          : trimmedData.mailBody,
        status: 'unread',
      }]);
    } catch (dbErr) {
      console.warn('[Subscription Inquiry] DB insert notice:', dbErr);
    }

    // 2. Dispatch email to bookings@wize.tv
    const emailResult = await sendSubscriptionInquiryEmail(trimmedData);

    // 3. Send confirmation email copy to client (async / non-blocking)
    sendSubscriptionConfirmationToClient(trimmedData).catch((err) => {
      console.warn('[Subscription Inquiry] Client receipt send notice:', err);
    });

    return NextResponse.json({
      success: true,
      message: 'Your subscription inquiry has been sent to bookings@wize.tv. Our team will contact you shortly.',
      emailDelivered: emailResult.success,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('[Subscription Inquiry API error]:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
