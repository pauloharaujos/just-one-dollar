# Just One Clothing - Ecommerce Platform

A full-stack ecommerce platform built with modern web technologies, featuring a complete admin panel for store management and a customer-facing storefront with secure authentication and payment processing.

## 🎯 Project Overview

Just One Clothing is a production-ready ecommerce solution demonstrating enterprise-level architecture patterns, including SOLID principles, repository pattern, and service layer separation. The platform includes comprehensive features for product management, order processing, customer management, and secure payment integration.

## 🚀 Key Features

### Storefront
- **Dynamic Catalog System**: SEO-friendly product and category pages with URL rewrites
- **Shopping Cart**: Persistent cart management using Quote system
- **Checkout Flow**: Complete checkout with address management and Stripe payment integration
- **Customer Accounts**: User authentication with NextAuth (Credentials, Google, GitHub OAuth)
- **Order Management**: Order history and tracking for customers

### Admin Panel
- **Dashboard**: Real-time metrics (orders, revenue, customers, products)
- **Product Management**: Full CRUD with Cloudinary image upload
- **Order Management**: Order tracking and status updates
- **Customer Management**: Customer profiles and order history
- **Category Management**: Hierarchical category structure with tree view
- **Separate Authentication**: Custom JWT-based admin authentication

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 15** - React framework with App Router and Server Components
- **TypeScript** - Full type safety across the application
- **React 19** - Latest React features and patterns
- **Tailwind CSS 4** - Utility-first styling with modern design system

### Backend & Database
- **Prisma** - Type-safe ORM with PostgreSQL
- **PostgreSQL** - Relational database (via Neon)
- **NextAuth v5** - Authentication for customers
- **JWT (jose)** - Custom admin authentication

### Services & Integrations
- **Stripe** - Payment processing and checkout
- **Cloudinary** - Image storage and optimization
- **bcryptjs** - Password hashing

### UI Components
- **Radix UI** - Accessible component primitives
- **TanStack Table** - Data tables for admin panel
- **React Icons** - Icon library

## 🏗️ Architecture Highlights

### SOLID Principles
- **Single Responsibility**: Clear separation between repositories, services, and API routes
- **Repository Pattern**: Data access layer abstraction
- **Service Layer**: Business logic separated from data access
- **Dependency Inversion**: Services depend on repository abstractions

### Key Patterns
- **Dual Authentication**: NextAuth for customers, custom JWT for admin
- **URL Rewrite System**: Dynamic routing with canonical URL management
- **Quote System**: Cart management using database-backed quotes
- **Server Actions**: Type-safe server-side operations
- **Middleware Protection**: Route-level authentication guards

## 📁 Project Structure

```
just-one-dollar/
├── app/                    # Next.js App Router
│   ├── (catalog)/          # Storefront catalog pages
│   ├── admin/              # Admin panel routes
│   ├── api/                # API routes
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   ├── customer/           # Customer account pages
│   └── docs/               # Project documentation
├── repository/             # Data access layer (Prisma)
├── services/               # Business logic layer
│   ├── admin/              # Admin-specific services
│   ├── cart/               # Cart management
│   ├── checkout/           # Checkout processing
│   ├── cloudinary/         # Image management
│   └── stripe/             # Payment processing
├── ui/                     # React components
│   ├── components/         # Reusable components
│   └── cms/                # CMS components
├── prisma/                 # Database schema
└── scripts/                # Utility scripts
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (or Neon account)
- Cloudinary account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pauloharaujos/just-one-dollar.git
   cd just-one-dollar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with:
   ```env
   # Database
   POSTGRES_URL="postgresql://..."

   # NextAuth
   AUTH_SECRET="your-secret-key"
   AUTH_URL="http://localhost:3000"

   # Admin JWT
   ADMIN_JWT_SECRET="your-admin-secret"

   # Cloudinary
   CLOUDINARY_URL="cloudinary://..."
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"

   # Stripe
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."

   # OAuth (optional)
   GOOGLE_CLIENT_ID="..."
   GOOGLE_CLIENT_SECRET="..."
   GITHUB_CLIENT_ID="..."
   GITHUB_CLIENT_SECRET="..."
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Seed admin user** (optional)
   ```bash
   npx tsx scripts/seed-admin-user.ts
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Storefront: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
   - Documentation: [http://localhost:3000/docs](http://localhost:3000/docs)

## 📚 Documentation

Comprehensive documentation is available at `/docs` covering:
- System Architecture
- Storefront Features
- Admin Panel
- Authentication Systems
- Payment Integration
- Cloudinary Image Management
- Database Schema
- API Reference

## 🔐 Authentication

### Customer Authentication
- **NextAuth v5** with multiple providers
- Credentials (email/password)
- OAuth: Google, GitHub
- Session-based with JWT strategy

### Admin Authentication
- **Custom JWT** implementation
- HTTP-only cookies
- 24-hour session expiration
- Role-based access (SUPER_ADMIN, ADMIN)

## 💳 Payment Processing

- **Stripe Checkout** integration
- Secure payment sessions
- Webhook handling for payment status
- Order payment tracking
- Support for card payments

## 🖼️ Image Management

- **Cloudinary** integration for product images
- Automatic upload on product creation/update
- Optimized delivery with `next-cloudinary`
- SKU-based image naming (`{SKU}.png`)
- Automatic transformations and optimization

## 🧪 Development

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Database studio
npx prisma studio
```

## 📄 License

This project is licensed under the MIT License.

---

**Built with modern web technologies** | [View Documentation](/docs) | [GitHub](https://github.com/pauloharaujos/just-one-dollar)
