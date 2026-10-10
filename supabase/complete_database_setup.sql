-- ==============================================================================
-- WIZEtv Studios — Complete Database Setup
-- Run this script in the Supabase SQL Editor for your project:
-- https://sqpfwjwtefhxvqcfalyf.supabase.co
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('client', 'producer', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'rejected', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN
        ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'rejected';
END $$;

DO $$ BEGIN
    CREATE TYPE inquiry_status AS ENUM ('unread', 'contacted', 'resolved');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE package_category AS ENUM ('audio', 'video', 'multicam', 'full_production');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE subscription_tier AS ENUM ('basic', 'bronze', 'silver', 'gold');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. PROFILES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    company_name TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'client'::user_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 4. STUDIO PACKAGES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.studio_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    category package_category NOT NULL,
    duration_hours INTEGER DEFAULT 2 NOT NULL,
    max_guests INTEGER DEFAULT 2 NOT NULL,
    price_lkr NUMERIC(10, 2) NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_popular BOOLEAN DEFAULT false NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 5. SUBSCRIPTIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tier subscription_tier NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    price_lkr NUMERIC(10, 2) NOT NULL,
    episodes_per_month INTEGER NOT NULL,
    studio_hours_per_month INTEGER NOT NULL,
    shorts_reels_count INTEGER DEFAULT 0 NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_popular BOOLEAN DEFAULT false NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 6. BOOKINGS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    package_id UUID REFERENCES public.studio_packages(id) ON DELETE SET NULL,
    subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
    booking_reference TEXT UNIQUE NOT NULL DEFAULT ('WT-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8))),
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    company_name TEXT,
    show_name TEXT,
    requested_date DATE NOT NULL,
    requested_time_slot TEXT NOT NULL,
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    duration_hours INTEGER DEFAULT 2 NOT NULL,
    buffer_minutes INTEGER DEFAULT 30 NOT NULL,
    guest_count INTEGER DEFAULT 1 NOT NULL,
    add_ons JSONB DEFAULT '[]'::jsonb,
    estimated_total_lkr NUMERIC(10, 2) NOT NULL,
    status booking_status DEFAULT 'pending'::booking_status NOT NULL,
    admin_notes TEXT,
    client_notes TEXT,
    rejection_reason TEXT,
    confirmed_at TIMESTAMPTZ,
    rejected_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 7. BOOKING BLOCKS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.booking_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    reason TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 8. BUSINESS HOURS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.business_hours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    is_open BOOLEAN DEFAULT true NOT NULL,
    open_time TEXT DEFAULT '09:00' NOT NULL,
    close_time TEXT DEFAULT '20:00' NOT NULL,
    UNIQUE (day_of_week)
);

-- ==============================================================================
-- 9. BOOKING SETTINGS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.booking_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 10. BOOKING NOTIFICATIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.booking_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    recipient_email TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    error_message TEXT,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 11. BOOKING ACTIVITY AUDIT LOG TABLE
-- ==============================================================================
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
-- 12. INQUIRIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service_interest TEXT,
    budget_range TEXT,
    message TEXT NOT NULL,
    status inquiry_status DEFAULT 'unread'::inquiry_status NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 13. AUTOMATIC UPDATED_AT TRIGGER FUNCTION
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_studio_packages_updated_at ON public.studio_packages;
CREATE TRIGGER set_studio_packages_updated_at BEFORE UPDATE ON public.studio_packages FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_subscriptions_updated_at ON public.subscriptions;
CREATE TRIGGER set_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_bookings_updated_at ON public.bookings;
CREATE TRIGGER set_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_inquiries_updated_at ON public.inquiries;
CREATE TRIGGER set_inquiries_updated_at BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_booking_settings_updated_at ON public.booking_settings;
CREATE TRIGGER set_booking_settings_updated_at BEFORE UPDATE ON public.booking_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 14. ADMIN CHECK HELPER FUNCTION
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- 15. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studio_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Studio Packages
DROP POLICY IF EXISTS "Active studio packages are viewable by everyone" ON public.studio_packages;
CREATE POLICY "Active studio packages are viewable by everyone" ON public.studio_packages FOR SELECT USING (is_active = true OR is_admin());
DROP POLICY IF EXISTS "Admins can manage studio packages" ON public.studio_packages;
CREATE POLICY "Admins can manage studio packages" ON public.studio_packages FOR ALL USING (is_admin());

-- Subscriptions
DROP POLICY IF EXISTS "Active subscriptions are viewable by everyone" ON public.subscriptions;
CREATE POLICY "Active subscriptions are viewable by everyone" ON public.subscriptions FOR SELECT USING (is_active = true OR is_admin());
DROP POLICY IF EXISTS "Admins can manage subscriptions" ON public.subscriptions;
CREATE POLICY "Admins can manage subscriptions" ON public.subscriptions FOR ALL USING (is_admin());

-- Bookings
DROP POLICY IF EXISTS "Anyone can create a booking request" ON public.bookings;
CREATE POLICY "Anyone can create a booking request" ON public.bookings FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id OR is_admin());
DROP POLICY IF EXISTS "Admins can update all bookings" ON public.bookings;
CREATE POLICY "Admins can update all bookings" ON public.bookings FOR UPDATE USING (is_admin());

