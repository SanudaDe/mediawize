export type PackageCategory = 'audio' | 'video' | 'multicam' | 'full_production';
export type SubscriptionTier = 'basic' | 'bronze' | 'silver' | 'gold';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type InquiryStatus = 'unread' | 'contacted' | 'resolved';

export interface StudioPackage {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: PackageCategory;
  duration_hours: number;
  max_guests: number;
  price_lkr: number;
  features: string[];
  is_popular?: boolean;
  is_active?: boolean;
  display_order?: number;
}

export interface SubscriptionPlan {
  id: string;
  slug: string;
  name: string;
  tier: SubscriptionTier;
  tagline: string;
  description: string;
  price_lkr: number;
  episodes_per_month: number;
  studio_hours_per_month: number;
  shorts_reels_count: number;
  features: string[];
  is_popular?: boolean;
  is_active?: boolean;
  display_order?: number;
}

export interface AddOnOption {
  id: string;
  name: string;
  description: string;
  price_lkr: number;
  unit: string;
}

export interface Booking {
  id: string;
  booking_reference: string;
  user_id?: string | null;
  package_id?: string | null;
  subscription_id?: string | null;
  client_name: string;
  client_email: string;
  client_phone: string;
  company_name?: string | null;
  show_name?: string | null;
  requested_date: string;
  requested_time_slot: string;
  guest_count: number;
  add_ons: string[];
  estimated_total_lkr: number;
  status: BookingStatus;
  admin_notes?: string | null;
  client_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  service_interest?: string;
  budget_range?: string;
  message: string;
  status?: InquiryStatus;
  created_at?: string;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  highlights: string[];
  equipment: string[];
  deliverables: string[];
  startingPrice: string;
  image: string;
}

export interface StudioGear {
  category: string;
  items: {
    name: string;
    model: string;
    description: string;
    count?: string;
  }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  showName: string;
  avatar: string;
  stats?: string;
}
