'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Camera,
  Video,
  Film,
  Smartphone,
  CheckCircle2,
  Check,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Flame,
  Star,
  Radio,
  Sliders,
  Download,
  FileText,
  Zap,
  Award,
  Crown,
  ShieldCheck,
} from 'lucide-react';
import { AudioWaveform } from '@/components/ui/AudioWaveform';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import { PodcastCarousel } from '@/components/ui/PodcastCarousel';
import { StudioCatalogueViewer } from '@/components/ui/StudioCatalogueViewer';
import { STUDIO_SHOWCASE_IMAGES } from '@/lib/studioImages';
import { STUDIO_PACKAGES_DATA, SUBSCRIPTION_PACKAGES_DATA, SubscriptionPackageItem, StudioPackageItem } from '@/lib/data';
import { AdditionalServicesDropdown } from '@/components/ui/AdditionalServicesDropdown';
import { SubscriptionInquiryModal } from '@/components/ui/SubscriptionInquiryModal';

const STUDIO_PHONE = '077 779 4600';
const STUDIO_TEL_HREF = 'tel:+94777794600';

const DISCIPLINES = ['Podcasting', 'Production', 'Storytelling', 'Editing'];

const PACKAGE_ICONS: Record<string, React.ElementType> = {
  'audio-only-podcast': Mic,
  'solo-video-podcast': Camera,
  'dual-host-video-podcast': Video,
  'custom-premium-experience': Sliders,
};

const SUBSCRIPTION_ICONS: Record<string, React.ElementType> = {
  'basic-subscription': Zap,
  'bronze-subscription': Award,
  'silver-subscription': Crown,
  'gold-subscription': Star,
};

