'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Calendar,
  Send,
  Youtube,
  Instagram,
  Linkedin,
  Headphones,
} from 'lucide-react';
import { BookingForm } from '@/components/ui/BookingForm';

export default function ContactPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <section className="max-w-5xl mx-auto text-center mb-16">
        <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-3 block">
          CONTACT & BOOKING
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
          Ready To Build Something Worth Watching?
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-semibold leading-relaxed max-w-2xl mx-auto mb-2">
          Whether you&apos;re launching your first podcast, produce content for your brand, or rent a professional studio, WIZETV is ready.
        </p>
        <p className="text-sm font-bold text-brand-red uppercase tracking-wider">
          Talk to us. Record with us. Create with us.
        </p>
      </section>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Studio Booking Engine */}
        <div className="lg:col-span-8">
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200">
            <h2 className="text-xl font-black text-slate-900 mb-2">
              Studio Booking & Inquiries
            </h2>
            <p className="text-xs text-slate-500 font-medium mb-8">
              Fill out the details below to reserve your recording time in Colombo 07.
            </p>

            <Suspense
              fallback={
                <div className="p-12 text-center text-slate-400">
                  <div className="w-8 h-8 rounded-full border-2 border-brand-red border-t-transparent animate-spin mx-auto mb-4" />
                  <span>Loading Booking Form...</span>
                </div>
              }
            >
              <BookingForm />
            </Suspense>
          </div>
        </div>

        {/* Right Contact Info, WhatsApp CTA & Map */}
        <div className="lg:col-span-4 space-y-6">
          {/* WhatsApp Direct Fast-Track */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-brand-red px-2.5 py-1 rounded text-white inline-block mb-3">
              DIRECT WHATSAPP
            </span>
            <h3 className="text-lg font-black mb-2">Fast-Track On WhatsApp</h3>
            <p className="text-xs text-slate-400 mb-6 font-medium">
              Chat directly with our studio coordinator to check live availability or custom requirements.
            </p>

            <a
              href="https://wa.me/94771234567?text=Hi%20WizeTV%2C%20I%20would%20like%20to%20inquire%20about%20studio%20booking%20and%20packages"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Phone className="w-4 h-4" />
              Chat on WhatsApp: +94 77 123 4567
            </a>
          </div>

          {/* Colombo Studio Details */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-red" />
              Studio Location & Info
            </h3>

            <div className="space-y-4 text-xs text-slate-700 font-medium">
              <div>
                <span className="text-slate-400 block mb-0.5 font-bold uppercase text-[10px]">
                  Studio Address:
                </span>
                <span className="font-bold text-slate-900">
                  WizeTV Media Production House
                </span>
                <p className="text-slate-600">Ward Place, Colombo 07, Sri Lanka</p>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5 font-bold uppercase text-[10px]">
                  Operating Hours:
                </span>
                <span className="font-bold text-slate-900">
                  Monday &ndash; Sunday: 8:00 AM &ndash; 10:00 PM
                </span>
                <p className="text-brand-red text-[11px] font-bold mt-0.5">
                  Recording by prior appointment
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5 font-bold uppercase text-[10px]">
                  Email Inquiries:
                </span>
                <a
                  href="mailto:hello@wizetv.lk"
                  className="font-bold text-brand-red hover:underline"
                >
                  hello@wizetv.lk
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 mt-6 border-t border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Follow WizeTV Studios:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all"
                >
                  <Headphones className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-brand-red hover:text-white text-slate-700 flex items-center justify-center transition-all"
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
