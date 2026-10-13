'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  PhoneCall,
  Mail,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Youtube,
  Instagram,
  Linkedin,
  SlidersHorizontal,
  CalendarCheck,
  Clapperboard,
} from 'lucide-react';
import { AudioWaveform } from '@/components/ui/AudioWaveform';

const STUDIO_PHONE = '077 779 4600';
const STUDIO_TEL_HREF = 'tel:+94777794600';

export default function ContactPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER (Home Page Style) */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto text-center mb-16">
        <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-3 block">
          DIRECT STUDIO BOOKINGS & HOTLINE
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 mb-5 leading-[1.05] tracking-tight">
          Book Your Session <br />
          <span className="text-brand-red">Via Direct Call.</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-700 font-semibold leading-relaxed max-w-2xl mx-auto mb-8">
          Skip the back-and-forth forms. Call our studio coordinator directly to check live slot availability and confirm your podcast recording immediately.
        </p>

        {/* Centered Waveform */}
        <div className="flex items-center justify-center w-full max-w-md mx-auto mb-4">
          <AudioWaveform className="justify-center mx-auto" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DIRECT CALL BOOKING ENGINE & STUDIO INFO */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Direct Call Booking Card (Unified Home Page Light Aesthetic) */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl bg-white p-8 sm:p-12 text-slate-900 border border-slate-200 shadow-xl overflow-hidden">
            {/* Ambient Red Glow Accent */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-red/[0.05] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-slate-100/80 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-black uppercase tracking-wider shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                  STUDIO HOTLINE &bull; INSTANT BOOKING
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.1] mb-4">
                Call Direct to Schedule <br className="hidden sm:inline" />
                <span className="text-brand-red">Your Recording.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-8 max-w-xl">
                Speak directly with our studio coordinator for live slot confirmation, gear questions, or custom production packages.
              </p>

              {/* Big Direct Call Button */}
              <a
                href={STUDIO_TEL_HREF}
                className="group w-full py-5 sm:py-6 px-6 rounded-2xl bg-gradient-to-r from-brand-red via-[#f02d33] to-brand-red hover:from-[#f02d33] hover:to-brand-red text-white font-black text-lg sm:text-2xl tracking-wide flex items-center justify-center shadow-[0_14px_34px_-6px_rgba(236,35,40,0.55)] hover:shadow-[0_18px_42px_-4px_rgba(236,35,40,0.7)] active:scale-[0.98] transition-all mb-10 text-center"
              >
                <span>Book The Studio</span>
              </a>

              {/* Quick How It Works Steps — Iconic Main UI Style */}
              <div className="pt-8 border-t border-slate-200">
                <span className="text-xs font-black uppercase tracking-widest text-brand-red block mb-5">
                  HOW STUDIO BOOKING WORKS:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      number: '01',
                      title: 'Call 077 779 4600',
                      desc: 'Direct hotline to our studio coordinator to check open dates and time slots.',
                      icon: PhoneCall,
                    },
                    {
                      number: '02',
                      title: 'Pick Your Package',
                      desc: 'Choose Audio Only (18.5k), Solo Video (35k), Dual Multi-Cam (45k), or Custom.',
                      icon: SlidersHorizontal,
                    },
                    {
                      number: '03',
                      title: 'Instant Confirmation',
                      desc: 'Your slot is secured on the studio calendar immediately. No waiting.',
                      icon: CalendarCheck,
                    },
                    {
                      number: '04',
                      title: 'Show Up & Record',
                      desc: 'Arrive at our Colombo studio. Our cinema crew handles all cameras, audio, and lighting.',
                      icon: Clapperboard,
                    },
                  ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={idx}
                        className="group/card relative p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-brand-red/50 hover:bg-white hover:shadow-[0_12px_24px_-8px_rgba(236,35,40,0.12)] transition-all duration-300 flex flex-col justify-between text-left overflow-hidden hover:-translate-y-1"
                      >
                        {/* Top subtle glow on hover */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red/0 to-transparent group-hover/card:via-brand-red transition-all duration-500" />

                        {/* Translucent Big Display Number */}
                        <span className="absolute top-2.5 right-3.5 font-black text-3xl sm:text-4xl tracking-tight select-none pointer-events-none text-slate-900/10 group-hover/card:text-brand-red/20 transition-all duration-300">
                          {item.number}
                        </span>

                        <div className="relative z-10">
                          <div className="mb-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-brand-red group-hover/card:bg-brand-red group-hover/card:border-brand-red group-hover/card:text-white flex items-center justify-center shadow-sm transition-all duration-300 group-hover/card:scale-110">
                              <IconComponent className="w-4 h-4" />
                            </div>
                          </div>

                          <h4 className="text-sm font-black text-slate-900 tracking-tight mb-1 group-hover/card:text-brand-red transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Studio Location, Hours & Info */}
        <div className="lg:col-span-5 space-y-6 text-left">
          {/* Studio Location & Details Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
            <h3 className="text-base font-black uppercase tracking-wider text-slate-900 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-red" />
              Studio Location & Info
            </h3>

            <div className="space-y-6 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90">
                <span className="text-slate-400 block mb-1 font-bold uppercase text-[10px] tracking-wider">
                  Direct Studio Hotline:
                </span>
                <a
                  href={STUDIO_TEL_HREF}
                  className="text-xl font-black text-brand-red hover:underline flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>{STUDIO_PHONE}</span>
                </a>
              </div>

              <div>
                <span className="text-slate-400 block mb-1 font-bold uppercase text-[10px] tracking-wider">
                  Studio Address:
                </span>
                <span className="font-bold text-slate-900 block text-base">
                  WIZEtv Media Production House
                </span>
                <p className="text-slate-600 mt-0.5">
                  17, Kirimandala Mawatha, Nawala / Colombo, Sri Lanka
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1 font-bold uppercase text-[10px] tracking-wider">
                  Operating Hours:
                </span>
                <span className="font-bold text-slate-900 block">
                  Monday &ndash; Sunday: 8:00 AM &ndash; 10:00 PM
                </span>
                <span className="text-brand-red font-bold text-xs block mt-1">
                  &bull; Recording strictly by prior phone booking
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1 font-bold uppercase text-[10px] tracking-wider">
                  Email Inquiries:
                </span>
                <a
                  href="mailto:info@wize.tv"
                  className="font-bold text-brand-red hover:underline text-sm block"
                >
                  info@wize.tv
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 mt-6 border-t border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Follow WIZEtv Studios:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/mediawizetv"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm"
                  title="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/c/wizetv"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/mediawizetv/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/wizetv/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-sm"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
