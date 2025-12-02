export default function DatabasePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Database Schema</h1>
      
      <p className="text-lg text-gray-700 mb-8">
        The platform uses PostgreSQL with Prisma ORM for type-safe database operations. The schema is designed 
        to support ecommerce operations including products, categories, orders, customers, and cart management.
      </p>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Models</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">User (Customer)</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`model User {
  id            String          @id @default(cuid())
  name          String?
  email         String          @unique
  password      String?         // For credentials auth
  emailVerified DateTime?
  image         String?
  
  // Relations
  accounts      Account[]       // OAuth accounts
  sessions      Session[]       // NextAuth sessions
  quotes        Quote[]        // Shopping carts
  addresses     Address[]       // Shipping/billing addresses
  orders        Order[]         // Customer orders
  
  createdAt     DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Product</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`model Product {
  id              Int               @id @default(autoincrement())
  name            String
  sku             String            // Stock keeping unit
  url             String            @unique  // SEO-friendly URL
  description     String
  price           Float
  visible         Boolean          @default(true)
  
  // Relations
  productCategories ProductCategory[]
  quoteItems        QuoteItem[]     // Cart items
  orderItems        OrderItem[]      // Order items
  
  // Note: Images stored in Cloudinary as {SKU}.png
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Category</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`model Category {
  id              Int               @id @default(autoincrement())
  name            String
  url             String            @unique  // SEO-friendly URL
  description     String?
  parentId        Int?              // For hierarchical structure
  visible         Boolean           @default(true)
  
  // Relations
  parent          Category?         @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children        Category[]        @relation("CategoryHierarchy")
  productCategories ProductCategory[]
  
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">ProductCategory (Many-to-Many)</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`model ProductCategory {
  productId       Int
  categoryId      Int
  
  product         Product           @relation(fields: [productId], references: [id])
  category        Category         @relation(fields: [categoryId], references: [id])
  
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
  
  @@id([productId, categoryId])
  @@index([productId])
  @@index([categoryId])
}`}</pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Cart & Order Models</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Quote (Shopping Cart)</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`model Quote {
  id              Int               @id @default(autoincrement())
  userId          String
  isActive        Boolean           @default(true)
  
  user            User              @relation(fields: [userId], references: [id])
  quoteItems      QuoteItem[]
  
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  
  @@index([userId])
}`}</pre>
          <p className="text-gray-700 mt-2 text-sm">
            <strong>Note:</strong> Each user has one active quote (cart). When an order is placed, 
            the quote is deactivated (isActive = false) and a new active quote is created when needed.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">QuoteItem (Cart Item)</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`model QuoteItem {
  id              Int               @id @default(autoincrement())
  quoteId         Int
  productId       Int
  quantity        Int
  price           Float             // Price snapshot at add-to-cart
  
  quote           Quote             @relation(fields: [quoteId], references: [id])
  product         Product           @relation(fields: [productId], references: [id])
  
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  
  @@index([quoteId])
  @@index([productId])
}`}</pre>
          <p className="text-gray-700 mt-2 text-sm">
            <strong>Note:</strong> Price is stored at the time item is added to cart, ensuring 
            price consistency even if product price changes.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Order</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`model Order {
  id                  Int               @id @default(autoincrement())
  orderNumber         String            @unique  // Human-readable order number
  userId              String
  billingAddressId    Int
  shippingAddressId   Int
  subtotal            Float
  tax                 Float
  total               Float
  status              OrderStatus       @default(PENDING)
  
  user                User              @relation(fields: [userId], references: [id])
  billingAddress      Address           @relation("BillingAddress", fields: [billingAddressId], references: [id])
  shippingAddress     Address           @relation("ShippingAddress", fields: [shippingAddressId], references: [id])
  orderItems          OrderItem[]
  orderPayment        OrderPayment?
  
  createdAt           DateTime          @default(now())
  updatedAt           DateTime          @updatedAt
  
  @@index([userId])
  @@index([orderNumber])
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">OrderItem</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`model OrderItem {
  id              Int               @id @default(autoincrement())
  orderId         Int
  productId       Int
  quantity        Int
  price           Float             // Price at time of order
  name            String            // Product name snapshot
  sku             String            // Product SKU snapshot
  
  order           Order             @relation(fields: [orderId], references: [id])
  product         Product           @relation(fields: [productId], references: [id])
  
  createdAt       DateTime          @default(now())
  
  @@index([orderId])
}`}</pre>
          <p className="text-gray-700 mt-2 text-sm">
            <strong>Note:</strong> Product name and SKU are stored as snapshots to preserve 
            order history even if products are deleted or renamed.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">OrderPayment</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`model OrderPayment {
  id                  Int               @id @default(autoincrement())
  orderId             Int               @unique
  stripeSessionId      String?           @unique
  stripePaymentIntent  String?           @unique
  paymentStatus       PaymentStatus      @default(PENDING)
  amount              Float
  currency            String            @default("usd")
  paymentMethod       String?
  
  order               Order             @relation(fields: [orderId], references: [id])
  
  createdAt           DateTime          @default(now())
  updatedAt           DateTime          @updatedAt
  
  @@index([orderId])
  @@index([stripeSessionId])
}`}</pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Address Model</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`model Address {
  id              Int               @id @default(autoincrement())
  userId          String
  firstName       String
  lastName        String
  company         String?
  street1         String
  street2         String?
  city            String
  state           String
  postalCode      String
  country         String            @default("US")
  phone           String
  isDefault       Boolean           @default(false)
  
  user            User              @relation(fields: [userId], references: [id])
  billingOrders   Order[]           @relation("BillingAddress")
  shippingOrders  Order[]           @relation("ShippingAddress")
  
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  
  @@index([userId])
}`}</pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">URL Rewrite System</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`model UrlRewrite {
  id              Int               @id @default(autoincrement())
  requestPath     String            @unique  // The URL path requested
  targetType      UrlTargetType     // PRODUCT or CATEGORY
  targetId        Int               // ID of product or category
  targetPath      String?           // Canonical path
  redirectType    Int?              // 301 or 302 for redirects
  isCanonical     Boolean           @default(true)
  isActive        Boolean           @default(true)
  
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
}

