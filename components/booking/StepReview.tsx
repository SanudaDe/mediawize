'use client';

import { useState } from 'react';
import { ChevronLeft, Edit2, Loader2, AlertCircle } from 'lucide-react';
import { BookingFormData, StudioPackage } from '@/lib/booking-types';
import { formatDateColombo, formatLKR, formatTimeSlot } from '@/lib/booking-utils';

interface Props {
  formData: BookingFormData;
  selectedPackage: StudioPackage | null;
  onSubmit: () => Promise<void>;
  onBack: () => void;
  onEditStep: (step: number) => void;
}

export default function StepReview({ formData, selectedPackage, onSubmit, onBack, onEditStep }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      await onSubmit();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const dateDisplay = formData.requested_date
    ? formatDateColombo(new Date(formData.requested_date + 'T12:00:00+05:30'), {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    : '—';

  const rows: { label: string; value: string; step?: number }[] = [
    { label: 'Package', value: selectedPackage?.name ?? 'Selected Package', step: 1 },
    { label: 'Duration', value: selectedPackage ? `${selectedPackage.duration_hours} hours` : '—' },
    { label: 'Date', value: dateDisplay, step: 2 },
    { label: 'Time', value: formData.requested_time_slot ? formatTimeSlot(formData.requested_time_slot) + ' (Sri Lanka Time)' : '—', step: 3 },
    { label: 'Name', value: formData.client_name, step: 4 },
    { label: 'Email', value: formData.client_email, step: 4 },
    { label: 'Phone', value: formData.client_phone, step: 4 },
    { label: 'Guests', value: `${formData.guest_count} ${formData.guest_count === 1 ? 'person' : 'people'}` },
    ...(formData.company_name ? [{ label: 'Company', value: formData.company_name }] : []),
    ...(formData.show_name ? [{ label: 'Show', value: formData.show_name }] : []),
    ...(formData.client_notes ? [{ label: 'Notes', value: formData.client_notes }] : []),
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Review Your Booking</h2>
      <p className="text-slate-400 mb-8">Please review your booking details before submitting.</p>

      <div className="bg-brand-charcoal rounded-2xl border border-brand-charcoal overflow-hidden mb-6">
        <div className="bg-brand-red/10 border-b border-brand-charcoal px-6 py-4 flex items-center justify-between">
          <span className="text-white font-bold">Booking Summary</span>
          <span className="text-xs text-slate-400 bg-brand-dark px-3 py-1 rounded-full border border-brand-charcoal">
            Status: <span className="text-amber-400 font-semibold">PENDING APPROVAL</span>
          </span>
        </div>

        <div className="divide-y divide-brand-dark/50">
          {rows.map((row, i) => (
            <div key={i} className="flex items-start justify-between px-6 py-3 gap-4">
              <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider min-w-[80px]">{row.label}</span>
              <span className="text-slate-200 text-sm text-right flex-1">{row.value}</span>
              {row.step && (
                <button
                  onClick={() => onEditStep(row.step!)}
                  className="text-slate-600 hover:text-brand-red transition-colors"
                  title={`Edit ${row.label}`}
                >
                  <Edit2 size={13} />
                </button>
              )}
            </div>
          ))}
        </div>

        {selectedPackage && (
          <div className="bg-brand-dark/50 px-6 py-4 flex items-center justify-between border-t border-brand-charcoal">
            <span className="text-slate-300 font-semibold">Estimated Total</span>
            <span className="text-white font-bold text-xl">{formatLKR(selectedPackage.price_lkr)}</span>
          </div>
        )}
      </div>

      {/* Important notice */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-5 py-4 mb-6 text-sm text-amber-300">
        <strong className="font-semibold">⚠️ Please note:</strong> Submitting this form sends a <em>booking request</em>. Your booking is <strong>not confirmed</strong> until approved by our production team. You will receive a confirmation email.
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4 mb-6 text-red-400 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
        >
          <ChevronLeft size={16} /> Edit Details
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-brand-red hover:bg-brand-red-hover text-white font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px] justify-center"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Submitting…
            </>
          ) : (
            '🎙️ Submit Booking Request'
          )}
        </button>
      </div>
    </div>
  );
}
