'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Booking } from '@/lib/booking-types';
import { getStatusBadge, formatDateColombo, formatTimeSlot, formatLKR } from '@/lib/booking-utils';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { Loader2, Search, Filter, RefreshCw, AlertCircle, Trash2, CheckCircle, X, Bell, Radio } from 'lucide-react';
import Link from 'next/link';

const STATUS_TABS = ['all', 'pending', 'confirmed', 'rejected', 'cancelled', 'completed'];

export default function AdminBookingsClient() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newBookingAlert, setNewBookingAlert] = useState<{ name: string; ref: string; id: string } | null>(null);
  const [activeStatus, setActiveStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const seenIdsRef = useRef<Set<string>>(new Set());
  const isFirstLoadRef = useRef(true);
  const activeStatusRef = useRef(activeStatus);
  activeStatusRef.current = activeStatus;

  const load = useCallback(async (status: string, silent = false) => {
    if (!silent) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }

    try {
      const params = new URLSearchParams({ limit: '100', _t: String(Date.now()) });
      if (status !== 'all') params.set('status', status);

      const res = await fetch(`/api/admin/bookings?${params}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
      });
      const data = await res.json();
      const incoming: Booking[] = data.bookings ?? [];

      // Check for newly arrived bookings if this was a silent background refresh
      if (!isFirstLoadRef.current && seenIdsRef.current.size > 0) {
        const brandNew = incoming.filter(b => !seenIdsRef.current.has(b.id));
        if (brandNew.length > 0) {
          const newest = brandNew[0];
          setNewBookingAlert({
            name: newest.client_name,
            ref: newest.booking_reference,
            id: newest.id,
          });
        }
      }

      // Update seen IDs
      seenIdsRef.current = new Set(incoming.map(b => b.id));
      isFirstLoadRef.current = false;

      setBookings(incoming);
      setTotal(data.total ?? incoming.length);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('[AdminBookings] load error:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const handleQuickApprove = async (id: string, ref: string) => {
    const confirmed = window.confirm(
      `Approve and confirm booking "${ref}"?\n\nThis will update the database status to CONFIRMED and send the official studio confirmation email to the client.`
    );
    if (!confirmed) return;

    setApprovingId(id);
    setFeedbackMsg(null);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to approve booking');

      setBookings(prev => prev.map(b => (b.id === id ? { ...b, status: 'confirmed' } : b)));
      setFeedbackMsg({
        type: 'success',
        text: `Booking ${ref} confirmed successfully! The user has been notified via email.`,
      });
      if (newBookingAlert?.id === id) {
        setNewBookingAlert(null);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to approve booking';
      setFeedbackMsg({ type: 'error', text: msg });
    } finally {
      setApprovingId(null);
    }
  };

  const handleDelete = async (id: string, ref: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete booking "${ref}"?\n\nThis will completely remove it from the database.`
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete booking');

      setBookings(prev => prev.filter(b => b.id !== id));
      seenIdsRef.current.delete(id);
      setTotal(prev => Math.max(0, prev - 1));
      if (newBookingAlert?.id === id) {
        setNewBookingAlert(null);
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete booking');
    } finally {
      setDeletingId(null);
    }
  };

  // Initial load when tab status changes
  useEffect(() => {
    load(activeStatus, false);
  }, [activeStatus, load]);

  // Real-time synchronization: Auto-polling interval + window focus + document visibility
  useEffect(() => {
    const interval = setInterval(() => {
      load(activeStatusRef.current, true);
    }, 8000); // Poll every 8s silently

    const handleFocusOrVisible = () => {
      if (document.visibilityState === 'visible') {
        load(activeStatusRef.current, true);
      }
    };

    window.addEventListener('focus', handleFocusOrVisible);
    document.addEventListener('visibilitychange', handleFocusOrVisible);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocusOrVisible);
      document.removeEventListener('visibilitychange', handleFocusOrVisible);
    };
  }, [load]);

  // Supabase Realtime channel subscription for instant pushes
  useEffect(() => {
    try {
      const supabase = getSupabaseClient();
      const channel = supabase
        .channel('admin_bookings_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'bookings' },
          payload => {
            console.log('[AdminBookings] Realtime change detected:', payload.eventType);
            load(activeStatusRef.current, true);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err) {
      console.warn('[AdminBookings] Supabase Realtime subscription not enabled:', err);
    }
  }, [load]);

  const filtered = bookings.filter(b =>
    !search ||
    b.client_name.toLowerCase().includes(search.toLowerCase()) ||
    b.client_email.toLowerCase().includes(search.toLowerCase()) ||
    b.booking_reference.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white">Bookings</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Sync
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            {total} total booking{total !== 1 ? 's' : ''}
            {lastUpdated && (
              <span className="text-slate-500 ml-2">
                • Synced {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => load(activeStatus, false)}
          disabled={loading || isRefreshing}
          className="flex items-center justify-center gap-2 text-slate-300 hover:text-white text-sm bg-brand-charcoal hover:bg-brand-charcoal/80 border border-brand-charcoal px-4 py-2 rounded-xl transition-all disabled:opacity-60"
        >
          <RefreshCw size={14} className={loading || isRefreshing ? 'animate-spin text-brand-red' : ''} />
          <span>{loading || isRefreshing ? 'Refreshing…' : 'Refresh'}</span>
        </button>
      </div>

      {/* Realtime Alert for New Incoming Booking */}
      {newBookingAlert && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-brand-red/20 via-amber-500/10 to-transparent border border-brand-red/40 flex items-center justify-between text-sm animate-bounce-short">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center text-white flex-shrink-0 animate-pulse">
              <Bell size={16} />
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                <span>New booking received!</span>
                <span className="font-mono text-xs text-brand-red bg-brand-red/10 px-2 py-0.5 rounded border border-brand-red/30">
                  {newBookingAlert.ref}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                From <span className="font-semibold text-white">{newBookingAlert.name}</span> awaiting admin review.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => handleQuickApprove(newBookingAlert.id, newBookingAlert.ref)}
              disabled={approvingId === newBookingAlert.id}
              className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              <CheckCircle size={13} />
              <span>Approve Now</span>
            </button>
            <Link
              href={`/admin/bookings/${newBookingAlert.id}`}
              className="text-xs text-slate-300 hover:text-white bg-brand-charcoal px-3 py-1.5 rounded-lg border border-brand-charcoal transition-colors font-medium"
            >
              View
            </Link>
            <button
              onClick={() => setNewBookingAlert(null)}
              className="text-slate-400 hover:text-white p-1 ml-1"
              title="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

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

      {/* Feedback Alert */}
      {feedbackMsg && (
        <div
          className={`mb-5 p-4 rounded-xl flex items-center justify-between text-sm transition-all ${
            feedbackMsg.type === 'success'
              ? 'bg-green-500/10 border border-green-500/30 text-green-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          <div className="flex items-center gap-2 font-medium">
            {feedbackMsg.type === 'success' ? (
              <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
            ) : (
              <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
          <button
            onClick={() => setFeedbackMsg(null)}
            className="text-slate-400 hover:text-white transition-colors ml-4"
          >
            <X size={16} />
          </button>
        </div>
      )}

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
                  {['Reference', 'Client', 'Package', 'Date & Time', 'Total', 'Status', 'Actions'].map(h => (
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
                        <div className="flex items-center gap-2.5">
                          {b.status === 'pending' && (
                            <button
                              type="button"
                              onClick={() => handleQuickApprove(b.id, b.booking_reference)}
                              disabled={approvingId === b.id}
                              title="Approve booking and send confirmation email to client"
                              className="inline-flex items-center gap-1.5 bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white border border-green-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                            >
                              {approvingId === b.id ? (
                                <Loader2 size={13} className="animate-spin text-green-400" />
                              ) : (
                                <CheckCircle size={13} />
                              )}
                              <span>Approve</span>
                            </button>
                          )}
                          <Link
                            href={`/admin/bookings/${b.id}`}
                            className="text-brand-red hover:underline text-xs font-semibold whitespace-nowrap px-2 py-1"
                          >
                            View →
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(b.id, b.booking_reference)}
                            disabled={deletingId === b.id}
                            title="Delete booking permanently"
                            className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50"
                          >
                            {deletingId === b.id ? (
                              <Loader2 size={14} className="animate-spin text-red-500" />
                            ) : (
                              <Trash2 size={14} />
                            )}
                          </button>
                        </div>
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
