import Link from 'next/link';

export default function Types() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Data Types</h1>
        <p className="text-xl text-gray-600">
          Complete reference for TypeScript types, interfaces, and type definitions used throughout the Just One Dollar platform.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🛍️ Product Types</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Base Product Type</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  visible: boolean;
}`}
                </pre>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Fields:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">id</code> - Unique product identifier (number)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">name</code> - Product display name (string)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">sku</code> - Stock Keeping Unit (string)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">description</code> - Product description (string)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">price</code> - Product price (number)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">visible</code> - Visibility flag (boolean)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product with Images (Planned)</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`interface ProductWithImages extends Product {
  productImageLinks: Array<{
    image: {
      id: number;
      filename: string;
      altText: string | null;
      type: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  }>;
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Component Props</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`interface ProductPageProps {
  product: ProductWithImages;
}

interface ProductsGridProps {
  products: ProductWithImages[];
  limit?: number;
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🖼️ Image Types (Planned)</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Image Interface</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`interface Image {
  id: number;
  filename: string;
  altText: string | null;
  type: string | null;
  createdAt: Date;
  updatedAt: Date;
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Image Link</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`interface ProductImageLink {
  productId: number;
  imageId: number;
  product: Product;
  image: Image;
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">👤 User Types</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">User Interface</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`interface User {
  id: string;
  name: string | null;
  age: number | null;
  cpf: string | null;
  phone: string | null;
  email: string;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">User Update Data</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`interface UpdateCustomerInfo {
  name?: string;
  cpf?: string;
  phone?: string;
  age?: number;
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔐 Authentication Types</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">NextAuth.js Types</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`// Session type from NextAuth.js
interface Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
}

// Account type
interface Account {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔧 Repository Types</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Repository Function Types</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`// Product repository
type GetProductByUrlKey = (productUrlKey: string) => Promise<Product | null>;
type GetRecommendedProducts = (limit?: number) => Promise<Product[]>;

// Customer repository
type GetCustomerById = (customerId: string) => Promise<User | null>;
type GetCustomerByEmail = (email: string) => Promise<User | null>;
type UpdateCustomerInfo = (
  email: string,
  data: UpdateCustomerInfo
) => Promise<boolean>;`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Prisma Generated Types</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Using Prisma Types</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`// Import types from generated Prisma client
import type { Product, User, Account, Session } from '@/prisma/generated';

// Use in repository functions
export async function getProductById(id: number): Promise<Product | null> {
  return prisma.product.findUnique({ where: { id } });
}

// Use in components
interface ProductPageProps {
  product: Product & {
    productImageLinks: Array<{
      image: Image;
    }>;
  };
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Types are automatically generated from Prisma schema</li>
                <li>• Type safety across the entire application</li>
                <li>• Auto-completion in IDEs</li>
                <li>• Compile-time error checking</li>
                <li>• Types stay in sync with database schema</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Type Utilities</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Patterns</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Optional Fields:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`type PartialProduct = Partial<Product>;
// Makes all fields optional`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Pick Fields:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`type ProductSummary = Pick<Product, 'id' | 'name' | 'price'>;
// Only includes id, name, and price`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Omit Fields:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`type ProductWithoutId = Omit<Product, 'id'>;
// Excludes id field`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 Type Guards</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Type Guard</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`function isProduct(value: unknown): value is Product {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'sku' in value &&
    'price' in value
  );
}

// Usage
const data = await fetchProduct();
if (isProduct(data)) {
  // TypeScript knows data is Product
  console.log(data.name);
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/api" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">🔧 API Reference</h3>
            <p className="text-gray-600 text-sm">Explore repository functions and usage patterns.</p>
          </Link>

          <Link 
            href="/docs/errors" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">⚠️ Error Handling</h3>
            <p className="text-gray-600 text-sm">Learn about error types and handling patterns.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

