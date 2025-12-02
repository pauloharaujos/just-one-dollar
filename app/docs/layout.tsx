import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation | Just One Clothing',
  description: 'Comprehensive documentation for the Just One Clothing ecommerce platform',
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { href: '/docs', label: 'Overview' },
    { href: '/docs/architecture', label: 'Architecture' },
    { href: '/docs/storefront', label: 'Storefront' },
    { href: '/docs/admin', label: 'Admin Panel' },
    { href: '/docs/authentication', label: 'Authentication' },
    { href: '/docs/payments', label: 'Payments' },
    { href: '/docs/cloudinary', label: 'Cloudinary' },
    { href: '/docs/database', label: 'Database' },
    { href: '/docs/api', label: 'API' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="mb-8">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mt-4">Documentation</h1>
            <p className="text-xl text-gray-600 mt-2">
              Complete technical documentation for the Just One Clothing ecommerce platform
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <nav className="sticky top-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h2 className="text-sm font-semibold text-gray-900 mb-4">Contents</h2>
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </aside>

            <main className="flex-1 min-w-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 prose prose-slate max-w-none">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

