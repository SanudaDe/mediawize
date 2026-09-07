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
} from 'lucide-react';
import {
  STUDIO_PACKAGES_DATA,
  SUBSCRIPTION_PACKAGES_DATA,
  MEMBERSHIP_BENEFITS_DATA,
} from '@/lib/data';

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
        {/* 1. STUDIO PACKAGES TABLE (HOURLY / SESSION) */}
        {/* ========================================================================= */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-red block">
                TABLE 1
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Studio Packages (Per Session)
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-4 sm:p-5">Package</th>
                  <th className="p-4 sm:p-5">Best For</th>
                  <th className="p-4 sm:p-5">Duration</th>
                  <th className="p-4 sm:p-5">Includes</th>
                  <th className="p-4 sm:p-5 text-right">Price (LKR)</th>
                  <th className="p-4 sm:p-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {STUDIO_PACKAGES_DATA.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 text-sm whitespace-nowrap">
                      {pkg.name}
                      {pkg.popular && (
                        <span className="ml-2 text-[10px] uppercase font-bold bg-brand-red text-white px-2 py-0.5 rounded-full inline-block">
                          Popular
                        </span>
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600 font-medium">
                      {pkg.bestFor}
                    </td>
                    <td className="p-4 sm:p-5 font-semibold text-slate-800 whitespace-nowrap">
                      {pkg.duration}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600">
                      <ul className="space-y-1">
                        {pkg.includes.map((inc, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-brand-red font-bold">&bull;</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 sm:p-5 text-right font-black text-sm text-slate-900 whitespace-nowrap">
                      {pkg.priceLKR}
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      <Link
                        href={`/contact?package=${pkg.slug}`}
                        className="px-4 py-2 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider inline-block shadow-sm transition-all"
                      >
                        Contact to Book
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SUBSCRIPTION PACKAGES TABLE */}
        {/* ========================================================================= */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-red block">
                TABLE 2
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Subscription Packages (Monthly Recurring)
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-4 sm:p-5">Package</th>
                  <th className="p-4 sm:p-5">Recommended For</th>
                  <th className="p-4 sm:p-5 text-right">Monthly Fee (LKR)</th>
                  <th className="p-4 sm:p-5">Recording Allocation</th>
                  <th className="p-4 sm:p-5">Priority</th>
                  <th className="p-4 sm:p-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SUBSCRIPTION_PACKAGES_DATA.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 text-sm whitespace-nowrap">
                      {sub.name}
                      {sub.popular && (
                        <span className="ml-2 text-[10px] uppercase font-bold bg-brand-red text-white px-2 py-0.5 rounded-full inline-block">
                          Creator Choice
                        </span>
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600 font-medium">
                      {sub.recommendedFor}
                    </td>
                    <td className="p-4 sm:p-5 text-right font-black text-sm text-slate-900 whitespace-nowrap">
                      {sub.monthlyFeeLKR}
                    </td>
                    <td className="p-4 sm:p-5 font-semibold text-slate-800">
                      {sub.recordingAllocation}
                    </td>
                    <td className="p-4 sm:p-5">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-[10px] uppercase">
                        {sub.priority}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      <Link
                        href={`/contact?subscription=${sub.slug}`}
                        className="px-4 py-2 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider inline-block shadow-sm transition-all"
                      >
                        Inquire Tier
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
