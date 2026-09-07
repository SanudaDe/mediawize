'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { STUDIO_SHOWCASE_IMAGES } from '@/lib/studioImages';

interface PodcastCarouselProps {
  images?: string[];
  autoPlayInterval?: number; // 3500ms
  className?: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.35 },
      scale: { duration: 0.35 },
    },
  }),
};

export function PodcastCarousel({
  images = STUDIO_SHOWCASE_IMAGES,
  autoPlayInterval = 3500,
  className = '',
}: PodcastCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const total = images.length;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Auto-play loop
  useEffect(() => {
    if (isPaused || total <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [nextSlide, isPaused, autoPlayInterval, total, currentIndex]);

  // Mobile Touch Swipe (Distinguishes between horizontal swipe and vertical page scroll)
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

  return (
    <div
      className={`relative w-full max-w-[520px] select-none group ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative Brand Red Watermark Accents (Safe bounded offsets for mobile) */}
      <div className="absolute -top-2.5 sm:-top-5 -left-2.5 sm:-left-5 w-16 sm:w-24 h-16 sm:h-24 bg-brand-red red-tv-watermark rounded-2xl z-0 transition-transform duration-500 group-hover:scale-105 pointer-events-none" />
      <div className="absolute -bottom-3 sm:-bottom-6 -right-2.5 sm:-right-6 w-24 sm:w-36 h-24 sm:h-36 bg-brand-red red-tv-watermark rounded-3xl red-corner-slice-right z-0 transition-transform duration-500 group-hover:scale-105 pointer-events-none" />

      {/* Main Glass Card Frame (Portrait 4:5 on mobile to perfectly frame vertical photography, 4:3 on desktop) */}
      <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/5] sm:aspect-[4/3] bg-slate-900">
        {/* Subtle Top Progress Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
          <motion.div
            key={currentIndex + (isPaused ? '-paused' : '-running')}
            className="h-full bg-brand-red"
            initial={{ width: '0%' }}
            animate={{ width: isPaused ? '0%' : '100%' }}
            transition={{
              duration: isPaused ? 0 : autoPlayInterval / 1000,
              ease: 'linear',
            }}
          />
        </div>

        {/* Top Badges Bar */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex items-center justify-between pointer-events-none">
          {/* Live Studio Rig Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg pointer-events-auto">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-slate-200">
              Live Studio Rig
            </span>
          </div>

          {/* Photo Counter */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-colors shadow-lg"
              title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
            >
              {isPaused ? <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
            </button>
            <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] sm:text-xs font-bold tracking-widest shadow-lg">
              <span className="text-white">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-white/40 mx-1">/</span>
              <span className="text-white/60">{String(total).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Slide Viewport with Framer Motion */}
        <div className="relative w-full h-full">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentImage}
                alt={`WizeTV Studio Set - Slide ${currentIndex + 1}`}
                fill
                priority={currentIndex === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
              />
              {/* Subtle gradient so controls pop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Manual Navigation Controls (Left / Right Floating Glass Chevrons) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous Studio Photo"
          className="absolute left-2 sm:left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 hover:bg-brand-red hover:border-brand-red hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-xl group-hover:opacity-100 opacity-80"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 -ml-0.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next Studio Photo"
          className="absolute right-2 sm:right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 hover:bg-brand-red hover:border-brand-red hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-xl group-hover:opacity-100 opacity-80"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 -mr-0.5" />
        </button>

        {/* Bottom Pagination Dots (Compact Dot Strip) */}
        <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-xl max-w-[80%] overflow-x-auto no-scrollbar">
            {images.slice(0, 10).map((_, idx) => {
              const isActive = idx === (currentIndex % 10);
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-6 bg-brand-red shadow-[0_0_8px_rgba(236,35,40,0.8)]'
                      : 'w-2 bg-white/40 hover:bg-white/80'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
