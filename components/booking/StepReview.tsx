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
    { label: 'Studio Location', value: '17, Kirimandala Mawatha, Nawala, Sri Lanka' },
    { label: 'Name', value: formData.client_name, step: 4 },
    { label: 'Email', value: formData.client_email, step: 4 },
    { label: 'Phone', value: formData.client_phone, step: 4 },
    ...(formData.company_name ? [{ label: 'Company', value: formData.company_name }] : []),
    ...(formData.show_name ? [{ label: 'Show', value: formData.show_name }] : []),
    ...(formData.client_notes ? [{ label: 'Notes', value: formData.client_notes }] : []),
  ];

  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">Review Your Booking</h2>
      <p className="text-slate-500 mb-8 text-sm">Please review your booking details before submitting.</p>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6 shadow-sm">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <span className="text-slate-900 font-bold">Booking Summary</span>
          <span className="text-xs text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs">
            Status: <span className="text-amber-600 font-bold">PENDING APPROVAL</span>
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <div key={i} className="flex items-start justify-between px-6 py-3.5 gap-4">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider min-w-[80px] mt-0.5">{row.label}</span>
              <span className="text-slate-800 text-sm font-semibold text-right flex-1">{row.value}</span>
              {row.step && (
                <button
                  onClick={() => onEditStep(row.step!)}
                  className="text-slate-400 hover:text-brand-red transition-colors"
                  title={`Edit ${row.label}`}
                >
                  <Edit2 size={13} />
                </button>
              )}
            </div>
          ))}
        </div>

        {selectedPackage && (
          <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-t border-slate-200">
            <span className="text-slate-700 font-bold">Estimated Total</span>
            <span className="text-slate-900 font-black text-xl">{formatLKR(selectedPackage.price_lkr)}</span>
          </div>
        )}
      </div>

      {/* Important notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-6 text-sm text-amber-900">
        <strong className="font-bold text-amber-950">⚠️ Please note:</strong> Submitting this form sends a <em>booking request</em>. Your booking is <strong>not confirmed</strong> until approved by our production team. You will receive a confirmation email.
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-6 text-red-700 text-sm font-medium">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm font-semibold disabled:opacity-50"
        >
          <ChevronLeft size={16} /> Edit Details
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-brand-red hover:bg-brand-red-hover text-white font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px] justify-center shadow-md shadow-brand-red/20"
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
