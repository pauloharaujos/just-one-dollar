import Link from 'next/link';

export default function URLs() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">URL Structure</h1>
        <p className="text-xl text-gray-600">
          Complete guide to URL patterns, routing, and SEO-friendly URL generation in the Just One Dollar platform.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔗 Route Patterns</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Pages</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">URL Pattern:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">{'/{productUrlKey}'}</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Example: <code className="bg-gray-100 px-2 py-1 rounded">/t-shirt1</code></p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">File Structure:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`app/
└── (catalog)/
    └── (product)/
        └── [productUrlKey]/
            ├── page.tsx
            └── not-found.tsx`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Points:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Route groups <code className="bg-gray-100 px-2 py-1 rounded">(catalog)</code> and <code className="bg-gray-100 px-2 py-1 rounded">(product)</code> don&apos;t affect the URL</li>
                    <li>• Dynamic segment <code className="bg-gray-100 px-2 py-1 rounded">[productUrlKey]</code> creates the parameter</li>
                    <li>• URLs are SEO-friendly and human-readable</li>
                    <li>• Custom 404 page for products not found</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Routes</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Login:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">/customer/login</code>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Account:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">/customer/account</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Protected route requiring authentication</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Documentation Routes</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Documentation Home:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">/docs</code>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Documentation Pages:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">/docs/{'{'}page{'}'}</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Examples: <code className="bg-gray-100 px-2 py-1 rounded">/docs/quick-start</code>, <code className="bg-gray-100 px-2 py-1 rounded">/docs/architecture</code></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 Dynamic Routing</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product URL Key</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Extraction:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`export default async function Page({ 
  params 
}: { 
  params: { productUrlKey: string } 
}) {
  const product = await getProductByUrlKey(params.productUrlKey);
  // ...
}`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Usage:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Next.js automatically extracts the dynamic segment</li>
                    <li>• Available as <code className="bg-gray-100 px-2 py-1 rounded">params.productUrlKey</code></li>
                    <li>• Used to query the database for product lookup</li>
                    <li>• If product not found, <code className="bg-gray-100 px-2 py-1 rounded">notFound()</code> is called</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🖼️ Image URLs</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pattern</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400">/product/images/{'{'}productId{'}'}/{'{'}filename{'}'}</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Examples</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">/product/images/1/t-shirt-front.webp</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Product ID 1, image filename: t-shirt-front.webp</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">/product/images/2/product-image-01.webp</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Product ID 2, image filename: product-image-01.webp</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Construction</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700">
{`const image = product.productImageLinks[0]?.image;
const imageUrl = \`/product/images/\${product.id}/\${image.filename}\`;

// Result: /product/images/1/t-shirt-front.webp`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔐 Protected Routes</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Authentication Middleware</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Protected Paths:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">/customer/account</code> - Requires authentication</li>
                    <li>• Other customer routes as needed</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Middleware Configuration:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`// middleware.ts
export default auth((req) => {
  // Protect customer routes
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 SEO Considerations</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">URL Best Practices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">✅ Good URLs</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">/t-shirt-blue</code></li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">/cotton-socks</code></li>
                    <li>• Descriptive and readable</li>
                    <li>• Include product type/name</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">❌ Avoid</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">/product?id=123</code></li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">/p/abc123xyz</code></li>
                    <li>• Query parameters for products</li>
                    <li>• Cryptic identifiers</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">URL Key Generation (Planned)</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Guidelines:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Generate from product name (slugified)</li>
                  <li>• Ensure uniqueness in database</li>
                  <li>• Use lowercase, hyphens for spaces</li>
                  <li>• Keep it concise but descriptive</li>
                  <li>• Example: &quot;Blue Cotton T-Shirt&quot; → <code className="bg-gray-100 px-2 py-1 rounded">blue-cotton-t-shirt</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔄 URL Generation</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Link Generation</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Next.js Link Component:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`import Link from 'next/link';

<Link href={\`/\${product.url}\`}>
  {product.name}
</Link>

// Or for homepage product grid:
<Link href={\`/\${product.url}\`}>
  <Image src={imageUrl} alt={product.name} />
</Link>`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Client-side navigation (faster)</li>
                    <li>• Prefetching for better performance</li>
                    <li>• Automatic active link styling</li>
                    <li>• SEO-friendly anchor tags</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">⚠️ Error Handling</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">404 Handling</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Product Not Found:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700">
{`export default async function Page({ params }: { params: { productUrlKey: string } }) {
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
                  <h4 className="font-semibold text-gray-900 mb-2">Custom 404 Page:</h4>
                  <p className="text-sm text-gray-600">Located at <code className="bg-gray-100 px-2 py-1 rounded">app/(catalog)/(product)/[productUrlKey]/not-found.tsx</code></p>
                  <p className="text-sm text-gray-600 mt-2">Provides a better user experience than the default 404 page.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/products" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">🛍️ Product Management</h3>
            <p className="text-gray-600 text-sm">Learn about the product system and data structure.</p>
          </Link>

          <Link 
            href="/docs/architecture" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">🏗️ Architecture Overview</h3>
            <p className="text-gray-600 text-sm">Understand the overall system architecture.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

