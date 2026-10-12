'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Phone,
  Tv,
  Clock,
  BookOpen,
} from 'lucide-react';
import { AudioWaveform } from '@/components/ui/AudioWaveform';
import { VIDEO_CONTENTS } from '@/lib/videoContents';
import { VideoMockupCard } from '@/components/ui/VideoMockupCard';
import { BLOG_POSTS } from '@/lib/data';

const VIDEO_CATEGORIES = [
  'All Videos',
  'WIZEtv Podcast',
  'Tips & Tricks',
  'Gear & BTS',
  'Studio Showcase',
];

const STUDIO_PHONE = '077 735 2700';
const STUDIO_TEL_HREF = 'tel:+94777352700';

export default function BlogPage() {
  const [activeVideoCategory, setActiveVideoCategory] = useState('All Videos');

  const linkedinArticles = BLOG_POSTS.filter((p) => p.linkedinUrl);

  const filteredVideos =
    activeVideoCategory === 'All Videos'
      ? VIDEO_CONTENTS
      : VIDEO_CONTENTS.filter((vid) => vid.category === activeVideoCategory);

  return (
    <div className="bg-white text-slate-900 overflow-hidden min-h-screen">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Styled exactly like Home Page) */}
      {/* ========================================================================= */}
      <section className="relative py-16 sm:py-24 border-b border-slate-100 bg-white text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-3 block">
            CREATOR INSIGHTS & PRODUCTION MEDIA
          </span>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.05] mb-5">
            Your Content, <br />
            <span className="text-brand-red">In Motion.</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-700 font-semibold leading-relaxed max-w-2xl mx-auto mb-8">
            Explore our latest published articles, studio podcast episodes, and creator insights. Read our LinkedIn editorial features or watch full episodes on Facebook.
          </p>

          {/* Animated Waveform Perfectly Centered */}
          <div className="flex items-center justify-center w-full max-w-md mx-auto mb-8">
            <AudioWaveform className="justify-center mx-auto" />
          </div>

          {/* Quick Studio Booking Hotline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
            <span>Studio Booking Hotline:</span>
            <a
              href={STUDIO_TEL_HREF}
              className="text-brand-red font-black hover:underline flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>{STUDIO_PHONE}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ARTICLES & EDITORIAL (LinkedIn Pulse Feature + Creator Guides) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
                ARTICLES & EDITORIAL
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Insights for Leaders & Creators.
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Read our latest published articles on corporate podcasting, personal branding, and media strategy.
              </p>
            </div>
          </div>

          {/* Featured LinkedIn Editorial Spotlight Grid */}
          {linkedinArticles.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center gap-2.5 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#0A66C2] text-white shadow-sm">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn Pulse Editorial
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Official publications by WIZEtv
                </span>
              </div>

              <div className={`grid grid-cols-1 ${linkedinArticles.length > 1 ? 'md:grid-cols-2' : ''} gap-8`}>
                {linkedinArticles.map((article) => (
                  <a
                    key={article.slug}
                    href={article.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 hover:border-brand-red/40 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-15px_rgba(236,35,40,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-red/0 to-transparent group-hover:via-brand-red transition-all duration-500" />

                    <div>
                      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-100 shadow-sm select-none mb-6">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex items-center gap-2 flex-wrap mb-3.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0A66C2] text-white shadow-sm">
                          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                          LinkedIn Pulse
                        </span>
                        <span className="bg-brand-red text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                          {article.category}
                        </span>
                        <span className="text-slate-400 text-xs font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {article.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-tight group-hover:text-brand-red transition-colors mb-3">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed line-clamp-3 mb-6">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span>Published by</span>
                        <span className="text-slate-900 font-bold">WIZEtv</span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A66C2] group-hover:bg-[#004182] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-blue-500/20">
                        <span>Read on LinkedIn</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. VIDEO SHOWCASE SECTION (Home Page 'What We Do' Section Style) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading & Category Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-slate-200/80">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
                VIDEO PRODUCTIONS & REELS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Featured Episodes & Content Grabs.
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Featuring original video covers from WIZEtv productions. Click any card to watch directly on Facebook.
              </p>
            </div>

            {/* Home-Page Style Category Chip Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {VIDEO_CATEGORIES.map((cat) => {
                const isActive = activeVideoCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveVideoCategory(cat)}
                    className={`group relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black tracking-wide transition-all duration-300 flex items-center gap-2 border shadow-sm ${
                      isActive
                        ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-105'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive ? 'bg-brand-red animate-pulse' : 'bg-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video Cards Grid (Original Facebook Video Covers) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVideos.map((video) => (
              <VideoMockupCard key={video.id} item={video} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. STUDIO DIRECT CALL BOOKING CTA BANNER (Home Page High-Impact Style) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-slate-950 p-10 sm:p-16 text-center text-white relative overflow-hidden border border-slate-800 shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-3 block">
              STUDIO BOOKINGS & HOTLINE
            </span>

            <h2 className="text-3xl sm:text-5xl font-black mb-6 leading-tight">
              Ready to Book Your Next Episode? <br />
              <span className="text-brand-red">Call Our Studio Directly.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium mb-10 max-w-2xl mx-auto">
              Skip the forms. Call our studio coordinator directly to check live slot availability and confirm your recording session immediately.
            </p>

            {/* Direct Phone Call Call-to-Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book-studio"
                className="group inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-brand-red via-[#f02d33] to-brand-red hover:from-[#f02d33] hover:to-brand-red text-white text-sm sm:text-base font-black tracking-wide transition-all shadow-[0_14px_34px_-6px_rgba(236,35,40,0.6)] hover:shadow-[0_18px_42px_-4px_rgba(236,35,40,0.75)] active:scale-[0.98] w-full sm:w-auto text-center"
              >
                <span>Book The Studio</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 text-sm sm:text-base font-black tracking-wide transition-all shadow-md active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Studio Location & Details</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
