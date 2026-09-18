'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  Clock,
  User,
  Mic,
  Radio,
  Camera,
  Sun,
  Tv,
  Wifi,
  Video,
  Film,
  Scissors,
  Sliders,
  Phone,
  PlusCircle,
} from 'lucide-react';
import { ADDITIONAL_SERVICES_DATA, AdditionalServiceItem } from '@/lib/data';

const SERVICE_ICONS: Record<string, React.ElementType> = {
  'Additional Hour': Clock,
  Technician: User,
  'Additional Podcast Microphone': Mic,
  'Additional Wireless Microphone (DJI)': Radio,
  'Additional Camera': Camera,
  'Additional Lighting': Sun,
  Teleprompter: Tv,
  'Live Streaming Setup': Wifi,
  'Intro / Outro Video': Film,
  'Reel Editing': Scissors,
  'Podcast Editing': Sliders,
};

const STUDIO_PHONE = '077 735 2700';
const STUDIO_TEL_HREF = 'tel:+94777352700';

interface AdditionalServicesDropdownProps {
  className?: string;
}

export const AdditionalServicesDropdown: React.FC<AdditionalServicesDropdownProps> = ({
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`w-full max-w-5xl mx-auto mt-10 sm:mt-12 ${className}`}>
      {/* Trigger Button Container */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 group focus:outline-none"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-brand-red flex items-center justify-center shrink-0 border border-red-100 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
              <PlusCircle className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-red px-2.5 py-0.5 rounded-full bg-red-50 border border-red-100">
                  Custom Studio Add-ons
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  11 Additional Equipment & Post-Production Options
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-brand-red transition-colors">
                Need Extra Hours, Cameras, or Editing Services?
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:inline-block text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
              {isOpen ? 'Hide Add-ons' : 'View Add-on Pricing'}
            </span>
            <div
              className={`w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 ${
                isOpen ? 'rotate-180 bg-slate-900 text-white' : ''
              }`}
            >
              <ChevronDown className="w-4 h-4 transition-transform duration-300" />
            </div>
          </div>
        </button>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="border-t border-slate-100 p-5 sm:p-7 bg-slate-50/70 animate-in fade-in-50 duration-300">
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  A La Carte Add-ons & Equipment Rates
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Can be added to any single session or recurring monthly membership package.
                </p>
              </div>

              <a
                href={STUDIO_TEL_HREF}
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-red hover:underline"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span>Call Hotline to Add: {STUDIO_PHONE}</span>
              </a>
            </div>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {ADDITIONAL_SERVICES_DATA.map((item: AdditionalServiceItem, idx: number) => {
                const IconComponent = SERVICE_ICONS[item.service] || PlusCircle;

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-sm flex items-center justify-between gap-3 hover:border-brand-red/40 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.service}
                      </span>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 text-slate-900 text-xs sm:text-sm font-black tracking-tight border border-slate-200/60">
                        {item.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Help Text */}
            <div className="mt-6 pt-5 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <span className="text-center sm:text-left">
                Need a specific bespoke configuration or multi-camera broadcast gear? Contact our technical team for a custom quote.
              </span>
              <a
                href={STUDIO_TEL_HREF}
                className="shrink-0 px-4 py-2 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-brand-red transition-colors shadow-sm"
              >
                Book Custom Setup
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
