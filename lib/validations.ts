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
    .max(20, { message: 'Phone number is too long' }),
  company_name: z.string().max(100).optional(),
  show_name: z.string().max(100).optional(),
  booking_type: z.enum(['package', 'subscription', 'custom'], {
    errorMap: () => ({ message: 'Please select a booking option' }),
  }),
  package_id: z.string().optional(),
  subscription_id: z.string().optional(),
  requested_date: z
    .string()
    .min(1, { message: 'Please select a preferred studio date' }),
  requested_time_slot: z
    .string()
    .min(1, { message: 'Please select a preferred time slot' }),
  guest_count: z
    .number()
    .min(1, { message: 'At least 1 person is required' })
    .max(8, { message: 'Maximum 8 people allowed in studio session' }),
  add_ons: z.array(z.string()).default([]),
  client_notes: z.string().max(1000).optional(),
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