-- Booking Blocks
DROP POLICY IF EXISTS "Public can view booking blocks" ON public.booking_blocks;
CREATE POLICY "Public can view booking blocks" ON public.booking_blocks FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage booking blocks" ON public.booking_blocks;
CREATE POLICY "Admins can manage booking blocks" ON public.booking_blocks FOR ALL USING (is_admin());

-- Business Hours
DROP POLICY IF EXISTS "Public can view business hours" ON public.business_hours;
CREATE POLICY "Public can view business hours" ON public.business_hours FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage business hours" ON public.business_hours;
CREATE POLICY "Admins can manage business hours" ON public.business_hours FOR ALL USING (is_admin());

-- Booking Settings
DROP POLICY IF EXISTS "Public can view booking settings" ON public.booking_settings;
CREATE POLICY "Public can view booking settings" ON public.booking_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage booking settings" ON public.booking_settings;
CREATE POLICY "Admins can manage booking settings" ON public.booking_settings FOR ALL USING (is_admin());

-- Notifications & Activity
DROP POLICY IF EXISTS "Service or admin can insert notifications" ON public.booking_notifications;
CREATE POLICY "Service or admin can insert notifications" ON public.booking_notifications FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can view notifications" ON public.booking_notifications;
CREATE POLICY "Admins can view notifications" ON public.booking_notifications FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Service or admin can insert activity" ON public.booking_activity;
CREATE POLICY "Service or admin can insert activity" ON public.booking_activity FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can view activity" ON public.booking_activity;
CREATE POLICY "Admins can view activity" ON public.booking_activity FOR SELECT USING (is_admin());

-- Inquiries
DROP POLICY IF EXISTS "Anyone can submit an inquiry" ON public.inquiries;
CREATE POLICY "Anyone can submit an inquiry" ON public.inquiries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Only admins can view inquiries" ON public.inquiries;
CREATE POLICY "Only admins can view inquiries" ON public.inquiries FOR SELECT USING (is_admin());

-- ==============================================================================
-- 16. TABLE PERMISSIONS & GRANTS
-- ==============================================================================
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO postgres, anon, authenticated, service_role;

-- ==============================================================================
-- 17. SEED DATA
-- ==============================================================================