export default function HomePage() {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [inquiryPackage, setInquiryPackage] = useState<SubscriptionPackageItem | StudioPackageItem | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % DISCIPLINES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white text-slate-900 overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. IMMERSIVE FULL-WIDTH 3D SHOWCASE HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative min-h-[680px] sm:min-h-[780px] lg:min-h-[840px] flex items-center justify-center overflow-hidden border-b border-slate-100 bg-white">
        {/* --- Background 3D Showcase & Background Edge Shaders (Strictly z-0) --- */}
        <div className="absolute inset-0 z-0 overflow-hidden w-full h-full pointer-events-none opacity-40 sm:opacity-70 lg:opacity-100">
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
        <div className="relative z-10 isolate max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 lg:pt-20 pb-14 sm:pb-24 w-full flex justify-start items-start">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-2xl lg:max-w-3xl xl:max-w-4xl w-full text-left"
          >
            {/* Headline (Bigger & High-Impact) */}
            <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-[5.5rem] font-black tracking-tight text-slate-950 leading-[1.02] sm:leading-[0.98] mb-5 sm:mb-6">
              Your Story, <br />
              <span className="text-brand-red">Our Studio.</span>
            </h1>

            {/* Disciplines & Tagline (Beautiful One-by-One Presentation) */}
            <div className="space-y-4 mb-8 max-w-2xl">
              {/* Disciplines Pill Chips (One by One) */}
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                {DISCIPLINES.map((name, idx) => {
                  const isActive = activeWordIndex === idx;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setActiveWordIndex(idx)}
                      className={`group relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black tracking-wide transition-all duration-300 flex items-center gap-2 border shadow-sm ${
                        isActive
                          ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-105'
                          : 'bg-white/85 hover:bg-white text-slate-800 border-slate-200/90 hover:border-slate-400 backdrop-blur-sm'
                      }`}
                    >
                      <span>{name}</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          isActive ? 'bg-brand-red animate-pulse' : 'bg-slate-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Tagline Anchor */}
              <p className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-950 leading-tight">
                The Best Studio Experience in{' '}
                <span className="text-brand-red">Sri Lanka.</span>
              </p>

              {/* Context Description */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-semibold leading-relaxed max-w-xl">
                Designed for founders, businesses, and creators who want every episode to reflect the highest caliber of their brand.
              </p>
            </div>

            {/* CTA Buttons (Bigger, Modern & High-Impact) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
              <Link
                href="/contact?type=inquiry"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-12 py-3.5 sm:py-5 rounded-2xl bg-slate-950 hover:bg-black text-white text-sm sm:text-base font-black tracking-wide transition-all duration-300 border border-slate-800 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.4),inset_0_1px_1.5px_rgba(255,255,255,0.2)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.55)] active:scale-[0.98] w-full sm:w-auto text-center"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>

              <Link
                href="/book-studio"
                className="group relative inline-flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-5 rounded-2xl bg-gradient-to-r from-brand-red via-[#f02d33] to-brand-red hover:from-[#f02d33] hover:to-brand-red text-white text-sm sm:text-base font-black tracking-wide transition-all duration-300 border border-red-400/30 shadow-[0_14px_34px_-6px_rgba(236,35,40,0.55),inset_0_1.5px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_18px_42px_-4px_rgba(236,35,40,0.7)] active:scale-[0.98] w-full sm:w-auto text-center"
              >
                <span>Book The Studio</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHAT WE DO — Full-Service Creative Production (Video + 4 Cards) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
              WHAT WE DO
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Full-Service Creative Production.
            </h2>
          </div>

          {/* Centered Video in 4:1 Widescreen Ratio */}
          <div className="max-w-6xl mx-auto mb-14">
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_35px_-8px_rgba(0,0,0,0.1)] border border-slate-200/90 bg-slate-950 aspect-[4/1]">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              >
                <source src="/images/videos/animate%20video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
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
                  className="group relative bg-white rounded-2xl p-7 border border-slate-200/90 hover:border-brand-red/40 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(236,35,40,0.12)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                >
                  {/* Subtle top indicator highlight */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-red/0 to-transparent group-hover:via-brand-red transition-all duration-500" />

                  <div>
                    {/* Top Row: Icon */}
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-800 group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red transition-all duration-300 shadow-sm">
                        <IconComp className="w-6 h-6" strokeWidth={1.75} />
                      </div>
                    </div>

                    {/* Card Content */}
                    <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug mb-3 group-hover:text-brand-red transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PODCAST SECTION — Create Conversations That Matter */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
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
                From first-time podcasters to established brands, WIZEtv helps creators launch powerful conversations.
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

            {/* Right Visual Column — Interactive Studio Showcase Carousel */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end w-full">
              <PodcastCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. STUDIO SECTION — Your Content Deserves A Better Stage */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 relative overflow-hidden border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
                STUDIO OVERVIEW
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4">
                Your Content Deserves A Better Stage.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 font-medium">
                Built for podcasts, interviews, livestreams, webinars, and digital media productions.
              </p>

              {/* 4 Features Only (No extra descriptions) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-8">
                {[
                  'Professional lighting.',
                  'Premium audio.',
                  'Multi-camera production.',
                  'Creator-ready setup.',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm hover:shadow-md hover:border-brand-red/40 transition-all"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-red shadow-[0_0_8px_rgba(236,35,40,0.6)] shrink-0" />
                    <span className="text-sm font-bold text-slate-900 tracking-wide">{item}</span>
                  </div>
                ))}
              </div>

              {/* Download Catalogue (PDF) Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href="/api/download-catalogue"
                  download="WizeTV_studio_catalogue.pdf"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-brand-red hover:bg-red-600 text-white font-bold text-sm shadow-[0_4px_20px_rgba(236,35,40,0.35)] hover:shadow-[0_6px_25px_rgba(236,35,40,0.5)] transition-all duration-300 active:scale-95 text-center"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Catalogue (PDF)</span>
                </a>
                <a
                  href="/downloads/WizeTV_studio_catalogue.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-200 shadow-sm hover:shadow transition-all text-center"
                >
                  <FileText className="w-4 h-4 text-slate-600" />
                  <span>Preview PDF</span>
                </a>
              </div>
            </div>

            {/* Right Visual Column: 2000x2000 px 3D Catalogue Book Viewer */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <StudioCatalogueViewer />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PRODUCTION PACKAGES PREVIEW */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative border-t border-slate-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 bg-brand-red red-corner-slice-right opacity-90 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-brand-red red-corner-slice-left opacity-90 pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
            PACKAGES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-14">
            Production Packages
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {STUDIO_PACKAGES_DATA.map((pkg) => {
              const IconComponent = PACKAGE_ICONS[pkg.slug] || Star;
              const isPopular = !!pkg.popular;

              return (
                <div
                  key={pkg.id}
                  className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:px-5 lg:py-6 xl:p-7 flex flex-col justify-between text-left transition-all duration-300 ${
                    isPopular
                      ? 'border-2 border-brand-red shadow-xl shadow-red-500/10 ring-4 ring-brand-red/5 hover:-translate-y-1'
                      : 'border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1'
                  }`}
                >
                  {/* Floating Popular Badge */}
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-red text-white text-[10px] font-black uppercase tracking-wider shadow-md shadow-brand-red/30 flex items-center gap-1.5 whitespace-nowrap">
                      <Flame className="w-3 h-3 fill-current" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div>
                    {/* Top Meta: Iconic Symbol + Duration Badge */}
                    <div className="flex items-center justify-between gap-3 mb-6 h-12">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          isPopular
                            ? 'bg-brand-red text-white shadow-md shadow-brand-red/25'
                            : 'bg-slate-100 text-slate-800 group-hover:bg-brand-red group-hover:text-white'
                        }`}
                      >
                        <IconComponent className="w-5 h-5 stroke-[2.2]" />
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 tracking-tight shrink-0 whitespace-nowrap">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{pkg.duration}</span>
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 h-[38px] mb-5">
                      {pkg.bestFor}
                    </p>

                    {/* Price Block */}
                    <div className="pt-4 pb-5 border-t border-b border-slate-100 mb-6 min-h-[88px] flex flex-col justify-center">
                      <div className="flex items-baseline gap-1 sm:gap-1.5 whitespace-nowrap">
                        <span className="text-xl sm:text-2xl lg:text-[20px] xl:text-[23px] 2xl:text-[26px] font-black text-slate-900 tracking-tight whitespace-nowrap">
                          {pkg.priceLKR}
                        </span>
                        {pkg.priceNum > 0 && (
                          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 whitespace-nowrap shrink-0">/ session</span>
                        )}
                      </div>
                      <span className="text-[11px] font-medium text-slate-400 block mt-1 whitespace-nowrap">
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

                  {/* Interactive Modern Action Button: Book Studio Page OR Custom Quotation Modal */}
                  {pkg.slug === 'custom-premium-experience' || pkg.priceNum === 0 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setInquiryPackage(pkg);
                        setIsInquiryModalOpen(true);
                      }}
                      className={`group/btn w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center text-center transition-all duration-200 cursor-pointer ${
                        isPopular
                          ? 'bg-brand-red hover:bg-brand-red-hover text-white shadow-md shadow-brand-red/25 hover:shadow-lg hover:shadow-brand-red/35 hover:-translate-y-0.5'
                          : 'bg-slate-900 hover:bg-brand-red text-white hover:shadow-md hover:shadow-brand-red/20'
                      }`}
                    >
                      <span>Book The Studio</span>
                    </button>
                  ) : (
                    <Link
                      href="/book-studio"
                      className={`group/btn w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center text-center transition-all duration-200 ${
                        isPopular
                          ? 'bg-brand-red hover:bg-brand-red-hover text-white shadow-md shadow-brand-red/25 hover:shadow-lg hover:shadow-brand-red/35 hover:-translate-y-0.5'
                          : 'bg-slate-900 hover:bg-brand-red text-white hover:shadow-md hover:shadow-brand-red/20'
                      }`}
                    >
                      <span>Book The Studio</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* SUBSCRIPTION PACKAGES (MONTHLY RECURRING) */}
          {/* ========================================================================= */}
          <div className="mt-20 sm:mt-24 pt-16 sm:pt-20 border-t border-slate-200/80">
            <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
              MEMBERSHIP TIERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
              Subscription Packages (Monthly Recurring)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto mb-14">
              Fixed monthly studio allocations, priority scheduling, and dedicated production support.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {SUBSCRIPTION_PACKAGES_DATA.map((sub) => {
                const IconComponent = SUBSCRIPTION_ICONS[sub.slug] || Crown;
                const isPopular = !!sub.popular;

                return (
                  <div
                    key={sub.id}
                    className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:px-5 lg:py-6 xl:p-7 flex flex-col justify-between text-left transition-all duration-300 ${
                      isPopular
                        ? 'border-2 border-brand-red shadow-xl shadow-red-500/10 ring-4 ring-brand-red/5 hover:-translate-y-1'
                        : 'border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1'
                    }`}
                  >
                    {/* Floating Popular Badge */}
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-red text-white text-[10px] font-black uppercase tracking-wider shadow-md shadow-brand-red/30 flex items-center gap-1.5 whitespace-nowrap">
                        <Crown className="w-3 h-3 fill-current" />
                        <span>Creator Choice</span>
                      </div>
                    )}

                    <div>
                      {/* Top Meta: Iconic Symbol + Priority Badge */}
                      <div className="flex items-center justify-between gap-3 mb-6 h-12">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                            isPopular
                              ? 'bg-brand-red text-white shadow-md shadow-brand-red/25'
                              : 'bg-slate-100 text-slate-800 group-hover:bg-brand-red group-hover:text-white'
                          }`}
                        >
                          <IconComponent className="w-5 h-5 stroke-[2.2]" />
                        </div>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 tracking-tight shrink-0 whitespace-nowrap">
                          <ShieldCheck className="w-3 h-3 text-slate-400" />
                          <span>{sub.priority === 'Priority' ? 'Priority Access' : `${sub.priority} Priority`}</span>
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1">
                        {sub.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 h-[38px] mb-5">
                        {sub.recommendedFor}
                      </p>

                      {/* Price Block */}
                      <div className="pt-4 pb-5 border-t border-b border-slate-100 mb-6 min-h-[88px] flex flex-col justify-center">
                        <div className="flex items-baseline gap-1 sm:gap-1.5 whitespace-nowrap">
                          <span className="text-xl sm:text-2xl lg:text-[19px] xl:text-[23px] 2xl:text-[26px] font-black text-slate-900 tracking-tight whitespace-nowrap">
                            {sub.monthlyFeeLKR}
                          </span>
                          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 whitespace-nowrap shrink-0">
                            / month
                          </span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-400 block mt-1 whitespace-nowrap">
                          Monthly recurring membership
                        </span>
                      </div>

                      {/* Studio Time & Allocation on clean light card style */}
                      <div className="space-y-3 mb-8">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Studio Time & Allocation
                        </span>

                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                          <div className="flex items-center justify-between gap-3 mb-2.5">
                            <div className="min-h-[38px] flex flex-col justify-center">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                                Monthly Allocation
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-slate-900 block leading-tight">
                                {sub.sessionCount}
                              </span>
                            </div>

                            {/* 3D Embossed Hours Tag */}
                            <div className="shrink-0 px-3.5 py-1.5 rounded-xl bg-gradient-to-br from-brand-red via-[#f02d33] to-[#b91c1c] text-white shadow-md shadow-brand-red/30 border border-red-400/30 flex items-baseline gap-1 text-center font-black">
                              <span className="text-lg leading-none tracking-tight">{sub.hoursBadge}</span>
                              <span className="text-[9px] uppercase tracking-wider opacity-90 font-black">HRS</span>
                            </div>
                          </div>

                          {/* Camera Setup Category */}
                          {sub.cameras && (
                            <div className="pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[11px] sm:text-xs">
                              <span className="flex items-center gap-1.5 text-slate-500 font-semibold">
                                <Camera className="w-3.5 h-3.5 text-brand-red" />
                                <span>Camera Setup</span>
                              </span>
                              <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200/80 shadow-xs">
                                {sub.cameras}
                              </span>
                            </div>
                          )}

                          {sub.idealUseCase && (
                            <div className="pt-2 border-t border-slate-200/70 flex items-start gap-2 text-[11px] sm:text-xs text-slate-600 font-medium">
                              <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 mt-0.5">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                              <span className="leading-snug">{sub.idealUseCase}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Modern Action Button: Opens Subscription Email Inquiry Modal */}
                    <button
                      type="button"
                      onClick={() => {
                        setInquiryPackage(sub);
                        setIsInquiryModalOpen(true);
                      }}
                      className={`group/btn w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center text-center transition-all duration-200 cursor-pointer ${
                        isPopular
                          ? 'bg-brand-red hover:bg-brand-red-hover text-white shadow-md shadow-brand-red/25 hover:shadow-lg hover:shadow-brand-red/35 hover:-translate-y-0.5'
                          : 'bg-slate-900 hover:bg-brand-red text-white hover:shadow-md hover:shadow-brand-red/20'
                      }`}
                    >
                      <span>Book The Studio</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Simple Dropdown for Additional A La Carte Services & Equipment */}
          <AdditionalServicesDropdown />

          <div className="mt-12">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-red hover:underline uppercase tracking-wider"
            >
              <span>View More Details About Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BOTTOM CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-center">
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl sm:text-2xl font-black mb-1">
              Ready To Create Your Next Project?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Every great brand has a story worth sharing. Let&apos;s turn it into content people trust.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/book-studio"
              className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black uppercase tracking-wider transition-all shadow-red-glow flex items-center justify-center"
            >
              <span>Book The Studio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Subscription Inquiry Email Modal */}
      <SubscriptionInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        selectedPackage={inquiryPackage}
      />
    </div>
  );
}
