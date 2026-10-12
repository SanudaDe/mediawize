'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Youtube,
  Instagram,
  Linkedin,
  Lock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4 group">
              <Image
                src="/logo-white.png"
                alt="WIZEtv Studios Logo"
                width={160}
                height={56}
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-6">
              Your Story, Our Studio.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/mediawizetv"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-brand-red text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
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
                href="https://www.instagram.com/mediawizetv/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-brand-red text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/wizetv/"
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
                <Link href="/pricing" className="hover:text-brand-red transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-red transition-colors">
                  About the Studio
                </Link>
              </li>
              <li>
                <Link href="/book-studio" className="hover:text-brand-red transition-colors text-white font-semibold inline-block">
                  Book The Studio
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
                <span>17, Kirimandala Mawatha,  Nawala ,Sri Lanka</span>
              </div>
              <a href="tel:+94777352700" className="flex items-center gap-2 hover:text-brand-red transition-colors">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <span>+94 77 735 2700</span>
              </a>
              <a href="mailto:info@wize.tv" className="flex items-center gap-2 hover:text-brand-red transition-colors">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <span>info@wize.tv</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} WIZEtv Studios. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/terms#studio-rental" className="hover:text-slate-400 transition-colors">
              Terms of Studio Rental
            </Link>
            <Link
              href="/admin/login"
              title="Admin Access"
              aria-label="Admin Access"
              className="text-slate-600 hover:text-slate-400 transition-colors opacity-40 hover:opacity-100 flex items-center gap-1 text-[11px]"
            >
              <Lock size={10} className="w-2.5 h-2.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
