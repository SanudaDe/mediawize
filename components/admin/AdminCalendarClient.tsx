'use client';

import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Loader2, User, Package } from 'lucide-react';
import { Booking } from '@/lib/booking-types';
import { formatTimeSlot, formatLKR, getStatusBadge } from '@/lib/booking-utils';
import Link from 'next/link';

export default function AdminCalendarClient() {
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch('/api/admin/bookings?limit=200')
      .then(r => r.json())
      .then(data => setAllBookings(data.bookings ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getDateStr = (date: Date): string => {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Colombo', year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(date);
    const y = parts.find(p => p.type === 'year')?.value ?? '';
    const m = parts.find(p => p.type === 'month')?.value ?? '';
    const d = parts.find(p => p.type === 'day')?.value ?? '';
    return `${y}-${m}-${d}`;
  };

  useEffect(() => {
    const dateStr = getDateStr(selectedDay);
    const bookingsOnDay = allBookings.filter(b => b.requested_date === dateStr);
    setDayBookings(bookingsOnDay.sort((a, b) =>
      (a.requested_time_slot ?? '').localeCompare(b.requested_time_slot ?? '')
    ));
  }, [selectedDay, allBookings]);

  // Compute dates with bookings for modifiers
  const confirmedDates: Date[] = [];
  const pendingDates: Date[] = [];

  allBookings.forEach(b => {
    if (!b.requested_date) return;
    const d = new Date(b.requested_date + 'T12:00:00+05:30');
    if (b.status === 'confirmed') confirmedDates.push(d);
    else if (b.status === 'pending') pendingDates.push(d);
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Studio Calendar</h1>
        <p className="text-slate-400 text-sm mt-1">Visual overview of all bookings across the month</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar */}
        <div className="bg-brand-charcoal rounded-2xl border border-brand-charcoal p-6 lg:w-auto">
          <style>{`
            .admin-rdp .rdp { --rdp-cell-size: 48px; --rdp-accent-color: #EC2328; margin: 0; }
            .admin-rdp .rdp-caption { color: #F1F5F9; margin-bottom: 8px; }
            .admin-rdp .rdp-caption_label { font-weight: 700; font-size: 17px; }
            .admin-rdp .rdp-nav_button { color: #94A3B8; }
            .admin-rdp .rdp-nav_button:hover { color: #EC2328; background: rgba(236,35,40,0.1); border-radius: 8px; }
            .admin-rdp .rdp-head_cell { color: #64748B; font-weight: 600; font-size: 12px; text-transform: uppercase; }
            .admin-rdp .rdp-day { color: #CBD5E1; font-weight: 500; border-radius: 10px; position: relative; }
            .admin-rdp .rdp-day:hover:not([disabled]):not(.rdp-day_selected) { background: rgba(236,35,40,0.15); color: #fff; }
            .admin-rdp .rdp-day_selected { background: #EC2328 !important; color: #fff !important; font-weight: 700; box-shadow: 0 4px 12px rgba(236,35,40,0.4); }
            .admin-rdp .rdp-day_today:not(.rdp-day_selected) { border: 1px solid #EC2328; color: #EC2328; font-weight: 700; }
            .admin-rdp .has-confirmed::after { content: ''; position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; background: #22C55E; border-radius: 50%; }
            .admin-rdp .has-pending::after { content: ''; position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; background: #F59E0B; border-radius: 50%; }
            .admin-rdp .rdp-day_selected::after { display: none; }
          `}</style>
          <div className="admin-rdp">
            <DayPicker
              mode="single"
              selected={selectedDay}
              onSelect={(day) => day && setSelectedDay(day)}
              modifiers={{ 'has-confirmed': confirmedDates, 'has-pending': pendingDates }}
              modifiersClassNames={{ 'has-confirmed': 'has-confirmed', 'has-pending': 'has-pending' }}
            />
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400" /> Confirmed</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Pending</span>
          </div>
        </div>

        {/* Day bookings */}
        <div className="flex-1">
          <div className="bg-brand-charcoal rounded-2xl border border-brand-charcoal overflow-hidden">
            <div className="px-6 py-4 border-b border-brand-dark flex items-center justify-between">
              <h2 className="text-white font-bold">
                {selectedDay.toLocaleDateString('en-LK', {
                  timeZone: 'Asia/Colombo', weekday: 'long', day: 'numeric', month: 'long',
                })}
              </h2>
              <span className="text-xs text-slate-500">
                {dayBookings.length} booking{dayBookings.length !== 1 ? 's' : ''}
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="animate-spin text-brand-red" size={24} />
              </div>
            ) : dayBookings.length === 0 ? (
              <div className="text-center py-16 text-slate-600">
                <p className="text-lg mb-1">No bookings</p>
                <p className="text-sm">Studio is free on this day.</p>
              </div>
            ) : (
              <div className="divide-y divide-brand-dark">
                {dayBookings.map(b => {
                  const badge = getStatusBadge(b.status);
                  const pkg = b.studio_packages as { name?: string } | undefined;
                  return (
                    <div key={b.id} className="px-6 py-5 flex items-start gap-4 hover:bg-brand-dark/30 transition-colors">
                      <div className="flex-shrink-0 text-center">
                        <div className="text-brand-red font-bold text-sm">
                          {b.requested_time_slot ? formatTimeSlot(b.requested_time_slot) : '—'}
                        </div>
                        {b.duration_hours && (
                          <div className="text-slate-600 text-xs">{b.duration_hours}h</div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-semibold">{b.client_name}</span>
                          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${badge.bg} ${badge.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            {b.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Package size={11} /> {pkg?.name ?? '—'}</span>
                          <span className="flex items-center gap-1"><User size={11} /> {b.guest_count} guest{b.guest_count !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5 font-mono">{b.booking_reference}</div>
                      </div>

                      <Link
                        href={`/admin/bookings/${b.id}`}
                        className="text-brand-red hover:underline text-xs font-semibold flex-shrink-0"
                      >
                        Manage →
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
