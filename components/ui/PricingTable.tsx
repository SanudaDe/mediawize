'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Flame, ArrowRight, ShieldCheck, Clock, Video } from 'lucide-react';
import { STUDIO_PACKAGES_DATA, SUBSCRIPTION_PACKAGES_DATA } from '@/lib/data';

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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {STUDIO_PACKAGES_DATA.map((pkg) => (
                <div
                  key={pkg.id}
                  className="studio-card bg-white p-7 rounded-2xl flex flex-col justify-between text-left"
                >
                  <div>
                    <h3 className="text-base font-black text-slate-900 text-center mb-1">
                      {pkg.name}
                    </h3>
                    <div className="text-center font-black text-lg text-slate-900 mb-1">
                      {pkg.priceLKR}
                    </div>
                    <div className="text-center text-[11px] text-slate-500 font-semibold mb-6 pb-4 border-b border-slate-100">
                      Duration: {pkg.duration}
                    </div>

                    <div className="space-y-2 mb-8">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Includes:
                      </span>
                      <ul className="space-y-2">
                        {pkg.includes.map((inc, incIdx) => (
                          <li
                            key={incIdx}
                            className="text-xs text-slate-600 font-medium flex items-start gap-2"
                          >
                            <span className="text-brand-red font-bold">&bull;</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href={`/contact?package=${pkg.slug}`}
                    className="w-full py-2.5 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-sm hover:shadow-red-glow"
                  >
                    Select Plan
                  </Link>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="subscriptions-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {SUBSCRIPTION_PACKAGES_DATA.map((sub) => (
                <div
                  key={sub.id}
                  className="studio-card bg-white p-7 rounded-2xl flex flex-col justify-between text-left"
                >
                  <div>
                    <h3 className="text-base font-black text-slate-900 text-center mb-1">
                      {sub.name}
                    </h3>
                    <div className="text-center font-black text-lg text-slate-900 mb-1">
                      {sub.monthlyFeeLKR}
                    </div>
                    <div className="text-center text-[11px] text-slate-500 font-semibold mb-6 pb-4 border-b border-slate-100">
                      Monthly Recurring Tier
                    </div>

                    <div className="space-y-2 mb-8">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Recommended For:
                      </span>
                      <p className="text-xs text-slate-700 font-medium mb-4">
                        {sub.recommendedFor}
                      </p>

                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Recording Allocation:
                      </span>
                      <p className="text-xs text-slate-700 font-semibold">
                        {sub.recordingAllocation}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/contact?subscription=${sub.slug}`}
                    className="w-full py-2.5 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-sm hover:shadow-red-glow"
                  >
                    Select Plan
                  </Link>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
