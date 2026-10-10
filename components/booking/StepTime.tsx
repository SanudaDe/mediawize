'use client';

import { useEffect, useState } from 'react';
import { Clock, ChevronLeft, Loader2, AlertCircle, Phone } from 'lucide-react';
import { AvailabilityResponse, TimeSlot } from '@/lib/booking-types';
import { formatDateColombo } from '@/lib/booking-utils';

interface Props {
  selectedDate: string;
  packageId: string;
  selectedTime?: string;
  onSelect: (time: string) => void;
  onBack: () => void;
}

export default function StepTime({ selectedDate, packageId, selectedTime, onSelect, onBack }: Props) {
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedDate || !packageId) return;
    setLoading(true);
    setError('');
    fetch(`/api/bookings/availability?date=${selectedDate}&package_id=${packageId}`)
      .then(r => r.json())
      .then(data => setAvailability(data))
      .catch(() => setError('Could not load availability. Please try again.'))
      .finally(() => setLoading(false));
  }, [selectedDate, packageId]);

  const dateDisplay = formatDateColombo(new Date(selectedDate + 'T12:00:00+05:30'), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Loader2 className="animate-spin text-brand-red" size={32} />
        <p className="text-slate-400 text-sm">Checking availability for {dateDisplay}…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="text-red-400 mx-auto mb-3" size={32} />
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={onBack} className="text-brand-red hover:underline text-sm">← Go back</button>
      </div>
    );
  }

  const availableSlots = availability?.slots.filter(s => s.available) ?? [];
  const unavailableSlots = availability?.slots.filter(s => !s.available) ?? [];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Select Time Slot</h2>
      <p className="text-slate-400 mb-2 text-sm">
        <span className="text-brand-red font-semibold">{dateDisplay}</span> · All times are Sri Lanka Time (UTC+05:30)
      </p>

      {!availability?.isOpen ? (
        <div className="mt-8 bg-brand-charcoal rounded-2xl p-8 text-center border border-brand-charcoal">
          <div className="text-4xl mb-4">🚫</div>
          <h3 className="text-white font-bold text-lg mb-2">Studio Closed</h3>
          <p className="text-slate-400 text-sm mb-6">The studio is closed on this day. Please select a different date.</p>
          <button onClick={onBack} className="bg-brand-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-red-hover transition-colors">
            Choose Another Date
          </button>
        </div>
      ) : (
        <>
          <p className="text-slate-500 text-xs mb-6">
            Studio hours: {formatLabel(availability.openTime)} – {formatLabel(availability.closeTime)}
            {' · '}
            <span className="text-green-400">{availableSlots.length} slot{availableSlots.length !== 1 ? 's' : ''} available</span>
          </p>

          {availableSlots.length === 0 ? (
            <div className="bg-brand-charcoal rounded-2xl p-8 text-center border border-brand-charcoal max-w-xl mx-auto">
              <div className="text-4xl mb-3">😔</div>
              <h3 className="text-white font-bold text-xl mb-2">Fully Booked</h3>
              <p className="text-slate-400 text-sm mb-3">
                All regular time slots on this date are currently taken.
              </p>
              <p className="text-slate-300 text-xs mb-6 max-w-md mx-auto">
                Need an urgent session or a custom production schedule? Call our studio team directly for manual confirmation and priority arrangements:
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="tel:+94777352700"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-red-glow text-sm"
                >
                  <Phone size={16} />
                  <span>Call Us: +94 77 735 2700</span>
                </a>
                <button
                  onClick={onBack}
                  className="w-full sm:w-auto border border-brand-charcoal hover:border-slate-500 text-slate-300 hover:text-white px-6 py-3.5 rounded-xl font-semibold transition-colors text-sm"
                >
                  Choose Another Date
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {availability?.slots.map((slot: TimeSlot) => {
                const isSelected = selectedTime === slot.time;
                return (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => slot.available && onSelect(slot.time)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${
                      isSelected
                        ? 'border-brand-red bg-brand-red text-white shadow-red-glow'
                        : slot.available
                        ? 'border-brand-charcoal bg-brand-charcoal text-slate-200 hover:border-brand-red/50 hover:text-white hover:shadow-card-hover'
                        : 'border-brand-charcoal/30 bg-brand-charcoal/20 text-slate-600 cursor-not-allowed line-through'
                    }`}
                  >
                    <Clock size={14} className={isSelected ? 'text-white' : slot.available ? 'text-brand-red' : 'text-slate-600'} />
                    <span>{slot.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {selectedTime && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => onSelect(selectedTime)}
                className="bg-brand-red hover:bg-brand-red-hover text-white font-bold px-8 py-3 rounded-xl transition-colors"
              >
                Continue with {formatLabel(selectedTime)} →
              </button>
            </div>
          )}
        </>
      )}

      <div className="mt-8 flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-brand-red" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-brand-charcoal/30 border border-brand-charcoal/30" /> Unavailable
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-brand-red border-2 border-white" /> Selected
        </span>
      </div>

      <div className="mt-6">
        <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
          <ChevronLeft size={16} /> Back to date selection
        </button>
      </div>
    </div>
  );
}

function formatLabel(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}
