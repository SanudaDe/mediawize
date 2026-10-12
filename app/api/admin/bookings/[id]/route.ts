// app/api/admin/bookings/[id]/route.ts
// GET, PATCH — get or update a single booking (admin only)

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseClient';
import { colomboToUTC } from '@/lib/booking-utils';
import {
  sendBookingConfirmationEmail,
  sendBookingRejectionEmail,
} from '@/lib/email';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('bookings')
      .select(`*, studio_packages(*)`)
      .eq('id', params.id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ booking: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { action, admin_notes, rejection_reason, new_date, new_time } = body;

    const supabase = createServerClient();

    // Fetch current booking
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select(`*, studio_packages(*)`)
      .eq('id', params.id)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const now = new Date().toISOString();
    let updateData: Record<string, unknown> = {};
    let activityAction = '';
    let activityNote = '';

    switch (action) {
      case 'approve': {
        // Server-side conflict check before confirming
        const bufferMins = 30;
        const durationHours = booking.studio_packages?.duration_hours ?? booking.duration_hours ?? 2;
        const slotStart = colomboToUTC(booking.requested_date, booking.requested_time_slot);
        const slotEnd = new Date(slotStart.getTime() + durationHours * 3600000 + bufferMins * 60000);

        const { data: conflicts } = await supabase
          .from('bookings')
          .select('id, start_time, end_time, requested_time_slot, duration_hours')
          .eq('status', 'confirmed')
          .eq('requested_date', booking.requested_date)
          .neq('id', params.id);

        const hasConflict = (conflicts || []).some((b: {
          start_time?: string;
          end_time?: string;
          requested_time_slot?: string;
          duration_hours?: number;
        }) => {
          const bStart = b.start_time
            ? new Date(b.start_time)
            : colomboToUTC(booking.requested_date, b.requested_time_slot!);
          const bEnd = b.end_time
            ? new Date(b.end_time)
            : new Date(bStart.getTime() + (b.duration_hours || 2) * 3600000 + bufferMins * 60000);
          return slotStart < bEnd && slotEnd > bStart;
        });

        if (hasConflict) {
          return NextResponse.json(
            { error: 'Cannot confirm: time slot conflicts with another confirmed booking.' },
            { status: 409 }
          );
        }

        updateData = {
          status: 'confirmed',
          confirmed_at: now,
          admin_notes: admin_notes ?? booking.admin_notes,
          start_time: slotStart.toISOString(),
          end_time: new Date(slotStart.getTime() + durationHours * 3600000).toISOString(),
        };
        activityAction = 'approved';
        activityNote = 'Booking approved and confirmed by admin';

        // Send confirmation email
        const pkg = booking.studio_packages;
        sendBookingConfirmationEmail({
          bookingReference: booking.booking_reference,
          clientName: booking.client_name,
          clientEmail: booking.client_email,
          clientPhone: booking.client_phone ?? undefined,
          companyName: booking.company_name ?? undefined,
          durationHours: pkg?.duration_hours ?? booking.duration_hours ?? undefined,
          packageName: pkg?.name ?? 'Studio Package',
          requestedDate: booking.requested_date,
          requestedTime: booking.requested_time_slot,
          estimatedTotal: booking.estimated_total_lkr,
          adminNotes: admin_notes,
        }).then(async (result) => {
          await supabase.from('booking_notifications').insert([{
            booking_id: params.id,
            type: 'confirmed',
            recipient_email: booking.client_email,
            status: result.success ? 'sent' : 'failed',
            error_message: result.error ?? null,
            sent_at: result.success ? now : null,
          }]);
        }).catch(console.error);
        break;
      }

      case 'reject': {
        updateData = {
          status: 'rejected',
          rejected_at: now,
          rejection_reason: rejection_reason ?? null,
          admin_notes: admin_notes ?? booking.admin_notes,
        };
        activityAction = 'rejected';
        activityNote = rejection_reason ? `Rejected: ${rejection_reason}` : 'Booking rejected by admin';

        const pkg = booking.studio_packages;
        sendBookingRejectionEmail({
          bookingReference: booking.booking_reference,
          clientName: booking.client_name,
          clientEmail: booking.client_email,
          clientPhone: booking.client_phone ?? undefined,
          companyName: booking.company_name ?? undefined,
          durationHours: pkg?.duration_hours ?? booking.duration_hours ?? undefined,
          packageName: pkg?.name ?? 'Studio Package',
          requestedDate: booking.requested_date,
          requestedTime: booking.requested_time_slot,
          rejectionReason: rejection_reason,
        }).then(async (result) => {
          await supabase.from('booking_notifications').insert([{
            booking_id: params.id,
            type: 'rejected',
            recipient_email: booking.client_email,
            status: result.success ? 'sent' : 'failed',
            error_message: result.error ?? null,
            sent_at: result.success ? now : null,
          }]);
        }).catch(console.error);
        break;
      }

      case 'cancel':
        updateData = {
          status: 'cancelled',
          cancelled_at: now,
          admin_notes: admin_notes ?? booking.admin_notes,
        };
        activityAction = 'cancelled';
        activityNote = 'Booking cancelled by admin';
        break;

      case 'complete':
        updateData = { status: 'completed', admin_notes: admin_notes ?? booking.admin_notes };
        activityAction = 'completed';
        activityNote = 'Booking marked as completed';
        break;

      case 'reschedule':
        if (!new_date || !new_time) {
          return NextResponse.json({ error: 'new_date and new_time required for reschedule' }, { status: 400 });
        }
        const durationHours = booking.studio_packages?.duration_hours ?? booking.duration_hours ?? 2;
        const newStart = colomboToUTC(new_date, new_time);
        const newEnd = new Date(newStart.getTime() + durationHours * 3600000);
        updateData = {
          requested_date: new_date,
          requested_time_slot: new_time,
          start_time: newStart.toISOString(),
          end_time: newEnd.toISOString(),
          status: 'pending',
          admin_notes: admin_notes ?? booking.admin_notes,
        };
        activityAction = 'rescheduled';
        activityNote = `Rescheduled to ${new_date} at ${new_time}`;
        break;

      case 'note':
        updateData = { admin_notes: admin_notes };
        activityAction = 'note_added';
        activityNote = `Admin note: ${admin_notes}`;
        break;

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    const { data: updated, error: updateError } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Log activity
    await supabase.from('booking_activity').insert([{
      booking_id: params.id,
      action: activityAction,
      note: activityNote,
    }]);

    return NextResponse.json({ success: true, booking: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient();

    // 1. Verify booking exists
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('id, booking_reference')
      .eq('id', params.id)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // 2. Delete related notifications & activity logs first (safeguard if foreign keys lack ON DELETE CASCADE)
    await supabase.from('booking_notifications').delete().eq('booking_id', params.id);
    await supabase.from('booking_activity').delete().eq('booking_id', params.id);

    // 3. Delete booking record permanently from database
    const { error: deleteError } = await supabase
      .from('bookings')
      .delete()
      .eq('id', params.id);

    if (deleteError) {
      console.error('[Admin Booking Delete Error]:', deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Booking ${booking.booking_reference} deleted successfully.`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

