export default function ArchitecturePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">System Architecture</h1>
      
      <p className="text-lg text-gray-700 mb-8">
        The Just One Clothing platform is built with a focus on clean architecture, maintainability, and scalability. 
        The codebase follows SOLID principles and implements several design patterns to ensure separation of concerns and code reusability.
      </p>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">SOLID Principles</h2>
        
        <div className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Single Responsibility Principle</h3>
            <p className="text-gray-700 mb-2">
              Each module, class, and function has a single, well-defined responsibility:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li><strong>Repositories</strong> (`repository/`): Only handle data access and Prisma operations</li>
              <li><strong>Services</strong> (`services/`): Only contain business logic, no direct database access</li>
              <li><strong>API Routes</strong> (`app/api/`): Only handle HTTP request/response, delegate to services</li>
              <li><strong>Components</strong> (`ui/components/`): Only handle UI rendering, receive data via props</li>
            </ul>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Open/Closed Principle</h3>
            <p className="text-gray-700">
              The system is open for extension but closed for modification. New features can be added by:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
              <li>Extending repository patterns for new entities</li>
              <li>Creating new service layers without modifying existing ones</li>
              <li>Adding new API routes following established patterns</li>
            </ul>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Liskov Substitution Principle</h3>
            <p className="text-gray-700">
              Repository interfaces follow consistent patterns, making implementations interchangeable:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
              <li>All repositories use similar function signatures</li>
              <li>Services can work with any repository implementation</li>
              <li>Consistent error handling patterns</li>
            </ul>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Interface Segregation Principle</h3>
            <p className="text-gray-700">
              Focused, specific interfaces rather than large, general ones:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
              <li>Each API endpoint has a single responsibility</li>
              <li>Component props are specific to their use case</li>
              <li>Service functions are focused and single-purpose</li>
            </ul>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Dependency Inversion Principle</h3>
            <p className="text-gray-700">
              High-level modules depend on abstractions, not concrete implementations:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
              <li>Services depend on repository abstractions</li>
              <li>API routes depend on service abstractions</li>
              <li>Components receive data, don't fetch directly</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Repository Pattern</h2>
        
        <p className="text-gray-700 mb-4">
          The repository pattern abstracts data access logic, providing a clean interface between the business logic and database:
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Repository Structure</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Example: repository/productRepository.ts
export async function getProductById(id: number): Promise<Product | null> {
  return await prisma.product.findUnique({
    where: { id },
    include: { productCategories: { include: { category: true } } }
  });
}

export async function createProduct(data: CreateProductData): Promise<Product> {
  return await prisma.product.create({ data });
}`}
          </pre>
        </div>

        <p className="text-gray-700">
          Repositories handle all Prisma operations, providing type-safe data access. Services use repositories 
          but never directly access the database, ensuring a clear separation of concerns.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Layer</h2>
        
        <p className="text-gray-700 mb-4">
          Services contain business logic and orchestrate operations between repositories:
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Structure</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Example: services/cart/cartService.ts
export async function addToCart(
  productId: number,
  quantity: number = 1
): Promise<CartResult> {
  const customer = await getCustomerFromSession();
  if (!customer?.id) {
    return { success: false, error: 'User not authenticated' };
  }

  const product = await getProductById(productId);
  if (!product) {
    return { success: false, error: 'Product not found' };
  }

  const quote = await getQuote(customer.id);
  await addItemToQuote(quote.id, productId, quantity, product.price);
  
  return { success: true };
}`}
          </pre>
        </div>

        <p className="text-gray-700">
          Services validate business rules, coordinate multiple repository calls, and handle complex workflows 
          like checkout processing and order creation.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Folder Structure</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <pre className="text-sm text-gray-800">
{`just-one-dollar/
├── app/                    # Next.js App Router
│   ├── (catalog)/          # Storefront catalog (catch-all routes)
│   ├── admin/              # Admin panel pages
│   ├── api/                # API routes
│   │   ├── admin/          # Admin API endpoints
│   │   ├── auth/           # NextAuth handlers
│   │   ├── customer/       # Customer API
│   │   └── stripe/         # Stripe webhooks
│   ├── cart/               # Shopping cart pages
│   ├── checkout/           # Checkout flow
│   ├── customer/           # Customer account pages
│   └── docs/               # Documentation
│
├── repository/             # Data access layer
│   ├── productRepository.ts
│   ├── categoryRepository.ts
│   ├── orderRepository.ts
│   └── ...
│
├── services/               # Business logic layer
│   ├── admin/              # Admin services
│   ├── cart/               # Cart management
│   ├── checkout/           # Checkout processing
│   ├── cloudinary/         # Image management
│   └── stripe/             # Payment processing
│
├── ui/                     # React components
│   ├── components/         # Reusable components
│   │   ├── admin/          # Admin components
│   │   ├── customer/       # Customer components
│   │   └── ...
│   └── cms/                # CMS components
│
├── prisma/                 # Database schema
│   └── schema.prisma
│
└── scripts/                # Utility scripts`}
          </pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Architectural Decisions</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Dual Authentication System</h3>
            <p className="text-gray-700">
              Separate authentication systems for customers (NextAuth) and admin (custom JWT) provide:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
              <li>Isolated security boundaries</li>
              <li>Different session management strategies</li>
              <li>Independent scaling and maintenance</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">URL Rewrite System</h3>
            <p className="text-gray-700">
              Dynamic routing with URL rewrites enables SEO-friendly URLs while maintaining flexibility:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
              <li>Canonical URL management</li>
              <li>301/302 redirect support</li>
              <li>Dynamic product/category routing</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quote System for Cart</h3>
            <p className="text-gray-700">
              Database-backed quotes provide persistent cart functionality:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
              <li>Cart persists across sessions</li>
              <li>Price snapshot at add-to-cart time</li>
              <li>Easy conversion to orders</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Server Actions</h3>
            <p className="text-gray-700">
              Type-safe server-side operations for form submissions and mutations:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
              <li>No API route boilerplate needed</li>
              <li>Automatic type inference</li>
              <li>Built-in error handling</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Flow</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Flow Example</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li><strong>User Request</strong> → Next.js page or API route</li>
            <li><strong>Middleware</strong> → Authentication check, route protection</li>
            <li><strong>API Route/Server Action</strong> → Request validation</li>
            <li><strong>Service Layer</strong> → Business logic, validation</li>
            <li><strong>Repository</strong> → Database operations via Prisma</li>
            <li><strong>Response</strong> → Data returned through layers</li>
          </ol>
        </div>
      </section>
    </div>
  );
}

