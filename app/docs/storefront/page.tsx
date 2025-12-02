import Link from 'next/link';

export default function StorefrontPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Storefront</h1>
      
      <p className="text-lg text-gray-700 mb-8">
        The customer-facing storefront provides a complete ecommerce experience with dynamic product catalog, 
        shopping cart, secure checkout, and customer account management.
      </p>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Dynamic Catalog System</h2>
        
        <p className="text-gray-700 mb-4">
          The storefront uses Next.js catch-all routes to create SEO-friendly, dynamic product and category pages:
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Route Structure</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`app/(catalog)/[...segments]/page.tsx

// Handles:
// /electronics → Category page
// /electronics/laptops → Category page
// /product-slug → Product page`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">URL Rewrite Resolution</h3>
        <p className="text-gray-700 mb-4">
          Each request path is resolved through the URL rewrite system to determine if it's a product or category:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
          <li>Request path extracted from URL segments</li>
          <li>URL rewrite lookup in database</li>
          <li>Target type determined (PRODUCT or CATEGORY)</li>
          <li>Appropriate page component rendered with data</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Product Pages</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li>Product details with Cloudinary images</li>
          <li>Add to cart functionality</li>
          <li>SEO metadata with JSON-LD structured data</li>
          <li>Category breadcrumbs</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Category Pages</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li>Product grid with filtering</li>
          <li>Category description and metadata</li>
          <li>Hierarchical breadcrumb navigation</li>
          <li>SEO-optimized with structured data</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h2>
        
        <p className="text-gray-700 mb-4">
          The cart system uses a database-backed Quote model for persistent cart functionality:
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Quote System</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Cart is stored as a Quote in the database
model Quote {
  id         Int
  userId     String
  isActive   Boolean
  quoteItems QuoteItem[]
}

// Each cart item is a QuoteItem
model QuoteItem {
  id        Int
  quoteId   Int
  productId Int
  quantity  Int
  price     Float  // Snapshot of price at add-to-cart
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Cart Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Persistent Cart</strong>: Cart persists across sessions and devices</li>
          <li><strong>Price Snapshot</strong>: Prices are captured when items are added</li>
          <li><strong>Quantity Management</strong>: Update quantities or remove items</li>
          <li><strong>Real-time Updates</strong>: Cart count in header updates automatically</li>
          <li><strong>Cart Summary</strong>: Subtotal, tax, and total calculations</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Cart Operations</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li><code className="bg-gray-200 px-1 rounded">addToCart(productId, quantity)</code> - Add product to cart</li>
            <li><code className="bg-gray-200 px-1 rounded">updateCartItemQuantity(quoteItemId, quantity)</code> - Update item quantity</li>
            <li><code className="bg-gray-200 px-1 rounded">removeFromCart(quoteItemId)</code> - Remove item from cart</li>
            <li><code className="bg-gray-200 px-1 rounded">getCart()</code> - Get current cart with items</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Checkout Flow</h2>
        
        <p className="text-gray-700 mb-4">
          The checkout process validates cart contents, manages addresses, and processes payments through Stripe:
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Checkout Steps</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong>Cart Review</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Display cart items with quantities and prices</li>
                <li>Show subtotal, tax, and total</li>
              </ul>
            </li>
            <li>
              <strong>Address Selection</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Select or create shipping address</li>
                <li>Select or create billing address</li>
                <li>Address validation</li>
              </ul>
            </li>
            <li>
              <strong>Payment Processing</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Order created in database</li>
                <li>Stripe Checkout session created</li>
                <li>Redirect to Stripe payment page</li>
              </ul>
            </li>
            <li>
              <strong>Order Confirmation</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Webhook updates payment status</li>
                <li>Cart deactivated</li>
                <li>Order confirmation page</li>
              </ul>
            </li>
          </ol>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Checkout Validation</h3>
        <p className="text-gray-700 mb-2">
          Before creating an order, the system validates:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li>Cart exists and has items</li>
          <li>All products are still visible and available</li>
          <li>Shipping and billing addresses are valid</li>
          <li>Customer is authenticated</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Order Creation</h3>
        <p className="text-gray-700 mb-2">
          When placing an order:
        </p>
        <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-4">
          <li>Order record created with unique order number</li>
          <li>Order items created from cart items</li>
          <li>Order payment record initialized</li>
          <li>Stripe Checkout session created</li>
          <li>Cart deactivated (isActive = false)</li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Account</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Profile Management</strong>: Update name, email, phone, CPF</li>
          <li><strong>Address Book</strong>: Manage multiple shipping and billing addresses</li>
          <li><strong>Order History</strong>: View all past orders with details</li>
          <li><strong>Order Tracking</strong>: View individual order details and status</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Authentication</h3>
        <p className="text-gray-700 mb-2">
          Customers can authenticate using:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Credentials</strong>: Email and password</li>
          <li><strong>Google OAuth</strong>: Sign in with Google account</li>
          <li><strong>GitHub OAuth</strong>: Sign in with GitHub account</li>
        </ul>
        <p className="text-gray-700 mt-4">
          All authentication is handled by NextAuth v5 with JWT session strategy. See the 
          <Link href="/docs/authentication" className="text-indigo-600 hover:text-indigo-800"> Authentication documentation</Link> for details.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Homepage</h2>
        
        <p className="text-gray-700 mb-4">
          The homepage features:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Top Banner</strong>: Promotional banner component</li>
          <li><strong>Home Banner</strong>: Hero section with call-to-action</li>
          <li><strong>Featured Products</strong>: Grid of recommended products</li>
          <li><strong>Features Section</strong>: Platform highlights</li>
          <li><strong>Newsletter</strong>: Email subscription form</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">SEO & Metadata</h2>
        
        <p className="text-gray-700 mb-4">
          All pages include comprehensive SEO metadata:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Dynamic Meta Tags</strong>: Title, description, Open Graph tags</li>
          <li><strong>JSON-LD Structured Data</strong>: Product and category schema</li>
          <li><strong>Breadcrumb Navigation</strong>: Structured breadcrumb data</li>
          <li><strong>Canonical URLs</strong>: Proper URL canonicalization</li>
          <li><strong>Image Optimization</strong>: Cloudinary images with proper alt text</li>
        </ul>
      </section>
    </div>
  );
}

