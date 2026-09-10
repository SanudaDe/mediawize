export interface VideoContentItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'WIZEtv Podcast' | 'Tips & Tricks' | 'Gear & BTS' | 'Studio Showcase';
  contentType: 'Podcast Episode' | 'Instagram & Facebook Reel' | 'Studio Production Grab';
  duration: string; // e.g. "Full Episode" or "Reel"
  facebookUrl: string;
  originalThumbnail: string;
  description: string;
  views: string;
  reactions: string;
  date: string;
  featured?: boolean;
}

export const VIDEO_CONTENTS: VideoContentItem[] = [
  {
    id: 'wizetv-podcast-suneth',
    title: 'Reading the Comments — with Dr. Suneth Rajawasan',
    subtitle: 'WIZEtv Original Podcast Series',
    category: 'WIZEtv Podcast',
    contentType: 'Podcast Episode',
    duration: 'Full Episode',
    facebookUrl: 'https://www.facebook.com/share/v/193uTK2JTF/',
    originalThumbnail: '/images/facebook-thumbnails/fb-podcast-suneth.jpg',
    description:
      "WIZEtv's 'Reading the Comments' series with Dr. Suneth Rajawasan. Real audience conversations, personal branding, and high-impact studio production in Colombo.",
    views: '78K Views',
    reactions: '815 Reactions',
    date: 'Recent',
    featured: true,
  },
  {
    id: 'wizetv-podcast-comments',
    title: 'Read Between the Comments — Real Stories & Q&A',
    subtitle: 'WIZEtv Studio Production Episode',
    category: 'WIZEtv Podcast',
    contentType: 'Podcast Episode',
    duration: 'Full Episode',
    facebookUrl: 'https://www.facebook.com/share/v/1EhDo4Ffx1/',
    originalThumbnail: '/images/facebook-thumbnails/fb-podcast-comments.jpg',
    description:
      'Real relationship questions, candid stories, and unapologetic opinions. Recorded with multi-camera 4K Sony cinema angles and Shure SM7B acoustics.',
    views: '370K Views',
    reactions: '4.7K Reactions',
    date: 'Viral Hit',
    featured: true,
  },
  {
    id: 'podcast-tips-equipment',
    title: 'Basic Equipment to Start a Podcast in 2026',
    subtitle: 'Creator Tips & Camera / Audio Essentials',
    category: 'Tips & Tricks',
    contentType: 'Instagram & Facebook Reel',
    duration: 'Reel',
    facebookUrl: 'https://www.facebook.com/share/r/1HFAdStopa/',
    originalThumbnail: '/images/facebook-thumbnails/fb-reel-tips.jpg',
    description:
      'Planning to launch a podcast in 2026? Here is the exact essential gear list: 1 Camera, 1 Podcast Microphone, 1 Softbox Light, 1 Backlight, and 1 RGB ambient accent.',
    views: '3.6K Views',
    reactions: '17 Reactions',
    date: 'Tips & Tricks',
  },
  {
    id: 'podcast-lighting-breakdown',
    title: 'Good Lighting Transforms Your Podcast Look',
    subtitle: 'Fill, Back, Background & Projector Lights',
    category: 'Tips & Tricks',
    contentType: 'Instagram & Facebook Reel',
    duration: 'Reel',
    facebookUrl: 'https://www.facebook.com/share/r/18VkJaEsvU/',
    originalThumbnail: '/images/facebook-thumbnails/fb-reel-lighting.jpg',
    description:
      'Good lighting can change the whole look of your podcast. Here is a simple breakdown of the key lights that bring a basic setup to life: fill light, back light, background light, and projector light.',
    views: '4.5K Views',
    reactions: 'Lighting Tips',
    date: 'Tips & Tricks',
  },
  {
    id: 'done-contents-equipment-tour',
    title: 'WIZEtv — Where Stories Come to Life (Equipment Tour)',
    subtitle: 'Behind The Scenes & Cinema Rig Tour',
    category: 'Gear & BTS',
    contentType: 'Studio Production Grab',
    duration: 'Production Reel',
    facebookUrl: 'https://www.facebook.com/share/r/19Puzih2kP/',
    originalThumbnail: '/images/facebook-thumbnails/fb-reel-equipment.jpg',
    description:
      'From creative studio setups and podcasts to professional audio recording, editing, and complete production support under one roof in Colombo.',
    views: '3.3K Views',
    reactions: 'BTS Tour',
    date: 'Production Grab',
  },
  {
    id: 'studio-relaunch-experience',
    title: 'A New Chapter Begins — Wize TV Brand Relaunch',
    subtitle: 'Fresh Energy, Modern Look & Studio Tour',
    category: 'Studio Showcase',
    contentType: 'Instagram & Facebook Reel',
    duration: 'Reel',
    facebookUrl: 'https://www.facebook.com/share/r/19L9XKq4M4/',
    originalThumbnail: '/images/facebook-thumbnails/fb-reel-relaunch.jpg',
    description:
      'From a bold vision to a powerful relaunch, Wize TV is back with a fresh look, renewed energy, and bigger ambitions. New Style. Fresh Energy. Wize TV.',
    views: '4.2K Views',
    reactions: '27 Reactions',
    date: 'Brand Story',
  },
];
