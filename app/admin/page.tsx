// app/admin/page.tsx — Admin Dashboard

import type { Metadata } from 'next';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';

export const metadata: Metadata = { title: 'Dashboard | WIZEtv Admin' };

export default function AdminPage() {
  return <AdminDashboardClient />;
}
