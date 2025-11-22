import { getSession } from '@/services/admin/auth/jwtService';
import AdminSidebar from '@/ui/components/admin/Layout/Sidebar';
import AdminHeader from '@/ui/components/admin/Layout/Header';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader
          user={{
            name: session.name,
            email: session.email,
            role: session.role,
          }}
        />
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

