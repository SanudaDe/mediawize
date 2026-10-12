'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Loader2, ArrowLeft, CheckCircle, XCircle, Ban, RotateCcw,
  MessageSquare, Calendar, Clock, User, Mail, Phone, Building2,
  Mic, AlertCircle, ChevronDown, Trash2
} from 'lucide-react';
import { Booking } from '@/lib/booking-types';
import { getStatusBadge, formatDateColombo, formatTimeSlot, formatLKR } from '@/lib/booking-utils';

interface Props { id: string }

export default function AdminBookingDetailClient({ id }: Props) {
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    fetch(`/api/admin/bookings/${id}`)
      .then(r => r.json())
      .then(data => {
        setBooking(data.booking);
        setAdminNotes(data.booking?.admin_notes ?? '');
      })
      .catch(() => setError('Failed to load booking'))
      .finally(() => setLoading(false));
  }, [id]);

  const performAction = async (action: string, extra: Record<string, string> = {}) => {
    setActionLoading(action);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, admin_notes: adminNotes, ...extra }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Action failed');
      setBooking(data.booking);
      if (action === 'approve') {
        setSuccess(`Booking confirmed! The official confirmation email has been sent successfully to ${data.booking?.client_email || 'the client'}.`);
      } else if (action === 'reject') {
        setSuccess(`Booking rejected. An update email has been sent to ${data.booking?.client_email || 'the client'}.`);
      } else {
        setSuccess(`Booking ${action}d successfully.`);
      }
      setShowRejectModal(false);
      setShowRescheduleModal(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading('');
    }
  };

  const handleDeleteBooking = async () => {
    if (!booking) return;
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete booking "${booking.booking_reference}"?\n\nThis action cannot be undone and will remove it completely from the database.`
    );
    if (!confirmed) return;

    setActionLoading('delete');
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete booking');
      router.push('/admin/bookings');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete booking');
      setActionLoading('');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="animate-spin text-brand-red" size={32} />
    </div>
  );

  if (!booking) return (
    <div className="p-8 text-center text-slate-400">
      <AlertCircle size={32} className="mx-auto mb-3" />
      <p>Booking not found.</p>
    </div>
  );

  const badge = getStatusBadge(booking.status);
  const pkg = booking.studio_packages as { name?: string; price_lkr?: number; duration_hours?: number } | undefined;
  const dateDisplay = booking.requested_date
    ? formatDateColombo(new Date(booking.requested_date + 'T12:00:00+05:30'), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '—';

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black text-white">Booking Detail</h1>
            <span className="font-mono text-brand-red text-sm">{booking.booking_reference}</span>
          </div>
        </div>
        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${badge.bg} ${badge.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
          {booking.status.toUpperCase()}
        </span>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="mb-4 bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-400 text-sm flex items-center gap-2">
          <CheckCircle size={16} /> {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — booking info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Client details */}
          <div className="bg-brand-charcoal rounded-2xl border border-brand-charcoal p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><User size={16} className="text-brand-red" /> Client Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { icon: User, label: 'Name', value: booking.client_name },
                { icon: Mail, label: 'Email', value: booking.client_email },
                { icon: Phone, label: 'Phone', value: booking.client_phone },
                { icon: Building2, label: 'Company', value: booking.company_name ?? '—' },
                { icon: Mic, label: 'Show / Podcast', value: booking.show_name ?? '—' },
                { icon: User, label: 'Guests', value: `${booking.guest_count} person${booking.guest_count !== 1 ? 's' : ''}` },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <item.icon size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-slate-500 text-xs font-semibold">{item.label}</div>
                    <div className="text-slate-200">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking details */}
          <div className="bg-brand-charcoal rounded-2xl border border-brand-charcoal p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Calendar size={16} className="text-brand-red" /> Booking Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Package', value: pkg?.name ?? '—' },
                { label: 'Duration', value: pkg?.duration_hours ? `${pkg.duration_hours} hours` : '—' },
                { label: 'Date', value: dateDisplay },
                { label: 'Time', value: booking.requested_time_slot ? formatTimeSlot(booking.requested_time_slot) + ' (SLT)' : '—' },
                { label: 'Estimated Total', value: formatLKR(booking.estimated_total_lkr) },
                { label: 'Submitted', value: new Date(booking.created_at).toLocaleString('en-LK', { timeZone: 'Asia/Colombo', dateStyle: 'medium', timeStyle: 'short' }) },
              ].map(item => (
                <div key={item.label}>
                  <div className="text-slate-500 text-xs font-semibold">{item.label}</div>
                  <div className="text-slate-200 mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>
            {booking.client_notes && (
              <div className="mt-4 pt-4 border-t border-brand-dark">
                <div className="text-slate-500 text-xs font-semibold mb-1">Client Notes</div>
                <p className="text-slate-300 text-sm">{booking.client_notes}</p>
              </div>
            )}
          </div>

          {/* Admin notes */}
          <div className="bg-brand-charcoal rounded-2xl border border-brand-charcoal p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><MessageSquare size={16} className="text-brand-red" /> Admin Notes</h3>
            <textarea
              value={adminNotes}
              onChange={e => setAdminNotes(e.target.value)}
              rows={4}
              placeholder="Add internal notes about this booking…"
              className="w-full bg-brand-dark border border-brand-charcoal rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-brand-red resize-none"
            />
            <button
              onClick={() => performAction('note')}
              disabled={!!actionLoading}
              className="mt-3 text-sm bg-brand-charcoal border border-brand-charcoal hover:border-brand-red text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-all disabled:opacity-50"
            >
              {actionLoading === 'note' ? <Loader2 size={14} className="animate-spin inline mr-1" /> : null}
              Save Note
            </button>
          </div>
        </div>

        {/* Right — actions */}
        <div className="space-y-4">
          <div className="bg-brand-charcoal rounded-2xl border border-brand-charcoal p-5">
            <h3 className="text-white font-bold mb-4 text-sm">Actions</h3>
            <div className="space-y-2">
              {booking.status === 'pending' && (
                <>
                  <button
                    onClick={() => performAction('approve')}
                    disabled={!!actionLoading}
                    className="w-full flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-60"
                  >
                    {actionLoading === 'approve' ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={16} />}
                    Approve & Confirm
                  </button>
                  <button
                    onClick={() => setShowRejectModal(true)}
                    disabled={!!actionLoading}
                    className="w-full flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-60"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                </>
              )}
              {booking.status === 'confirmed' && (
                <>
                  <button
                    onClick={() => performAction('complete')}
                    disabled={!!actionLoading}
                    className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-60"
                  >
                    {actionLoading === 'complete' ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={16} />}
                    Mark Completed
                  </button>
                  <button
                    onClick={() => setShowRescheduleModal(true)}
                    disabled={!!actionLoading}
                    className="w-full flex items-center gap-2 bg-brand-charcoal border border-brand-charcoal hover:border-brand-red text-slate-300 hover:text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
                  >
                    <RotateCcw size={16} /> Reschedule
                  </button>
                </>
              )}
              {['pending', 'confirmed'].includes(booking.status) && (
                <button
                  onClick={() => performAction('cancel')}
                  disabled={!!actionLoading}
                  className="w-full flex items-center gap-2 bg-brand-charcoal border border-brand-charcoal hover:border-red-500 text-slate-400 hover:text-red-400 px-4 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
                >
                  {actionLoading === 'cancel' ? <Loader2 size={14} className="animate-spin" /> : <Ban size={16} />}
                  Cancel Booking
                </button>
              )}
              {!['pending', 'confirmed'].includes(booking.status) && (
                <p className="text-slate-500 text-xs text-center py-2">No status actions available for {booking.status} bookings.</p>
              )}

              <div className="pt-3 border-t border-brand-dark">
                <button
                  type="button"
                  onClick={handleDeleteBooking}
                  disabled={!!actionLoading}
                  className="w-full flex items-center justify-center gap-2 border border-red-500/30 hover:bg-red-500/10 text-red-400 hover:text-red-300 px-4 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-60"
                >
                  {actionLoading === 'delete' ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  Delete Booking Permanently
                </button>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-brand-charcoal rounded-2xl border border-brand-charcoal p-5">
            <h3 className="text-white font-bold mb-4 text-sm">Timeline</h3>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-slate-300">Request Submitted</div>
                  <div>{new Date(booking.created_at).toLocaleString('en-LK', { timeZone: 'Asia/Colombo', dateStyle: 'short', timeStyle: 'short' })}</div>
                </div>
              </div>
              {booking.confirmed_at && (
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-green-300">Confirmed</div>
                    <div>{new Date(booking.confirmed_at).toLocaleString('en-LK', { timeZone: 'Asia/Colombo', dateStyle: 'short', timeStyle: 'short' })}</div>
                  </div>
                </div>
              )}
              {booking.rejected_at && (
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-red-300">Rejected</div>
                    <div>{new Date(booking.rejected_at).toLocaleString('en-LK', { timeZone: 'Asia/Colombo', dateStyle: 'short', timeStyle: 'short' })}</div>
                  </div>
                </div>
              )}
              {booking.cancelled_at && (
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-300">Cancelled</div>
                    <div>{new Date(booking.cancelled_at).toLocaleString('en-LK', { timeZone: 'Asia/Colombo', dateStyle: 'short', timeStyle: 'short' })}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-brand-charcoal rounded-2xl border border-brand-charcoal p-6 w-full max-w-md">
            <h3 className="text-white font-bold text-lg mb-4">Reject Booking</h3>
            <label className="text-slate-400 text-sm block mb-2">Reason for rejection (sent to client)</label>
            <textarea
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
              rows={3}
              placeholder="e.g., Studio unavailable on this date, please resubmit for another date."
              className="w-full bg-brand-dark border border-brand-charcoal rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-brand-red resize-none mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 border border-brand-charcoal text-slate-400 hover:text-white py-3 rounded-xl text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => performAction('reject', { rejection_reason: rejectionReason })}
                disabled={!!actionLoading}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-60"
              >
                {actionLoading === 'reject' ? <Loader2 size={14} className="animate-spin inline mr-1" /> : null}
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-brand-charcoal rounded-2xl border border-brand-charcoal p-6 w-full max-w-md">
            <h3 className="text-white font-bold text-lg mb-4">Reschedule Booking</h3>
            <div className="space-y-4 mb-4">
              <div>
                <label className="text-slate-400 text-sm block mb-2">New Date</label>
                <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)}
                  className="w-full bg-brand-dark border border-brand-charcoal rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm block mb-2">New Start Time (24h, e.g. 09:00)</label>
                <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)}
                  className="w-full bg-brand-dark border border-brand-charcoal rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-red"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowRescheduleModal(false)}
                className="flex-1 border border-brand-charcoal text-slate-400 hover:text-white py-3 rounded-xl text-sm font-semibold transition-colors">
                Cancel
              </button>
              <button
                onClick={() => performAction('reschedule', { new_date: newDate, new_time: newTime })}
                disabled={!!actionLoading || !newDate || !newTime}
                className="flex-1 bg-brand-red hover:bg-brand-red-hover text-white py-3 rounded-xl text-sm font-bold transition-colors disabled:opacity-60"
              >
                {actionLoading === 'reschedule' ? <Loader2 size={14} className="animate-spin inline mr-1" /> : null}
                Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
