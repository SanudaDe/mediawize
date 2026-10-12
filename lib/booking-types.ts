// lib/booking-types.ts
// Shared TypeScript types for the WizeTV Booking System

export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';

export interface StudioPackage {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  category: string;
  duration_hours: number;
  max_guests: number;
  price_lkr: number;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  display_order: number;
}

export interface TimeSlot {
  time: string;           // "09:00"
  label: string;          // "9:00 AM – 11:00 AM"
  endTime?: string;       // "11:00"
  durationHours?: number; // 2
  available: boolean;
}

export interface BusinessHours {
  day_of_week: number; // 0=Sun
  is_open: boolean;
  open_time: string;   // "09:00"
  close_time: string;  // "18:00"
}

export interface Booking {
  id: string;
  booking_reference: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  company_name?: string;
  show_name?: string;
  package_id?: string;
  requested_date: string;       // "YYYY-MM-DD"
  requested_time_slot: string;  // "09:00"
  start_time?: string;          // ISO timestamptz
  end_time?: string;            // ISO timestamptz
  duration_hours: number;
  guest_count: number;
  add_ons: string[];
  estimated_total_lkr: number;
  status: BookingStatus;
  admin_notes?: string;
  client_notes?: string;
  rejection_reason?: string;
  confirmed_at?: string;
  rejected_at?: string;
  cancelled_at?: string;
  created_at: string;
  updated_at: string;
  // joined
  studio_packages?: StudioPackage;
}

export interface BookingFormData {
  // Step 1
  package_id: string;
  // Step 2
  requested_date: string;
  // Step 3
  requested_time_slot: string;
  // Step 4
  client_name: string;
  client_email: string;
  client_phone: string;
  company_name?: string;
  show_name?: string;
  guest_count: number;
  client_notes?: string;
}

export interface AvailabilityResponse {
  date: string;
  slots: TimeSlot[];
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}
