'use client';

import React from 'react';
import Image from 'next/image';
import {
  Play,
  ExternalLink,
  Eye,
  ArrowUpRight,
  ThumbsUp,
  Flame,
} from 'lucide-react';
import { VideoContentItem } from '@/lib/videoContents';

interface VideoMockupCardProps {
  item: VideoContentItem;
}

export const VideoMockupCard: React.FC<VideoMockupCardProps> = ({ item }) => {
  return (
    <a
      href={item.facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-brand-red/40 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(236,35,40,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden text-left cursor-pointer"
    >
      {/* Subtle top indicator highlight matching Home Page */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-red/0 to-transparent group-hover:via-brand-red transition-all duration-500" />

      <div>
        {/* Original Video Image Viewport (4:5 Screen) */}
        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-100 shadow-sm mb-6 select-none">
          {/* Original Facebook Video Poster */}
          <Image
            src={item.originalThumbnail}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

          {/* Top Status Bar */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
            <span className="bg-brand-red text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {item.category}
            </span>

            <span className="bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/15">
              {item.duration}
            </span>
          </div>

          {/* Center Play Button with Red Brand Hover Glow */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-slate-950/80 backdrop-blur-md text-white flex items-center justify-center border border-white/25 shadow-lg group-hover:scale-115 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300 shadow-red-glow">
              <Play className="w-6 h-6 ml-0.5 fill-white" />
            </div>
          </div>

          {/* Bottom Facebook Watermark Prompt */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md text-slate-200 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/10">
              <svg className="w-3.5 h-3.5 fill-current text-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Click to Watch on Facebook</span>
            </span>

            <span className="text-[11px] font-bold text-white bg-brand-red/90 px-2 py-0.5 rounded shadow">
              {item.views}
            </span>
          </div>
        </div>

        {/* Card Metadata (Home Page Typography) */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-semibold">
          <span className="text-brand-red font-black uppercase tracking-wider text-[11px]">
            {item.contentType}
          </span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-slate-500">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              {item.views}
            </span>
            <span>&bull;</span>
            <span className="text-slate-500">{item.reactions}</span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-snug group-hover:text-brand-red transition-colors mb-2.5">
          {item.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-6 line-clamp-2">
          {item.description}
        </p>
      </div>

      {/* Card Action Button (Home Page CTA Style) */}
      <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900 group-hover:text-brand-red transition-colors">
          <svg className="w-4 h-4 fill-current text-[#1877F2]" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span>Watch on Facebook</span>
        </span>

        <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-brand-red text-slate-700 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </a>
  );
};
