-- ==============================================================================
-- WizeTV Studio Database Schema & Migrations
-- Sri Lanka's Leading Podcast & Media Production Studio
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Enums
CREATE TYPE user_role AS ENUM ('client', 'producer', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE inquiry_status AS ENUM ('unread', 'contacted', 'resolved');
CREATE TYPE package_category AS ENUM ('audio', 'video', 'multicam', 'full_production');
CREATE TYPE subscription_tier AS ENUM ('basic', 'bronze', 'silver', 'gold');

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
-- 4. STUDIO PACKAGES TABLE (Hourly & Single Session Services)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.studio_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    category package_category NOT NULL,
    duration_hours INTEGER DEFAULT 1 NOT NULL,
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
-- 5. SUBSCRIPTIONS TABLE (Monthly Recurring Creator Plans)
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
    guest_count INTEGER DEFAULT 1 NOT NULL,
    add_ons JSONB DEFAULT '[]'::jsonb,
    estimated_total_lkr NUMERIC(10, 2) NOT NULL,
    status booking_status DEFAULT 'pending'::booking_status NOT NULL,
    admin_notes TEXT,
    client_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 7. INQUIRIES / CONTACT SUBMISSIONS TABLE
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
-- 8. AUTOMATIC UPDATED_AT TRIGGER FUNCTION
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at Triggers
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_studio_packages_updated_at ON public.studio_packages;
CREATE TRIGGER set_studio_packages_updated_at
    BEFORE UPDATE ON public.studio_packages
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_subscriptions_updated_at ON public.subscriptions;
CREATE TRIGGER set_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_bookings_updated_at ON public.bookings;
CREATE TRIGGER set_bookings_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_inquiries_updated_at ON public.inquiries;
CREATE TRIGGER set_inquiries_updated_at
    BEFORE UPDATE ON public.inquiries
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studio_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Helper to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" 
    ON public.profiles FOR SELECT 
    USING (true);

CREATE POLICY "Users can insert their own profile" 
    ON public.profiles FOR INSERT 
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

-- Studio Packages Policies (Public can read active, Admins can manage)
CREATE POLICY "Active studio packages are viewable by everyone" 
    ON public.studio_packages FOR SELECT 
    USING (is_active = true OR is_admin());

CREATE POLICY "Admins can insert studio packages" 
    ON public.studio_packages FOR INSERT 
    WITH CHECK (is_admin());

CREATE POLICY "Admins can update studio packages" 
    ON public.studio_packages FOR UPDATE 
    USING (is_admin());

CREATE POLICY "Admins can delete studio packages" 
    ON public.studio_packages FOR DELETE 
    USING (is_admin());

-- Subscriptions Policies (Public can read active, Admins can manage)
CREATE POLICY "Active subscriptions are viewable by everyone" 
    ON public.subscriptions FOR SELECT 
    USING (is_active = true OR is_admin());

CREATE POLICY "Admins can insert subscriptions" 
    ON public.subscriptions FOR INSERT 
    WITH CHECK (is_admin());

CREATE POLICY "Admins can update subscriptions" 
    ON public.subscriptions FOR UPDATE 
    USING (is_admin());

CREATE POLICY "Admins can delete subscriptions" 
    ON public.subscriptions FOR DELETE 
    USING (is_admin());

-- Bookings Policies (Public/Clients can create bookings, owners & admins can view)
CREATE POLICY "Anyone can create a booking request" 
    ON public.bookings FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Users can view their own bookings" 
    ON public.bookings FOR SELECT 
    USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Admins can update all bookings" 
    ON public.bookings FOR UPDATE 
    USING (is_admin());

-- Inquiries Policies (Public can insert, Admins can view and update)
CREATE POLICY "Anyone can submit an inquiry" 
    ON public.inquiries FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Only admins can view inquiries" 
    ON public.inquiries FOR SELECT 
    USING (is_admin());

CREATE POLICY "Only admins can update inquiries" 
    ON public.inquiries FOR UPDATE 
    USING (is_admin());

-- ==============================================================================
-- 10. INITIAL SEED DATA
-- ==============================================================================

-- Seed Studio Hourly / Session Packages
INSERT INTO public.studio_packages (slug, name, tagline, description, category, duration_hours, max_guests, price_lkr, features, is_popular, display_order)
VALUES
(
    'audio-only',
    'Audio Only Studio',
    'Broadcast-Grade Pristine Sound',
    'Ideal for talk shows, narrative audio series, voiceovers, and corporate podcast recording.',
    'audio',
    1,
    4,
    18500.00,
    '[
        "Acoustically calibrated studio room",
        "Up to 4x Shure SM7B broadcast microphones",
        "Rodecaster Pro II production console",
        "Live audio engineer monitoring on-site",
        "Raw individual track stems (24-bit WAV)",
        "Mastered podcast-ready stereo audio file"
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
    1,
    1,
    40000.00,
    '[
        "1x Sony FX-Line Cinema 4K Camera (Cinema Prime Lens)",
        "1x Shure SM7B Broadcast Microphone",
        "Professional 3-point Aputure studio lighting rig",
        "Custom RGB accent background lighting tailored to brand",
        "Raw multi-track audio & 4K ProRes/H.264 video files",
        "Color graded ready-to-publish video master",
        "Teleprompter setup available upon request"
    ]'::jsonb,
    false,
    2
),
(
    'dual-multicam-podcast',
    'Dual Multi-Cam Podcast',
    '3-Camera Dynamic Interview Production',
    'Our most popular package for interviews, founder talks, co-hosted debates, and high-engagement shows.',
    'multicam',
    1,
    2,
    50000.00,
    '[
        "3x Sony FX Cinema 4K Cameras (Host, Guest & Wide Master)",
        "2x Shure SM7B Broadcast Microphones + Cloudlifters",
        "Live Atem Mini Extreme ISO multi-angle switching",
        "Dedicated on-site sound engineer & camera operator",
        "Custom studio backdrop & animated RGB brand lighting",
        "Mastered 4K multi-cam edited video + stereo audio",
        "Full ISO camera tracks and raw audio stems provided"
    ]'::jsonb,
    true,
    3
),
(
    'panel-full-production',
    'Panel & Full Production',
    '4-Camera Group Discussion Setup',
    'Designed for panel discussions, roundtable debates, agency shows, and multi-guest shows.',
    'full_production',
    1,
    4,
    65000.00,
    '[
        "4x Sony FX Cinema 4K Cameras with continuous ISO recording",
        "4x Shure SM7B Microphones & individual head-mixes",
        "Dedicated technical director + sound engineer on-set",
        "Live interactive screen graphics & lower thirds",
        "Full studio control room switching & monitor feed",
        "Includes 2x edited vertical viral teasers (Reels/Shorts)",
        "Expedited 48-hour delivery of final 4K cut"
    ]'::jsonb,
    false,
    4
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Monthly Creator Subscriptions
INSERT INTO public.subscriptions (slug, name, tier, tagline, description, price_lkr, episodes_per_month, studio_hours_per_month, shorts_reels_count, features, is_popular, display_order)
VALUES
(
    'basic-creator',
    'Basic Creator',
    'basic',
    'Kickstart your podcast journey',
    'Perfect for budding creators and consultants releasing bi-weekly audio & single-cam content.',
    80000.00,
    2,
    3,
    0,
    '[
        "2 Podcast Episodes per month (Up to 60 mins each)",
        "3 Hours of studio recording time per month",
        "1x 4K Cinema Camera + 2x Shure SM7B Mics",
        "Professional sound mastering & noise reduction",
        "Full raw ISO files + edited master video",
        "Studio acoustic suite booking priority"
    ]'::jsonb,
    false,
    1
),
(
    'bronze-creator',
    'Bronze Creator',
    'bronze',
    'Steady growth & multi-camera quality',
    'Designed for consistent podcasters who need multi-angle footage and vertical content clips.',
    95000.00,
    2,
    4,
    4,
    '[
        "2 Multi-Cam Podcast Episodes per month",
        "4 Hours of monthly studio recording time",
        "3x Sony Cinema 4K Cameras & live switching",
        "4x High-retention Viral Shorts / TikToks / Reels with kinetic subtitles",
        "Custom YouTube thumbnail design per episode",
        "Color graded 4K final episode cut"
    ]'::jsonb,
    false,
    2
),
(
    'silver-pro',
    'Silver Pro',
    'silver',
    'Weekly flagship podcast engine',
    'The standard for high-growth founders, media brands, and influential leaders publishing weekly.',
    175000.00,
    4,
    8,
    12,
    '[
        "4 Full Multi-Cam Episodes per month (Weekly Release)",
        "8 Hours of dedicated monthly studio recording time",
        "3x Sony FX 4K Cameras + full lighting design",
        "12x Viral Hook Short-form Videos (Reels/Shorts/TikTok)",
        "4x Custom 3D YouTube thumbnails & metadata optimization",
        "Full multi-cam post-production, sound FX & intro/outro",
        "Dedicated audio engineer and camera director on-set",
        "Spotify, Apple Podcasts & YouTube distribution upload support"
    ]'::jsonb,
    true,
    3
),
(
    'gold-studio-elite',
    'Gold Studio Elite',
    'gold',
    'Enterprise & high-velocity media dominance',
    'Comprehensive end-to-end podcast and video production powerhouse for enterprise brands and top-tier creators.',
    350000.00,
    8,
    16,
    24,
    '[
        "8 Full Multi-Cam Episodes or bi-weekly multi-guest shows",
        "16 Hours of monthly VIP studio recording time",
        "4x Sony FX Cinema 4K Cameras + live switching console",
        "24x Viral Short-Form Videos with custom motion graphics & captions",
        "Dedicated Executive Producer & Senior Video Editor",
        "Complete set customization (Branded neon signs & backdrop props)",
        "Full distribution syndication & SEO show notes writing",
        "24/7 priority studio booking & expedited 24-hour edit turnaround"
    ]'::jsonb,
    false,
    4
)
ON CONFLICT (slug) DO NOTHING;
