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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const inputClass = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all shadow-sm font-medium text-sm";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2";

  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">Your Details</h2>
      <p className="text-slate-500 mb-8 text-sm">Tell us a bit about yourself so we can prepare for your session.</p>

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
            className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm font-semibold"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <button
            type="submit"
            className="bg-brand-red hover:bg-brand-red-hover text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-md shadow-brand-red/20"
          >
            Review Booking →
          </button>
        </div>
      </form>
    </div>
  );
}
