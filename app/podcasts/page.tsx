'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mic,
  Video,
  Radio,
  Share2,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { STUDIO_PACKAGES_DATA } from '@/lib/data';

const STUDIO_TEL_HREF = 'tel:+94777352700';

export default function PodcastsPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* Header Banner */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-3 block">
          PODCAST PRODUCTION
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
          Launch Your Flagship Podcast
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          Everything required to produce, record, edit, and distribute a world-class podcast series from Colombo 07.
        </p>
      </section>

      {/* 4 Core Pillars */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Recording',
              desc: 'Acoustic whisper suite with Shure SM7B broadcast audio chain.',
              icon: Mic,
            },
            {
              title: 'Multi-Camera Production',
              desc: 'Up to 4x 4K Sony FX cinema cameras with dynamic switching.',
              icon: Video,
            },
            {
              title: 'Audio Engineering',
              desc: 'Pristine sound mastering, noise removal, and stereo mixing.',
              icon: Radio,
            },
            {
              title: 'Distribution Support',
              desc: 'Spotify, Apple Podcasts, YouTube upload & viral vertical shorts.',
              icon: Share2,
            },
          ].map((pillar, i) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={i}
                className="studio-card p-6 rounded-2xl bg-white border border-slate-200"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-4">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">{pillar.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Studio Overview & Virtual Tour Gallery */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
            STUDIO OVERVIEW
          </span>
          <h2 className="text-3xl font-black text-slate-900">
            Studio Gallery & Virtual Tour
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Main Podcast Set',
              desc: '3-camera setup with luxury couch & RGB mood lighting',
              img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
            },
            {
              title: 'Control Room & Switching',
              desc: 'Blackmagic ATEM Mini Extreme live program feed',
              img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
            },
            {
              title: 'Solo Host Stage',
              desc: 'Single-cam teleprompter setup for leaders & creators',
              img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Podcast Packages Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-2 block">
            PACKAGES
          </span>
          <h2 className="text-3xl font-black text-slate-900 mb-12">
            Podcast Studio Packages
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
                  href="/book-studio"
                  className="w-full py-2.5 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-sm hover:shadow-red-glow flex items-center justify-center"
                >
                  <span>Book The Studio</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast FAQs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Podcast FAQs
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'How many people can record at once?',
              a: 'Our flagship whisper suite comfortably accommodates up to 4 on-mic hosts/guests simultaneously with individual Shure SM7B mics and headphone mixes.',
            },
            {
              q: 'Do you provide raw video and audio files?',
              a: 'Yes, all packages include raw 24-bit WAV audio stems and 4K camera ISO video files delivered via high-speed cloud link.',
            },
            {
              q: 'Can you help with publishing to Spotify and Apple Podcasts?',
              a: 'Yes, our distribution team can set up your RSS feed, upload episodes, write SEO show notes, and distribute to all major podcast platforms.',
            },
          ].map((faq, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-red shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Launch Your Podcast With WIZEtv</h2>
          <p className="text-sm text-slate-400 mb-8">
            Book your session in our Colombo studio today or talk with our executive producer.
          </p>
          <Link
            href="/book-studio"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black uppercase tracking-wider transition-all shadow-red-glow text-center"
          >
            <span>Book The Studio</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
