import Link from 'next/link';

export default function Practices() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Best Practices</h1>
        <p className="text-xl text-gray-600">
          Development best practices, coding conventions, and guidelines for maintaining code quality in the Just One Dollar platform.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Code Style</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Naming Conventions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Components</h4>
                  <p className="text-sm text-gray-600">PascalCase: <code className="bg-gray-100 px-2 py-1 rounded">ProductPage.tsx</code></p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Functions</h4>
                  <p className="text-sm text-gray-600">camelCase: <code className="bg-gray-100 px-2 py-1 rounded">getProductByUrlKey</code></p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Files</h4>
                  <p className="text-sm text-gray-600">Match component/function name</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Constants</h4>
                  <p className="text-sm text-gray-600">UPPER_SNAKE_CASE: <code className="bg-gray-100 px-2 py-1 rounded">MAX_PRODUCTS</code></p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">File Organization</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Structure:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• One component per file</li>
                    <li>• Group related files in directories</li>
                    <li>• Use index files for clean imports</li>
                    <li>• Keep files focused and small</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🗄️ Database Practices</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Repository Pattern</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Centralize Database Access</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• All database queries go through repository functions</li>
                    <li>• Components never directly use Prisma client</li>
                    <li>• Repository functions are reusable and testable</li>
                    <li>• One repository file per domain (products, customers, etc.)</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Example:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`// ✅ Good: Use repository
import { getProductByUrlKey } from '@/repository/productRepository';
const product = await getProductByUrlKey(urlKey);

// ❌ Bad: Direct Prisma access in component
import prisma from '@/prisma/prismaClient';
const product = await prisma.product.findUnique({...});`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Query Optimization</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Use Includes</h4>
                  <p className="text-sm text-gray-600">Fetch related data in one query instead of multiple</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Limit Results</h4>
                  <p className="text-sm text-gray-600">Use <code className="bg-gray-100 px-2 py-1 rounded">take</code> to limit large result sets</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Index Fields</h4>
                  <p className="text-sm text-gray-600">Add indexes to frequently queried fields</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Select Specific Fields</h4>
                  <p className="text-sm text-gray-600">Use <code className="bg-gray-100 px-2 py-1 rounded">select</code> when you don&apos;t need all fields</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">⚛️ React/Next.js Practices</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Server Components</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Default to Server Components</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use Server Components by default (no &apos;use client&apos;)</li>
                    <li>• Fetch data directly in Server Components</li>
                    <li>• Only use Client Components when needed (interactivity, hooks, browser APIs)</li>
                    <li>• Server Components reduce JavaScript bundle size</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Component Structure</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Component Organization:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`// 1. Imports
import Link from 'next/link';
import { getProductByUrlKey } from '@/repository/productRepository';

// 2. Types/Interfaces
interface ProductPageProps {
  product: Product;
}

// 3. Component
export default function ProductPage({ product }: ProductPageProps) {
  // Component logic
  return (
    // JSX
  );
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Image Optimization</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Always Use Next.js Image:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`// ✅ Good
import Image from 'next/image';
<Image src={url} alt={alt} width={800} height={800} />

// ❌ Bad
<img src={url} alt={alt} />`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Best Practices:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Always provide width and height</li>
                    <li>• Use <code className="bg-gray-100 px-2 py-1 rounded">priority</code> for above-the-fold images</li>
                    <li>• Provide descriptive alt text</li>
                    <li>• Use appropriate object-fit classes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔒 Security Practices</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Environment Variables</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Never Commit Secrets:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Add <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> to <code className="bg-gray-100 px-2 py-1 rounded">.gitignore</code></li>
                    <li>• Use <code className="bg-gray-100 px-2 py-1 rounded">.env.example</code> for documentation</li>
                    <li>• Never hardcode secrets in code</li>
                    <li>• Rotate secrets regularly</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Authentication</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Protect Routes:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use middleware for route protection</li>
                    <li>• Verify authentication in protected routes</li>
                    <li>• Use NextAuth.js for session management</li>
                    <li>• Hash passwords (bcrypt)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Input Validation</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Always Validate:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Validate user input on both client and server</li>
                    <li>• Sanitize data before database operations</li>
                    <li>• Use TypeScript for type safety</li>
                    <li>• Consider using validation libraries (Zod, Yup)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🧪 Testing Practices</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Testing Strategy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Unit Tests</h4>
                  <p className="text-sm text-gray-600">Test repository functions and utilities</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Integration Tests</h4>
                  <p className="text-sm text-gray-600">Test API routes and database interactions</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">E2E Tests</h4>
                  <p className="text-sm text-gray-600">Test critical user flows</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Component Tests</h4>
                  <p className="text-sm text-gray-600">Test React components in isolation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 Dependency Management</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Best Practices</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Keep Dependencies Updated:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Regularly update dependencies</li>
                    <li>• Review changelogs before updating</li>
                    <li>• Test thoroughly after updates</li>
                    <li>• Use <code className="bg-gray-100 px-2 py-1 rounded">npm audit</code> to check for vulnerabilities</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Minimize Dependencies:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Only add dependencies when necessary</li>
                    <li>• Prefer built-in solutions when possible</li>
                    <li>• Consider bundle size impact</li>
                    <li>• Review alternatives before adding</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Documentation</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Code Documentation</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Document Complex Logic:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`/**
 * Fetches a product by its URL key, including associated images.
 * 
 * @param productUrlKey - The URL slug of the product (e.g., "t-shirt1")
 * @returns Promise resolving to Product with images or null if not found
 */
export async function getProductByUrlKey(
  productUrlKey: string
): Promise<Product | null> {
  // Implementation
}`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Guidelines:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Document public functions and complex logic</li>
                    <li>• Use JSDoc comments for better IDE support</li>
                    <li>• Keep comments up-to-date with code</li>
                    <li>• Write self-documenting code when possible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Performance</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Optimization Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Image Optimization</h4>
                  <p className="text-sm text-gray-600">Use Next.js Image component, WebP format, appropriate sizes</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Code Splitting</h4>
                  <p className="text-sm text-gray-600">Use dynamic imports for large components</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Database Queries</h4>
                  <p className="text-sm text-gray-600">Optimize queries, use indexes, limit results</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Caching</h4>
                  <p className="text-sm text-gray-600">Use Next.js caching strategies appropriately</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/setup" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">👨‍💻 Development Setup</h3>
            <p className="text-gray-600 text-sm">Detailed setup instructions for development.</p>
          </Link>

          <Link 
            href="/docs/deployment" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">🚀 Deployment</h3>
            <p className="text-gray-600 text-sm">Learn how to deploy the application to production.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

