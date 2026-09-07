'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Camera,
  Mic,
  Sliders,
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle2,
  Maximize2,
  Layers,
  Film,
  Flame,
} from 'lucide-react';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import { STUDIO_SHOWCASE_IMAGES, STUDIO_GALLERY_ITEMS } from '@/lib/studioImages';

export default function StudioImagesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  const categories = ['All', 'Studio Set', 'Cinema Cameras', 'Audio Rig', 'Control Room'];

  const filteredItems =
    selectedCategory === 'All'
      ? STUDIO_GALLERY_ITEMS
      : STUDIO_GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* ========================================================================= */}
      {/* 1. HERO HEADER */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-10 sm:pt-16 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-red" />
            <span className="text-xs font-black uppercase tracking-wider text-brand-red">
              WizeTV Studio Gallery
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15] mb-5">
            Step Inside Our <br />
            <span className="text-brand-red">Production Universe</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl leading-relaxed">
            Take a visual tour through our acoustically treated whisper suites, multi-camera cinema stages, and broadcast control rooms in Colombo.
          </p>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 3D MARQUEE SHOWCASE */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-3xl bg-slate-950 p-3 sm:p-5 ring-1 ring-slate-800 shadow-2xl overflow-hidden"
        >
          {/* Top Bar inside the container */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Live 3D Studio Showcase
              </span>
            </div>
            <div className="text-[11px] font-medium text-slate-400">
              Hover & explore • Continuous 3D Flow
            </div>
          </div>

          {/* Aceternity 3D Marquee Component */}
          <ThreeDMarquee
            images={STUDIO_SHOWCASE_IMAGES}
            className="h-[460px] sm:h-[600px] lg:h-[720px] w-full"
            innerScaleClass="scale-[0.85] sm:scale-[1.0] lg:scale-[1.1]"
          />

          {/* Bottom subtle bar */}
          <div className="mt-2 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 px-4">
            <span>{STUDIO_SHOWCASE_IMAGES.length} Studio Angles & Assets Loaded</span>
            <span className="text-brand-red font-semibold">WizeTV Colombo</span>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 3. STUDIO SPECIFICATIONS BAR */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-12 px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5 text-brand-red" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">4K 10-Bit Video</h4>
              <p className="text-xs text-slate-500 mt-0.5">Multi-angle Sony FX cinema cameras</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
              <Mic className="w-5 h-5 text-brand-red" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Shure SM7B Audio</h4>
              <p className="text-xs text-slate-500 mt-0.5">Broadcast-grade vocal clarity & depth</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
              <Sliders className="w-5 h-5 text-brand-red" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Whisper Suite Acoustics</h4>
              <p className="text-xs text-slate-500 mt-0.5">NRC 0.95 sound isolation walls</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-brand-red" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Live Vision Mixing</h4>
              <p className="text-xs text-slate-500 mt-0.5">Real-time director switching & ISO cuts</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. DETAILED PHOTO GALLERY & CATEGORIES */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-red mb-1.5 block">
              Curated Spaces
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explore Our Recording Environments
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              key={item.id}
              className="group rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/90 backdrop-blur-sm text-slate-900 px-2.5 py-1 rounded-md shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-brand-red transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">
                    WizeTV Studios Colombo
                  </span>
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-brand-red flex items-center gap-1 hover:underline"
                  >
                    <span>Book Setup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-14 overflow-hidden text-center flex flex-col items-center">
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-xs font-black uppercase tracking-widest text-brand-red mb-3 block">
            READY TO CREATE?
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-2xl leading-tight mb-4">
            Experience the Studio in Person or Book a Recording Session
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mb-8 leading-relaxed">
            Our engineers handle all cameras, lighting, audio levels, and live switching so you can focus entirely on delivering great conversation.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              href="/pricing"
              className="px-7 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              View Packages & Rates
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-red-glow"
            >
              Book The Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
