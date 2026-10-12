'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import {
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  X,
  RefreshCw,
  Bell,
} from 'lucide-react';
import { Booking } from '@/lib/booking-types';
import { getStatusBadge, formatDateColombo, formatTimeSlot } from '@/lib/booking-utils';
import { getSupabaseClient } from '@/lib/supabaseClient';
import Link from 'next/link';

interface Stats {
  total: number;
  pending: number;
  confirmed: number;
  rejected: number;
  cancelled: number;
}

export default function AdminDashboardClient() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newBookingAlert, setNewBookingAlert] = useState<{ name: string; ref: string; id: string } | null>(null);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, confirmed: 0, rejected: 0, cancelled: 0 });
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const seenIdsRef = useRef<Set<string>>(new Set());
  const isFirstLoadRef = useRef(true);

  const load = useCallback(async (silent = false) => {
    if (!silent) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }

    try {
      const res = await fetch(`/api/admin/bookings?limit=100&_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
      });
      const data = await res.json();
      const all: Booking[] = data.bookings ?? [];

      // Detect newly arrived booking during background update
      if (!isFirstLoadRef.current && seenIdsRef.current.size > 0) {
        const brandNew = all.filter(b => !seenIdsRef.current.has(b.id));
        if (brandNew.length > 0) {
          const newest = brandNew[0];
          setNewBookingAlert({
            name: newest.client_name,
            ref: newest.booking_reference,
            id: newest.id,
          });
        }
      }

      seenIdsRef.current = new Set(all.map(b => b.id));
      isFirstLoadRef.current = false;

      setBookings(all.slice(0, 8)); // top 8 recent bookings
      setStats({
        total: data.total ?? all.length,
        pending: all.filter(b => b.status === 'pending').length,
        confirmed: all.filter(b => b.status === 'confirmed').length,
        rejected: all.filter(b => b.status === 'rejected').length,
        cancelled: all.filter(b => b.status === 'cancelled').length,
      });
      setLastUpdated(new Date());
    } catch (err) {
      console.error('[AdminDashboard] load error:', err);
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
      setStats(prev => ({
        ...prev,
        pending: Math.max(0, prev.pending - 1),
        confirmed: prev.confirmed + 1,
      }));
      setFeedbackMsg({
        type: 'success',
        text: `Booking ${ref} confirmed successfully! The client has been notified via email.`,
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

  // Initial load
  useEffect(() => {
    load(false);
  }, [load]);

  // Periodic polling interval + window focus + visibility
  useEffect(() => {
    const interval = setInterval(() => {
      load(true);
    }, 8000);

    const handleFocusOrVisible = () => {
      if (document.visibilityState === 'visible') {
        load(true);
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

  // Supabase Realtime channel subscription
  useEffect(() => {
    try {
      const supabase = getSupabaseClient();
      const channel = supabase
        .channel('admin_dashboard_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'bookings' },
          payload => {
            console.log('[AdminDashboard] Realtime change detected:', payload.eventType);
            load(true);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err) {
      console.warn('[AdminDashboard] Supabase Realtime not available:', err);
    }
  }, [load]);

  const statCards = [
    { label: 'Total Bookings', value: stats.total, icon: BookOpen, color: 'text-white', bg: 'bg-brand-red/10' },
    { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white">Dashboard</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Sync
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Overview of all studio bookings
            {lastUpdated && (
              <span className="text-slate-500 ml-2">
                • Synced {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => load(false)}
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

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(card => (
          <div key={card.label} className="bg-brand-charcoal rounded-2xl p-5 border border-brand-charcoal">
            <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
              <card.icon size={20} className={card.color} />
            </div>
            <div className="text-2xl font-black text-white">{card.value}</div>
            <div className="text-xs text-slate-500 font-semibold mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Feedback Alert */}
      {feedbackMsg && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center justify-between text-sm transition-all ${
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

      {/* Recent bookings */}
      <div className="bg-brand-charcoal rounded-2xl border border-brand-charcoal overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-dark flex items-center justify-between">
          <h2 className="text-white font-bold">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-brand-red hover:underline text-sm font-semibold">View all →</Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="animate-spin text-brand-red" size={24} />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <AlertCircle size={32} className="mx-auto mb-3 text-slate-600" />
            <p>No bookings yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-brand-dark">
            {bookings.map(b => {
              const badge = getStatusBadge(b.status);
              return (
                <div key={b.id} className="px-6 py-4 flex items-center gap-4 hover:bg-brand-dark/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white font-semibold text-sm truncate">{b.client_name}</span>
                      <span className="text-slate-500 text-xs font-mono">#{b.booking_reference}</span>
                    </div>
                    <div className="text-slate-500 text-xs">
                      {b.requested_date ? formatDateColombo(new Date(b.requested_date + 'T12:00:00+05:30'), { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                      {' · '}
                      {b.requested_time_slot ? formatTimeSlot(b.requested_time_slot) : ''}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${badge.bg} ${badge.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                    {b.status.toUpperCase()}
                  </div>
                  <div className="flex items-center gap-2.5">
                    {b.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => handleQuickApprove(b.id, b.booking_reference)}
                        disabled={approvingId === b.id}
                        title="Approve booking and notify client"
                        className="inline-flex items-center gap-1.5 bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white border border-green-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                      >
                        {approvingId === b.id ? (
                          <Loader2 size={12} className="animate-spin text-green-400" />
                        ) : (
                          <CheckCircle size={12} />
                        )}
                        <span>Approve</span>
                      </button>
                    )}
                    <Link
                      href={`/admin/bookings/${b.id}`}
                      className="text-slate-400 hover:text-brand-red transition-colors text-xs font-semibold px-1 py-1"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
