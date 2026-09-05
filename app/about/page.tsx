'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Target,
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* Header Banner */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-3 block">
          ABOUT WIZETV
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-8 leading-tight">
          The World&apos;s Greatest Ideas Deserve To Be Heard.
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold max-w-3xl mx-auto mb-6">
          The world&apos;s greatest ideas don&apos;t deserve to stay inside boardrooms, notebooks or busy minds. They deserve to be heard.
        </p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
          That&apos;s why WizeTV exists. We help businesses, corporate leaders, entrepreneurs and creators transform their knowledge into conversations that educate, inspire and influence. Through world-class podcast production, corporate podcast solutions and strategic storytelling, we create content that doesn&apos;t just fill timelines, it shapes opinions, builds trust and leaves a legacy.
        </p>
      </section>

      {/* Vision & Mission Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-red block mb-2">
              OUR VISION
            </span>
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Building the Nation&apos;s Most Trusted Ecosystem
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              To build the Nation&apos;s most Trusted ecosystem for podcast production, creator education and business storytelling.
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-red block mb-2">
              OUR MISSION
            </span>
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Inspiring Communities Through Powerful Conversations
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              To create a platform where businesses, leaders and creators can share ideas that educate industries, inspire communities and shape the future through powerful conversations.
            </p>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white my-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-3 block">
            OUR PURPOSE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-8 leading-snug">
            The world doesn&apos;t need another podcast. <br />
            <span className="text-brand-red">It needs better conversations.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto mb-8">
            The kind that challenges ideas. Build trust. Create opportunities and make people stop scrolling. <br />
            <strong>That&apos;s why WizeTV exists.</strong>
          </p>
        </div>
      </section>

      {/* Studio & Production Capability */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
            FACILITIES & TECH
          </span>
          <h2 className="text-3xl font-black text-slate-900">
            Studio & Production Capability
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Acoustic Whisper Suite',
              desc: 'Floating drywall and sound diffusers for pristine audio fidelity.',
            },
            {
              title: 'Sony FX Cinema 4K',
              desc: 'Multi-camera angles with cinema prime lenses.',
            },
            {
              title: 'Live ATEM Switching',
              desc: 'Multi-angle live ISO program feeds and instant sync.',
            },
            {
              title: 'Full Post-Production',
              desc: 'DaVinci color grading, audio restoration, and viral clipping.',
            },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet The Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
            PRODUCERS & ENGINEERS
          </span>
          <h2 className="text-3xl font-black text-slate-900">
            Meet The Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Executive Producer',
              role: 'Show Direction & Strategy',
              desc: 'Oversees narrative development, interview pacing, and brand alignment.',
            },
            {
              name: 'Chief Audio Engineer',
              role: 'Sound Design & Mastering',
              desc: 'Ensures broadcast-standard acoustics, noise cancellation, and loudness compliance.',
            },
            {
              name: 'Lead Cinema DP',
              role: 'Lighting & Multi-Cam Optics',
              desc: 'Crafts the cinematic visuals and custom RGB lighting setups.',
            },
            {
              name: 'Viral Content Editor',
              role: 'Short-Form Video Strategy',
              desc: 'Curates high-hook moments for TikTok, Instagram Reels, and YouTube Shorts.',
            },
          ].map((team, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left">
              <h3 className="text-base font-bold text-slate-900 mb-0.5">{team.name}</h3>
              <span className="text-xs font-bold text-brand-red block mb-3">{team.role}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{team.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Start Your Story Today</h2>
          <p className="text-sm text-slate-600 mb-8 font-medium">
            Join the creators and brands shaping public conversations across Sri Lanka.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black uppercase tracking-wider transition-all shadow-red-glow"
          >
            Book The Studio
          </Link>
        </div>
      </section>
    </div>
  );
}
