/**
 * STUDIO IMAGES LIST (Loaded directly from public/images/studio-images)
 * ==============================================================================
 * All studio images uploaded by you for the 3D Showcase & Gallery
 * ==============================================================================
 */

export const STUDIO_SHOWCASE_IMAGES: string[] = [
  "/images/studio-images/DSC00046.jpg",
  "/images/studio-images/DSC00109%20(1).jpg",
  "/images/studio-images/DSC00111.jpg",
  "/images/studio-images/DSC00133.jpg",
  "/images/studio-images/DSC00139.jpg",
  "/images/studio-images/DSC00174.jpg",
  "/images/studio-images/DSC00199.jpg",
  "/images/studio-images/DSC00207.jpg",
  "/images/studio-images/DSC00228%20(1).jpg",
  "/images/studio-images/DSC00238.jpg",
  "/images/studio-images/DSC00241.jpg",
  "/images/studio-images/DSC00279.jpg",
  "/images/studio-images/DSC00352.JPG",
  "/images/studio-images/DSC00356.JPG",
  "/images/studio-images/DSC00360.JPG",
  "/images/studio-images/DSC00564.JPG",
  "/images/studio-images/DSC00574.JPG",
  "/images/studio-images/DSC00627.JPG",
  "/images/studio-images/DSC00634.JPG",
  "/images/studio-images/ChatGPT%20Image%20Jun%2026,%202026,%2012_01_10%20AM.png",
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
    title: 'Dual Host Podcast Studio Set',
    category: 'Studio Set',
    description: 'Custom acoustic timber table with calibrated lighting and multi-mic recording.',
    imageUrl: '/images/studio-images/DSC00046.jpg',
  },
  {
    id: 'img-2',
    title: 'Multi-Camera 4K Stage Setup',
    category: 'Cinema Cameras',
    description: 'Professional Sony cinema camera angles tailored for wide, host, and guest coverage.',
    imageUrl: '/images/studio-images/DSC00109%20(1).jpg',
  },
  {
    id: 'img-3',
    title: 'Broadcast Microphone Rig',
    category: 'Audio Rig',
    description: 'Studio boom arms, shockmounts, and low-noise XLR signal routing.',
    imageUrl: '/images/studio-images/DSC00111.jpg',
  },
  {
    id: 'img-4',
    title: 'Acoustic Whisper Suite Interior',
    category: 'Studio Set',
    description: 'Sound-isolated chamber engineered for crystal clear vocal recording.',
    imageUrl: '/images/studio-images/DSC00133.jpg',
  },
  {
    id: 'img-5',
    title: 'Cinema Lens & Framing Alignment',
    category: 'Cinema Cameras',
    description: 'Prime cinema lenses for beautiful depth-of-field and cinematic bokeh.',
    imageUrl: '/images/studio-images/DSC00139.jpg',
  },
  {
    id: 'img-6',
    title: 'Studio Lighting & Softbox Rig',
    category: 'Studio Set',
    description: 'Diffusion panels and RGB accent lights matching your brand colors.',
    imageUrl: '/images/studio-images/DSC00174.jpg',
  },
  {
    id: 'img-7',
    title: 'Audio Monitoring & Live Console',
    category: 'Audio Rig',
    description: 'Zero-latency live headphone monitoring and real-time equalization.',
    imageUrl: '/images/studio-images/DSC00199.jpg',
  },
  {
    id: 'img-8',
    title: 'Guest Interview Lounge Area',
    category: 'Lounge',
    description: 'Comfortable VIP lounge space for pre-show prep and guest hospitality.',
    imageUrl: '/images/studio-images/DSC00207.jpg',
  },
  {
    id: 'img-9',
    title: 'Director Switching & ISO Recording',
    category: 'Control Room',
    description: 'Live multi-feed switcher recording ISO angles simultaneously.',
    imageUrl: '/images/studio-images/DSC00228%20(1).jpg',
  },
  {
    id: 'img-10',
    title: 'Live Podcast In-Session View',
    category: 'Studio Set',
    description: 'Dynamic in-action studio session with ambient background glow.',
    imageUrl: '/images/studio-images/DSC00238.jpg',
  },
  {
    id: 'img-11',
    title: 'Acoustic Wall Paneling',
    category: 'Studio Set',
    description: 'Precision sound dampening panels eliminating echo and room reflections.',
    imageUrl: '/images/studio-images/DSC00241.jpg',
  },
  {
    id: 'img-12',
    title: 'Overhead Lighting Grid & C-Stands',
    category: 'Studio Set',
    description: 'Fully rigged ceiling grid keeping floor space clean and wire-free.',
    imageUrl: '/images/studio-images/DSC00279.jpg',
  },
  {
    id: 'img-13',
    title: 'High-Fidelity Vocal Capture Rig',
    category: 'Audio Rig',
    description: 'Studio-calibrated vocal chain with hardware compression.',
    imageUrl: '/images/studio-images/DSC00352.JPG',
  },
  {
    id: 'img-14',
    title: 'Multi-Cam Control Desk',
    category: 'Control Room',
    description: 'Dedicated operator station for audio levels, color, and teleprompter.',
    imageUrl: '/images/studio-images/DSC00356.JPG',
  },
  {
    id: 'img-15',
    title: 'Premium Studio Atmosphere',
    category: 'Studio Set',
    description: 'Warm, modern, and engaging studio design built for creators.',
    imageUrl: '/images/studio-images/DSC00360.JPG',
  },
  {
    id: 'img-16',
    title: 'Wide Angle Cinema Rig',
    category: 'Cinema Cameras',
    description: 'Full studio wide shot capturing both host and guest dynamics.',
    imageUrl: '/images/studio-images/DSC00564.JPG',
  },
  {
    id: 'img-17',
    title: 'Close-up Host Angle',
    category: 'Cinema Cameras',
    description: 'High-definition close-up feed perfect for viral shorts & reels.',
    imageUrl: '/images/studio-images/DSC00574.JPG',
  },
  {
    id: 'img-18',
    title: 'Guest Angle Camera Rig',
    category: 'Cinema Cameras',
    description: 'Calibrated color matching across all cinema camera angles.',
    imageUrl: '/images/studio-images/DSC00627.JPG',
  },
  {
    id: 'img-19',
    title: 'Studio Green Room Setup',
    category: 'Lounge',
    description: 'Dedicated staging and green room area for VIP guests and hosts.',
    imageUrl: '/images/studio-images/DSC00634.JPG',
  },
  {
    id: 'img-20',
    title: 'WizeTV Concept Stage',
    category: 'Studio Set',
    description: 'Full studio concept visualization and lighting schema.',
    imageUrl: '/images/studio-images/ChatGPT%20Image%20Jun%2026,%202026,%2012_01_10%20AM.png',
  },
];
