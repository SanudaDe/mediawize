'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Compass, ArrowRight, ArrowUpRight, Sparkles, Phone } from 'lucide-react';
import { AudioWaveform } from '@/components/ui/AudioWaveform';

const STUDIO_TEL_HREF = 'tel:+94777352700';
const STUDIO_PHONE = '077 735 2700';

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HEADER HERO (Styled like Home Page) */}
      {/* ========================================================================= */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-b border-slate-100">
        <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-3 block">
          ABOUT WIZETV
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 mb-6 leading-[1.05] tracking-tight">
          The World&apos;s Greatest Ideas <br />
          <span className="text-brand-red">Deserve To Be Heard.</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed font-semibold max-w-3xl mx-auto mb-6">
          The world&apos;s greatest ideas don&apos;t deserve to stay inside boardrooms, notebooks or busy minds. They deserve to be heard.
        </p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium mb-10">
          That&apos;s why WizeTV exists. We help businesses, corporate leaders, entrepreneurs and creators transform their knowledge into conversations that educate, inspire and influence. Through world-class podcast production, corporate podcast solutions and strategic storytelling, we create content that doesn&apos;t just fill timelines, it shapes opinions, builds trust and leaves a legacy.
        </p>

        {/* Perfectly Centered Waveform */}
        <div className="flex items-center justify-center w-full max-w-md mx-auto">
          <AudioWaveform className="justify-center mx-auto" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. VISION & MISSION GRID (Styled identical to Home Page cards) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
              OUR FOUNDATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Vision & Mission.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 hover:border-brand-red/40 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(236,35,40,0.12)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 overflow-hidden text-left">
              {/* Subtle top indicator highlight matching Home Page */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-red/0 to-transparent group-hover:via-brand-red transition-all duration-500" />

              <div>
                {/* Home Page Style Icon */}
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-800 group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red transition-all duration-300 shadow-sm mb-6">
                  <Compass className="w-7 h-7" strokeWidth={1.75} />
                </div>

                <span className="text-xs font-black uppercase tracking-widest text-brand-red block mb-2">
                  OUR VISION
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug group-hover:text-brand-red transition-colors mb-4">
                  Building the Nation&apos;s Most Trusted Ecosystem
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  To build the Nation&apos;s most Trusted ecosystem for podcast production, creator education and business storytelling.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 hover:border-brand-red/40 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(236,35,40,0.12)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 overflow-hidden text-left">
              {/* Subtle top indicator highlight matching Home Page */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-red/0 to-transparent group-hover:via-brand-red transition-all duration-500" />

              <div>
                {/* Home Page Style Icon */}
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-800 group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red transition-all duration-300 shadow-sm mb-6">
                  <Target className="w-7 h-7" strokeWidth={1.75} />
                </div>

                <span className="text-xs font-black uppercase tracking-widest text-brand-red block mb-2">
                  OUR MISSION
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug group-hover:text-brand-red transition-colors mb-4">
                  Inspiring Communities Through Powerful Conversations
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  To create a platform where businesses, leaders and creators can share ideas that educate industries, inspire communities and shape the future through powerful conversations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHY WE EXIST / PURPOSE BANNER (Home Page High-Impact Style) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-6">
        <div className="rounded-3xl bg-slate-950 p-10 sm:p-16 text-center text-white relative overflow-hidden border border-slate-800 shadow-2xl">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-3 block">
              OUR PURPOSE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mb-6 leading-tight">
              The world doesn&apos;t need another podcast. <br />
              <span className="text-brand-red">It needs better conversations.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium mb-10">
              The kind that challenges ideas, builds trust, and creates opportunities. <br className="hidden sm:inline" />
              <strong>That&apos;s why WizeTV exists.</strong>
            </p>

            {/* Home Page CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact?type=inquiry"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 text-sm font-black tracking-wide transition-all shadow-md active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </Link>
              <a
                href={STUDIO_TEL_HREF}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white text-sm font-black tracking-wide transition-all shadow-red-glow active:scale-[0.98] w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>Book The Studio</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
