# Admin Panel Documentation

## Overview

The admin panel is a comprehensive management interface built with Next.js 15, featuring separate authentication from the storefront, CRUD operations for products, orders, customers, and categories, and a modern dashboard with real-time metrics.

## Tech Stack

### Core Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Prisma** - Type-safe ORM for database operations
- **PostgreSQL** - Database (via Neon)
- **JWT Authentication** - Custom JWT-based auth with `jose` library
- **bcryptjs** - Password hashing
- **Tailwind CSS** - Utility-first CSS framework
- **Cloudinary** - Image storage and management

### Key Dependencies

- `jose` - JWT token creation and verification
- `zod` - Schema validation (for future enhancements)
- `@tanstack/react-table` - Data table functionality
- `clsx` & `tailwind-merge` - Conditional class utilities

## Architecture

### Authentication System

The admin panel uses a **separate authentication system** from the storefront:

- **Custom JWT Implementation** - No dependency on NextAuth
- **HTTP-only Cookies** - JWT stored securely in cookies
- **Session Management** - 24-hour token expiration
- **Middleware Protection** - All `/admin/*` routes protected except `/admin/login`

#### Authentication Flow

1. Admin logs in via `/admin/login`
2. Credentials verified against `AdminUser` table
3. JWT token created with admin info (id, email, name, role)
4. Token stored in HTTP-only cookie named `admin_session`
5. Middleware validates token on each request
6. Invalid/expired tokens redirect to login

#### Key Files

- `services/admin/auth/jwtService.ts` - JWT operations
- `services/admin/auth/passwordService.ts` - Password hashing
- `services/admin/auth/authenticationService.ts` - Main auth logic
- `middleware.ts` - Route protection
- `repository/adminUserRepository.ts` - Admin user data access

### Database Schema

#### AdminUser Model

```prisma
model AdminUser {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String
  role      AdminRole @default(ADMIN)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum AdminRole {
  SUPER_ADMIN
  ADMIN
}
```

### SOLID Principles Implementation

#### 1. Single Responsibility Principle

**Repositories** (`repository/`)
- Only handle data access
- Pure database operations
- Examples: `adminUserRepository.ts`, `productRepository.ts`, `orderRepository.ts`

**Services** (`services/admin/`)
- Only handle business logic
- No direct database access
- Examples: `productService.ts`, `categoryService.ts`, `orderService.ts`

**API Routes** (`app/api/admin/`)
- Only handle HTTP request/response
- Delegate to services for business logic
- Examples: `products/route.ts`, `orders/route.ts`

**Components** (`ui/components/admin/`)
- Only handle UI rendering
- Receive data via props
- Examples: `Sidebar.tsx`, `Header.tsx`, `MetricsCard.tsx`

#### 2. Open/Closed Principle

- Generic category tree component reusable for different hierarchies
- Base repository patterns extendable for new entities
- Reusable form components with consistent styling

#### 3. Liskov Substitution Principle

- Consistent repository interface patterns
- Interchangeable service implementations
- Same interface for create/update operations

#### 4. Interface Segregation Principle

- Focused API endpoints (one responsibility per route)
- Specific component props interfaces
- Separate concerns: auth, products, orders, customers, categories

#### 5. Dependency Inversion Principle

- Services depend on repository abstractions
- API routes depend on service abstractions
- Components receive data, don't fetch directly

### Route Structure

```
/app/admin/
  ├── login/page.tsx              # Login page (public)
  ├── dashboard/page.tsx          # Main dashboard
  ├── products/
  │   ├── page.tsx                # Product listing
  │   ├── new/page.tsx            # Create product
  │   └── [id]/edit/page.tsx      # Edit product
  ├── orders/
  │   ├── page.tsx                # Order listing
  │   └── [id]/page.tsx           # Order detail
  ├── customers/
  │   ├── page.tsx                # Customer listing
  │   └── [id]/page.tsx           # Customer detail
  └── categories/
      ├── page.tsx                # Category listing (flat/tree view)
      ├── new/page.tsx            # Create category
      └── [id]/edit/page.tsx      # Edit category
```

### API Structure

```
/app/api/admin/
  ├── auth/
  │   ├── login/route.ts         # POST - Admin login
  │   ├── logout/route.ts        # POST - Admin logout
  │   └── session/route.ts       # GET - Get current session
  ├── products/
  │   ├── route.ts               # GET, POST
  │   ├── upload-image/route.ts  # POST - Image upload
  │   └── [id]/route.ts          # GET, PUT, DELETE
  ├── orders/
  │   ├── route.ts               # GET - List orders
  │   ├── [id]/route.ts          # GET - Order detail
  │   └── [id]/status/route.ts   # PUT - Update status
  ├── customers/
  │   ├── route.ts               # GET - List customers
  │   └── [id]/route.ts          # GET - Customer detail
  ├── categories/
  │   ├── route.ts               # GET, POST
  │   ├── tree/route.ts          # GET - Category tree
  │   └── [id]/route.ts          # GET, PUT, DELETE
  └── dashboard/
      └── metrics/route.ts        # GET - Dashboard data
```

## Key Features

### Dashboard

- **Real-time Metrics**: Total orders, revenue, customers, products
- **Recent Orders**: Latest 10 orders with status
- **Quick Navigation**: Access to all major sections

### Product Management

