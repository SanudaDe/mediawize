'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  Check,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Phone,
  Mail,
  User,
  Building,
  Mic,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { STUDIO_PACKAGES_DATA, SUBSCRIPTION_PACKAGES_DATA } from '@/lib/data';
import { bookingFormSchema } from '@/lib/validations';

const TIME_SLOTS = [
  '09:00 AM - 11:00 AM (Morning Slot 1)',
  '11:30 AM - 01:30 PM (Morning Slot 2)',
  '02:00 PM - 04:00 PM (Afternoon Slot 1)',
  '04:30 PM - 06:30 PM (Evening Prime Slot)',
  '07:00 PM - 09:00 PM (Night Creator Slot)',
];

const ADD_ONS = [
  { id: 'addon-shorts', name: '3x Viral Shorts / Reels', priceNum: 15000, priceLKR: 'LKR 15,000' },
  { id: 'addon-teleprompter', name: 'Studio Teleprompter Setup', priceNum: 7500, priceLKR: 'LKR 7,500' },
  { id: 'addon-thumb', name: 'High-CTR YouTube Thumbnail', priceNum: 5000, priceLKR: 'LKR 5,000' },
  { id: 'addon-rush', name: '24-Hour Express Turnaround', priceNum: 12000, priceLKR: 'LKR 12,000' },
];

