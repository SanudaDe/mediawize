'use client';

import { useCallback } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ChevronLeft, Info } from 'lucide-react';
import { getTodayColombo, formatDateColombo } from '@/lib/booking-utils';

interface Props {
  selectedDate?: string;
  packageId?: string;
  onSelect: (date: string) => void;
  onBack: () => void;
}

export default function StepDate({ selectedDate, onSelect, onBack }: Props) {
  const todayStr = getTodayColombo();
  const todayDate = new Date(todayStr + 'T12:00:00+05:30');
  const maxDate = new Date(todayDate.getTime() + 60 * 24 * 60 * 60 * 1000);

  const selectedDay = selectedDate
    ? new Date(selectedDate + 'T12:00:00+05:30')
    : undefined;

  const handleSelect = useCallback((day: Date | undefined) => {
    if (!day) return;
    // Format to YYYY-MM-DD in Colombo time
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Colombo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(day);
    const y = parts.find(p => p.type === 'year')?.value ?? '';
    const m = parts.find(p => p.type === 'month')?.value ?? '';
    const d = parts.find(p => p.type === 'day')?.value ?? '';
    onSelect(`${y}-${m}-${d}`);
  }, [onSelect]);

  const modifiers = {
    selected: selectedDay,
    today: todayDate,
  };

  const modifiersClassNames = {
    selected: 'rdp-day_selected',
    today: 'rdp-day_today',
  };

  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">Select Recording Date</h2>
      <p className="text-slate-500 mb-8 text-sm">Choose your preferred studio recording date. Bookings require at least 24 hours advance notice.</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar */}
        <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <style>{`
            .rdp {
              --rdp-cell-size: 44px;
              --rdp-accent-color: #EC2328;
              --rdp-background-color: rgba(236, 35, 40, 0.1);
              margin: 0;
            }
            .rdp-months { justify-content: center; }
            .rdp-caption { color: #0F172A; margin-bottom: 8px; }
            .rdp-caption_label { font-weight: 800; font-size: 16px; color: #0F172A; }
            .rdp-nav_button { color: #64748B; }
            .rdp-nav_button:hover { color: #EC2328; background: rgba(236,35,40,0.1); border-radius: 8px; }
            .rdp-head_cell { color: #94A3B8; font-weight: 700; font-size: 12px; text-transform: uppercase; }
            .rdp-day { color: #1E293B; font-weight: 600; border-radius: 10px; }
            .rdp-day:hover:not([disabled]):not(.rdp-day_selected) { background: rgba(236,35,40,0.08); color: #EC2328; }
            .rdp-day_selected { background: #EC2328 !important; color: #fff !important; font-weight: 700; box-shadow: 0 4px 12px rgba(236,35,40,0.3); }
            .rdp-day_today:not(.rdp-day_selected) { border: 2px solid #EC2328; color: #EC2328; font-weight: 700; }
            .rdp-day_disabled { color: #CBD5E1 !important; cursor: not-allowed; }
            .rdp-day_outside { color: #E2E8F0 !important; }
          `}</style>

          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={handleSelect}
            disabled={[
              { before: new Date(todayStr + 'T00:00:00+05:30') },
              { after: maxDate },
            ]}
            startMonth={todayDate}
            endMonth={maxDate}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
          />
        </div>

        {/* Date details */}
        <div className="lg:w-72 flex flex-col gap-4">
          {selectedDate ? (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center mb-4">
                <span className="text-brand-red text-xl">📅</span>
              </div>
              <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">Selected Date</p>
              <p className="text-slate-900 font-bold text-lg leading-snug">
                {formatDateColombo(new Date(selectedDate + 'T12:00:00+05:30'), {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p className="text-slate-500 text-xs mt-2">Sri Lanka Time (UTC+05:30)</p>

              <button
                onClick={() => onSelect(selectedDate)}
                className="mt-6 w-full bg-brand-red hover:bg-brand-red-hover text-white font-bold py-3 rounded-xl transition-colors shadow-md shadow-brand-red/20"
              >
                Continue with this date →
              </button>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
              <div className="text-4xl mb-3">📅</div>
              <p className="text-slate-500 text-sm font-medium">Select a date from the calendar to continue.</p>
            </div>
          )}

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex gap-3">
            <Info size={16} className="text-brand-red flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-900 text-xs font-bold mb-1">Studio Availability</p>
              <p className="text-slate-600 text-xs font-medium">Monday – Sunday: 8:00 AM – 9:00 PM</p>
              <p className="text-slate-400 text-xs mt-0.5 font-medium">Open 7 days a week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="mt-8">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm font-semibold">
          <ChevronLeft size={16} /> Back to packages
        </button>
      </div>
    </div>
  );
}
