'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mic,
  Film,
  Zap,
  Building2,
  Radio,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ServiceDetail } from '@/lib/types';

interface ServiceCardProps {
  service: ServiceDetail;
  index: number;
}

const iconMap: Record<string, React.ElementType> = {
  Mic,
  Film,
  Zap,
  Building2,
  Radio,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const IconComponent = iconMap[service.iconName] || Mic;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col justify-between rounded-3xl p-8 bg-brand-card/50 backdrop-blur-xl border border-white/10 hover:border-brand-red/40 transition-all duration-500 hover:shadow-red-glow"
    >
      {/* Background Subtle Gradient Overlay on Hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        {/* Top Bar with Icon & Starting Price */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-dark/90 border border-white/10 flex items-center justify-center text-brand-red group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-md">
            <IconComponent className="w-7 h-7" />
          </div>
          <div className="text-right">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Starting from
            </span>
            <span className="text-sm font-bold text-white group-hover:text-brand-red transition-colors">
              {service.startingPrice}
            </span>
          </div>
        </div>

        {/* Title and Subtitle */}
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
          {service.title}
        </h3>
        <p className="text-xs font-semibold text-brand-red uppercase tracking-wider mb-4">
          {service.subtitle}
        </p>
        <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
          {service.description}
        </p>

        {/* Key Highlights */}
        <div className="space-y-2.5 mb-8">
          {service.highlights.map((hl, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
              <span>{hl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between">
        <Link
          href={`/contact?service=${service.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-brand-red transition-colors"
        >
          <span>Contact to Book</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
        <span className="text-[11px] text-slate-300 font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-brand-red" />
          Pro Gear Included
        </span>
      </div>
    </motion.div>
  );
};
