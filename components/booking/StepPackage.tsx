'use client';

import { useEffect, useState } from 'react';
import { Mic, Video, Users, Star, Check, Loader2, LucideIcon } from 'lucide-react';
import { StudioPackage } from '@/lib/booking-types';
import { formatLKR } from '@/lib/booking-utils';
import { STUDIO_PACKAGES_DATA } from '@/lib/data';

const categoryIcons: Record<string, LucideIcon> = {
  audio: Mic,
  video: Video,
  multicam: Users,
  full_production: Star,
};

const categoryColors: Record<string, string> = {
  audio: 'text-purple-400',
  video: 'text-blue-400',
  multicam: 'text-brand-red',
  full_production: 'text-amber-400',
};

interface Props {
  selectedPackageId?: string;
  onSelect: (pkg: StudioPackage) => void;
}

export default function StepPackage({ selectedPackageId, onSelect }: Props) {
  const [packages, setPackages] = useState<StudioPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try Supabase first, fall back to local data
    fetch('/api/packages')
      .then(r => r.json())
      .then(data => {
        if (data.packages?.length) {
          setPackages(data.packages.filter((p: StudioPackage) => p.slug !== 'custom-premium-experience'));
        } else {
          fallbackToLocal();
        }
      })
      .catch(() => fallbackToLocal())
      .finally(() => setLoading(false));
  }, []);

  const fallbackToLocal = () => {
    // Map local data to StudioPackage shape (only real priced packages)
    const mapped: StudioPackage[] = STUDIO_PACKAGES_DATA
      .filter(p => p.priceNum > 0 && p.slug !== 'custom-premium-experience')
      .map(p => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        tagline: p.bestFor,
        description: p.bestFor,
        category: 'video',
        duration_hours: parseInt(p.duration) || 2,
        max_guests: 4,
        price_lkr: p.priceNum,
        features: p.includes,
        is_popular: p.popular ?? false,
        is_active: true,
        display_order: 0,
      }));
    setPackages(mapped);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-brand-red" size={32} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">Select Your Studio Package</h2>
      <p className="text-slate-500 mb-8 text-sm">Choose the package that best fits your production needs.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {packages.map((pkg) => {
          const isSelected = selectedPackageId === pkg.id;
          const Icon = categoryIcons[pkg.category] ?? Video;

          return (
            <button
              key={pkg.id}
              onClick={() => onSelect(pkg)}
              className={`relative text-left rounded-2xl p-6 transition-all duration-300 group flex flex-col justify-between ${
                isSelected
                  ? 'border-2 border-brand-red bg-brand-red/[0.03] shadow-xl shadow-red-500/10 ring-4 ring-brand-red/5'
                  : 'bg-white border border-slate-200 hover:border-brand-red/50 hover:shadow-xl shadow-sm'
              }`}
            >
              {pkg.is_popular && (
                <span className="absolute -top-3 left-6 bg-brand-red text-white text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full shadow-md shadow-brand-red/30">
                  MOST POPULAR
                </span>
              )}

              {isSelected && (
                <span className="absolute top-4 right-4 bg-brand-red text-white rounded-full p-1 shadow-sm">
                  <Check size={14} />
                </span>
              )}

              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                  <Icon size={24} strokeWidth={2} />
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-1">{pkg.name}</h3>
                <p className="text-slate-500 text-xs mb-4 line-clamp-2 leading-relaxed">{pkg.tagline ?? pkg.description}</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-2xl font-black text-slate-900">
                      {formatLKR(pkg.price_lkr)}
                    </span>
                    <span className="text-slate-400 text-xs ml-1">/ session</span>
                  </div>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                    {pkg.duration_hours}h session
                  </span>
                </div>

                <ul className="space-y-1.5">
                  {(pkg.features as string[]).slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check size={13} className="text-brand-red mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                  {pkg.features.length > 4 && (
                    <li className="text-xs text-slate-400 mt-1">+{pkg.features.length - 4} more included</li>
                  )}
                </ul>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
