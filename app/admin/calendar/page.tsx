// app/admin/calendar/page.tsx
import type { Metadata } from 'next';
import AdminCalendarClient from '@/components/admin/AdminCalendarClient';

export const metadata: Metadata = { title: 'Calendar | WIZEtv Admin' };

export default function AdminCalendarPage() {
  return <AdminCalendarClient />;
}
