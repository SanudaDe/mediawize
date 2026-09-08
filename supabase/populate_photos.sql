-- ==============================================================================
-- WizeTV Studio - Populate Photos Table with Supabase Storage URLs
-- Run this in Supabase SQL Editor to populate all 20 uploaded studio images
-- ==============================================================================

-- Clear previous sample photos
TRUNCATE TABLE public.photos;

-- Insert all 20 studio images referencing your Supabase 'photos' bucket
INSERT INTO public.photos (title, category, image_url, description, display_order, is_published)
VALUES
  (
    'Studio Stage Setup',
    'Studio Set',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(1).jpeg',
    'Custom acoustic studio environment with calibrated lighting and multi-mic recording.',
    1,
    true
  ),
  (
    'Multi-Camera Cinema Setup',
    'Cinema Cameras',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(2).jpeg',
    'Professional Sony cinema camera angles tailored for wide, host, and guest coverage.',
    2,
    true
  ),
  (
    'Broadcast Microphone Rig',
    'Audio Rig',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(3).jpeg',
    'Studio boom arms, shockmounts, and low-noise XLR signal routing.',
    3,
    true
  ),
  (
    'Acoustic Whisper Suite',
    'Studio Set',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(4).jpeg',
    'Sound-isolated chamber engineered for crystal clear vocal recording.',
    4,
    true
  ),
  (
    'Cinema Lens & Lighting',
    'Cinema Cameras',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(5).jpeg',
    'Prime cinema lenses for beautiful depth-of-field and cinematic bokeh.',
    5,
    true
  ),
  (
    'Studio Lighting & Softbox',
    'Studio Set',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(6).jpeg',
    'Diffusion panels and RGB accent lights matching your brand aesthetic.',
    6,
    true
  ),
  (
    'Audio Monitoring Console',
    'Audio Rig',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(7).jpeg',
    'Zero-latency live headphone monitoring and real-time equalization.',
    7,
    true
  ),
  (
    'Guest Interview Lounge',
    'Lounge',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(8).jpeg',
    'Comfortable VIP lounge space for pre-show prep and guest hospitality.',
    8,
    true
  ),
  (
    'Director Switching & ISO Recording',
    'Control Room',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(9).jpeg',
    'Live multi-feed switcher recording ISO angles simultaneously.',
    9,
    true
  ),
  (
    'Live Podcast In-Session',
    'Studio Set',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(10).jpeg',
    'Dynamic in-action studio session with ambient background glow.',
    10,
    true
  ),
  (
    'Acoustic Soundproofing Wall',
    'Studio Set',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(11).jpeg',
    'High-NRC acoustic absorption panels preventing slapback echo.',
    11,
    true
  ),
  (
    'Overhead Lighting Grid',
    'Studio Set',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(12).jpeg',
    'Overhead studio grid with dimmable bi-color soft fixtures.',
    12,
    true
  ),
  (
    'Cinema Monitor & Teleprompter',
    'Cinema Cameras',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(13).jpeg',
    'High-brightness prompter screen with direct eye-line alignment.',
    13,
    true
  ),
  (
    'Master Control Suite',
    'Control Room',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(14).jpeg',
    'Color-calibrated editing bay and audio master control console.',
    14,
    true
  ),
  (
    'Wireless Audio Receivers',
    'Audio Rig',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(15).jpeg',
    'Digital wireless lavalier transmitters and dual-channel receivers.',
    15,
    true
  ),
  (
    'Studio Green Room & Prep',
    'Lounge',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(16).jpeg',
    'Relaxed green room equipped with refreshment bar and makeup mirrors.',
    16,
    true
  ),
  (
    'Full Studio Overview Angle',
    'Studio Set',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(17).jpeg',
    'Panoramic studio angle showcasing the full filming stage.',
    17,
    true
  ),
  (
    '4K HDMI & SDI Infrastructure',
    'Control Room',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(18).jpeg',
    'Zero-drop signal cables running between studio floor and control room.',
    18,
    true
  ),
  (
    'Backstage Production Area',
    'Lounge',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(19).jpeg',
    'Dedicated backstage prep area for production teams and talent.',
    19,
    true
  ),
  (
    'Studio Stage Atmosphere',
    'Studio Set',
    'https://bdsdxtydmhydiqwaodie.supabase.co/storage/v1/object/public/photos/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19.jpeg',
    'Ambient neon edge glow highlighting the production environment.',
    20,
    true
  );
