export interface StudioPackageItem {
  id: string;
  slug: string;
  name: string;
  bestFor: string;
  duration: string;
  includes: string[];
  priceLKR: string;
  priceNum: number;
  popular?: boolean;
}

export interface SubscriptionPackageItem {
  id: string;
  slug: string;
  name: string;
  recommendedFor: string;
  monthlyFeeLKR: string;
  monthlyFeeNum: number;
  recordingAllocation: string;
  priority: string;
  popular?: boolean;
}

export interface MembershipBenefit {
  benefit: string;
  basic: string;
  bronze: string;
  silver: string;
  gold: string;
}

export const STUDIO_PACKAGES_DATA: StudioPackageItem[] = [
  {
    id: 'pkg-audio',
    slug: 'audio-only-podcast',
    name: 'Audio Only Podcast',
    bestFor: 'Audio podcasts, interviews, voice recordings',
    duration: '2 Hours',
    includes: [
      'Studio Rental (Audio Only)',
      '1 Podcast Microphone',
      'Audio Recording',
      'Technician Support',
    ],
    priceLKR: 'LKR 18,500',
    priceNum: 18500,
  },
  {
    id: 'pkg-solo',
    slug: 'solo-video-podcast',
    name: 'Solo Video Podcast',
    bestFor: 'Individual creators, coaches, founders',
    duration: '2 Hours',
    includes: [
      'Studio Rental (Video Podcast)',
      '1 Camera',
      '1 Podcast Microphone',
      'Lighting Setup',
      'Technician Support',
    ],
    priceLKR: 'LKR 40,000',
    priceNum: 40000,
  },
  {
    id: 'pkg-dual',
    slug: 'dual-host-video-podcast',
    name: 'Dual Host Video Podcast',
    bestFor: 'Two-host podcasts, interviews',
    duration: '2 Hours',
    includes: [
      'Studio Rental (Video Podcast)',
      '3 Camera Setup',
      'Lighting Setup',
      '2 Podcast Microphones',
      'Technician Support',
    ],
    priceLKR: 'LKR 50,000',
    priceNum: 50000,
    popular: true,
  },
  {
    id: 'pkg-custom',
    slug: 'custom-premium-experience',
    name: 'Custom Premium Experience',
    bestFor: 'Corporate podcasts, premium productions, large setups',
    duration: 'Custom',
    includes: [
      'Fully customized production based on client requirements',
    ],
    priceLKR: 'Custom Quotation',
    priceNum: 0,
  },
];

export const SUBSCRIPTION_PACKAGES_DATA: SubscriptionPackageItem[] = [
  {
    id: 'sub-basic',
    slug: 'basic-subscription',
    name: 'Basic',
    recommendedFor: 'YouTubers, Content Creators, Influencers',
    monthlyFeeLKR: 'LKR 80,000',
    monthlyFeeNum: 80000,
    recordingAllocation: '1 Recording Session (5 Hours)',
    priority: 'Standard',
  },
  {
    id: 'sub-bronze',
    slug: 'bronze-subscription',
    name: 'Bronze',
    recommendedFor: 'Founders, CEOs, Consultants, Coaches',
    monthlyFeeLKR: 'LKR 95,000',
    monthlyFeeNum: 95000,
    recordingAllocation: '1 Recording Session (5 Hours)',
    priority: 'High',
  },
  {
    id: 'sub-silver',
    slug: 'silver-subscription',
    name: 'Silver',
    recommendedFor: 'SMEs, Marketing Teams, Educational Institutes',
    monthlyFeeLKR: 'LKR 175,000',
    monthlyFeeNum: 175000,
    recordingAllocation: '2 Recording Sessions (10 Hours Each)',
    priority: 'Priority',
    popular: true,
  },
  {
    id: 'sub-gold',
    slug: 'gold-subscription',
    name: 'Gold',
    recommendedFor: 'Corporates, Banks, Hotels, Large Organizations',
    monthlyFeeLKR: 'LKR 350,000',
    monthlyFeeNum: 350000,
    recordingAllocation: '4 Recording Sessions (20 Hours)',
    priority: 'Guaranteed',
  },
];

export const MEMBERSHIP_BENEFITS_DATA: MembershipBenefit[] = [
  {
    benefit: 'Priority Booking',
    basic: '✓',
    bronze: '✓✓',
    silver: '✓✓✓',
    gold: '✓✓✓✓',
  },
  {
    benefit: 'Fixed Monthly Recording Slots',
    basic: '✗',
    bronze: 'Optional',
    silver: '✓',
    gold: '✓',
  },
  {
    benefit: 'Strategy Session',
    basic: '✗',
    bronze: 'One Time',
    silver: 'Monthly',
    gold: 'Monthly',
  },
  {
    benefit: 'Live Editing and Raw Footages',
    basic: '✓',
    bronze: '✓',
    silver: '✓',
    gold: '✓',
  },
  {
    benefit: 'Discounted Add-ons (For Annual)',
    basic: '5%',
    bronze: '10%',
    silver: '15%',
    gold: '20%',
  },
  {
    benefit: 'Dedicated Project Coordinator',
    basic: '✗',
    bronze: '✗',
    silver: '✓',
    gold: '✓',
  },
  {
    benefit: 'Dedicated Account Manager',
    basic: '✗',
    bronze: '✗',
    silver: '✗',
    gold: '✓',
  },
  {
    benefit: 'Priority Support',
    basic: '✗',
    bronze: '✓',
    silver: '✓',
    gold: '✓',
  },
];

export const BLOG_POSTS = [
  {
    slug: 'how-to-launch-high-impact-corporate-podcast',
    title: 'How to Launch a Corporate Podcast That Drives Real Business Growth in Sri Lanka',
    category: 'Podcast Tips',
    date: 'Sep 2026',
    readTime: '5 min read',
    excerpt: 'Discover why leading CEOs and enterprises are replacing newsletters with boardroom podcasts to educate customers and build trust.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'youtube-growth-secrets-multi-camera-podcasts',
    title: 'YouTube Growth Secrets: Why Multi-Camera Setups Get 3x Higher Audience Retention',
    category: 'YouTube Growth',
    date: 'Aug 2026',
    readTime: '4 min read',
    excerpt: 'Dynamic camera angle switching keeps viewers glued to the screen. Here is how our studio engineer orchestrates multi-cam cuts.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'record-once-create-content-for-weeks-short-form',
    title: 'Record Once, Create Content for Weeks: The Art of Vertical Content Repurposing',
    category: 'Content Creation',
    date: 'Aug 2026',
    readTime: '6 min read',
    excerpt: 'Turn one 60-minute podcast conversation into 20+ viral Instagram Reels, TikToks, and YouTube Shorts with animated captions.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'behind-the-scenes-colombo-whisper-room-acoustics',
    title: 'Behind the Scenes: Inside WizeTV’s Acoustically Calibrated Whisper Suite',
    category: 'Studio Behind The Scenes',
    date: 'Jul 2026',
    readTime: '4 min read',
    excerpt: 'A technical tour of our floating acoustic walls, Shure SM7B signal chain, and Aputure studio softbox lighting rig.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
  },
];
