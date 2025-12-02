# Just One Dollar - Ecommerce Platform

A modern ecommerce platform built with Next.js 15+, featuring dynamic product management, user authentication, and a clean, responsive design.

## Watch the Video Explanation
https://youtu.be/Mtu93MdXEaI

## 🚀 Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS

## ✨ Features

- **Dynamic Product Pages**: SEO-friendly URLs with server-side rendering
- **User Authentication**: Secure login/registration system with NextAuth.js
- **Image Management**: Organized product image storage system
- **Responsive Design**: Mobile-first approach with modern UI components
- **Custom 404 Handling**: Professional error pages
- **Comprehensive Documentation**: Interactive documentation site built into the application

## 🚀 Quick Start

```bash
# Clone and install
git clone <your-repo-url>
cd just-one-dollar
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your database URL and NextAuth secrets

# Set up database
npx prisma generate
npx prisma migrate deploy

# Start development
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📚 Documentation

**👉 [View Complete Documentation →](/docs)**

The comprehensive documentation is available at `/docs` and includes:

### Getting Started
- **[Introduction](/docs)** - Platform overview and key features
- **[Quick Start](/docs/quick-start)** - Get up and running in minutes
- **[Setup Guide](/docs/setup)** - Detailed development environment setup

### Architecture
- **[Architecture Overview](/docs/architecture)** - System design and technical implementation
- **[Database Schema](/docs/database)** - Complete database schema reference
- **[File Structure](/docs/file-structure)** - Project organization and structure

### Product Management
- **[Product System](/docs/products)** - How products are stored and managed
- **[Image Management](/docs/images)** - Image storage, optimization, and best practices
- **[URL Structure](/docs/urls)** - URL patterns and SEO-friendly routing

### API Reference
- **[Repository Functions](/docs/api)** - Complete API reference for data access
- **[Data Types](/docs/types)** - TypeScript types and interfaces
- **[Error Handling](/docs/errors)** - Error handling patterns and best practices

### Development
- **[Best Practices](/docs/practices)** - Coding conventions and guidelines
- **[Deployment](/docs/deployment)** - Production deployment guide

## 🏗️ Project Structure

```
just-one-dollar/
├── app/                    # Next.js App Router
│   ├── (catalog)/         # Route groups
│   ├── customer/          # Authentication routes
│   ├── docs/              # Documentation pages
│   └── page.tsx           # Homepage
├── prisma/                # Database schema and migrations
├── repository/            # Data access layer
├── ui/                    # UI components
└── public/               # Static assets
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Database Management

- `npx prisma studio` - Open Prisma Studio (visual database editor)
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma generate` - Generate Prisma Client
- `npx prisma migrate deploy` - Apply migrations in production

## 🔐 Environment Variables

Required environment variables (set in `.env.local`):

```env
POSTGRES_URL="postgresql://user:password@localhost:5432/justonedollar"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

## 📖 Key Concepts

### Repository Pattern
All database access is centralized in the `repository/` directory, providing a clean interface between components and the database layer.

### Server Components
The application uses Next.js Server Components by default, reducing JavaScript bundle size and improving performance.

### Image Organization
Product images are organized by product ID in `/public/product/images/{productId}/` directories, with only filenames stored in the database.

## 🔮 Roadmap

- Shopping cart functionality
- Order management system
- Product categories and filtering
- Search functionality
- Admin dashboard
- Payment integration
- Image upload interface
- Product URL key generation

## 🤝 Contributing

1. Review the [documentation](/docs) to understand the architecture
2. Follow the [best practices](/docs/practices) guide
3. Ensure all tests pass before submitting
4. Update documentation for any new features

## 📝 License

[Add your license here]

---

*Built with ❤️ using Next.js and modern web technologies*
