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
      <h2 className="text-2xl font-black text-slate-900 mb-1">Select Time Slot</h2>
      <p className="text-slate-500 mb-2 text-sm">
        <span className="text-brand-red font-bold">{dateDisplay}</span> · All times are Sri Lanka Time (UTC+05:30)
      </p>

      {!availability?.isOpen ? (
        <div className="mt-8 bg-slate-50 rounded-2xl p-8 text-center border border-slate-200">
          <div className="text-4xl mb-4">🚫</div>
          <h3 className="text-slate-900 font-bold text-lg mb-2">Studio Closed</h3>
          <p className="text-slate-500 text-sm mb-6">The studio is closed on this day. Please select a different date.</p>
          <button onClick={onBack} className="bg-brand-red text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-red-hover transition-colors shadow-md shadow-brand-red/20">
            Choose Another Date
          </button>
        </div>
      ) : (
        <>
          <p className="text-slate-500 text-xs mb-6">
            Studio hours: {formatLabel(availability.openTime)} – {formatLabel(availability.closeTime)}
            {' · '}
            <span className="text-green-600 font-bold">{availableSlots.length} slot{availableSlots.length !== 1 ? 's' : ''} available</span>
          </p>

          {availableSlots.length === 0 ? (
            <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-200 max-w-xl mx-auto shadow-sm">
              <div className="text-4xl mb-3">😔</div>
              <h3 className="text-slate-900 font-black text-xl mb-2">Fully Booked</h3>
              <p className="text-slate-600 text-sm mb-3 font-medium">
                All regular time slots on this date are currently taken.
              </p>
              <p className="text-slate-600 text-xs mb-6 max-w-md mx-auto">
                Need an urgent session or a custom production schedule? Call our studio team directly for manual confirmation and priority arrangements:
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="tel:+94777352700"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-brand-red/30 text-sm"
                >
                  <Phone size={16} />
                  <span>Call Us: +94 77 735 2700</span>
                </a>
                <button
                  onClick={onBack}
                  className="w-full sm:w-auto border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:text-slate-900 px-6 py-3.5 rounded-xl font-bold transition-colors text-sm"
                >
                  Choose Another Date
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {availability?.slots.map((slot: TimeSlot) => {
                const isSelected = selectedTime === slot.time;
                return (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => slot.available && onSelect(slot.time)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-brand-red bg-brand-red text-white shadow-lg shadow-brand-red/30 ring-2 ring-brand-red/20'
                        : slot.available
                        ? 'border-slate-200 bg-white text-slate-900 hover:border-brand-red hover:shadow-md shadow-xs'
                        : 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-black text-sm tracking-tight flex items-center gap-2">
                        <Clock size={15} className={isSelected ? 'text-white' : slot.available ? 'text-brand-red' : 'text-slate-300'} />
                        {slot.label}
                      </span>
                      {slot.available && (
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          2 Hours
                        </span>
                      )}
                    </div>
                    <span className={`text-xs ${isSelected ? 'text-white/80' : slot.available ? 'text-slate-500' : 'text-slate-400'}`}>
                      {slot.available ? 'Studio recording session' : 'Booked'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {selectedTime && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => onSelect(selectedTime)}
                className="bg-brand-red hover:bg-brand-red-hover text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-md shadow-brand-red/20 flex items-center gap-2 text-sm"
              >
                <span>Continue with {selectedSlotLabel(availability?.slots, selectedTime)}</span>
                <span>→</span>
              </button>
            </div>
          )}
        </>
      )}

      <div className="mt-8 flex items-center gap-4 text-xs text-slate-500 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-white border border-slate-300 shadow-sm" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-slate-100 border border-slate-200" /> Unavailable
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-brand-red" /> Selected
        </span>
      </div>

      <div className="mt-6">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm font-semibold">
          <ChevronLeft size={16} /> Back to date selection
        </button>
      </div>
    </div>
  );
}

function formatLabel(time: string): string {
  if (!time) return '';
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

function selectedSlotLabel(slots?: TimeSlot[], time?: string): string {
  if (!slots || !time) return '';
  const match = slots.find(s => s.time === time);
  return match?.label || formatLabel(time);
}
