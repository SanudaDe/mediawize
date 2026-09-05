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
} from 'lucide-react';

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

      {/* Production Process (5 Steps) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-14">
            Our Production Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: 'Step 1', desc: 'Tell us about your project.' },
              { step: 'Step 2', desc: "We'll recommend the right package." },
              { step: 'Step 3', desc: 'Book your recording session.' },
              { step: 'Step 4', desc: 'Our team records and produces your content.' },
              { step: 'Step 5', desc: 'We edit, review and deliver your final content.' },
            ].map((p, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 text-left flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-brand-red block mb-3">
                    {p.step}
                  </span>
                  <p className="text-sm font-semibold text-slate-200">{p.desc}</p>
                </div>
              </div>
            ))}
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
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black uppercase tracking-wider transition-all shadow-red-glow"
            >
              Book Your Studio
            </Link>
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
