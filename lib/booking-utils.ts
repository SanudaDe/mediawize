// lib/booking-utils.ts
// Utility functions for the WizeTV Booking System (Asia/Colombo timezone)

const COLOMBO_TZ = 'Asia/Colombo';

/**
 * Format a date to display string in Colombo timezone
 */
export function formatDateColombo(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-LK', {
    timeZone: COLOMBO_TZ,
    ...options,
  });
}

/**
 * Format a time to display string in Colombo timezone
 */
export function formatTimeColombo(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', {
    timeZone: COLOMBO_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Get today's date string in Asia/Colombo (YYYY-MM-DD)
 */
export function getTodayColombo(): string {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: COLOMBO_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const y = parts.find(p => p.type === 'year')?.value ?? '';
  const m = parts.find(p => p.type === 'month')?.value ?? '';
  const d = parts.find(p => p.type === 'day')?.value ?? '';
  return `${y}-${m}-${d}`;
}

/**
 * Convert a date string (YYYY-MM-DD) + time string (HH:MM) to a UTC Date
 * assuming the input is in Asia/Colombo time
 */
export function colomboToUTC(dateStr: string, timeStr: string): Date {
  // Asia/Colombo is UTC+05:30
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hour, minute] = timeStr.split(':').map(Number);
  // Create a UTC date by subtracting 5h30m offset
  return new Date(Date.UTC(year, month - 1, day, hour - 5, minute - 30));
}

/**
 * Convert a UTC Date to time string in Colombo (HH:MM)
 */
export function utcToColomboTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: COLOMBO_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(d);
  const h = parts.find(p => p.type === 'hour')?.value ?? '00';
  const m = parts.find(p => p.type === 'minute')?.value ?? '00';
  return `${h}:${m}`;
}

/**
 * Format time slot "09:00" → "9:00 AM – 11:00 AM"
 */
export function formatTimeSlot(timeStr: string, durationHours: number = 2): string {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  const startLabel = `${hour12}:${m.toString().padStart(2, '0')} ${period}`;

  if (!durationHours || durationHours <= 0) return startLabel;

  const endTotal = h * 60 + m + durationHours * 60;
  const endH = Math.floor(endTotal / 60) % 24;
  const endM = endTotal % 60;
  const endPeriod = endH >= 12 ? 'PM' : 'AM';
  const endHour12 = endH % 12 || 12;
  const endLabel = `${endHour12}:${endM.toString().padStart(2, '0')} ${endPeriod}`;

  return `${startLabel} – ${endLabel}`;
}

/**
 * Generate time slots between open/close time with interval minutes
 */
export function generateTimeSlots(
  openTime: string,
  closeTime: string,
  intervalMinutes: number,
  durationHours: number
): string[] {
  const slots: string[] = [];
  const [openH, openM] = openTime.split(':').map(Number);
  const [closeH, closeM] = closeTime.split(':').map(Number);
  const openTotal = openH * 60 + openM;
  const closeTotal = closeH * 60 + closeM;
  const durationMins = durationHours * 60;

  for (let t = openTotal; t + durationMins <= closeTotal; t += intervalMinutes) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
  }
  return slots;
}

/**
 * Generate a human-readable booking reference
 */
export function generateBookingRef(): string {
  return `WT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}

/**
 * Format LKR price
 */
export function formatLKR(amount: number): string {
  return `LKR ${amount.toLocaleString('en-LK')}`;
}

/**
 * Get status badge color classes
 */
export function getStatusBadge(status: string): { bg: string; text: string; dot: string } {
  switch (status) {
    case 'pending':
      return { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-400' };
    case 'confirmed':
      return { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-400' };
    case 'rejected':
      return { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-400' };
    case 'cancelled':
      return { bg: 'bg-slate-500/10', text: 'text-slate-400', dot: 'bg-slate-400' };
    case 'completed':
      return { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-400' };
    default:
      return { bg: 'bg-slate-500/10', text: 'text-slate-400', dot: 'bg-slate-400' };
  }
}
