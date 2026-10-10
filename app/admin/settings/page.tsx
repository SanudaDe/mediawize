// app/admin/settings/page.tsx
import type { Metadata } from 'next';
import AdminSettingsClient from '@/components/admin/AdminSettingsClient';

export const metadata: Metadata = { title: 'Settings | WIZEtv Admin' };

export default function AdminSettingsPage() {
  return <AdminSettingsClient />;
}