enum UrlTargetType {
  PRODUCT
  CATEGORY
}`}</pre>
        </div>
        <p className="text-gray-700">
          The URL rewrite system enables SEO-friendly URLs and supports redirects. When a product or category 
          is created, a canonical rewrite is automatically created.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Authentication Models</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">NextAuth Models</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`model Account {
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  // ... other OAuth fields
  
  user              User              @relation(fields: [userId], references: [id])
  
  @@id([provider, providerAccountId])
}

model Session {
  sessionToken     String            @unique
  userId           String
  expires          DateTime
  
  user             User              @relation(fields: [userId], references: [id])
  
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
}

model VerificationToken {
  identifier       String
  token            String
  expires          DateTime
  
  @@id([identifier, token])
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">AdminUser</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`model AdminUser {
  id              String            @id @default(cuid())
  email           String            @unique
  password        String            // bcrypt hashed
  name            String
  role            AdminRole         @default(ADMIN)
  isActive        Boolean           @default(true)
  
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
}

enum AdminRole {
  SUPER_ADMIN
  ADMIN
}`}</pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Enums</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`enum OrderStatus {
  PENDING
  PROCESSING
  COMPLETED
  CANCELLED
  REFUNDED
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

enum AdminRole {
  SUPER_ADMIN
  ADMIN
}

enum UrlTargetType {
  PRODUCT
  CATEGORY
}`}</pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Relationships</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User Relationships</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>User → Orders (one-to-many)</li>
              <li>User → Quotes (one-to-many, one active)</li>
              <li>User → Addresses (one-to-many)</li>
              <li>User → Accounts (OAuth, one-to-many)</li>
              <li>User → Sessions (NextAuth, one-to-many)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Relationships</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Product → Categories (many-to-many via ProductCategory)</li>
              <li>Product → QuoteItems (one-to-many)</li>
              <li>Product → OrderItems (one-to-many)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Category Relationships</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Category → Products (many-to-many via ProductCategory)</li>
              <li>Category → Parent (self-referential, optional)</li>
              <li>Category → Children (self-referential, one-to-many)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Relationships</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Order → User (many-to-one)</li>
              <li>Order → BillingAddress (many-to-one)</li>
              <li>Order → ShippingAddress (many-to-one)</li>
              <li>Order → OrderItems (one-to-many)</li>
              <li>Order → OrderPayment (one-to-one)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Indexes</h2>
        
        <p className="text-gray-700 mb-4">
          The schema includes strategic indexes for optimal query performance:
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>User.email</strong>: Unique index for fast email lookups</li>
          <li><strong>Product.url</strong>: Unique index for URL-based lookups</li>
          <li><strong>Category.url</strong>: Unique index for URL-based lookups</li>
          <li><strong>Order.orderNumber</strong>: Unique index for order lookups</li>
          <li><strong>Quote.userId</strong>: Index for user cart queries</li>
          <li><strong>Order.userId</strong>: Index for user order queries</li>
          <li><strong>OrderPayment.stripeSessionId</strong>: Index for webhook processing</li>
          <li><strong>ProductCategory</strong>: Composite indexes on productId and categoryId</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Prisma Setup</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Database Connection</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm text-gray-800">{`// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URL")
}

generator client {
  provider = "prisma-client-js"
  output   = "./generated"
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Migrations</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm text-gray-800">{`# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio`}</pre>
        </div>
      </section>
    </div>
  );
}


