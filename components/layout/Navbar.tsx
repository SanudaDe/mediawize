'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Studio Tour', href: '/images' },
  { name: 'Podcasts', href: '/podcasts' },
  { name: 'Studio & Packages', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-100'
            : 'bg-white py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center relative">
                <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                  <path
                    d="M4 6L11 26H15L11 11L16 20L21 11L17 26H21L28 6H22L16 16L10 6H4Z"
                    fill="#EC2328"
                  />
                  <path
                    d="M14 6L16 10L18 6H22L16 16L10 6H14Z"
                    fill="#111827"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-black tracking-tight text-slate-900 leading-none">
                  WIZE TV
                </span>
                <span className="text-[10px] font-bold tracking-widest text-slate-700 leading-tight">
                  STUDIOS
                </span>
              </div>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs font-bold tracking-wide transition-colors py-1 ${
                    isActive ? 'text-slate-900 font-extrabold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/contact?type=inquiry"
              className="px-5 py-2 rounded-lg bg-[#111827] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              Let&apos;s Talk
            </Link>

            <Link
              href="/contact"
              className="px-5 py-2 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold transition-all shadow-sm hover:shadow-red-glow"
            >
              Book The Studio
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/contact"
              className="px-3 py-1.5 rounded-lg bg-brand-red text-white text-xs font-bold shadow-sm sm:hidden"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[65px] z-40 p-6 bg-white border-b border-slate-200 shadow-xl lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`p-3 rounded-xl text-sm font-bold flex items-center justify-between ${
                    pathname === link.href
                      ? 'bg-brand-red/10 text-brand-red'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </Link>
              ))}

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2 mt-2">
                <Link
                  href="/contact?type=inquiry"
                  className="w-full py-3 rounded-lg bg-slate-900 text-white text-center text-xs font-bold"
                >
                  Let&apos;s Talk
                </Link>
                <Link
                  href="/contact"
                  className="w-full py-3 rounded-lg bg-brand-red text-white text-center text-xs font-bold"
                >
                  Book The Studio
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
