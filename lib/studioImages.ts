/**
 * STUDIO IMAGES LIST (Loaded directly from public/images/studio-images)
 * ==============================================================================
 * All studio images uploaded by you for the 3D Showcase & Gallery
 * ==============================================================================
 */

export const STUDIO_SHOWCASE_IMAGES: string[] = [
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(1).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(2).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(3).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(4).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(5).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(6).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(7).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(8).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(9).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(10).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(11).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(12).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(13).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(14).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(15).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(16).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(17).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(18).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19%20(19).jpeg",
  "/images/studio-images/WhatsApp%20Image%202026-09-07%20at%2015.33.19.jpeg",
];

export interface StudioImageDetail {
  id: string;
  title: string;
  category: 'Studio Set' | 'Audio Rig' | 'Cinema Cameras' | 'Control Room' | 'Lounge';
  description: string;
  imageUrl: string;
}

export const STUDIO_GALLERY_ITEMS: StudioImageDetail[] = [
  {
    id: 'img-1',
    title: 'Studio Stage Setup',
    category: 'Studio Set',
    description: 'Custom acoustic studio environment with calibrated lighting and multi-mic recording.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[0],
  },
  {
    id: 'img-2',
    title: 'Multi-Camera Cinema Setup',
    category: 'Cinema Cameras',
    description: 'Professional Sony cinema camera angles tailored for wide, host, and guest coverage.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[1],
  },
  {
    id: 'img-3',
    title: 'Broadcast Microphone Rig',
    category: 'Audio Rig',
    description: 'Studio boom arms, shockmounts, and low-noise XLR signal routing.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[2],
  },
  {
    id: 'img-4',
    title: 'Acoustic Whisper Suite',
    category: 'Studio Set',
    description: 'Sound-isolated chamber engineered for crystal clear vocal recording.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[3],
  },
  {
    id: 'img-5',
    title: 'Cinema Lens & Lighting',
    category: 'Cinema Cameras',
    description: 'Prime cinema lenses for beautiful depth-of-field and cinematic bokeh.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[4],
  },
  {
    id: 'img-6',
    title: 'Studio Lighting & Softbox',
    category: 'Studio Set',
    description: 'Diffusion panels and RGB accent lights matching your brand aesthetic.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[5],
  },
  {
    id: 'img-7',
    title: 'Audio Monitoring Console',
    category: 'Audio Rig',
    description: 'Zero-latency live headphone monitoring and real-time equalization.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[6],
  },
  {
    id: 'img-8',
    title: 'Guest Interview Lounge',
    category: 'Lounge',
    description: 'Comfortable VIP lounge space for pre-show prep and guest hospitality.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[7],
  },
  {
    id: 'img-9',
    title: 'Director Switching & ISO Recording',
    category: 'Control Room',
    description: 'Live multi-feed switcher recording ISO angles simultaneously.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[8],
  },
  {
    id: 'img-10',
    title: 'Live Podcast In-Session',
    category: 'Studio Set',
    description: 'Dynamic in-action studio session with ambient background glow.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[9],
  },
  {
    id: 'img-11',
    title: 'Acoustic Soundproofing Wall',
    category: 'Studio Set',
    description: 'High-NRC acoustic absorption panels preventing slapback echo.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[10],
  },
  {
    id: 'img-12',
    title: 'Overhead Lighting Grid',
    category: 'Studio Set',
    description: 'Overhead studio grid with dimmable bi-color soft fixtures.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[11],
  },
  {
    id: 'img-13',
    title: 'Cinema Monitor & Teleprompter',
    category: 'Cinema Cameras',
    description: 'High-brightness prompter screen with direct eye-line alignment.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[12],
  },
  {
    id: 'img-14',
    title: 'Master Control Suite',
    category: 'Control Room',
    description: 'Color-calibrated editing bay and audio master control console.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[13],
  },
  {
    id: 'img-15',
    title: 'Wireless Audio Receivers',
    category: 'Audio Rig',
    description: 'Digital wireless lavalier transmitters and dual-channel receivers.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[14],
  },
  {
    id: 'img-16',
    title: 'Studio Green Room & Prep',
    category: 'Lounge',
    description: 'Relaxed green room equipped with refreshment bar and makeup mirrors.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[15],
  },
  {
    id: 'img-17',
    title: 'Full Studio Overview Angle',
    category: 'Studio Set',
    description: 'Panoramic studio angle showcasing the full filming stage.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[16],
  },
  {
    id: 'img-18',
    title: '4K HDMI & SDI Infrastructure',
    category: 'Control Room',
    description: 'Zero-drop signal cables running between studio floor and control room.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[17],
  },
  {
    id: 'img-19',
    title: 'Backstage Production Area',
    category: 'Lounge',
    description: 'Dedicated backstage prep area for production teams and talent.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[18],
  },
  {
    id: 'img-20',
    title: 'Studio Stage Atmosphere',
    category: 'Studio Set',
    description: 'Ambient neon edge glow highlighting the production environment.',
    imageUrl: STUDIO_SHOWCASE_IMAGES[19],
  },
];
