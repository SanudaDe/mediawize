// app/admin/bookings/page.tsx

import type { Metadata } from 'next';
import AdminBookingsClient from '@/components/admin/AdminBookingsClient';

export const metadata: Metadata = { title: 'Bookings | WIZEtv Admin' };

export default function AdminBookingsPage() {
  return <AdminBookingsClient />;
}
