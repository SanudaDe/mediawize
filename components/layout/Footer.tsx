'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Youtube,
  Instagram,
  Linkedin,
  Headphones,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                  <path
                    d="M4 6L11 26H15L11 11L16 20L21 11L17 26H21L28 6H22L16 16L10 6H4Z"
                    fill="#EC2328"
                  />
                  <path
                    d="M14 6L16 10L18 6H22L16 16L10 6H14Z"
                    fill="#FFFFFF"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-white leading-none">
                  WIZE TV STUDIOS
                </span>
                <span className="text-[10px] font-bold tracking-widest text-brand-red leading-tight">
                  COLOMBO &bull; SRI LANKA
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-6">
              Your premier podcast and video production studio in Sri Lanka. 4K Sony FX cinema cameras, Shure broadcast audio, live switching, and viral short-form distribution.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.youtube.com/c/wizetv"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-brand-red text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-brand-red text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-brand-red text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Spotify"
              >
                <Headphones className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-brand-red text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/services" className="hover:text-brand-red transition-colors">
                  Podcast Production
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-red transition-colors">
                  Creative Studio Rental
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-red transition-colors">
                  Video Editing & Post
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-red transition-colors">
                  Content Creation Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/images" className="hover:text-brand-red transition-colors">
                  Studio Tour & Gallery
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-brand-red transition-colors">
                  Studio & Packages
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-red transition-colors">
                  About the Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-red transition-colors">
                  Book the Studio
                </Link>
              </li>
              <li>
                <Link href="/contact?type=inquiry" className="hover:text-brand-red transition-colors">
                  Let&apos;s Talk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Colombo Studio
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>Ward Place, Colombo 07, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <span>+94 77 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <span>hello@wizetv.lk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} WizeTV Studios. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-slate-400 transition-colors">
              Terms of Studio Rental
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
