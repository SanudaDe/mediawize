'use client';

import React from 'react';
import Link from 'next/link';
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  Mic,
  Camera,
  Video,
  Zap,
  Award,
  Crown,
} from 'lucide-react';
import {
  STUDIO_PACKAGES_DATA,
  SUBSCRIPTION_PACKAGES_DATA,
  MEMBERSHIP_BENEFITS_DATA,
} from '@/lib/data';

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

export default function StudioPackagesPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="max-w-5xl mx-auto text-center mb-16">
        <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-3 block">
          PRICING & PLANS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
          Studio & Packages
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          Transparent rates in Sri Lankan Rupees (LKR). Choose between single session recording slots or subscribe to monthly creator allocations.
        </p>
      </section>

      <div className="max-w-7xl mx-auto space-y-20">
        {/* ========================================================================= */}
        {/* 1. STUDIO PACKAGES (PER SESSION) */}
        {/* ========================================================================= */}
        <div>
          <div className="text-center sm:text-left mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-1 block">
              PER SESSION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Studio Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Complete equipment, acoustic treatment, and on-site engineer included in every session.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
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

                  {/* Interactive Modern Action Button */}
                  <Link
                    href={`/contact?package=${pkg.slug}`}
                    className={`group/btn w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 ${
                      isPopular
                        ? 'bg-brand-red hover:bg-brand-red-hover text-white shadow-md shadow-brand-red/25 hover:shadow-lg hover:shadow-brand-red/35 hover:-translate-y-0.5'
                        : 'bg-slate-900 hover:bg-brand-red text-white hover:shadow-md hover:shadow-brand-red/20'
                    }`}
                  >
                    <span>{pkg.priceNum > 0 ? 'Contact to Book' : 'Get Custom Quote'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SUBSCRIPTION PACKAGES (MONTHLY RECURRING) */}
        {/* ========================================================================= */}
        <div>
          <div className="text-center sm:text-left mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-1 block">
              MEMBERSHIP TIERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Subscription Packages (Monthly Recurring)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Fixed monthly studio allocations, priority scheduling, and dedicated production support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
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
                      <span>Creator Choice</span>
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

                  {/* Interactive Modern Action Button */}
                  <Link
                    href={`/contact?subscription=${sub.slug}`}
                    className={`group/btn w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 ${
                      isPopular
                        ? 'bg-brand-red hover:bg-brand-red-hover text-white shadow-md shadow-brand-red/25 hover:shadow-lg hover:shadow-brand-red/35 hover:-translate-y-0.5'
                        : 'bg-slate-900 hover:bg-brand-red text-white hover:shadow-md hover:shadow-brand-red/20'
                    }`}
                  >
                    <span>Inquire Tier</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. MEMBERSHIP BENEFITS MATRIX */}
        {/* ========================================================================= */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-black uppercase tracking-widest text-brand-red block">
              TABLE 3
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Membership Benefits Comparison
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-4 sm:p-5">Benefit</th>
                  <th className="p-4 sm:p-5 text-center">Basic</th>
                  <th className="p-4 sm:p-5 text-center">Bronze</th>
                  <th className="p-4 sm:p-5 text-center">Silver</th>
                  <th className="p-4 sm:p-5 text-center">Gold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MEMBERSHIP_BENEFITS_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900">
                      {row.benefit}
                    </td>
                    <td className="p-4 sm:p-5 text-center font-bold text-slate-700">
                      {row.basic === '✓' ? (
                        <span className="text-emerald-600 font-black">✓</span>
                      ) : row.basic === '✗' ? (
                        <span className="text-slate-300">✗</span>
                      ) : (
                        row.basic
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-center font-bold text-slate-700">
                      {row.bronze.includes('✓') ? (
                        <span className="text-emerald-600 font-black">{row.bronze}</span>
                      ) : row.bronze === '✗' ? (
                        <span className="text-slate-300">✗</span>
                      ) : (
                        row.bronze
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-center font-bold text-slate-700">
                      {row.silver.includes('✓') ? (
                        <span className="text-emerald-600 font-black">{row.silver}</span>
                      ) : row.silver === '✗' ? (
                        <span className="text-slate-300">✗</span>
                      ) : (
                        row.silver
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-center font-bold text-slate-700">
                      {row.gold.includes('✓') ? (
                        <span className="text-emerald-600 font-black">{row.gold}</span>
                      ) : row.gold === '✗' ? (
                        <span className="text-slate-300">✗</span>
                      ) : (
                        row.gold
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Booking CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-20 text-center">
        <div className="p-10 rounded-3xl bg-slate-900 text-white shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Need a Custom Corporate Quote?
          </h2>
          <p className="text-sm text-slate-400 mb-8 max-w-lg mx-auto">
            Contact our studio manager for multi-episode series, enterprise retainers, and private studio takeovers.
          </p>
          <Link
            href="/contact?type=enterprise"
            className="px-8 py-3.5 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black uppercase tracking-wider transition-all shadow-red-glow"
          >
            Request Custom Quotation
          </Link>
        </div>
      </section>
    </div>
  );
}
