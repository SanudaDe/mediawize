'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Pause,
  Play,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { STUDIO_CATALOGUE_PAGES, formatImageUrl } from '@/lib/podcastImages';

interface StudioCatalogueViewerProps {
  initialImages?: string[];
  autoPlayInterval?: number; // 6000ms (6s)
  className?: string;
}

export function StudioCatalogueViewer({
  initialImages = STUDIO_CATALOGUE_PAGES,
  autoPlayInterval = 6000,
  className = '',
}: StudioCatalogueViewerProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Sync images dynamically from /api/podcast-images
  useEffect(() => {
    let isMounted = true;
    async function loadImages() {
      try {
        const res = await fetch('/api/podcast-images');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.images && Array.isArray(data.images) && data.images.length > 0) {
            setImages(data.images);
          }
        }
      } catch (e) {
        // Fallback to initialImages
      }
    }
    loadImages();
    return () => {
      isMounted = false;
    };
  }, []);

  const total = images.length;

  const nextSlide = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total, isFlipping]);

  const prevSlide = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total, isFlipping]);

  const goToSlide = (idx: number) => {
    if (idx === currentIndex || isFlipping) return;
    setIsFlipping(true);
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // 6-Second Auto-play loop
  useEffect(() => {
    if (isPaused || total <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [nextSlide, isPaused, autoPlayInterval, total, currentIndex]);

  // Touch Swipe for Mobile (Distinguishes between horizontal swipe and vertical page scroll)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const safeSrc = formatImageUrl(currentImage);

  return (
    <div
      className={`relative w-full max-w-[560px] flex flex-col items-center select-none group ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Signature Red Watermark Accents (Safe bounded offsets for mobile) */}
      <div className="absolute -top-2.5 sm:-top-5 -left-2.5 sm:-left-5 w-16 sm:w-28 h-16 sm:h-28 bg-brand-red red-tv-watermark rounded-3xl z-0 transition-transform duration-500 group-hover:scale-105 pointer-events-none" />
      <div className="absolute -bottom-3 sm:-bottom-6 -right-2.5 sm:-right-6 w-24 sm:w-36 h-24 sm:h-36 bg-brand-red red-tv-watermark rounded-3xl red-corner-slice-right z-0 transition-transform duration-500 group-hover:scale-105 pointer-events-none" />

      {/* Top Header Controls Bar (Light Glass Theme) */}
      <div className="relative z-20 w-full mb-3 px-1 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm">
          <BookOpen className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-brand-red" />
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-800">
            Studio Catalogue
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Play / Pause Toggle */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume auto-play (6s)' : 'Pause auto-play'}
            className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            {isPaused ? <Play className="w-2.5 sm:w-3 h-2.5 sm:h-3" /> : <Pause className="w-2.5 sm:w-3 h-2.5 sm:h-3" />}
          </button>

          {/* Page Counter */}
          <div className="px-2.5 sm:px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 font-mono text-[10px] sm:text-xs font-bold text-slate-800 shadow-sm">
            <span className="text-brand-red font-extrabold">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-slate-400 mx-1">/</span>
            <span>{String(total).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* 3D BOOK STAGE CONTAINER (Exact 1:1 2000x2000 Aspect Ratio — Crisp Light Modern Aesthetic) */}
      <div
        className="relative z-10 w-full aspect-square rounded-3xl bg-white shadow-2xl border-4 border-white overflow-hidden"
        style={{ perspective: '1600px' }}
      >
        {/* Animated 6s Auto-Play Progress Bar at Top Edge */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 z-40 overflow-hidden">
          <motion.div
            key={currentIndex + (isPaused ? '-paused' : '-running')}
            className="h-full bg-brand-red shadow-[0_0_12px_#EC2328]"
            initial={{ width: '0%' }}
            animate={{ width: isPaused ? '0%' : '100%' }}
            transition={{
              duration: isPaused ? 0 : autoPlayInterval / 1000,
              ease: 'linear',
            }}
          />
        </div>

        {/* Clean 3D Page Turn Animation */}
        <AnimatePresence
          initial={false}
          custom={direction}
          mode="wait"
          onExitComplete={() => setIsFlipping(false)}
        >
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                x: dir > 0 ? 50 : -50,
                opacity: 0,
                rotateY: dir > 0 ? 12 : -12,
              }),
              center: {
                x: 0,
                opacity: 1,
                rotateY: 0,
                transition: {
                  duration: 0.45,
                  ease: [0.25, 1, 0.5, 1],
                },
              },
              exit: (dir: number) => ({
                x: dir > 0 ? -50 : 50,
                opacity: 0,
                rotateY: dir > 0 ? -12 : 12,
                transition: {
                  duration: 0.35,
                  ease: [0.4, 0, 0.2, 1],
                },
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
            className="absolute inset-0 w-full h-full z-10 bg-white overflow-hidden cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              if (clickX > rect.width / 2) {
                nextSlide();
              } else {
                prevSlide();
              }
            }}
          >
            {/* Real 100% sRGB 2000x2000 Original Catalogue Page */}
            <Image
              src={safeSrc}
              alt={`WIZEtv Studio Catalogue - Page ${currentIndex + 1}`}
              fill
              priority={currentIndex < 2}
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 560px"
              unoptimized
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows (Clean Modern Glass Buttons) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          disabled={isFlipping}
          aria-label="Previous Page"
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-brand-red text-slate-800 hover:text-white backdrop-blur-md border border-slate-200/80 hover:border-brand-red hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-lg disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 -ml-0.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          disabled={isFlipping}
          aria-label="Next Page"
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-brand-red text-slate-800 hover:text-white backdrop-blur-md border border-slate-200/80 hover:border-brand-red hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-lg disabled:opacity-40"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 -mr-0.5" />
        </button>
      </div>

      {/* Bottom Controls Bar: Centered Page Jump & Scrubber */}
      <div className="mt-4 w-full flex items-center justify-center px-1">
        {/* Quick Page Jump & Scrubber */}
        <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm text-slate-700">
          <button
            onClick={() => goToSlide(0)}
            disabled={currentIndex === 0 || isFlipping}
            title="First Page"
            className="text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-colors p-1"
          >
            <ChevronsLeft className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>

          {/* Interactive Range Scrubber for 30 pages */}
          <input
            type="range"
            min={0}
            max={total - 1}
            value={currentIndex}
            onChange={(e) => goToSlide(Number(e.target.value))}
            className="w-24 sm:w-44 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-red"
          />

          <button
            onClick={() => goToSlide(total - 1)}
            disabled={currentIndex === total - 1 || isFlipping}
            title="Last Page"
            className="text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-colors p-1"
          >
            <ChevronsRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
