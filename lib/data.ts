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
  hoursBadge: string;
  sessionCount: string;
  cameras?: string;
  idealUseCase?: string;
  popular?: boolean;
}

export interface MembershipBenefit {
  benefit: string;
  basic: string;
  bronze: string;
  silver: string;
  gold: string;
}

export interface AdditionalServiceItem {
  service: string;
  price: string;
}

export const ADDITIONAL_SERVICES_DATA: AdditionalServiceItem[] = [
  { service: 'Additional Hour', price: 'LKR 7,500 / hour' },
  { service: 'Technician', price: 'LKR 5,000 / hour' },
  { service: 'Additional Podcast Microphone', price: 'LKR 4,000 / hour' },
  { service: 'Additional Wireless Microphone (DJI)', price: 'LKR 2,000 / hour' },
  { service: 'Additional Camera', price: 'LKR 6,000 / hour' },
  { service: 'Additional Lighting', price: 'LKR 3,500 / hour' },
  { service: 'Teleprompter', price: 'LKR 4,000 / hour' },
  { service: 'Live Streaming Setup', price: 'LKR 15,000 / hour' },
  { service: 'Intro / Outro Video', price: 'LKR 15,000 / each' },
  { service: 'Reel Editing', price: 'LKR 8,500 / reel' },
  { service: 'Podcast Editing', price: 'LKR 25,000 / episode' },
];

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
    priceLKR: 'LKR 55,000',
    priceNum: 55000,
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
    recordingAllocation: '1 Recording Session (6 Hours)',
    hoursBadge: '6',
    sessionCount: '1 Recording Session',
    cameras: '1 Camera',
    priority: 'Standard',
    idealUseCase: 'Content creation and personal projects',
  },
  {
    id: 'sub-bronze',
    slug: 'bronze-subscription',
    name: 'Bronze',
    recommendedFor: 'Founders, CEOs, Consultants, Coaches',
    monthlyFeeLKR: 'LKR 95,000',
    monthlyFeeNum: 95000,
    recordingAllocation: '2 Recording Sessions (5h)',
    hoursBadge: '5',
    sessionCount: '2 Recording Sessions',
    cameras: '2 Cameras',
    priority: 'High',
    idealUseCase: 'Personal branding',
  },
  {
    id: 'sub-silver',
    slug: 'silver-subscription',
    name: 'Silver',
    recommendedFor: 'SMEs, Marketing Teams, Educational Institutes',
    monthlyFeeLKR: 'LKR 175,000',
    monthlyFeeNum: 175000,
    recordingAllocation: '4 Recording Sessions (10h)',
    hoursBadge: '10',
    sessionCount: '4 Recording Sessions',
    cameras: '3 Cameras',
    priority: 'Priority',
    idealUseCase: 'Company podcast and marketing content',
    popular: true,
  },
  {
    id: 'sub-gold',
    slug: 'gold-subscription',
    name: 'Gold',
    recommendedFor: 'Corporates, Banks, Hotels, Large Organizations',
    monthlyFeeLKR: 'LKR 350,000+',
    monthlyFeeNum: 350000,
    recordingAllocation: 'Dedicated Monthly Production Days (20H)',
    hoursBadge: '20',
    sessionCount: 'Dedicated Production Days',
    cameras: '3 Cameras',
    priority: 'Guaranteed',
    idealUseCase: 'Corporate communications and executive content',
  },
];

export const MEMBERSHIP_BENEFITS_DATA: MembershipBenefit[] = [
  {
    benefit: 'Camera Setup',
    basic: '1 Camera',
    bronze: '2 Cameras',
    silver: '3 Cameras',
    gold: '3 Cameras',
  },
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
    bronze: 'Monthly',
    silver: 'Monthly',
    gold: 'Unlimited',
  },
  {
    benefit: 'Faster Editing',
    basic: '✗',
    bronze: '✓',
    silver: '✓',
    gold: 'Priority',
  },
  {
    benefit: 'Discounted Add-ons',
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

export interface BlogPostItem {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  linkedinUrl?: string;
  badge?: string;
}

export const BLOG_POSTS: BlogPostItem[] = [
  {
    slug: 'why-podcasting-one-best-personal-branding-tools',
    title: 'Why Podcasting Is One of the Best Personal Branding Tools?',
    category: 'Personal Branding',
    date: 'Aug 2026',
    readTime: '5 min read',
    excerpt:
      'The smartest way to build trust in the digital age. Discover how leaders and creators use long-form conversations to showcase genuine expertise and connect with high-value audiences.',
    image: '/images/blog/personal-branding-linkedin.jpg',
    linkedinUrl:
      'https://www.linkedin.com/pulse/why-podcasting-one-best-personal-branding-tools-wizetv-we53c/',
    badge: 'LinkedIn Pulse',
  },
  {
    slug: 'why-more-ceos-choosing-podcasts-over-traditional-marketing',
    title: 'Why Are More CEOs Choosing Podcasts Over Traditional Marketing?',
    category: 'Thought Leadership',
    date: 'Recent',
    readTime: '6 min read',
    excerpt:
      'There was a time when CEOs worked quietly behind closed doors. Today, leadership has changed — modern founders and executives use podcasts to build trust, authority, and authentic brand reach.',
    image: '/images/blog/ceo-podcasts-linkedin.jpg',
    linkedinUrl:
      'https://www.linkedin.com/pulse/why-more-ceos-choosing-podcasts-over-traditional-marketing-wizetv-apwrc/',
    badge: 'LinkedIn Pulse',
  },
  {
    slug: 'how-to-launch-high-impact-corporate-podcast',
    title: 'How to Launch a Corporate Podcast That Drives Real Business Growth in Sri Lanka',
    category: 'Podcast Tips',
    date: 'Sep 2026',
    readTime: '5 min read',
    excerpt:
      'Discover why leading CEOs and enterprises are replacing newsletters with boardroom podcasts to educate customers and build trust.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'youtube-growth-secrets-multi-camera-podcasts',
    title: 'YouTube Growth Secrets: Why Multi-Camera Setups Get 3x Higher Audience Retention',
    category: 'YouTube Growth',
    date: 'Aug 2026',
    readTime: '4 min read',
    excerpt:
      'Dynamic camera angle switching keeps viewers glued to the screen. Here is how our studio engineer orchestrates multi-cam cuts.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'record-once-create-content-for-weeks-short-form',
    title: 'Record Once, Create Content for Weeks: The Art of Vertical Content Repurposing',
    category: 'Content Creation',
    date: 'Aug 2026',
    readTime: '6 min read',
    excerpt:
      'Turn one 60-minute podcast conversation into 20+ viral Instagram Reels, TikToks, and YouTube Shorts with animated captions.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'behind-the-scenes-colombo-whisper-room-acoustics',
    title: 'Behind the Scenes: Inside WIZEtv’s Acoustically Calibrated Whisper Suite',
    category: 'Studio Behind The Scenes',
    date: 'Jul 2026',
    readTime: '4 min read',
    excerpt:
      'A technical tour of our floating acoustic walls, Shure SM7B signal chain, and Aputure studio softbox lighting rig.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
  },
];
