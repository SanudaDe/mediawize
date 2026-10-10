'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) {
    return <main className="min-h-screen bg-[#090D16]">{children}</main>;
  }

  return (
    <div className="flex min-h-screen bg-[#090D16]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
