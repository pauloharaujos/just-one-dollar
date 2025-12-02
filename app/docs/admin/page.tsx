import Link from 'next/link';

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Admin Panel</h1>
      
      <p className="text-lg text-gray-700 mb-8">
        The admin panel is a comprehensive management interface for store administrators. It features separate 
        authentication from the storefront, complete CRUD operations, and real-time dashboard metrics.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-blue-800">
          <strong>Note:</strong> For detailed technical documentation, see the{' '}
          <Link href="/admin/README.md" className="text-blue-600 hover:text-blue-800 underline">
            Admin Panel README
          </Link>
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h2>
        
        <p className="text-gray-700 mb-4">
          The admin dashboard provides real-time metrics and quick access to all management features:
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Total Orders</strong>: Count of all orders in the system</li>
          <li><strong>Total Revenue</strong>: Sum of all completed order totals</li>
          <li><strong>Total Customers</strong>: Count of registered users</li>
          <li><strong>Total Products</strong>: Count of all products</li>
          <li><strong>Recent Orders</strong>: Latest 10 orders with status indicators</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Management</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Create Products</strong>: Add new products with SKU, name, description, price, and image</li>
          <li><strong>Edit Products</strong>: Update product details and images</li>
          <li><strong>Delete Products</strong>: Remove products from the catalog</li>
          <li><strong>Category Assignment</strong>: Assign products to multiple categories</li>
          <li><strong>Visibility Control</strong>: Show/hide products from storefront</li>
          <li><strong>Image Upload</strong>: Automatic Cloudinary upload with SKU-based naming</li>
          <li><strong>Search & Filter</strong>: Find products by name, SKU, or description</li>
          <li><strong>Pagination</strong>: Efficient handling of large product catalogs</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Product Form Fields</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li><strong>Name</strong>: Product display name</li>
            <li><strong>SKU</strong>: Unique stock keeping unit (used for image naming)</li>
            <li><strong>URL</strong>: SEO-friendly URL slug</li>
            <li><strong>Description</strong>: Product description</li>
            <li><strong>Price</strong>: Product price in USD</li>
            <li><strong>Visible</strong>: Toggle product visibility</li>
            <li><strong>Categories</strong>: Multi-select category assignment</li>
            <li><strong>Image</strong>: Product image (uploaded to Cloudinary)</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Management</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Listing</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li>View all orders with filters</li>
          <li>Order number, customer, total, status, and date</li>
          <li>Search and filter capabilities</li>
          <li>Pagination for large order lists</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Order Details</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li>Complete order information</li>
          <li>Order items with quantities and prices</li>
          <li>Billing and shipping addresses</li>
          <li>Customer information</li>
          <li>Payment details and status</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Order Status Management</h3>
        <p className="text-gray-700 mb-2">Order statuses:</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li><strong>PENDING</strong>: Order created, awaiting processing</li>
            <li><strong>PROCESSING</strong>: Order being prepared</li>
            <li><strong>COMPLETED</strong>: Order fulfilled</li>
            <li><strong>CANCELLED</strong>: Order cancelled</li>
            <li><strong>REFUNDED</strong>: Order refunded</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Management</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Listing</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li>View all registered customers</li>
          <li>Search by name or email</li>
          <li>Customer statistics (total orders, addresses)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Customer Details</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li>Full customer profile</li>
          <li>Contact information</li>
          <li>Address book</li>
          <li>Complete order history</li>
          <li>Account creation date</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Category Management</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Hierarchical Structure</strong>: Parent-child category relationships</li>
          <li><strong>Tree View</strong>: Visual representation of category hierarchy</li>
          <li><strong>Flat View</strong>: Simple list view of all categories</li>
          <li><strong>CRUD Operations</strong>: Create, edit, and delete categories</li>
          <li><strong>Product Count</strong>: See number of products per category</li>
          <li><strong>Visibility Control</strong>: Show/hide categories from storefront</li>
          <li><strong>URL Management</strong>: SEO-friendly URL slugs</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Category Form Fields</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li><strong>Name</strong>: Category display name</li>
            <li><strong>URL</strong>: SEO-friendly URL slug</li>
            <li><strong>Description</strong>: Category description (optional)</li>
            <li><strong>Parent Category</strong>: Select parent for hierarchical structure</li>
            <li><strong>Visible</strong>: Toggle category visibility</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Authentication</h2>
        
        <p className="text-gray-700 mb-4">
          The admin panel uses a separate authentication system from the storefront. See the{' '}
          <Link href="/docs/authentication" className="text-indigo-600 hover:text-indigo-800">
            Authentication documentation
          </Link>{' '}
          for complete details.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Points</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>Custom JWT implementation (not NextAuth)</li>
            <li>HTTP-only cookies for security</li>
            <li>24-hour session expiration</li>
            <li>Role-based access (SUPER_ADMIN, ADMIN)</li>
            <li>Middleware protection on all admin routes</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Image Management</h2>
        
        <p className="text-gray-700 mb-4">
          Product images are automatically uploaded to Cloudinary when creating or editing products. 
          See the{' '}
          <Link href="/docs/cloudinary" className="text-indigo-600 hover:text-indigo-800">
            Cloudinary documentation
          </Link>{' '}
          for complete details.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">Image Upload Flow</h3>
        <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-4">
          <li>Admin selects image file in product form</li>
          <li>Image preview shown before upload</li>
          <li>On product save, image uploaded to Cloudinary</li>
          <li>Image stored as <code className="bg-gray-200 px-1 rounded">{`{SKU}.png`}</code> in <code className="bg-gray-200 px-1 rounded">images/</code> folder</li>
          <li>Image URL automatically available on storefront</li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">URL Rewrite System</h2>
        
        <p className="text-gray-700 mb-4">
          Both products and categories automatically create URL rewrites when created or updated:
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Automatic Rewrite Creation</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li><strong>Categories</strong>: Request path = <code className="bg-gray-200 px-1 rounded">{`/{category.url}`}</code></li>
            <li><strong>Products</strong>: Request path = <code className="bg-gray-200 px-1 rounded">{`/{product.url}`}</code></li>
          </ul>
        </div>

        <p className="text-gray-700">
          This ensures that storefront URLs work correctly immediately after creation, without manual configuration.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Accessing the Admin Panel</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Navigate to <code className="bg-gray-200 px-1 rounded">/admin/login</code></li>
            <li>Enter admin credentials (email and password)</li>
            <li>Upon successful login, redirect to <code className="bg-gray-200 px-1 rounded">/admin/dashboard</code></li>
            <li>Access all management features from the sidebar navigation</li>
          </ol>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            <strong>Note:</strong> To create the first admin user, run the seed script:
            <code className="block bg-yellow-100 px-2 py-1 rounded mt-2 text-sm">
              npx tsx scripts/seed-admin-user.ts
            </code>
          </p>
        </div>
      </section>
    </div>
  );
}

