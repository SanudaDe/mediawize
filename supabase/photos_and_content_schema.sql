-- ==============================================================================
-- WizeTV Media & Content Database Schema
-- Focus: Photos/Gallery, Studio Gear, Packages, and Contact Inquiries
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. PHOTOS / GALLERY TABLE
-- Store studio photos, podcast gallery, behind-the-scenes, catalogue pages
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Studio Set', -- e.g. 'Studio Set', 'Cinema Cameras', 'Audio Rig', 'Control Room', 'Podcast'
    image_url TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 3. STUDIO PACKAGES & SERVICES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.studio_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'video',
    duration TEXT DEFAULT '2 Hours',
    price_lkr NUMERIC(10, 2) NOT NULL,
    description TEXT,
    includes JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_popular BOOLEAN DEFAULT false NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 4. STUDIO GEAR & EQUIPMENT TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.studio_gear (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Cameras', 'Audio & Mics', 'Lighting', 'Switching & Monitoring'
    specs TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 5. CONTACT INQUIRIES TABLE
-- When visitors message through the contact form
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service_interest TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' NOT NULL, -- 'unread', 'contacted', 'resolved'
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studio_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studio_gear ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view published photos
CREATE POLICY "Public can view published photos"
    ON public.photos FOR SELECT
    USING (is_published = true);

-- Allow everyone to view active packages
CREATE POLICY "Public can view active packages"
    ON public.studio_packages FOR SELECT
    USING (is_active = true);

-- Allow everyone to view active gear
CREATE POLICY "Public can view studio gear"
    ON public.studio_gear FOR SELECT
    USING (is_active = true);

-- Allow anyone to submit a contact inquiry
CREATE POLICY "Anyone can submit an inquiry"
    ON public.inquiries FOR INSERT
    WITH CHECK (true);

-- ==============================================================================
-- 7. SEED DATA FOR PHOTOS (Pre-populate with initial gallery items)
-- ==============================================================================
INSERT INTO public.photos (title, category, image_url, description, display_order)
VALUES
    ('Main Studio Stage', 'Studio Set', '/images/studio-images/WhatsApp Image 2026-09-07 at 15.33.19 (1).jpeg', 'Custom acoustic studio environment with calibrated lighting and multi-mic recording.', 1),
    ('Multi-Camera Cinema Setup', 'Cinema Cameras', '/images/studio-images/WhatsApp Image 2026-09-07 at 15.33.19 (2).jpeg', 'Professional Sony cinema camera angles tailored for wide, host, and guest coverage.', 2),
    ('Broadcast Microphone Rig', 'Audio Rig', '/images/studio-images/WhatsApp Image 2026-09-07 at 15.33.19 (3).jpeg', 'Studio boom arms, shockmounts, and low-noise XLR signal routing.', 3),
    ('Director Control Station', 'Control Room', '/images/studio-images/WhatsApp Image 2026-09-07 at 15.33.19 (4).jpeg', 'Live switching, multi-view preview, and real-time audio leveling station.', 4),
    ('VIP Green Room & Lounge', 'Lounge', '/images/studio-images/WhatsApp Image 2026-09-07 at 15.33.19 (5).jpeg', 'Dedicated pre-show prep room for guests, coffee bar, and briefing space.', 5)
ON CONFLICT DO NOTHING;
