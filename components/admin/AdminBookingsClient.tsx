'use client';

import { useEffect, useState, useCallback } from 'react';
import { Booking } from '@/lib/booking-types';
import { getStatusBadge, formatDateColombo, formatTimeSlot, formatLKR } from '@/lib/booking-utils';
import { Loader2, Search, Filter, RefreshCw, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const STATUS_TABS = ['all', 'pending', 'confirmed', 'rejected', 'cancelled', 'completed'];

export default function AdminBookingsClient() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);

  const load = useCallback(async (status: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (status !== 'all') params.set('status', status);
      const res = await fetch(`/api/admin/bookings?${params}`);
      const data = await res.json();
      setBookings(data.bookings ?? []);
      setTotal(data.total ?? 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(activeStatus); }, [activeStatus, load]);

  const filtered = bookings.filter(b =>
    !search ||
    b.client_name.toLowerCase().includes(search.toLowerCase()) ||
    b.client_email.toLowerCase().includes(search.toLowerCase()) ||
    b.booking_reference.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Bookings</h1>
          <p className="text-slate-400 text-sm mt-1">{total} total booking{total !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => load(activeStatus)}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm border border-brand-charcoal px-3 py-2 rounded-lg transition-colors"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {STATUS_TABS.map(s => (
          <button
            key={s}
            onClick={() => setActiveStatus(s)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeStatus === s
                ? 'bg-brand-red text-white'
                : 'bg-brand-charcoal text-slate-400 hover:text-white'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, or reference…"
          className="w-full bg-brand-charcoal border border-brand-charcoal rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-red transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-brand-charcoal rounded-2xl border border-brand-charcoal overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="animate-spin text-brand-red" size={28} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <AlertCircle size={32} className="mx-auto mb-3 text-slate-600" />
            <p>No bookings found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-dark">
                  {['Reference', 'Client', 'Package', 'Date & Time', 'Total', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-dark">
                {filtered.map(b => {
                  const badge = getStatusBadge(b.status);
                  return (
                    <tr key={b.id} className="hover:bg-brand-dark/30 transition-colors">
                      <td className="px-5 py-4">
                        <span className="font-mono text-brand-red text-xs">{b.booking_reference}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-white font-medium">{b.client_name}</div>
                        <div className="text-slate-500 text-xs">{b.client_email}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-300">
                        {(b.studio_packages as { name?: string } | undefined)?.name ?? '—'}
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-slate-300">
                          {b.requested_date
                            ? formatDateColombo(new Date(b.requested_date + 'T12:00:00+05:30'), { month: 'short', day: 'numeric' })
                            : '—'}
                        </div>
                        <div className="text-slate-500 text-xs">
                          {b.requested_time_slot ? formatTimeSlot(b.requested_time_slot) : ''}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-300">
                        {formatLKR(b.estimated_total_lkr)}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${badge.bg} ${badge.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          {b.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/bookings/${b.id}`}
                          className="text-brand-red hover:underline text-xs font-semibold whitespace-nowrap"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
