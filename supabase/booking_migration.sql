-- ==============================================================================
-- WizeTV Booking System Migration
-- Run this AFTER the existing schema.sql
-- DO NOT drop existing tables
-- ==============================================================================

-- 1. Extend booking_status enum to add 'rejected'
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'rejected';

-- 2. Extend bookings table with new columns
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS start_time TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS end_time   TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS duration_hours INTEGER DEFAULT 2,
  ADD COLUMN IF NOT EXISTS buffer_minutes INTEGER DEFAULT 30,
  ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
  ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ;

-- 3. BOOKING BLOCKS — admin can block out dates/times
CREATE TABLE IF NOT EXISTS public.booking_blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time   TIMESTAMPTZ NOT NULL,
  reason TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. BUSINESS HOURS — configurable open hours per day of week
CREATE TABLE IF NOT EXISTS public.business_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday
  is_open BOOLEAN DEFAULT true NOT NULL,
  open_time TEXT DEFAULT '09:00' NOT NULL,  -- HH:MM in Asia/Colombo
  close_time TEXT DEFAULT '18:00' NOT NULL, -- HH:MM in Asia/Colombo
  UNIQUE (day_of_week)
);

-- Seed default business hours (Mon–Sun open, 08:00 - 21:00)
INSERT INTO public.business_hours (day_of_week, is_open, open_time, close_time) VALUES
  (0, true, '08:00', '21:00'), -- Sunday
  (1, true, '08:00', '21:00'), -- Monday
  (2, true, '08:00', '21:00'), -- Tuesday
  (3, true, '08:00', '21:00'), -- Wednesday
  (4, true, '08:00', '21:00'), -- Thursday
  (5, true, '08:00', '21:00'), -- Friday
  (6, true, '08:00', '21:00')  -- Saturday
ON CONFLICT (day_of_week) DO UPDATE SET
  is_open = EXCLUDED.is_open,
  open_time = EXCLUDED.open_time,
  close_time = EXCLUDED.close_time;

-- 5. BOOKING SETTINGS — global settings for admin
CREATE TABLE IF NOT EXISTS public.booking_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

INSERT INTO public.booking_settings (key, value, description) VALUES
  ('slot_interval_minutes', '60',  'Duration of each booking slot in minutes'),
  ('buffer_minutes',        '30',  'Buffer time between bookings in minutes'),
  ('advance_notice_hours',  '24',  'Minimum hours of advance notice required'),
  ('max_advance_days',      '60',  'Maximum days ahead a booking can be made'),
  ('booking_enabled',       'true','Whether the booking system accepts new requests')
ON CONFLICT (key) DO NOTHING;

-- 6. BOOKING NOTIFICATIONS — email log
CREATE TABLE IF NOT EXISTS public.booking_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'request_received' | 'confirmed' | 'rejected' | 'admin_alert'
  recipient_email TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL, -- 'pending' | 'sent' | 'failed'
  error_message TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. BOOKING ACTIVITY — audit log
CREATE TABLE IF NOT EXISTS public.booking_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  performed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  note TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- RLS for new tables
-- ==============================================================================

ALTER TABLE public.booking_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_activity ENABLE ROW LEVEL SECURITY;

-- Booking blocks: public can read, only admins can write
CREATE POLICY "Public can view booking blocks" ON public.booking_blocks
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage booking blocks" ON public.booking_blocks
  FOR ALL USING (is_admin());

-- Business hours: public can read, only admins can write
CREATE POLICY "Public can view business hours" ON public.business_hours
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage business hours" ON public.business_hours
  FOR ALL USING (is_admin());

-- Booking settings: public can read, only admins can write
CREATE POLICY "Public can view booking settings" ON public.booking_settings
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage booking settings" ON public.booking_settings
  FOR ALL USING (is_admin());

-- Notifications: only admins
CREATE POLICY "Admins can view notifications" ON public.booking_notifications
  FOR SELECT USING (is_admin());
CREATE POLICY "Service role can insert notifications" ON public.booking_notifications
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update notifications" ON public.booking_notifications
  FOR UPDATE USING (is_admin());

-- Activity: only admins
CREATE POLICY "Admins can view activity" ON public.booking_activity
  FOR SELECT USING (is_admin());
CREATE POLICY "Service role can insert activity" ON public.booking_activity
  FOR INSERT WITH CHECK (true);

-- updated_at trigger for booking_settings
DROP TRIGGER IF EXISTS set_booking_settings_updated_at ON public.booking_settings;
CREATE TRIGGER set_booking_settings_updated_at
  BEFORE UPDATE ON public.booking_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
