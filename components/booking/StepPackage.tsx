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
        if (data.packages?.length) setPackages(data.packages);
        else fallbackToLocal();
      })
      .catch(() => fallbackToLocal())
      .finally(() => setLoading(false));
  }, []);

  const fallbackToLocal = () => {
    // Map local data to StudioPackage shape
    const mapped: StudioPackage[] = STUDIO_PACKAGES_DATA.filter(p => p.priceNum > 0).map(p => ({
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
      <h2 className="text-2xl font-bold text-white mb-2">Select Your Studio Package</h2>
      <p className="text-slate-400 mb-8">Choose the package that best fits your production needs.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {packages.map((pkg) => {
          const isSelected = selectedPackageId === pkg.id;
          const Icon = categoryIcons[pkg.category] ?? Video;
          const iconColor = categoryColors[pkg.category] ?? 'text-brand-red';

          return (
            <button
              key={pkg.id}
              onClick={() => onSelect(pkg)}
              className={`relative text-left rounded-2xl p-6 border-2 transition-all duration-300 group ${
                isSelected
                  ? 'border-brand-red bg-brand-red/5 shadow-red-glow'
                  : 'border-brand-charcoal bg-brand-charcoal/50 hover:border-brand-red/50 hover:shadow-card-hover'
              }`}
            >
              {pkg.is_popular && (
                <span className="absolute -top-3 left-6 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              )}

              {isSelected && (
                <span className="absolute top-4 right-4 bg-brand-red text-white rounded-full p-1">
                  <Check size={14} />
                </span>
              )}

              <div className={`mb-4 ${iconColor}`}>
                <Icon size={28} />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{pkg.name}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{pkg.tagline ?? pkg.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-white">
                    {formatLKR(pkg.price_lkr)}
                  </span>
                  <span className="text-slate-500 text-sm ml-1">/ session</span>
                </div>
                <span className="text-xs text-slate-500 bg-brand-dark px-2 py-1 rounded-md">
                  {pkg.duration_hours}h session
                </span>
              </div>

              <ul className="space-y-1">
                {(pkg.features as string[]).slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <Check size={12} className="text-brand-red mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
                {pkg.features.length > 4 && (
                  <li className="text-xs text-slate-500 mt-1">+{pkg.features.length - 4} more included</li>
                )}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}
