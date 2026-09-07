'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Mic,
  Camera,
  Film,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Radio,
  Sliders,
} from 'lucide-react';
import { AudioWaveform } from '@/components/ui/AudioWaveform';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { STUDIO_SHOWCASE_IMAGES } from '@/lib/studioImages';
import { STUDIO_PACKAGES_DATA } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="bg-white text-slate-900 overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. IMMERSIVE FULL-WIDTH 3D SHOWCASE HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative min-h-[720px] sm:min-h-[780px] lg:min-h-[840px] flex items-center justify-center overflow-hidden border-b border-slate-100 bg-white">
        {/* --- Background 3D Showcase & Background Edge Shaders (Strictly z-0) --- */}
        <div className="absolute inset-0 z-0 overflow-hidden w-full h-full pointer-events-none">
          {/* 3D Marquee Layer with Radial Mask */}
          <div
            style={{
              maskImage:
                'radial-gradient(ellipse 90% 85% at 50% 50%, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.52) 65%, rgba(0,0,0,0.45) 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 90% 85% at 50% 50%, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.52) 65%, rgba(0,0,0,0.45) 100%)',
            }}
            className="w-full h-full flex items-center justify-center"
          >
            <ThreeDMarquee
              images={STUDIO_SHOWCASE_IMAGES}
              className="h-full w-full max-sm:h-full opacity-100"
              innerScaleClass="scale-[0.85] sm:scale-[1.0] lg:scale-[1.18] xl:scale-[1.25]"
            />
          </div>

          {/* Background-only Soft Edge Fades */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white via-white/50 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-28 sm:w-48 bg-gradient-to-l from-white via-white/45 to-transparent" />
        </div>

        {/* --- Left Corner Hero Content --- */}
        <div className="relative z-40 isolate max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 w-full flex justify-start items-start">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-2xl lg:max-w-3xl xl:max-w-4xl w-full text-left"
          >
            {/* Headline (Bigger & High-Impact) */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[5.5rem] font-black tracking-tight text-slate-950 leading-[0.98] mb-6">
              Your Story, <br />
              <span className="text-brand-red">Our Studio.</span>
            </h1>

            {/* Subtitles (Bigger & Clearer Presence) */}
            <div className="space-y-3 mb-8 max-w-2xl">
              <p className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-950 leading-tight">
                Podcasting. Production. Storytelling. Editing. The Best Studio Experience in Sri Lanka.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-semibold leading-relaxed">
                Designed for founders, businesses, and creators who want every episode to reflect the highest caliber of their brand.
              </p>
            </div>

            {/* CTA Buttons (Enlarged, Studio Tour Removed) */}
            <div className="flex items-center gap-4 sm:gap-5 flex-wrap">
              <Link
                href="/contact?type=inquiry"
                className="px-9 sm:px-11 py-4 sm:py-4.5 rounded-2xl bg-[#111827] hover:bg-black text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-xl hover:scale-105"
              >
                Let&apos;s Talk
              </Link>

              <Link
                href="/contact"
                className="px-9 sm:px-11 py-4 sm:py-4.5 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-xl hover:shadow-red-glow hover:scale-105"
              >
                Book The Studio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHAT WE DO — Full-Service Creative Production (4 Cards) */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-wave-pattern relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-1 block">
            WHAT WE DO
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-12">
            Full-Service Creative Production.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Podcast Production',
                desc: 'Professional podcast recording, multi-camera setups, sound engineering, editing, and publishing support.',
                icon: Mic,
                href: '/services#podcast-production',
              },
              {
                title: 'Creative Studio Rental',
                desc: 'A professional environment built for podcasts, interviews, livestreams, content shoots, and brand storytelling.',
                icon: Camera,
                href: '/services#studio-rental',
              },
              {
                title: 'Video Editing & Post Production',
                desc: 'Clean edits. Cinematic storytelling. Short-form content. Platform-ready delivery.',
                icon: Film,
                href: '/services#editing-post',
              },
              {
                title: 'Content Creation Services',
                desc: 'YouTube production, reels, branded content, social media assets, and digital storytelling.',
                icon: Smartphone,
                href: '/services#content-creation',
              },
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="block h-full cursor-pointer group"
                >
                  <BackgroundGradient
                    containerClassName="h-full w-full"
                    className="rounded-[22px] p-6 sm:p-8 bg-white h-full flex flex-col items-center justify-start text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm flex items-center justify-center text-slate-800 group-hover:text-brand-red group-hover:border-brand-red/40 transition-colors mb-5 shrink-0">
                      <IconComp className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-black text-slate-900 mb-2.5 group-hover:text-brand-red transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </BackgroundGradient>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PODCAST SECTION — Create Conversations That Matter */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2">
                PODCAST
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4">
                Create Conversations That Matter.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-6">
                From first-time podcasters to established brands, WIZETV helps creators launch powerful conversations.
              </p>

              {/* Animated Red Audio Waveform */}
              <div className="w-full mb-8">
                <AudioWaveform />
              </div>

              {/* We Handle Checklist */}
              <div className="w-full">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  We handle:
                </span>
                <div className="grid grid-cols-2 gap-3.5">
                  {[
                    'Recording',
                    'Camera Production',
                    'Audio Mixing',
                    'Editing',
                    'Branding',
                    'Distribution Support',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-red fill-brand-red/10 shrink-0" />
                      <span className="text-xs font-bold text-slate-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px]">
                <div className="absolute -top-5 -left-5 w-24 h-24 bg-brand-red red-tv-watermark rounded-2xl z-0" />
                <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-brand-red red-tv-watermark rounded-3xl red-corner-slice-right z-0" />

                <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
                  <Image
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop"
                    alt="Lively podcast discussion at WizeTV studio"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. STUDIO SECTION — Your Content Deserves A Better Stage */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
                STUDIO OVERVIEW
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                Your Content Deserves A Better Stage.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-medium">
                Built for podcasts, interviews, livestreams, webinars, and digital media productions.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Professional Lighting', desc: 'Aputure & Amaran softbox lighting' },
                  { title: 'Premium Audio', desc: 'Shure SM7B broadcast mic chain' },
                  { title: 'Multi-Camera Production', desc: 'Sony FX Cinema 4K ISO cameras' },
                  { title: 'Creator-Ready Setup', desc: 'Colombo 07 acoustic whisper suite' },
                ].map((spec, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                    <div className="text-xs font-bold text-white mb-1">{spec.title}</div>
                    <div className="text-[11px] text-slate-400">{spec.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-700 aspect-[16/10] relative">
              <Image
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop"
                alt="WizeTV studio interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PRODUCTION PACKAGES PREVIEW */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative border-t border-slate-200">
        <div className="absolute top-0 right-0 w-28 h-28 bg-brand-red red-corner-slice-right opacity-90 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-brand-red red-corner-slice-left opacity-90 pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
            PACKAGES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-14">
            Production Packages
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STUDIO_PACKAGES_DATA.map((pkg) => (
              <div
                key={pkg.id}
                className="studio-card bg-white p-7 rounded-2xl flex flex-col justify-between text-left"
              >
                <div>
                  <h3 className="text-base font-black text-slate-900 text-center mb-1">
                    {pkg.name}
                  </h3>
                  <div className="text-center font-black text-lg text-slate-900 mb-2">
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
          </div>

          <div className="mt-12">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-red hover:underline uppercase tracking-wider"
            >
              <span>View Monthly Subscription Packages & Membership Benefits</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BOTTOM CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-center">
        <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl sm:text-2xl font-black mb-1">
              Ready To Create Your Next Project?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Every great brand has a story worth sharing. Let&apos;s turn it into content people trust.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black uppercase tracking-wider transition-all shadow-red-glow"
            >
              Book Your Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
