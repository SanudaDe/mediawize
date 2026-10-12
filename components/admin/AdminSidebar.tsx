'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  Settings,
  X,
  Menu,
  ExternalLink,
  LogOut,
} from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/bookings', label: 'Bookings', icon: BookOpen },
  { href: '/admin/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [pendingCount, setPendingCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchPending = () => {
      fetch(`/api/admin/bookings?status=pending&limit=1&_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
      })
        .then(r => r.json())
        .then(d => {
          if (typeof d.total === 'number') {
            setPendingCount(d.total);
          }
        })
        .catch(() => {});
    };

    fetchPending();
    const interval = setInterval(fetchPending, 10000);
    return () => clearInterval(interval);
  }, []);

  if (pathname === '/admin/login') {
    return null;
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      window.location.href = '/admin/login';
    }
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-brand-charcoal border border-brand-charcoal rounded-xl flex items-center justify-center text-white"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0B0F1A] border-r border-brand-charcoal z-50 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-brand-charcoal flex items-center justify-between">
          <div>
            <span className="text-brand-red font-black text-xl tracking-tight">WIZE<span className="text-white">tv</span></span>
            <span className="ml-2 text-xs text-slate-500 font-semibold uppercase tracking-widest">Admin</span>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive(href, exact)
                  ? 'bg-brand-red text-white shadow-red-glow'
                  : 'text-slate-400 hover:text-white hover:bg-brand-charcoal'
              }`}
            >
              <Icon size={18} />
              <span className="flex-1">{label}</span>
              {label === 'Bookings' && pendingCount !== null && pendingCount > 0 && (
                <span className="bg-amber-400 text-black text-[11px] font-black px-2 py-0.5 rounded-full leading-none">
                  {pendingCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-brand-charcoal space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-300 hover:bg-brand-charcoal/50 transition-colors"
          >
            <ExternalLink size={14} />
            View Public Site
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:text-white hover:bg-red-500/20 transition-all cursor-pointer"
          >
            <LogOut size={14} />
            <span>{loggingOut ? 'Logging out...' : 'Log Out'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
