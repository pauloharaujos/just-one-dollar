import Link from 'next/link';

export default function FileStructure() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">File Structure</h1>
        <p className="text-xl text-gray-600">
          Complete overview of the project&apos;s file and directory structure, organized by purpose and functionality.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📁 Root Directory</h2>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`just-one-dollar/
├── app/                    # Next.js App Router
├── prisma/                 # Database schema and migrations
├── repository/             # Data access layer
├── ui/                     # UI components
├── public/                 # Static assets
├── docs/                   # Documentation files
├── auth.ts                 # NextAuth.js configuration
├── auth.config.js          # Auth configuration
├── middleware.ts           # Next.js middleware
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📱 App Directory (Next.js App Router)</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Route Structure</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`app/
├── (catalog)/              # Route group (doesn't affect URL)
│   └── (product)/          # Route group (doesn't affect URL)
│       └── [productUrlKey]/
│           ├── page.tsx    # Product detail page
│           └── not-found.tsx  # Custom 404 for products
├── customer/               # Customer/authentication routes
│   ├── login/
│   │   └── page.tsx       # Login page
│   └── account/
│       └── page.tsx       # Customer account page
├── docs/                   # Documentation pages
│   ├── layout.tsx          # Docs layout with sidebar
│   ├── page.tsx            # Docs homepage
│   ├── quick-start/
│   ├── architecture/
│   ├── database/
│   ├── file-structure/
│   ├── products/
│   ├── images/
│   ├── urls/
│   ├── api/
│   ├── types/
│   ├── errors/
│   ├── setup/
│   ├── practices/
│   └── deployment/
├── api/                    # API routes
├── layout.tsx              # Root layout
├── page.tsx                # Homepage
├── globals.css             # Global styles
└── favicon.ico             # Site favicon`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Route Groups</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">(catalog) and (product)</h4>
                  <p className="text-sm text-gray-600">Route groups are used for organization but don&apos;t affect the URL structure. Products are accessible at <code className="bg-gray-100 px-2 py-1 rounded">{'/{productUrlKey}'}</code>.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🗄️ Database (Prisma)</h2>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`prisma/
├── schema.prisma           # Database schema definition
├── generated/              # Generated Prisma Client
│   └── index.d.ts          # TypeScript types
└── migrations/             # Database migration files
    └── 0_init/
        └── migration.sql   # Initial migration`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔧 Repository Layer</h2>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`repository/
├── productRepository.ts    # Product data access functions
└── customerRepository.ts   # Customer/user data access functions`}
            </pre>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Purpose:</h4>
              <p className="text-sm text-gray-600">Centralizes all database access logic, providing a clean interface between components and the database layer.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎨 UI Components</h2>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`ui/
└── components/
    ├── Header.tsx          # Site header/navigation
    ├── Footer.tsx          # Site footer
    ├── home/
    │   └── Products.tsx    # Homepage product grid
    └── product/
        └── ProductPage.tsx # Product detail component`}
            </pre>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Organization:</h4>
              <p className="text-sm text-gray-600">Components are organized by feature/route. Reusable components are at the root level, while route-specific components are in subdirectories.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 Public Assets</h2>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`public/
├── product/
│   └── images/             # Product images
│       ├── 1/              # Product ID 1
│       │   ├── product-image-01.webp
│       │   └── product-image-02.webp
│       ├── 2/              # Product ID 2
│       │   └── product-image-01.webp
│       └── ...
├── just-one-dollar-logo.png
└── ...`}
            </pre>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Image Organization:</h4>
              <p className="text-sm text-gray-600">Product images are organized by product ID in subdirectories. Only filenames are stored in the database.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">⚙️ Configuration Files</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Core Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">next.config.ts</h4>
                  <p className="text-sm text-gray-600">Next.js configuration including build settings and environment variables</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">tsconfig.json</h4>
                  <p className="text-sm text-gray-600">TypeScript compiler configuration and path aliases</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">tailwind.config.ts</h4>
                  <p className="text-sm text-gray-600">Tailwind CSS configuration including theme and plugins</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">package.json</h4>
                  <p className="text-sm text-gray-600">Dependencies, scripts, and project metadata</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Authentication Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">auth.ts</h4>
                  <p className="text-sm text-gray-600">NextAuth.js main configuration file</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">auth.config.js</h4>
                  <p className="text-sm text-gray-600">Additional authentication configuration</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">middleware.ts</h4>
                  <p className="text-sm text-gray-600">Next.js middleware for route protection and authentication</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Documentation</h2>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`docs/
├── architecture.md         # Architecture documentation
├── product-management.md   # Product management guide
├── development.md         # Development guide
└── api-reference.md       # API reference documentation`}
            </pre>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600">Markdown documentation files. The interactive documentation is available at <code className="bg-gray-100 px-2 py-1 rounded">/docs</code>.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 Key Patterns</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">File Naming Conventions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Pages</h4>
                  <p className="text-sm text-gray-600"><code className="bg-gray-100 px-2 py-1 rounded">page.tsx</code> - Route pages</p>
                  <p className="text-sm text-gray-600"><code className="bg-gray-100 px-2 py-1 rounded">layout.tsx</code> - Route layouts</p>
                  <p className="text-sm text-gray-600"><code className="bg-gray-100 px-2 py-1 rounded">not-found.tsx</code> - 404 pages</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Components</h4>
                  <p className="text-sm text-gray-600">PascalCase: <code className="bg-gray-100 px-2 py-1 rounded">ProductPage.tsx</code></p>
                  <p className="text-sm text-gray-600">Organized by feature</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Repositories</h4>
                  <p className="text-sm text-gray-600">camelCase: <code className="bg-gray-100 px-2 py-1 rounded">productRepository.ts</code></p>
                  <p className="text-sm text-gray-600">One file per domain</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Config Files</h4>
                  <p className="text-sm text-gray-600">kebab-case or specific names</p>
                  <p className="text-sm text-gray-600"><code className="bg-gray-100 px-2 py-1 rounded">auth.ts</code>, <code className="bg-gray-100 px-2 py-1 rounded">middleware.ts</code></p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Import Paths</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`// Absolute imports using @ alias
import prisma from '@/prisma/prismaClient';
import { getProductByUrlKey } from '@/repository/productRepository';
import ProductPage from '@/ui/components/product/ProductPage';

// Relative imports for same directory
import Header from './Header';
import Footer from './Footer';`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/architecture" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">🏗️ Architecture Overview</h3>
            <p className="text-gray-600 text-sm">Learn about the system architecture and design patterns.</p>
          </Link>

          <Link 
            href="/docs/setup" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">👨‍💻 Setup Guide</h3>
            <p className="text-gray-600 text-sm">Detailed setup instructions for development.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

