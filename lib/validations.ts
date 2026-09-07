import { z } from 'zod';

export const bookingFormSchema = z.object({
  client_name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(80, { message: 'Name must be less than 80 characters' }),
  client_email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  client_phone: z
    .string()
    .min(9, { message: 'Please enter a valid phone or WhatsApp number' })
    .max(25, { message: 'Phone number is too long' }),
  company_name: z.string().max(100).optional(),
  show_name: z.string().max(100).optional(),
  booking_type: z.string().default('inquiry'),
  package_id: z.string().optional(),
  subscription_id: z.string().optional(),
  service_interest: z.string().optional(),
  requested_date: z.string().optional(),
  requested_time_slot: z.string().optional(),
  guest_count: z.number().optional(),
  add_ons: z.array(z.string()).default([]),
  client_notes: z
    .string()
    .min(5, { message: 'Please provide a brief message or project description' })
    .max(2000),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(80),
  email: z
    .string()
    .email({ message: 'Please provide a valid email address' }),
  phone: z.string().optional(),
  service_interest: z.string().optional(),
  budget_range: z.string().optional(),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long' })
    .max(1500, { message: 'Message cannot exceed 1500 characters' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
