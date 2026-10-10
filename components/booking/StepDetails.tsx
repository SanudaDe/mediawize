'use client';

import { ChevronLeft } from 'lucide-react';
import { BookingFormData, StudioPackage } from '@/lib/booking-types';

interface Props {
  formData: Partial<BookingFormData>;
  selectedPackage: StudioPackage | null;
  onChange: (data: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepDetails({ formData, onChange, onNext, onBack }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: name === 'guest_count' ? parseInt(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const inputClass = "w-full bg-brand-dark border border-brand-charcoal rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/30 transition-all";
  const labelClass = "block text-sm font-semibold text-slate-300 mb-2";

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Your Details</h2>
      <p className="text-slate-400 mb-8">Tell us a bit about yourself so we can prepare for your session.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Full Name <span className="text-brand-red">*</span></label>
            <input
              type="text"
              name="client_name"
              value={formData.client_name ?? ''}
              onChange={handleChange}
              required
              placeholder="John Perera"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Email Address <span className="text-brand-red">*</span></label>
            <input
              type="email"
              name="client_email"
              value={formData.client_email ?? ''}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Phone Number <span className="text-brand-red">*</span></label>
            <input
              type="tel"
              name="client_phone"
              value={formData.client_phone ?? ''}
              onChange={handleChange}
              required
              placeholder="+94 77 000 0000"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Number of Guests</label>
            <select
              name="guest_count"
              value={formData.guest_count ?? 1}
              onChange={handleChange}
              className={inputClass}
            >
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Company / Organization</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name ?? ''}
              onChange={handleChange}
              placeholder="Optional"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Podcast / Show Name</label>
            <input
              type="text"
              name="show_name"
              value={formData.show_name ?? ''}
              onChange={handleChange}
              placeholder="Optional"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Additional Notes</label>
          <textarea
            name="client_notes"
            value={formData.client_notes ?? ''}
            onChange={handleChange}
            rows={4}
            placeholder="Any special requirements, equipment needs, or questions for our team…"
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={onBack}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <button
            type="submit"
            className="bg-brand-red hover:bg-brand-red-hover text-white font-bold px-8 py-3 rounded-xl transition-colors"
          >
            Review Booking →
          </button>
        </div>
      </form>
    </div>
  );
}
