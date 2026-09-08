'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mic,
  Building2,
  Video,
  Film,
  Smartphone,
  Radio,
  Camera,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  ShieldCheck,
  MessageSquare,
  SlidersHorizontal,
  CalendarCheck,
  Clapperboard,
  CheckCheck,
  Phone,
} from 'lucide-react';

const STUDIO_TEL_HREF = 'tel:+94777352700';
const STUDIO_PHONE = '077 735 2700';

export default function ServicesPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* Header Banner */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-3 block">
          OUR SERVICES
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
          Create Content That Builds Your Brand
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          If you&apos;re launching a podcast, producing a corporate video or creating content for your business, WizeTV provides everything you need under one roof. From planning and production to editing and distribution, our team helps you create professional content that informs, inspires and connects with your audience.
        </p>
      </section>

      {/* Services Breakdown */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {/* 1. Podcast Production */}
        <div id="podcast-production" className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-black uppercase tracking-widest mb-2">
              <Mic className="w-4 h-4" /> Podcast Production
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              Professional Podcasts Without the Production Stress
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
              Creating a successful podcast takes more than microphones and cameras. It requires planning, quality production and content that keeps people engaged. Whether you&apos;re recording your first episode or managing an ongoing podcast series, we handle the entire production process so you can focus on the conversation.
            </p>

            <div className="p-4 rounded-xl bg-white border border-slate-200 mb-6">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Perfect For:
              </span>
              <p className="text-xs font-bold text-slate-800">
                Entrepreneurs &bull; CEOs &bull; Corporate Teams &bull; Coaches &bull; Consultants &bull; Creators
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">
              Our Podcast Services:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
              {[
                'Podcast Studio Recording',
                'Audio Podcast Production',
                'Video Podcast Production',
                'Multi-Camera Recording',
                'Professional Audio Recording',
                'Intro & Outro Production',
                'Podcast Editing',
                'Thumbnail Design',
                'Podcast Distribution',
                'Short-form Content Creation',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Corporate Podcasts */}
        <div id="corporate-podcasts" className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-black uppercase tracking-widest mb-2">
              <Building2 className="w-4 h-4" /> Corporate Podcasts
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              Turn Your Business Into A Trusted Voice
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
              Corporate podcasts are one of the most effective ways to educate customers, build employer branding and position company leaders as industry experts. We help businesses create professional podcast series that strengthen relationships with customers, employees and stakeholders.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">
              Ideal For:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
              {[
                'CEO Interviews',
                'Leadership Conversations',
                'Customer Education',
                'Employer Branding',
                'Internal Communications',
                'Industry Discussions',
                'Product Stories',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Video Production */}
        <div id="video-production" className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-black uppercase tracking-widest mb-2">
              <Video className="w-4 h-4" /> Video Production
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              Content Designed To Capture Attention
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
              Video is one of the most powerful ways to tell your story. From business promotions to interviews and branded content, we create videos that are clear, engaging and professionally produced.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">
              Video Production Services:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
              {[
                'Corporate Videos',
                'Business Interviews',
                'Brand Campaigns',
                'Product Videos',
                'Event Coverage',
                'YouTube Videos',
                'Social Media Videos',
                'Documentary Style Content',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Editing & Post Production */}
        <div id="editing-post" className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-black uppercase tracking-widest mb-2">
              <Film className="w-4 h-4" /> Editing & Post Production
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              Great Content Is Finished In The Edit
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
              Recording is only the beginning. Our post-production team refines every project to deliver a polished final product that looks professional across every platform.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">
              Post Production Includes:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
              {[
                'Multi-Camera Editing',
                'Audio Enhancement',
                'Noise Reduction',
                'Colour Correction',
                'Motion Graphics',
                'Intro & Outro Animation',
                'Subtitles & Captions',
                'Thumbnail Design',
                'Platform Optimisation',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Short-Form Content */}
        <div id="shorts" className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-black uppercase tracking-widest mb-2">
              <Smartphone className="w-4 h-4" /> Short-Form Content
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              Record Once. Create Content For Weeks.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
              One podcast can become dozens of pieces of content. We transform long-form recordings into engaging short-form videos designed for every major platform.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">
              Content Repurposing:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
              {[
                'Instagram Reels',
                'TikTok Videos',
                'YouTube Shorts',
                'LinkedIn Clips',
                'Facebook Videos',
                'Quote Graphics',
                'Promotional Trailers',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Live Streaming */}
        <div id="livestream" className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-black uppercase tracking-widest mb-2">
              <Radio className="w-4 h-4" /> Live Streaming
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              Go Live With Confidence
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
              Broadcast your event, webinar or podcast with professional production and technical support.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">
              Live Streaming Services:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
              {[
                'Podcast Live Streaming',
                'Corporate Events',
                'Conferences',
                'Product Launches',
                'Panel Discussions',
                'Multi-Platform Streaming',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. Studio Rental */}
        <div id="studio-rental" className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-brand-red text-xs font-black uppercase tracking-widest mb-2">
              <Camera className="w-4 h-4" /> Studio Rental
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              Professional Spaces For Every Conversation
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
              Choose from multiple recording environments designed to match your brand and content style.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4">
              Studio Features:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
              {[
                'Premium Podcast Studios',
                'Multiple Recording Sets',
                'Air Conditioned Studios',
                'Professional Lighting',
                'Green Screen',
                'Parking Facilities',
                'Audio Engineer Support',
                'Production Crew Available',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* Production Process (5 Steps) — Clean Light Theme (No Blue Background) */}
      {/* ========================================================================= */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200 text-slate-900 mt-16 overflow-hidden">
        {/* Ambient Subtle Red Glow Accent (No Blue) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(236,35,40,0.06),transparent_70%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto text-center z-10">
          {/* Section Subtitle Badge */}
          <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            HOW IT WORKS
          </span>

          {/* Section Main Heading */}
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Our Production Process
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto mb-14 sm:mb-16">
            From initial concept to final broadcast delivery, our 5-step workflow guarantees frictionless production and world-class quality.
          </p>

          {/* Connected Steps Pipeline */}
          <div className="relative">
            {/* Desktop Horizontal Connecting Track */}
            <div className="hidden lg:block absolute top-[68px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-transparent via-slate-300 to-transparent z-0 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 relative z-10">
              {[
                {
                  number: '01',
                  title: 'Project Discovery',
                  desc: 'Tell us about your project.',
                  detail: 'Share your show concept, format, and creative vision.',
                  icon: MessageSquare,
                },
                {
                  number: '02',
                  title: 'Package Curation',
                  desc: "We'll recommend the right package.",
                  detail: 'Get a tailored plan covering multi-cam angles and audio rigs.',
                  icon: SlidersHorizontal,
                },
                {
                  number: '03',
                  title: 'Studio Booking',
                  desc: 'Book your recording session.',
                  detail: 'Select your preferred studio slot and schedule session dates.',
                  icon: CalendarCheck,
                },
                {
                  number: '04',
                  title: 'Live Production',
                  desc: 'Our team records and produces your content.',
                  detail: 'Our crew handles lighting, Sony 4K cinema optics & sound.',
                  icon: Clapperboard,
                },
                {
                  number: '05',
                  title: 'Edit & Delivery',
                  desc: 'We edit, review and deliver your final content.',
                  detail: 'Receive polished color-graded master video and viral cuts.',
                  icon: CheckCheck,
                },
              ].map((p, i) => {
                const IconComp = p.icon;
                return (
                  <div
                    key={i}
                    className="group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 hover:border-brand-red/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(236,35,40,0.15)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between text-left overflow-hidden"
                  >
                    {/* Top Subtle Edge Glow on Hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red/0 to-transparent group-hover:via-brand-red transition-all duration-500" />

                    {/* Iconic Modern Display Number (Translucent 65% gradient depth) */}
                    <span className="absolute top-2 sm:top-3 right-4 sm:right-5 font-black text-6xl sm:text-7xl tracking-tighter select-none pointer-events-none text-transparent bg-clip-text bg-gradient-to-b from-slate-900/65 via-slate-800/40 to-slate-400/10 group-hover:from-brand-red group-hover:via-red-500 group-hover:to-brand-red/30 transition-all duration-500">
                      {p.number}
                    </span>

                    <div>
                      {/* Top Row: Icon */}
                      <div className="mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:scale-110">
                          <IconComp className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Step Title */}
                      <h3 className="text-base font-black text-slate-900 tracking-tight mb-2 group-hover:text-brand-red transition-colors">
                        {p.title}
                      </h3>

                      {/* Original Prominent Description */}
                      <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug mb-2">
                        {p.desc}
                      </p>

                      {/* Explanatory Helper Detail */}
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                        {p.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action CTA below the steps */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-red-glow active:scale-95"
            >
              <span>Start Your Project Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why WizeTV? */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
            THE WIZE ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Why WizeTV?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'Complete Podcast Production',
            'Multiple Studio Locations',
            'Experienced Production Team',
            'Professional Audio & Video Equipment',
            'Fast Turnaround Times',
            'Creative Content Solutions',
            'Business & Corporate Focus',
            'End-to-End Production Support',
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0" />
              <span className="text-xs font-bold text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Ready To Create Your Next Project?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-8 font-medium">
            Every great brand has a story worth sharing. We help you turn it into professional podcasts, videos and content that people trust, remember and engage with.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href={STUDIO_TEL_HREF}
              className="px-8 py-3.5 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black uppercase tracking-wider transition-all shadow-red-glow flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 fill-white" />
              <span>Book The Studio</span>
            </a>
            <Link
              href="/contact?type=inquiry"
              className="px-8 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider transition-all"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
