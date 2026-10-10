'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid admin password');
      }

      // Login successful, redirect to admin panel
      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] flex items-center justify-center p-4 selection:bg-brand-red selection:text-white">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md bg-brand-charcoal border border-brand-charcoal rounded-3xl p-8 sm:p-10 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-red/10 border border-brand-red/20 mb-4 text-brand-red">
            <ShieldCheck size={32} />
          </div>

          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="text-2xl font-black text-brand-red tracking-tight">WIZE<span className="text-white">tv</span></span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 bg-brand-dark px-2.5 py-0.5 rounded-full border border-brand-charcoal">
              Admin
            </span>
          </div>

          <p className="text-slate-400 text-sm mt-2">
            Enter the studio master password to access the booking management panel.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex items-start gap-3">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-red-400" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
              Admin Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock size={18} />
              </div>

              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
                required
                className="w-full bg-brand-dark border border-brand-charcoal rounded-xl pl-10 pr-11 py-3.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/40 transition-all font-mono"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-red-glow flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Unlock Admin Panel →</span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-brand-charcoal/60 text-center">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
