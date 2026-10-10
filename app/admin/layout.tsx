// app/admin/layout.tsx
import type { Metadata } from 'next';
import AdminLayoutWrapper from '@/components/admin/AdminLayoutWrapper';

export const metadata: Metadata = {
  title: 'Admin Dashboard | WIZEtv Studios',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
