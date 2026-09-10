'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { STUDIO_SHOWCASE_IMAGES } from '@/lib/studioImages';

interface PodcastCarouselProps {
  images?: string[];
  autoPlayInterval?: number; // 3500ms
  className?: string;
}

export function PodcastCarousel({
  images = STUDIO_SHOWCASE_IMAGES,
  autoPlayInterval = 3500,
  className = '',
}: PodcastCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const total = images.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((current) => {
      setPrevIndex(current);
      return (current + 1) % total;
    });
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((current) => {
      setPrevIndex(current);
      return (current - 1 + total) % total;
    });
  }, [total]);

  const goToSlide = useCallback((idx: number) => {
    setCurrentIndex((current) => {
      if (current === idx) return current;
      setPrevIndex(current);
      return idx;
    });
  }, []);

  // Continuous auto-play loop: advances non-stop, resets interval cleanly on slide change
  useEffect(() => {
    if (total <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [nextSlide, autoPlayInterval, total, currentIndex]);

  // Mobile Touch Swipe navigation
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
  const previousImage = images[prevIndex] || currentImage;

  return (
    <div
      className={`relative w-full max-w-[540px] lg:max-w-[580px] select-none ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative Brand Red Watermark Accents */}
      <div className="absolute -top-2.5 sm:-top-5 -left-2.5 sm:-left-5 w-16 sm:w-24 h-16 sm:h-24 bg-brand-red red-tv-watermark rounded-2xl z-0 pointer-events-none" />
      <div className="absolute -bottom-3 sm:-bottom-6 -right-2.5 sm:-right-6 w-24 sm:w-36 h-24 sm:h-36 bg-brand-red red-tv-watermark rounded-3xl red-corner-slice-right z-0 pointer-events-none" />

      {/* Main Glass Card Frame: Always 100% Filled at all times */}
      <div className="relative z-10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-slate-900 w-full">
        {/* Continuous Top Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30 overflow-hidden pointer-events-none">
          <motion.div
            key={currentIndex}
            className="h-full bg-brand-red"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: autoPlayInterval / 1000,
              ease: 'linear',
            }}
          />
        </div>

        {/* Top Badges Bar */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex items-center justify-between pointer-events-none">
          {/* Live Studio Rig Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-white shadow-lg pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse shadow-[0_0_8px_rgba(236,35,40,0.8)]" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-slate-100">
              Live Studio Rig
            </span>
          </div>

          {/* Photo Counter */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            <div className="px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] sm:text-xs font-bold tracking-widest shadow-lg flex items-center gap-1.5">
              <span className="text-brand-red font-black">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-white/40">/</span>
              <span className="text-white/70">{String(total).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Slide Viewport: Double-Buffered so frame is 100% filled at every millisecond */}
        <div className="relative w-full h-full overflow-hidden">
          {/* 1. Underlying Base Image (Always fully rendered and visible underneath) */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src={previousImage}
              alt="Studio Showcase Background"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 650px"
            />
          </div>

          {/* 2. Top Cross-Fading Image (Smoothly cross-fades over base image with zero empty frames) */}
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 w-full h-full z-10"
            >
              <Image
                src={currentImage}
                alt={`WIZEtv Studio Set - Slide ${currentIndex + 1}`}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 650px"
              />
              {/* Subtle gradient overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Manual Navigation Controls (Left / Right Chevrons) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous Studio Photo"
          className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/55 backdrop-blur-md text-white border border-white/20 hover:bg-brand-red hover:border-brand-red hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-xl cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next Studio Photo"
          className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/55 backdrop-blur-md text-white border border-white/20 hover:bg-brand-red hover:border-brand-red hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-xl cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 -mr-0.5" />
        </button>

        {/* Bottom Pagination Indicators (Interactive Dots with Active Pill) */}
        <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-20 flex items-center justify-center px-4">
          <div className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 shadow-xl max-w-full overflow-x-auto no-scrollbar">
            {images.map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-5 sm:w-6 bg-brand-red shadow-[0_0_8px_rgba(236,35,40,0.8)]'
                      : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/80'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Background Preloader for upcoming images */}
      <div className="hidden pointer-events-none" aria-hidden="true">
        {total > 1 && (
          <Image
            src={images[(currentIndex + 1) % total]}
            alt="Preload"
            width={1}
            height={1}
            priority
          />
        )}
        {total > 2 && (
          <Image
            src={images[(currentIndex + 2) % total]}
            alt="Preload"
            width={1}
            height={1}
            priority
          />
        )}
      </div>
    </div>
  );
}
