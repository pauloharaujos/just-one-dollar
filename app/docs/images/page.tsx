import Link from 'next/link';

export default function Images() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Image Management</h1>
        <p className="text-xl text-gray-600">
          Complete guide to managing product images, including storage, organization, optimization, and best practices.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📁 Storage Structure</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Directory Organization</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`public/product/images/
├── 1/                          # Product ID 1
│   ├── product-image-01.webp
│   ├── product-image-02.webp
│   └── product-image-03.webp
├── 2/                          # Product ID 2
│   ├── product-image-01.webp
│   └── product-image-02.webp
└── ...`}
                </pre>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Principles:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Images are organized by product ID in subdirectories</li>
                    <li>• Only filenames are stored in the database (not full paths)</li>
                    <li>• Use descriptive, consistent filenames</li>
                    <li>• Prefer WebP format for better compression and quality</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔗 Database Schema</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Image Model (Planned)</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`model Image {
  id        Int      @id @default(autoincrement())
  filename  String   -- Only filename (e.g., "product-image.webp")
  altText   String?  -- Accessibility alt text
  type      String?  -- Image type/category
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  productImageLinks ProductImageLink[]
}

model ProductImageLink {
  productId Int
  imageId   Int
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  image     Image   @relation(fields: [imageId], references: [id], onDelete: Cascade)
  
  @@id([productId, imageId])
  @@index([productId])
  @@index([imageId])
}`}
                </pre>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Design Decisions:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Many-to-many relationship allows products to have multiple images</li>
                    <li>• Images can be reused across products if needed</li>
                    <li>• Cascade deletes ensure cleanup when products or images are removed</li>
                    <li>• Indexes on foreign keys improve query performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔧 URL Construction</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pattern</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <code className="text-green-400">{'const imageUrl = `/product/images/${product.id}/${image.filename}`;'}</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Example</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Given:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Product ID: <code className="bg-gray-100 px-2 py-1 rounded">1</code></li>
                    <li>• Image filename: <code className="bg-gray-100 px-2 py-1 rounded">&quot;t-shirt-front.webp&quot;</code></li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Result:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">/product/images/1/t-shirt-front.webp</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🖼️ Component Implementation</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Page Image</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`import Image from 'next/image';

const image = product.productImageLinks[0]?.image;

{image ? (
  <Image
    src={\`/product/images/\${product.id}/\${image.filename}\`}
    alt={image.altText || product.name}
    width={800}
    height={800}
    className="h-full w-full object-contain"
    priority
  />
) : (
  <div className="flex h-full w-full items-center justify-center text-gray-400">
    No image
  </div>
)}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Homepage Product Grid</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`{products.map((product) => {
  const image = product.productImageLinks[0]?.image;
  return (
    <div key={product.id}>
      {image ? (
        <Image
          src={\`/product/images/\${product.id}/\${image.filename}\`}
          alt={image.altText || product.name}
          width={180}
          height={180}
          className="h-full w-full object-cover"
        />
      ) : (
        <div>No image</div>
      )}
    </div>
  );
})}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">⚡ Image Optimization</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Next.js Image Component</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Automatic Optimization</h4>
                  <p className="text-sm text-gray-600">Next.js automatically optimizes images on-demand, generating multiple sizes and formats.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Lazy Loading</h4>
                  <p className="text-sm text-gray-600">Images load as they enter the viewport, improving initial page load time.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Responsive Images</h4>
                  <p className="text-sm text-gray-600">Automatic srcset generation for different screen sizes and pixel densities.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Priority Loading</h4>
                  <p className="text-sm text-gray-600">Use <code className="bg-gray-100 px-2 py-1 rounded">priority</code> prop for above-the-fold images.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">WebP Format</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Better compression than JPEG and PNG</li>
                  <li>• Supports transparency like PNG</li>
                  <li>• Widely supported by modern browsers</li>
                  <li>• Next.js automatically serves WebP when supported</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">♿ Accessibility</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Alt Text Best Practices</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Always Provide Alt Text</h4>
                  <div className="bg-gray-50 rounded p-3">
                    <pre className="text-sm text-gray-700">
{`<Image
  src={imageUrl}
  alt={image.altText || product.name}
  // Fallback to product name if alt text not available
/>`}
                    </pre>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Guidelines:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Be descriptive but concise</li>
                    <li>• Include product name and key visual details</li>
                    <li>• Avoid redundant phrases like &quot;image of&quot;</li>
                    <li>• Use empty alt text only for decorative images</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Best Practices</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">File Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Naming Conventions</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use descriptive names</li>
                    <li>• Include product identifier</li>
                    <li>• Use kebab-case</li>
                    <li>• Example: <code className="bg-gray-100 px-2 py-1 rounded">t-shirt-front-blue.webp</code></li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">File Organization</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• One directory per product ID</li>
                    <li>• Keep related images together</li>
                    <li>• Use consistent structure</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Database Storage</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Store only filename, not path</li>
                    <li>• Path is constructed dynamically</li>
                    <li>• Easier to migrate or reorganize</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Image Sizes</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use appropriate dimensions</li>
                    <li>• Product pages: 800x800px minimum</li>
                    <li>• Thumbnails: 180x180px</li>
                    <li>• Let Next.js handle optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔄 Image Upload Workflow</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Process (Planned)</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">1</span>
                    <span>Upload image file to <code className="bg-gray-200 px-2 py-1 rounded">{'/public/product/images/{productId}/'}</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">2</span>
                    <span>Create Image record in database with filename and alt text</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">3</span>
                    <span>Create ProductImageLink to associate image with product</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">4</span>
                    <span>Image is now available for display on product pages</span>
                  </li>
                </ol>
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
            href="/docs/urls" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">🔗 URL Structure</h3>
            <p className="text-gray-600 text-sm">Understand how URLs are structured and generated.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