export const BookingForm: React.FC = () => {
  const searchParams = useSearchParams();
  const preSelectedPkg = searchParams.get('package');
  const preSelectedSub = searchParams.get('subscription');

  const [bookingType, setBookingType] = useState<'package' | 'subscription' | 'custom'>(
    preSelectedSub ? 'subscription' : 'package'
  );
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    preSelectedPkg || STUDIO_PACKAGES_DATA[2].slug
  );
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string>(
    preSelectedSub || SUBSCRIPTION_PACKAGES_DATA[2].slug
  );
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [showName, setShowName] = useState('');
  const [requestedDate, setRequestedDate] = useState('');
  const [requestedTimeSlot, setRequestedTimeSlot] = useState(TIME_SLOTS[0]);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [clientNotes, setClientNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (preSelectedPkg) {
      setBookingType('package');
      setSelectedPackageId(preSelectedPkg);
    } else if (preSelectedSub) {
      setBookingType('subscription');
      setSelectedSubscriptionId(preSelectedSub);
    }
  }, [preSelectedPkg, preSelectedSub]);

  const calculateTotal = () => {
    let basePrice = 0;
    if (bookingType === 'package') {
      const pkg = STUDIO_PACKAGES_DATA.find((p) => p.slug === selectedPackageId);
      basePrice = pkg ? pkg.priceNum : 0;
    } else if (bookingType === 'subscription') {
      const sub = SUBSCRIPTION_PACKAGES_DATA.find((s) => s.slug === selectedSubscriptionId);
      basePrice = sub ? sub.monthlyFeeNum : 0;
    }

    const addOnsTotal = selectedAddOns.reduce((acc, addOnId) => {
      const addon = ADD_ONS.find((a) => a.id === addOnId);
      return acc + (addon ? addon.priceNum : 0);
    }, 0);

    return basePrice + addOnsTotal;
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formatLKR = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(amount).replace('LKR', 'LKR ');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setErrors({});

    const formData = {
      client_name: clientName,
      client_email: clientEmail,
      client_phone: clientPhone,
      company_name: companyName,
      show_name: showName,
      booking_type: bookingType,
      package_id: bookingType === 'package' ? selectedPackageId : undefined,
      subscription_id: bookingType === 'subscription' ? selectedSubscriptionId : undefined,
      requested_date: requestedDate,
      requested_time_slot: requestedTimeSlot,
      guest_count: Number(guestCount),
      add_ons: selectedAddOns,
      client_notes: clientNotes,
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
        body: JSON.stringify({
          ...formData,
          estimated_total_lkr: calculateTotal(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit booking request');
      }

      setBookingRef(data.bookingReference || `WT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
      setSubmitSuccess(true);
    } catch (err: any) {
      setApiError(err.message || 'An unexpected error occurred. Please try again or chat with us on WhatsApp.');
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
          Booking Request Received
        </span>
        <h3 className="text-2xl font-black text-slate-900 mb-2">You&apos;re Ready to Record!</h3>
        <p className="text-slate-600 text-xs max-w-md mx-auto mb-6">
          Thank you, <strong className="text-slate-900">{clientName}</strong>. Your studio reservation request has been logged under reference:
        </p>

        <div className="inline-block px-5 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-brand-red font-mono text-base font-black tracking-widest mb-6">
          {bookingRef}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/94771234567?text=Hi%20WizeTV%2C%20I%20just%20submitted%20booking%20reference%20${bookingRef}%20for%20${encodeURIComponent(requestedDate)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
          >
            <Phone className="w-4 h-4" />
            Fast-Track on WhatsApp
          </a>

          <button
            onClick={() => {
              setSubmitSuccess(false);
              setClientNotes('');
            }}
            className="px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider"
          >
            Submit Another Booking
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

      {/* 1. Select Model */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
          1. Select Booking Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setBookingType('package')}
            className={`p-3.5 rounded-xl text-left border text-xs transition-all ${
              bookingType === 'package'
                ? 'bg-brand-red text-white border-brand-red shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="font-bold mb-0.5">Studio Session (Hourly)</div>
            <div className={`text-[11px] ${bookingType === 'package' ? 'text-white/80' : 'text-slate-400'}`}>
              Single session studio recording (18.5k - 50k LKR)
            </div>
          </button>

          <button
            type="button"
            onClick={() => setBookingType('subscription')}
            className={`p-3.5 rounded-xl text-left border text-xs transition-all ${
              bookingType === 'subscription'
                ? 'bg-brand-red text-white border-brand-red shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="font-bold mb-0.5">Monthly Subscription</div>
            <div className={`text-[11px] ${bookingType === 'subscription' ? 'text-white/80' : 'text-slate-400'}`}>
              Monthly allocations (Basic, Bronze, Silver, Gold)
            </div>
          </button>
        </div>
      </div>

      {/* 2. Choose Tier */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
          2. Choose Package / Tier
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {bookingType === 'package'
            ? STUDIO_PACKAGES_DATA.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackageId(pkg.slug)}
                  className={`p-3 rounded-xl text-left border text-xs transition-all flex flex-col justify-between ${
                    selectedPackageId === pkg.slug
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-bold block mb-1">{pkg.name}</span>
                  <span className="text-brand-red font-black">{pkg.priceLKR}</span>
                </button>
              ))
            : SUBSCRIPTION_PACKAGES_DATA.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubscriptionId(sub.slug)}
                  className={`p-3 rounded-xl text-left border text-xs transition-all flex flex-col justify-between ${
                    selectedSubscriptionId === sub.slug
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-bold block mb-1">{sub.name}</span>
                  <span className="text-brand-red font-black">{sub.monthlyFeeLKR}/mo</span>
                </button>
              ))}
        </div>
      </div>

      {/* 3. Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Preferred Date *
          </label>
          <input
            type="date"
            value={requestedDate}
            onChange={(e) => setRequestedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-red"
          />
          {errors.requested_date && (
            <p className="text-[11px] text-red-500 mt-1">{errors.requested_date}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Preferred Time Slot *
          </label>
          <select
            value={requestedTimeSlot}
            onChange={(e) => setRequestedTimeSlot(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-red"
          >
            {TIME_SLOTS.map((slot, i) => (
              <option key={i} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Client Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            placeholder="Full Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-red"
          />
          {errors.client_name && (
            <p className="text-[11px] text-red-500 mt-1">{errors.client_name}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="name@email.com"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-red"
          />
          {errors.client_email && (
            <p className="text-[11px] text-red-500 mt-1">{errors.client_email}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            WhatsApp / Phone Number *
          </label>
          <input
            type="tel"
            placeholder="+94 77 123 4567"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-red"
          />
          {errors.client_phone && (
            <p className="text-[11px] text-red-500 mt-1">{errors.client_phone}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Show / Brand Name (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Founder Talks"
            value={showName}
            onChange={(e) => setShowName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-red"
          />
        </div>
      </div>

      {/* 5. Add-Ons */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
          Optional Add-Ons
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ADD_ONS.map((addon) => {
            const isChecked = selectedAddOns.includes(addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => toggleAddOn(addon.id)}
                className={`p-2.5 rounded-lg border text-left text-xs flex items-center justify-between transition-all ${
                  isChecked
                    ? 'bg-brand-red/10 border-brand-red text-slate-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{addon.name}</span>
                <span className="text-brand-red font-bold">+{addon.priceLKR}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Bar */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Estimated Total:
          </span>
          <span className="text-xl font-black text-slate-900">
            {formatLKR(calculateTotal())}
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white font-black text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-red-glow disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Studio Booking'}
        </button>
      </div>
    </form>
  );
};