- **CRUD Operations**: Create, read, update, delete products
- **Image Upload**: Cloudinary integration for product images
- **SKU-based Images**: Images named as `{SKU}.png`
- **Category Assignment**: Assign products to multiple categories
- **Search & Filter**: Search by name, SKU, description
- **Pagination**: Efficient handling of large product lists
- **URL Rewrites**: Automatic creation of canonical URLs

### Order Management

- **Order Listing**: View all orders with filters
- **Order Details**: Full order information including items and addresses
- **Status Management**: Update order status (Pending, Processing, Completed, Cancelled, Refunded)
- **Customer Info**: View customer details for each order
- **Payment Info**: Access to payment details

### Customer Management

- **Customer Listing**: View all customers with search
- **Customer Details**: Full profile with order history
- **Address Management**: View customer addresses
- **Order History**: See all orders for a customer
- **Customer Statistics**: Total orders and addresses

### Category Management

- **Category Listing**: Flat and tree view modes
- **Hierarchical Structure**: Parent-child relationships
- **Category CRUD**: Create, edit, delete categories
- **Product Count**: See number of products per category
- **Visibility Control**: Show/hide categories
- **URL Rewrites**: Automatic creation of canonical URLs

## Security Features

1. **HTTP-only Cookies**: JWT tokens stored securely
2. **Password Hashing**: bcryptjs with salt rounds
3. **Middleware Protection**: All admin routes protected
4. **Session Validation**: Token verified on each request
5. **Role-based Access**: SUPER_ADMIN and ADMIN roles
6. **SQL Injection Protection**: Prisma ORM prevents SQL injection
7. **XSS Protection**: React's built-in XSS protection

## Image Management

### Cloudinary Integration

- **Product Images**: Uploaded to Cloudinary with naming pattern `{SKU}.png`
- **Image Service**: `services/admin/imageUploadService.ts`
- **Upload Endpoint**: `POST /api/admin/products/upload-image`
- **URL Format**: `https://res.cloudinary.com/{cloud_name}/image/upload/c_limit,w_1920/f_auto/q_auto/v1/{SKU}`
- **Existing Service**: Uses `getCloudinaryPublicId` from `services/cloudinary/cloudinaryService.ts`

### Image Upload Flow

1. Admin selects image file in product form
2. Image preview shown before upload
3. On product creation/update, image uploaded to Cloudinary
4. Image stored as `{SKU}.png` in Cloudinary
5. Image URL automatically available on storefront

## URL Rewrite System

### Automatic URL Rewrite Creation

Both products and categories automatically create URL rewrites when created or updated:

**Categories:**
- Request Path: `/{category.url}`
- Target Type: `CATEGORY`
- Target ID: `category.id`

**Products:**
- Request Path: `/{product.url}`
- Target Type: `PRODUCT`
- Target ID: `product.id`

This ensures that storefront URLs work correctly immediately after creation.

### URL Rewrite Service

- **Repository**: `repository/urlRewriteRepository.ts`
- **Upsert Function**: `upsertCanonicalRewrite()` - Creates or updates rewrites
- **Integration**: Used in `productService.ts` and `categoryService.ts`

## Development Best Practices

### Component Structure

```
Client Components ('use client'):
- Interactive elements (forms, buttons, modals)
- State management
- Sidebar, Header with logout functionality
- Form submissions

Server Components (default):
- Data fetching from API
- Server-side logic
- Initial page loads
```

### Error Handling

- Try-catch blocks in all async operations
- User-friendly error messages
- Console logging for debugging
- Graceful fallbacks for missing data

### Loading States

- Loading spinners during data fetch
- Disabled buttons during form submission
- Skeleton screens for better UX

### Form Validation

- Client-side validation before submission
- Server-side validation in services
- Clear error messages
- Required field indicators

## Environment Variables

Add to `.env`:

```env
# Admin JWT Secret (required for production)
ADMIN_JWT_SECRET=your-secret-key-change-this-in-production

# Cloudinary
CLOUDINARY_URL=cloudinary://...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Getting Started

### Creating Admin Users

Run the seed script to create the first admin user:

```bash
npx tsx scripts/seed-admin-direct.ts
```

Or create manually:

```typescript
import prisma from '@/prisma/prismaClient';
import { hash } from 'bcryptjs';

const hashedPassword = await hash('password', 10);

await prisma.adminUser.create({
  data: {
    email: 'admin@example.com',
    password: hashedPassword,
    name: 'Admin User',
    role: 'SUPER_ADMIN',
  },
});
```

### Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Login with credentials
3. Access dashboard at `/admin/dashboard`

### Development Tips

1. **Hot Reload**: All changes reflect immediately (thanks to Turbopack)
2. **Type Safety**: TypeScript ensures type safety across the codebase
3. **Console Logs**: Check browser console for API responses and errors
4. **Database**: Use Prisma Studio to view data: `npx prisma studio`

## Future Enhancements

- [ ] Role-based permissions (different access levels)
- [ ] Activity logging for admin actions
- [ ] Bulk operations (delete multiple, update status)
- [ ] Advanced filtering and searching
- [ ] CSV import/export
- [ ] Analytics dashboard with charts
- [ ] Email notifications for orders
- [ ] Product image gallery
- [ ] Category drag-and-drop reordering
- [ ] Multi-language support

