// app/api/bookings/submit/route.ts
// POST — submit a new booking request

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseClient';
import { colomboToUTC, generateBookingRef } from '@/lib/booking-utils';
import { sendBookingRequestEmail, sendAdminNotificationEmail } from '@/lib/email';
import { STUDIO_PACKAGES_DATA } from '@/lib/data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      package_id,
      requested_date,
      requested_time_slot,
      client_name,
      client_email,
      client_phone,
      company_name,
      show_name,
      guest_count,
      client_notes,
    } = body;

    // Basic validation
    if (!package_id || !requested_date || !requested_time_slot || !client_name || !client_email || !client_phone) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServerClient();

    // Fetch package details from Supabase or fallback to local
    let pkg: { id: string; name: string; duration_hours: number; price_lkr: number } | null = null;

    try {
      const { data } = await supabase
        .from('studio_packages')
        .select('*')
        .eq('id', package_id)
        .eq('is_active', true)
        .maybeSingle();
      if (data) pkg = data;
    } catch {
      // Ignore Supabase lookup error
    }

    if (!pkg) {
      const local = STUDIO_PACKAGES_DATA.find(p => p.id === package_id || p.slug === package_id);
      if (local) {
        pkg = {
          id: local.id,
          name: local.name,
          duration_hours: parseInt(local.duration) || 2,
          price_lkr: local.priceNum,
        };
      }
    }

    if (!pkg) {
      return NextResponse.json({ success: false, error: 'Package not found' }, { status: 404 });
    }

    // Server-side conflict check before inserting
    const bufferMins = 30;
    const slotStart = colomboToUTC(requested_date, requested_time_slot);
    const slotEnd = new Date(slotStart.getTime() + pkg.duration_hours * 3600000 + bufferMins * 60000);

    const { data: conflicts } = await supabase
      .from('bookings')
      .select('id, booking_reference')
      .in('status', ['confirmed', 'pending'])
      .eq('requested_date', requested_date);

    // Simple conflict check for same date (full overlap check)
    if (conflicts && conflicts.length > 0) {
      const { data: detailedConflicts } = await supabase
        .from('bookings')
        .select('start_time, end_time, requested_time_slot, duration_hours')
        .in('status', ['confirmed'])
        .eq('requested_date', requested_date);

      const hasConflict = (detailedConflicts || []).some((b: {
        start_time?: string;
        end_time?: string;
        requested_time_slot?: string;
        duration_hours?: number;
      }) => {
        const bStart = b.start_time
          ? new Date(b.start_time)
          : colomboToUTC(requested_date, b.requested_time_slot!);
        const bEnd = b.end_time
          ? new Date(b.end_time)
          : new Date(bStart.getTime() + (b.duration_hours || 2) * 3600000 + bufferMins * 60000);
        return slotStart < bEnd && slotEnd > bStart;
      });

      if (hasConflict) {
        return NextResponse.json(
          { success: false, error: 'This time slot is no longer available. Please select another.' },
          { status: 409 }
        );
      }
    }

    const bookingReference = generateBookingRef();

    const isUUID = (val?: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val || '');

    const validPackageId = isUUID(pkg?.id)
      ? pkg.id
      : isUUID(package_id)
      ? package_id
      : null;

    const { data: booking, error: insertError } = await supabase
      .from('bookings')
      .insert([{
        booking_reference: bookingReference,
        package_id: validPackageId,
        client_name,
        client_email,
        client_phone,
        company_name: company_name || null,
        show_name: show_name || (pkg?.name ? `${pkg.name} Session` : null),
        requested_date,
        requested_time_slot,
        start_time: slotStart.toISOString(),
        end_time: new Date(slotStart.getTime() + pkg.duration_hours * 3600000).toISOString(),
        duration_hours: pkg.duration_hours,
        guest_count: guest_count || 1,
        add_ons: [],
        estimated_total_lkr: pkg.price_lkr,
        client_notes: client_notes || null,
        status: 'pending',
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Booking insert error:', insertError);
      return NextResponse.json({
        success: false,
        error: insertError.message || 'Failed to save booking',
        details: insertError.details || insertError.hint || undefined,
      }, { status: 500 });
    }

    // Log activity
    await supabase.from('booking_activity').insert([{
      booking_id: booking.id,
      action: 'booking_submitted',
      note: `New booking request submitted by ${client_name}`,
    }]);

    // Send emails (fire and forget — don't fail booking if email fails)
    Promise.all([
      sendBookingRequestEmail({
        bookingReference,
        clientName: client_name,
        clientEmail: client_email,
        clientPhone: client_phone || undefined,
        companyName: company_name || undefined,
        durationHours: pkg.duration_hours,
        packageName: pkg.name,
        requestedDate: requested_date,
        requestedTime: requested_time_slot,
        estimatedTotal: pkg.price_lkr,
      }).then(async (result) => {
        await supabase.from('booking_notifications').insert([{
          booking_id: booking.id,
          type: 'request_received',
          recipient_email: client_email,
          status: result.success ? 'sent' : 'failed',
          error_message: result.error || null,
          sent_at: result.success ? new Date().toISOString() : null,
        }]);
      }),
      sendAdminNotificationEmail({
        bookingReference,
        clientName: client_name,
        clientEmail: client_email,
        clientPhone: client_phone || undefined,
        companyName: company_name || undefined,
        durationHours: pkg.duration_hours,
        packageName: pkg.name,
        requestedDate: requested_date,
        requestedTime: requested_time_slot,
        estimatedTotal: pkg.price_lkr,
      }).then(async (result) => {
        await supabase.from('booking_notifications').insert([{
          booking_id: booking.id,
          type: 'admin_alert',
          recipient_email: process.env.ADMIN_NOTIFICATION_EMAIL || 'info@wize.tv',
          status: result.success ? 'sent' : 'failed',
          error_message: result.error || null,
          sent_at: result.success ? new Date().toISOString() : null,
        }]);
      }),
    ]).catch(console.error);

    return NextResponse.json({
      success: true,
      bookingReference,
      message: 'Booking request received successfully',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    console.error('Submit booking error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
