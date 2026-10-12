'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  User,
  Building,
  Calendar,
  Clock,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { bookingFormSchema } from '@/lib/validations';

const INTEREST_OPTIONS = [
  { id: 'dual-host-video-podcast', label: 'Dual Host Video Podcast (LKR 55,000 / 2 Hrs)' },
  { id: 'solo-video-podcast', label: 'Solo Video Podcast (LKR 40,000 / 2 Hrs)' },
  { id: 'audio-only-podcast', label: 'Audio Only Podcast (LKR 18,500 / 2 Hrs)' },
  { id: 'custom-premium-experience', label: 'Custom Premium Experience / Quotation' },
  { id: 'subscription', label: 'Monthly Creator Subscription' },
  { id: 'corporate-production', label: 'Corporate Video / Commercial Production' },
  { id: 'general-inquiry', label: 'General Studio Booking / Visit Inquiry' },
];

const TIME_PREFERENCES = [
  'Flexible / Any Available Slot',
  'Morning (09:00 AM - 01:00 PM)',
  'Afternoon (01:00 PM - 05:00 PM)',
  'Evening (05:00 PM - 09:00 PM)',
];

export const BookingForm: React.FC = () => {
  const searchParams = useSearchParams();
  const preSelectedPkg = searchParams.get('package');
  const preSelectedSub = searchParams.get('subscription');
  const preSelectedService = searchParams.get('service');

  const [selectedInterest, setSelectedInterest] = useState<string>(() => {
    if (preSelectedPkg) return preSelectedPkg;
    if (preSelectedSub) return 'subscription';
    if (preSelectedService) return preSelectedService;
    return 'dual-host-video-podcast';
  });

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [requestedDate, setRequestedDate] = useState('');
  const [preferredTime, setPreferredTime] = useState(TIME_PREFERENCES[0]);
  const [clientNotes, setClientNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (preSelectedPkg) {
      setSelectedInterest(preSelectedPkg);
    } else if (preSelectedSub) {
      setSelectedInterest('subscription');
    } else if (preSelectedService) {
      setSelectedInterest(preSelectedService);
    }
  }, [preSelectedPkg, preSelectedSub, preSelectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setErrors({});

    const formData = {
      client_name: clientName,
      client_email: clientEmail,
      client_phone: clientPhone,
      company_name: companyName || undefined,
      service_interest: selectedInterest,
      requested_date: requestedDate || undefined,
      requested_time_slot: preferredTime,
      client_notes: clientNotes,
      booking_type: 'inquiry',
    };

    const validation = bookingFormSchema.safeParse(formData);

    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          formattedErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(formattedErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit inquiry');
      }

      setBookingRef(data.bookingReference || `WT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
      setSubmitSuccess(true);
    } catch (err: any) {
      setApiError(err.message || 'An unexpected error occurred. Please try again or message us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="w-full text-center py-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>

        <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-1 block">
          Inquiry Received Successfully
        </span>
        <h3 className="text-2xl font-black text-slate-900 mb-2">
          We&apos;ll Contact You Shortly!
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
          Thank you, <strong className="text-slate-900">{clientName}</strong>. Your studio booking inquiry reference is:
        </p>

        <div className="inline-block px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-brand-red font-mono text-base font-black tracking-widest mb-6">
          {bookingRef}
        </div>

        <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
          Our studio coordinator will get in touch with you directly via WhatsApp or phone to confirm slot availability and coordinate your session.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/94771234567?text=Hi%20WIZEtv%2C%20I%20just%20submitted%20a%20studio%20inquiry%20(Ref%3A%20${bookingRef})`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Phone className="w-4 h-4" />
            Fast-Track on WhatsApp
          </a>

          <button
            onClick={() => {
              setSubmitSuccess(false);
              setClientNotes('');
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {apiError && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      {/* 1. What are you interested in */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
          1. Interested Package / Service
        </label>
        <select
          value={selectedInterest}
          onChange={(e) => setSelectedInterest(e.target.value)}
          className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-red shadow-sm"
        >
          {INTEREST_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Contact Details */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
          2. Your Contact Details
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Your Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Full Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-red"
              />
            </div>
            {errors.client_name && (
              <p className="text-[11px] text-red-500 mt-1">{errors.client_name}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              WhatsApp / Phone Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                placeholder="+94 77 123 4567"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-red"
              />
            </div>
            {errors.client_phone && (
              <p className="text-[11px] text-red-500 mt-1">{errors.client_phone}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                placeholder="name@email.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-red"
              />
            </div>
            {errors.client_email && (
              <p className="text-[11px] text-red-500 mt-1">{errors.client_email}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Show / Company Name (Optional)
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="e.g. Founder Talks / Acme Corp"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Preferred Schedule */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
          3. Preferred Date & Time (Optional)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Preferred Date
            </label>
            <input
              type="date"
              value={requestedDate}
              onChange={(e) => setRequestedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-red"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Time of Day
            </label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-red"
            >
              {TIME_PREFERENCES.map((slot, i) => (
                <option key={i} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 4. Project Details / Message */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
          4. Tell Us About Your Project / Session *
        </label>
        <textarea
          rows={4}
          placeholder="Describe your podcast concept, number of speakers/guests, or any specific requirements..."
          value={clientNotes}
          onChange={(e) => setClientNotes(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-red"
        />
        {errors.client_notes && (
          <p className="text-[11px] text-red-500 mt-1">{errors.client_notes}</p>
        )}
      </div>

      {/* Submit Button & Direct Contact Notice */}
      <div className="pt-4 border-t border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>No online payment required</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Our studio coordinator contacts you to confirm scheduling.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-red-glow disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Sending Inquiry...' : 'Contact Us to Book'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* WhatsApp Fast-Track Bar */}
        <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="text-xs font-bold text-slate-800 block">
              Need immediate availability?
            </span>
            <span className="text-[11px] text-slate-500">
              Chat directly with our studio coordinator on WhatsApp.
            </span>
          </div>
          <a
            href="https://wa.me/94771234567?text=Hi%20WIZEtv%2C%20I%20would%20like%20to%20inquire%20about%20booking%20the%20studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </form>
  );
};
