// app/api/bookings/availability/route.ts
// GET /api/bookings/availability?date=YYYY-MM-DD&package_id=xxx
// Returns available time slots for a given date

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseClient';
import { generateTimeSlots, colomboToUTC } from '@/lib/booking-utils';

const COLOMBO_TZ = 'Asia/Colombo';
const DEFAULT_SLOT_INTERVAL = 60;   // minutes
const DEFAULT_BUFFER = 30;           // minutes

const DEFAULT_BUSINESS_HOURS: Record<number, { is_open: boolean; open_time: string; close_time: string }> = {
  0: { is_open: true,  open_time: '08:00', close_time: '21:00' }, // Sunday
  1: { is_open: true,  open_time: '08:00', close_time: '21:00' }, // Monday
  2: { is_open: true,  open_time: '08:00', close_time: '21:00' }, // Tuesday
  3: { is_open: true,  open_time: '08:00', close_time: '21:00' }, // Wednesday
  4: { is_open: true,  open_time: '08:00', close_time: '21:00' }, // Thursday
  5: { is_open: true,  open_time: '08:00', close_time: '21:00' }, // Friday
  6: { is_open: true,  open_time: '08:00', close_time: '21:00' }, // Saturday
};

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');       // "YYYY-MM-DD"
    const packageId = searchParams.get('package_id');

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: 'Invalid or missing date' }, { status: 400 });
    }

    const supabase = createServerClient();

    // 1. Get business hours for this day of week
    const targetDate = new Date(date + 'T12:00:00+05:30');
    const dayOfWeek = targetDate.getDay(); // 0=Sunday in Colombo

    let bizHours = DEFAULT_BUSINESS_HOURS[dayOfWeek];

    try {
      const { data, error } = await supabase
        .from('business_hours')
        .select('*')
        .eq('day_of_week', dayOfWeek)
        .maybeSingle();

      if (!error && data) {
        bizHours = data;
      }
    } catch {
      // Fallback to DEFAULT_BUSINESS_HOURS
    }

    if (!bizHours || !bizHours.is_open) {
      return NextResponse.json({
        date,
        isOpen: false,
        slots: [],
        openTime: bizHours?.open_time || '09:00',
        closeTime: bizHours?.close_time || '18:00',
      });
    }

    // 2. Get booking settings
    let slotInterval = DEFAULT_SLOT_INTERVAL;
    let bufferMins = DEFAULT_BUFFER;
    let advanceNoticeHours = 12;
    let bookingEnabled = true;

    try {
      const { data: settings } = await supabase
        .from('booking_settings')
        .select('key, value');

      if (settings && settings.length > 0) {
        const settingsMap: Record<string, string> = {};
        settings.forEach((s: { key: string; value: string }) => { settingsMap[s.key] = s.value; });
        slotInterval = parseInt(settingsMap['slot_interval_minutes'] ?? String(DEFAULT_SLOT_INTERVAL));
        bufferMins = parseInt(settingsMap['buffer_minutes'] ?? String(DEFAULT_BUFFER));
        advanceNoticeHours = parseInt(settingsMap['advance_notice_hours'] ?? '12');
        bookingEnabled = settingsMap['booking_enabled'] !== 'false';
      }
    } catch {
      // Use defaults
    }

    if (!bookingEnabled) {
      return NextResponse.json({ date, isOpen: false, slots: [], openTime: bizHours.open_time, closeTime: bizHours.close_time });
    }

    // 3. Get package duration
    let durationHours = 2;
    if (packageId) {
      try {
        const { data: pkg } = await supabase
          .from('studio_packages')
          .select('duration_hours')
          .eq('id', packageId)
          .maybeSingle();
        if (pkg?.duration_hours) {
          durationHours = pkg.duration_hours;
        }
      } catch {
        // Fallback to default
      }
    }

    // 4. Generate all possible slots for the day
    const allSlots = generateTimeSlots(bizHours.open_time, bizHours.close_time, slotInterval, durationHours);

    // 5. Get confirmed bookings that overlap with this date
    const dayStart = colomboToUTC(date, '00:00').toISOString();
    const dayEnd = colomboToUTC(date, '23:59').toISOString();

    let existingBookings: Array<{
      start_time?: string;
      end_time?: string;
      requested_time_slot?: string;
      duration_hours?: number;
      status?: string;
    }> = [];
    try {
      const { data } = await supabase
        .from('bookings')
        .select('start_time, end_time, requested_time_slot, duration_hours, status')
        .in('status', ['confirmed', 'pending'])
        .or(`start_time.gte.${dayStart},requested_date.eq.${date}`);
      if (data) existingBookings = data;
    } catch {
      existingBookings = [];
    }

    // 6. Get booking blocks
    let blocks: Array<{ start_time: string; end_time: string }> = [];
    try {
      const { data } = await supabase
        .from('booking_blocks')
        .select('start_time, end_time')
        .lte('start_time', dayEnd)
        .gte('end_time', dayStart);
      if (data) blocks = data;
    } catch {
      blocks = [];
    }

    // 7. Check which slots are available
    const now = new Date();
    const minBookingTime = new Date(now.getTime() + advanceNoticeHours * 60 * 60 * 1000);

    const slots = allSlots.map((slotTime) => {
      const slotStart = colomboToUTC(date, slotTime);
      const slotEnd = new Date(slotStart.getTime() + durationHours * 60 * 60 * 1000 + bufferMins * 60 * 1000);

      // Check if in the past / too soon
      if (slotStart <= minBookingTime) {
        return { time: slotTime, label: formatTimeLabel(slotTime), available: false };
      }

      // Check conflict with existing bookings
      const hasBookingConflict = (existingBookings || []).some((b: {
        start_time?: string;
        end_time?: string;
        requested_time_slot?: string;
        duration_hours?: number;
        status?: string;
      }) => {
        if (!b.start_time && !b.requested_time_slot) return false;
        
        let bStart: Date, bEnd: Date;
        if (b.start_time) {
          bStart = new Date(b.start_time);
          bEnd = b.end_time ? new Date(b.end_time) : new Date(bStart.getTime() + (b.duration_hours || 2) * 3600000);
        } else {
          // Legacy bookings without start_time
          bStart = colomboToUTC(date, b.requested_time_slot!);
          bEnd = new Date(bStart.getTime() + (b.duration_hours || 2) * 3600000 + bufferMins * 60000);
        }
        // Check overlap: new_start < existing_end AND new_end > existing_start
        return slotStart < bEnd && slotEnd > bStart;
      });

      // Check conflict with blocks
      const hasBlockConflict = (blocks || []).some((bl: { start_time: string; end_time: string }) => {
        const bStart = new Date(bl.start_time);
        const bEnd = new Date(bl.end_time);
        return slotStart < bEnd && slotEnd > bStart;
      });

      return {
        time: slotTime,
        label: formatTimeLabel(slotTime),
        available: !hasBookingConflict && !hasBlockConflict,
      };
    });

    return NextResponse.json({
      date,
      isOpen: true,
      slots,
      openTime: bizHours.open_time,
      closeTime: bizHours.close_time,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    console.error('Availability API error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function formatTimeLabel(timeStr: string): string {
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}
