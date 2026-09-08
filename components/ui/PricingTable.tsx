'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ArrowRight,
  Clock,
  Video,
  Mic,
  Camera,
  Sparkles,
  Zap,
  ShieldCheck,
  Award,
  Crown,
} from 'lucide-react';
import { STUDIO_PACKAGES_DATA, SUBSCRIPTION_PACKAGES_DATA } from '@/lib/data';

const STUDIO_TEL_HREF = 'tel:+94777352700';

const STUDIO_ICONS: Record<string, React.ElementType> = {
  'audio-only-podcast': Mic,
  'solo-video-podcast': Camera,
  'dual-host-video-podcast': Video,
  'custom-premium-experience': Sparkles,
};

const SUBSCRIPTION_ICONS: Record<string, React.ElementType> = {
  'basic-subscription': Zap,
  'bronze-subscription': Award,
  'silver-subscription': Crown,
  'gold-subscription': Sparkles,
};

interface PricingTableProps {
  defaultMode?: 'packages' | 'subscriptions';
}

export const PricingTable: React.FC<PricingTableProps> = ({
  defaultMode = 'packages',
}) => {
  const [activeTab, setActiveTab] = useState<'packages' | 'subscriptions'>(defaultMode);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Toggle */}
      <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 mb-10">
        <button
          onClick={() => setActiveTab('packages')}
          className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'packages'
              ? 'bg-brand-red text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Studio Packages (Hourly)
        </button>

        <button
          onClick={() => setActiveTab('subscriptions')}
          className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'subscriptions'
              ? 'bg-brand-red text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Subscription Packages
        </button>
      </div>

      {/* Grid */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'packages' ? (
            <motion.div
              key="packages-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
            >
              {STUDIO_PACKAGES_DATA.map((pkg) => {
                const IconComponent = STUDIO_ICONS[pkg.slug] || Sparkles;
                const isPopular = !!pkg.popular;

                return (
                  <div
                    key={pkg.id}
                    className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between text-left transition-all duration-300 ${
                      isPopular
                        ? 'border-2 border-brand-red shadow-xl shadow-red-500/10 ring-4 ring-brand-red/5 hover:-translate-y-1'
                        : 'border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1'
                    }`}
                  >
                    {/* Floating Popular Badge */}
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-red text-white text-[10px] font-black uppercase tracking-wider shadow-md shadow-brand-red/30 flex items-center gap-1.5 whitespace-nowrap">
                        <Sparkles className="w-3 h-3 fill-current" />
                        <span>Most Popular</span>
                      </div>
                    )}

                    <div>
                      {/* Top Meta: Iconic Symbol + Duration Badge */}
                      <div className="flex items-center justify-between gap-3 mb-6">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                            isPopular
                              ? 'bg-brand-red text-white shadow-md shadow-brand-red/25'
                              : 'bg-slate-100 text-slate-800 group-hover:bg-brand-red group-hover:text-white'
                          }`}
                        >
                          <IconComponent className="w-5 h-5 stroke-[2.2]" />
                        </div>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 tracking-tight">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{pkg.duration}</span>
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 min-h-[32px] mb-5">
                        {pkg.bestFor}
                      </p>

                      {/* Price Block */}
                      <div className="pt-4 pb-5 border-t border-b border-slate-100 mb-6">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            {pkg.priceLKR}
                          </span>
                          {pkg.priceNum > 0 && (
                            <span className="text-xs font-semibold text-slate-400">/ session</span>
                          )}
                        </div>
                        <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                          {pkg.priceNum > 0
                            ? 'Includes studio setup & technician'
                            : 'Tailored to your creative scope'}
                        </span>
                      </div>

                      {/* Inclusions List with iconic red checkmarks */}
                      <div className="space-y-3 mb-8">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Included in Session
                        </span>
                        <ul className="space-y-2.5">
                          {pkg.includes.map((inc, incIdx) => (
                            <li
                              key={incIdx}
                              className="text-xs text-slate-600 font-medium flex items-start gap-2.5"
                            >
                              <div className="w-4 h-4 rounded-full bg-red-50 text-brand-red flex items-center justify-center shrink-0 mt-0.5 border border-red-100">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                              <span className="leading-snug">{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Interactive Modern Action Button: Direct Phone Call */}
                    <a
                      href={STUDIO_TEL_HREF}
                      className={`group/btn w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center text-center transition-all duration-200 ${
                        isPopular
                          ? 'bg-brand-red hover:bg-brand-red-hover text-white shadow-md shadow-brand-red/25 hover:shadow-lg hover:shadow-brand-red/35 hover:-translate-y-0.5'
                          : 'bg-slate-900 hover:bg-brand-red text-white hover:shadow-md hover:shadow-brand-red/20'
                      }`}
                    >
                      <span>Book The Studio</span>
                    </a>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="subscriptions-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
            >
              {SUBSCRIPTION_PACKAGES_DATA.map((sub) => {
                const IconComponent = SUBSCRIPTION_ICONS[sub.slug] || Crown;
                const isPopular = !!sub.popular;

                return (
                  <div
                    key={sub.id}
                    className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between text-left transition-all duration-300 ${
                      isPopular
                        ? 'border-2 border-brand-red shadow-xl shadow-red-500/10 ring-4 ring-brand-red/5 hover:-translate-y-1'
                        : 'border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1'
                    }`}
                  >
                    {/* Floating Popular Badge */}
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-red text-white text-[10px] font-black uppercase tracking-wider shadow-md shadow-brand-red/30 flex items-center gap-1.5 whitespace-nowrap">
                        <Sparkles className="w-3 h-3 fill-current" />
                        <span>Recommended</span>
                      </div>
                    )}

                    <div>
                      {/* Top Meta: Iconic Symbol + Priority Badge */}
                      <div className="flex items-center justify-between gap-3 mb-6">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                            isPopular
                              ? 'bg-brand-red text-white shadow-md shadow-brand-red/25'
                              : 'bg-slate-100 text-slate-800 group-hover:bg-brand-red group-hover:text-white'
                          }`}
                        >
                          <IconComponent className="w-5 h-5 stroke-[2.2]" />
                        </div>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 tracking-tight">
                          <ShieldCheck className="w-3 h-3 text-slate-400" />
                          <span>{sub.priority} Priority</span>
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1">
                        {sub.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 min-h-[32px] mb-5">
                        {sub.recommendedFor}
                      </p>

                      {/* Price Block */}
                      <div className="pt-4 pb-5 border-t border-b border-slate-100 mb-6">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            {sub.monthlyFeeLKR}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">/ month</span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                          Monthly recurring membership
                        </span>
                      </div>

                      {/* Allocation details */}
                      <div className="space-y-3 mb-8">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Allocation & Details
                        </span>
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                          <div className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold">
                            <div className="w-4 h-4 rounded-full bg-red-50 text-brand-red flex items-center justify-center shrink-0 mt-0.5 border border-red-100">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span>{sub.recordingAllocation}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Modern Action Button: Direct Phone Call */}
                    <a
                      href={STUDIO_TEL_HREF}
                      className={`group/btn w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center text-center transition-all duration-200 ${
                        isPopular
                          ? 'bg-brand-red hover:bg-brand-red-hover text-white shadow-md shadow-brand-red/25 hover:shadow-lg hover:shadow-brand-red/35 hover:-translate-y-0.5'
                          : 'bg-slate-900 hover:bg-brand-red text-white hover:shadow-md hover:shadow-brand-red/20'
                      }`}
                    >
                      <span>Book The Studio</span>
                    </a>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
