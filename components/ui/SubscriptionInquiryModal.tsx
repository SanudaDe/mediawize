'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Calendar,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { SubscriptionPackageItem, StudioPackageItem } from '@/lib/data';

export type InquiryTargetPackage = SubscriptionPackageItem | StudioPackageItem;

interface SubscriptionInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: InquiryTargetPackage | null;
}

export const SubscriptionInquiryModal: React.FC<SubscriptionInquiryModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
}) => {
  const [userName, setUserName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [mailBody, setMailBody] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Check if this inquiry is for a Custom Quotation vs a recurring subscription
  const isCustomQuotation = Boolean(
    !selectedPackage ||
    selectedPackage.slug === 'custom-premium-experience' ||
    ('priceLKR' in selectedPackage &&
      (selectedPackage.priceLKR.toLowerCase().includes('custom') || selectedPackage.priceNum === 0))
  );

  // Reset or initialize form whenever modal opens with a new package
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccess(false);

      if (isCustomQuotation) {
        setMailBody(
          `Hello WIZEtv Studios team,\n\nI would like to request a custom quotation for the Custom Premium Experience production package.\n\nProject Scope & Requirements:\n- Type of show / production:\n- Expected number of hosts / guests:\n- Preferred dates or recording schedule:\n- Any specific camera, lighting, teleprompter, or live-streaming requirements:\n\nPlease contact us with an initial quotation.`
        );
      } else if (selectedPackage) {
        const fee = 'monthlyFeeLKR' in selectedPackage ? selectedPackage.monthlyFeeLKR : selectedPackage.priceLKR;
        setMailBody(
          `Hello WIZEtv Studios team,\n\nI would like to inquire about the ${selectedPackage.name} monthly subscription package (${fee}/month).\n\nPlease let us know the onboarding process and availability for this month.`
        );
      } else {
        setMailBody('');
      }
    }
  }, [isOpen, selectedPackage, isCustomQuotation]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const packageName = selectedPackage?.name ?? (isCustomQuotation ? 'Custom Premium Experience' : 'Subscription Package');
      
      let packagePrice = 'Custom Quotation';
      let packageAllocation = 'Tailored Creative Scope';
      let idealUseCase = 'Corporate / Large Setup';

      if (selectedPackage) {
        if ('monthlyFeeLKR' in selectedPackage) {
          packagePrice = selectedPackage.monthlyFeeLKR;
          packageAllocation = `${selectedPackage.sessionCount} (${selectedPackage.hoursBadge} Hours)`;
          idealUseCase = selectedPackage.idealUseCase ?? '';
        } else {
          packagePrice = selectedPackage.priceLKR;
          packageAllocation = selectedPackage.duration
            ? `${selectedPackage.duration} Duration • ${(selectedPackage.includes || []).join(', ')}`
            : 'Custom Scope';
          idealUseCase = selectedPackage.bestFor ?? '';
        }
      }

      const res = await fetch('/api/subscription-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          companyName,
          phone,
          email,
          mailBody,
          packageName,
          packagePrice,
          packageAllocation,
          idealUseCase,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative z-10 w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden my-8"
          >
            {/* Header Accent Bar */}
            <div className="h-2 bg-gradient-to-r from-brand-red via-[#f02d33] to-slate-900 w-full" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all z-20"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            {success ? (
              /* Success View */
              <div className="p-8 sm:p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center mb-5 shadow-sm">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-brand-red/10 text-brand-red mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isCustomQuotation ? 'Quotation Request Dispatched' : 'Inquiry Dispatched'}
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 tracking-tight">
                  {isCustomQuotation ? 'Quotation Request Sent!' : 'Inquiry Sent Successfully!'}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
                  Thank you, <strong className="text-slate-900">{userName}</strong>! Your request for{' '}
                  <strong className="text-brand-red">{selectedPackage?.name ?? 'Custom Quotation'}</strong> has been delivered directly to{' '}
                  <strong className="text-slate-900">bookings@wize.tv</strong>.
                </p>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left text-xs sm:text-sm text-slate-600 mb-8 max-w-md mx-auto space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Plan / Scope:</span>
                    <span className="font-bold text-slate-900">
                      {selectedPackage?.name ?? 'Custom Premium Experience'}{' '}
                      ({selectedPackage && 'monthlyFeeLKR' in selectedPackage ? `${selectedPackage.monthlyFeeLKR}/mo` : 'Custom Quotation'})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Contact Phone:</span>
                    <span className="font-bold text-slate-900">{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Email:</span>
                    <span className="font-bold text-slate-900">{email}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 text-slate-500 text-[11px]">
                    Our studio coordinator will get in touch with you within 24 hours with a custom proposal and consultation.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Inquiry Form View */
              <div className="p-6 sm:p-8">
                {/* Package Highlight Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand-red/10 text-brand-red border border-brand-red/20">
                      {isCustomQuotation ? 'CUSTOM PRODUCTION QUOTATION' : 'MEMBERSHIP SUBSCRIPTION INQUIRY'}
                    </span>
                    {selectedPackage?.popular && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-red text-white flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-2.5 h-2.5 fill-current" />
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {isCustomQuotation ? (
                      <>
                        Request <span className="text-brand-red">Custom Quotation</span>
                      </>
                    ) : (
                      <>
                        Inquire About <span className="text-brand-red">{selectedPackage?.name}</span> Plan
                      </>
                    )}
                  </h3>

                  {selectedPackage && (
                    <div className="mt-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-2.5 text-xs">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base sm:text-lg font-black text-slate-950">
                          {'monthlyFeeLKR' in selectedPackage ? selectedPackage.monthlyFeeLKR : selectedPackage.priceLKR}
                        </span>
                        {'monthlyFeeLKR' in selectedPackage && (
                          <span className="text-slate-500 font-semibold text-[11px]">/ month</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 font-bold text-slate-700">
                        {'sessionCount' in selectedPackage && (
                          <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-xs">
                            <Calendar className="w-3.5 h-3.5 text-brand-red" />
                            <span>{selectedPackage.sessionCount} ({selectedPackage.hoursBadge} HRS)</span>
                          </span>
                        )}

                        {'cameras' in selectedPackage && selectedPackage.cameras && (
                          <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-xs">
                            {selectedPackage.cameras}
                          </span>
                        )}

                        {'bestFor' in selectedPackage && (
                          <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-xs text-slate-600">
                            {selectedPackage.bestFor}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-brand-red" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* User Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Name <span className="text-brand-red">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="e.g. Ruwan Perera"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/15 transition-all"
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Company Name <span className="text-slate-400 font-normal lowercase">(optional)</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Brand / Organization"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/15 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Tel Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Tel / WhatsApp Number <span className="text-brand-red">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +94 77 123 4567"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/15 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address <span className="text-brand-red">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. name@company.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/15 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mail Body / Requirements */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {isCustomQuotation ? 'Scope / Production Requirements' : 'Mail Body / Message'}{' '}
                      <span className="text-brand-red">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                      <textarea
                        required
                        rows={4}
                        value={mailBody}
                        onChange={(e) => setMailBody(e.target.value)}
                        placeholder={
                          isCustomQuotation
                            ? 'Describe your show, camera/lighting setups, schedule, or specific requirements...'
                            : 'Tell us about your show, recording schedule, or any custom requirements...'
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/15 transition-all resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Recipient Notice */}
                  <div className="pt-1 flex items-center justify-between gap-2 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-brand-red shrink-0" />
                      <span>Sent directly to <strong className="text-slate-700">bookings@wize.tv</strong></span>
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      24h Response
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-red/25 hover:shadow-lg hover:shadow-brand-red/35 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending to bookings@wize.tv...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{isCustomQuotation ? 'Request Custom Quotation' : 'Send Email Inquiry'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
