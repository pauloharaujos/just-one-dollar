import Link from 'next/link';

export default function Errors() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Error Handling</h1>
        <p className="text-xl text-gray-600">
          Complete guide to error handling patterns, error types, and best practices in the Just One Dollar platform.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">⚠️ Error Types</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Not Found</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Scenario:</h4>
                  <p className="text-sm text-gray-600">User visits a product URL that doesn&apos;t exist in the database.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Handling:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`export default async function Page({ 
  params 
}: { 
  params: { productUrlKey: string } 
}) {
  const product = await getProductByUrlKey(params.productUrlKey);

  if (!product) {
    notFound(); // Triggers custom 404 page
  }

  return <ProductPage product={product} />;
}`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Result:</h4>
                  <p className="text-sm text-gray-600">Next.js renders the custom <code className="bg-gray-100 px-2 py-1 rounded">not-found.tsx</code> page located in the route directory.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Database Connection Errors</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Scenario:</h4>
                  <p className="text-sm text-gray-600">Database connection fails or query times out.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Handling:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`export async function getProductByUrlKey(productUrlKey: string) {
  try {
    return await prisma.product.findUnique({
      where: { url: productUrlKey }
    });
  } catch (error) {
    console.error('Database error:', error);
    throw error; // Let Next.js error boundary handle it
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Authentication Errors</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Scenario:</h4>
                  <p className="text-sm text-gray-600">User tries to access protected route without authentication.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Handling:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`// middleware.ts
export default auth((req) => {
  if (req.nextUrl.pathname.startsWith('/customer/account')) {
    if (!req.auth) {
      return Response.redirect(new URL('/customer/login', req.url));
    }
  }
});`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔄 Error Handling Patterns</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Repository Level</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Try-Catch Pattern:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`export async function getCustomerByEmail(email: string): Promise<User | null> {
  try {
    const data = await prisma.user.findUnique({
      where: { email }
    });
    return data;
  } catch (err) {
    console.log(\`Error while loading customer by email \${err}\`);
    throw new Error(\`Error while loading customer by email \${err}\`);
  }
}`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Best Practices:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Log errors with context</li>
                    <li>• Re-throw errors to let upper layers handle them</li>
                    <li>• Return null for &quot;not found&quot; cases (not errors)</li>
                    <li>• Use descriptive error messages</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Component Level</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Server Components:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`export default async function Page({ params }: { params: { productUrlKey: string } }) {
  const product = await getProductByUrlKey(params.productUrlKey);

  // Handle not found
  if (!product) {
    notFound();
  }

  // Component renders successfully
  return <ProductPage product={product} />;
}`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Error Boundaries:</h4>
                  <p className="text-sm text-gray-600">Next.js automatically handles uncaught errors with error boundaries. Create <code className="bg-gray-100 px-2 py-1 rounded">error.tsx</code> files for custom error handling.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📄 Custom Error Pages</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">404 Not Found</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Location:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`app/
└── (catalog)/
    └── (product)/
        └── [productUrlKey]/
            └── not-found.tsx`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Implementation:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`export default function NotFound() {
  return (
    <div>
      <h1>Product Not Found</h1>
      <p>Sorry, we couldn't find the product you're looking for.</p>
      <Link href="/">Return to Home</Link>
    </div>
  );
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Error Page</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Location:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`app/
└── (catalog)/
    └── (product)/
        └── [productUrlKey]/
            └── error.tsx`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Implementation:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 Error Logging</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Logging Best Practices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Include Context</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <pre className="text-sm text-gray-700">
{`console.log(
  \`Error while loading customer by email \${err}\`
);`}
                    </pre>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Use Appropriate Levels</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">console.error</code> for errors</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">console.warn</code> for warnings</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">console.log</code> for info</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Production Error Handling</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Considerations:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Use a proper logging service (e.g., Sentry, LogRocket)</li>
                  <li>• Don&apos;t expose sensitive information in error messages</li>
                  <li>• Provide user-friendly error messages</li>
                  <li>• Log errors server-side for debugging</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Error Prevention</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Type Safety</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">TypeScript:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use TypeScript for compile-time error checking</li>
                    <li>• Define proper types for all data structures</li>
                    <li>• Use type guards for runtime validation</li>
                    <li>• Leverage Prisma generated types</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Validation</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Input Validation:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Validate user input before processing</li>
                    <li>• Check for null/undefined values</li>
                    <li>• Validate email formats, phone numbers, etc.</li>
                    <li>• Use schema validation libraries (Zod, Yup)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Database Constraints</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Prisma Schema:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use <code className="bg-gray-100 px-2 py-1 rounded">@unique</code> for unique constraints</li>
                    <li>• Use <code className="bg-gray-100 px-2 py-1 rounded">@default</code> for default values</li>
                    <li>• Define foreign key relationships</li>
                    <li>• Use cascade deletes appropriately</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🛠️ Error Recovery</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Retry Logic</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Pattern:</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm text-gray-700">
{`async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Max retries exceeded');
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Fallback Values</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Example:</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm text-gray-700">
{`const product = await getProductByUrlKey(urlKey) || {
  name: 'Product Not Available',
  price: 0,
  // ... default values
};`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/types" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">📊 Data Types</h3>
            <p className="text-gray-600 text-sm">Learn about type definitions and type safety.</p>
          </Link>

          <Link 
            href="/docs/practices" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">✨ Best Practices</h3>
            <p className="text-gray-600 text-sm">Explore development best practices and conventions.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