-- Studio Packages
INSERT INTO public.studio_packages (slug, name, tagline, description, category, duration_hours, max_guests, price_lkr, features, is_popular, display_order)
VALUES
(
    'audio-only-podcast',
    'Audio Only Podcast',
    'Broadcast-Grade Pristine Sound',
    'Ideal for talk shows, narrative audio series, voiceovers, and corporate podcast recording.',
    'audio',
    2,
    4,
    18500.00,
    '[
        "Studio Rental (Audio Only)",
        "1 Podcast Microphone",
        "Audio Recording",
        "Technician Support"
    ]'::jsonb,
    false,
    1
),
(
    'solo-video-podcast',
    'Solo Video Podcast',
    'Cinematic 4K Single-Host Setup',
    'Engineered for thought leaders, educators, keynote speakers, and monologue podcast creators.',
    'video',
    2,
    1,
    40000.00,
    '[
        "Studio Rental (Video Podcast)",
        "1 Camera",
        "1 Podcast Microphone",
        "Lighting Setup",
        "Technician Support"
    ]'::jsonb,
    false,
    2
),
(
    'dual-host-video-podcast',
    'Dual Host Video Podcast',
    '3-Camera Dynamic Interview Production',
    'Our most popular package for interviews, founder talks, co-hosted debates, and high-engagement shows.',
    'multicam',
    2,
    2,
    55000.00,
    '[
        "Studio Rental (Video Podcast)",
        "3 Camera Setup",
        "Lighting Setup",
        "2 Podcast Microphones",
        "Technician Support"
    ]'::jsonb,
    true,
    3
),
(
    'custom-premium-experience',
    'Custom Premium Experience',
    'Fully tailored VIP studio production',
    'Designed for corporate podcasts, premium productions, and large bespoke setups.',
    'full_production',
    4,
    6,
    65000.00,
    '[
        "Fully customized production based on client requirements",
        "Multiple camera setups and teleprompter available",
        "Full studio control room switching & monitor feed",
        "Expedited delivery of final master cut"
    ]'::jsonb,
    false,
    4
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    price_lkr = EXCLUDED.price_lkr,
    features = EXCLUDED.features;

-- Monthly Creator Subscriptions
INSERT INTO public.subscriptions (slug, name, tier, tagline, description, price_lkr, episodes_per_month, studio_hours_per_month, shorts_reels_count, features, is_popular, display_order)
VALUES
(
    'basic-subscription',
    'Basic',
    'basic',
    'Kickstart your podcast journey',
    'YouTubers, Content Creators, Influencers',
    80000.00,
    1,
    6,
    0,
    '[
        "1 Recording Session (6 Hours)",
        "1 Camera",
        "Content creation and personal projects",
        "Standard priority"
    ]'::jsonb,
    false,
    1
),
(
    'bronze-subscription',
    'Bronze',
    'bronze',
    'Steady growth & personal branding',
    'Founders, CEOs, Consultants, Coaches',
    95000.00,
    2,
    5,
    4,
    '[
        "2 Recording Sessions (5h)",
        "2 Cameras",
        "Personal branding",
        "High priority"
    ]'::jsonb,
    false,
    2
),
(
    'silver-subscription',
    'Silver',
    'silver',
    'Flagship company podcast engine',
    'SMEs, Marketing Teams, Educational Institutes',
    175000.00,
    4,
    10,
    12,
    '[
        "4 Recording Sessions (10h)",
        "3 Cameras",
        "Company podcast and marketing content",
        "Priority studio booking"
    ]'::jsonb,
    true,
    3
),
(
    'gold-subscription',
    'Gold',
    'gold',
    'Enterprise & high-velocity media dominance',
    'Corporates, Banks, Hotels, Large Organizations',
    380000.00,
    8,
    20,
    24,
    '[
        "Dedicated Monthly Production Days (20H)",
        "3 Cameras",
        "Corporate communications and executive content",
        "Guaranteed priority booking"
    ]'::jsonb,
    false,
    4
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_lkr = EXCLUDED.price_lkr,
    features = EXCLUDED.features;

-- Default Business Hours (Mon-Sun 8AM-9PM, Open 7 Days)
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

-- Default Booking Settings
INSERT INTO public.booking_settings (key, value, description) VALUES
  ('slot_interval_minutes', '60',  'Duration of each booking slot in minutes'),
  ('buffer_minutes',        '30',  'Buffer time between bookings in minutes'),
  ('advance_notice_hours',  '24',  'Minimum hours of advance notice required'),
  ('max_advance_days',      '60',  'Maximum days ahead a booking can be made'),
  ('booking_enabled',       'true','Whether the booking system accepts new requests')
ON CONFLICT (key) DO NOTHING;
