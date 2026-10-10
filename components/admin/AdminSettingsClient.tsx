'use client';

import { useEffect, useState } from 'react';
import { Loader2, Save, CheckCircle, Settings, Clock, Calendar } from 'lucide-react';

interface Setting { key: string; value: string; description?: string }
interface BusinessHour { day_of_week: number; is_open: boolean; open_time: string; close_time: string }

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AdminSettingsClient() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [hours, setHours] = useState<BusinessHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/settings').then(r => r.json()),
      fetch('/api/admin/business-hours').then(r => r.json()),
    ]).then(([s, h]) => {
      setSettings(s.settings ?? []);
      const sorted = [...(h.hours ?? [])].sort((a: BusinessHour, b: BusinessHour) => a.day_of_week - b.day_of_week);
      setHours(sorted);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
  };

  const updateHour = (dayOfWeek: number, field: keyof BusinessHour, value: string | boolean) => {
    setHours(prev => prev.map(h => h.day_of_week === dayOfWeek ? { ...h, [field]: value } : h));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess('');
    try {
      await Promise.all([
        fetch('/api/admin/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ settings }) }),
        fetch('/api/admin/business-hours', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ hours }) }),
      ]);
      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-brand-red" size={32} /></div>
  );

  const inputClass = "bg-brand-dark border border-brand-charcoal rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-red w-32";

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Booking Settings</h1>
          <p className="text-slate-400 text-sm mt-1">Configure studio availability and booking rules</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors disabled:opacity-70"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save All Changes
        </button>
      </div>

      {success && (
        <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-400 text-sm flex items-center gap-2">
          <CheckCircle size={16} /> {success}
        </div>
      )}

      {/* Booking Rules */}
      <div className="bg-brand-charcoal rounded-2xl border border-brand-charcoal p-6 mb-6">
        <h3 className="text-white font-bold mb-5 flex items-center gap-2"><Clock size={16} className="text-brand-red" /> Booking Rules</h3>
        <div className="space-y-4">
          {settings.map(s => (
            <div key={s.key} className="flex items-center justify-between gap-4">
              <div>
                <div className="text-slate-200 text-sm font-semibold">
                  {s.key === 'slot_interval_minutes' && 'Slot Interval (minutes)'}
                  {s.key === 'buffer_minutes' && 'Buffer Between Bookings (minutes)'}
                  {s.key === 'advance_notice_hours' && 'Minimum Advance Notice (hours)'}
                  {s.key === 'max_advance_days' && 'Max Advance Booking (days)'}
                  {s.key === 'booking_enabled' && 'Booking System Enabled'}
                </div>
                {s.description && <div className="text-slate-500 text-xs mt-0.5">{s.description}</div>}
              </div>
              {s.key === 'booking_enabled' ? (
                <button
                  onClick={() => updateSetting(s.key, s.value === 'true' ? 'false' : 'true')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${s.value === 'true' ? 'bg-brand-red' : 'bg-brand-charcoal border border-brand-charcoal'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${s.value === 'true' ? 'left-6' : 'left-0.5'}`} />
                </button>
              ) : (
                <input
                  type="number"
                  value={s.value}
                  onChange={e => updateSetting(s.key, e.target.value)}
                  className={inputClass}
                  min={0}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-brand-charcoal rounded-2xl border border-brand-charcoal p-6">
        <h3 className="text-white font-bold mb-5 flex items-center gap-2"><Calendar size={16} className="text-brand-red" /> Studio Hours (Asia/Colombo)</h3>
        <div className="space-y-3">
          {hours.map(h => (
            <div key={h.day_of_week} className="flex items-center gap-4 py-2">
              <div className="w-24 text-sm font-semibold text-slate-300">{DAY_NAMES[h.day_of_week]}</div>

              <button
                onClick={() => updateHour(h.day_of_week, 'is_open', !h.is_open)}
                className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${h.is_open ? 'bg-brand-red' : 'bg-brand-dark border border-brand-charcoal'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${h.is_open ? 'left-5' : 'left-0.5'}`} />
              </button>

              {h.is_open ? (
                <>
                  <input type="time" value={h.open_time}
                    onChange={e => updateHour(h.day_of_week, 'open_time', e.target.value)}
                    className="bg-brand-dark border border-brand-charcoal rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-brand-red w-28"
                  />
                  <span className="text-slate-600 text-sm">to</span>
                  <input type="time" value={h.close_time}
                    onChange={e => updateHour(h.day_of_week, 'close_time', e.target.value)}
                    className="bg-brand-dark border border-brand-charcoal rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-brand-red w-28"
                  />
                </>
              ) : (
                <span className="text-slate-600 text-sm italic">Closed</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
