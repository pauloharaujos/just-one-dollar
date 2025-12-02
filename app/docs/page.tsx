import Link from 'next/link';

export default function DocsPage() {
  const sections = [
    {
      title: 'Architecture',
      href: '/docs/architecture',
      description: 'System architecture, SOLID principles, repository pattern, and folder structure',
    },
    {
      title: 'Storefront',
      href: '/docs/storefront',
      description: 'Customer-facing features including catalog, cart, checkout, and account management',
    },
    {
      title: 'Admin Panel',
      href: '/docs/admin',
      description: 'Complete admin interface for managing products, orders, customers, and categories',
    },
    {
      title: 'Authentication',
      href: '/docs/authentication',
      description: 'Dual authentication system: NextAuth for customers and custom JWT for admin',
    },
    {
      title: 'Payments',
      href: '/docs/payments',
      description: 'Stripe integration, checkout flow, webhook handling, and payment tracking',
    },
    {
      title: 'Cloudinary',
      href: '/docs/cloudinary',
      description: 'Image upload workflow and optimized image delivery for products',
    },
    {
      title: 'Database',
      href: '/docs/database',
      description: 'Prisma schema, database models, relationships, and data structure',
    },
    {
      title: 'API',
      href: '/docs/api',
      description: 'API routes, endpoints, request/response formats, and integration examples',
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation Overview</h1>
      
      <p className="text-lg text-gray-700 mb-8">
        Welcome to the Just One Clothing ecommerce platform documentation. This comprehensive guide covers all aspects of the platform, from architecture and implementation details to API references and integration guides.
      </p>

      <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">About This Project</h2>
        <p className="text-blue-800">
          Just One Clothing is a full-stack ecommerce platform built with Next.js 15, TypeScript, Prisma, and PostgreSQL. 
          It demonstrates enterprise-level architecture patterns including SOLID principles, repository pattern, and service layer separation.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Documentation Sections</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h3>
            <p className="text-gray-600">{section.description}</p>
            <span className="inline-block mt-4 text-indigo-600 font-medium text-sm">
              Read more →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="text-indigo-600 hover:text-indigo-800">
              ← Back to Homepage
            </Link>
          </li>
          <li>
            <Link href="/admin/login" className="text-indigo-600 hover:text-indigo-800">
              Admin Panel Login
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/pauloharaujos/just-one-dollar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              View on GitHub →
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

