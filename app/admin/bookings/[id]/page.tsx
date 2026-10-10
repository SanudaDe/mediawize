// app/admin/bookings/[id]/page.tsx

import type { Metadata } from 'next';
import AdminBookingDetailClient from '@/components/admin/AdminBookingDetailClient';

export const metadata: Metadata = { title: 'Booking Detail | WIZEtv Admin' };

export default function AdminBookingDetailPage({ params }: { params: { id: string } }) {
  return <AdminBookingDetailClient id={params.id} />;
}
