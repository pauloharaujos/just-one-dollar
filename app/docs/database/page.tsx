import Link from 'next/link';

export default function Database() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Database Schema</h1>
        <p className="text-xl text-gray-600">
          Complete reference for the database schema, relationships, and data models used in the Just One Dollar platform.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🗄️ Product Management</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Model</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`model Product {
  id          Int     @id @default(autoincrement())
  name        String  -- Product display name
  sku         String  -- Stock Keeping Unit identifier
  description String  -- Product description
  price       Float   -- Product price
  visible     Boolean @default(true) -- Show/hide product
}`}
                </pre>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Fields:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">id</code> - Auto-incrementing primary key</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">name</code> - Product display name (required)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">sku</code> - Stock Keeping Unit identifier (required)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">description</code> - Product description (required)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">price</code> - Product price as float (required)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">visible</code> - Boolean flag to show/hide product (default: true)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">👤 User Management</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">User Model</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`model User {
  id            String          @id @default(cuid())
  name          String?
  age           Int?
  cpf           String?
  phone         String?
  email         String          @unique
  password      String?
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  Authenticator Authenticator[]
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}`}
                </pre>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Fields:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">id</code> - CUID string identifier (primary key)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">name</code> - User&apos;s full name (optional)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">age</code> - User&apos;s age (optional)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">cpf</code> - Brazilian CPF identifier (optional)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">phone</code> - User&apos;s phone number (optional)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">email</code> - Unique email address (required)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">password</code> - Hashed password (optional, for credentials provider)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">emailVerified</code> - Email verification timestamp (optional)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">image</code> - Profile image URL (optional)</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">createdAt</code> - Account creation timestamp</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">updatedAt</code> - Last update timestamp</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">NextAuth.js Models</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Account Model</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700 overflow-x-auto">
{`model Account {
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@id([provider, providerAccountId])
}`}
                    </pre>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Stores OAuth provider accounts linked to users.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Session Model</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700 overflow-x-auto">
{`model Session {
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}`}
                    </pre>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Manages user sessions for authentication.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">VerificationToken Model</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700 overflow-x-auto">
{`model VerificationToken {
  identifier String
  token      String
  expires    DateTime
  
  @@id([identifier, token])
}`}
                    </pre>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Stores email verification tokens.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Authenticator Model (WebAuthn)</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700 overflow-x-auto">
{`model Authenticator {
  credentialID         String  @unique
  userId               String
  providerAccountId    String
  credentialPublicKey  String
  counter              Int
  credentialDeviceType String
  credentialBackedUp   Boolean
  transports           String?
  user                 User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@id([userId, credentialID])
}`}
                    </pre>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Stores WebAuthn authenticator credentials for passwordless authentication.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔗 Relationships</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">User Relationships</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">User → Account</h4>
                  <p className="text-sm text-gray-600">One-to-many: A user can have multiple OAuth accounts</p>
                  <p className="text-xs text-gray-500 mt-2">Cascade delete enabled</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">User → Session</h4>
                  <p className="text-sm text-gray-600">One-to-many: A user can have multiple active sessions</p>
                  <p className="text-xs text-gray-500 mt-2">Cascade delete enabled</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">User → Authenticator</h4>
                  <p className="text-sm text-gray-600">One-to-many: A user can have multiple WebAuthn authenticators</p>
                  <p className="text-xs text-gray-500 mt-2">Cascade delete enabled</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔧 Database Configuration</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Prisma Configuration</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="text-sm text-gray-700 overflow-x-auto">
{`generator client {
  provider = "prisma-client-js"
  output   = "./generated"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URL")
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Environment Variables</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Required:</h4>
                <div className="bg-gray-900 rounded-lg p-4">
                  <code className="text-green-400">{'POSTGRES_URL="postgresql://user:password@localhost:5432/justonedollar"'}</code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Migrations</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Create Migration:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">npx prisma migrate dev --name migration_name</code>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Apply Migrations:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">npx prisma migrate deploy</code>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Generate Client:</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-green-400">npx prisma generate</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Indexes and Constraints</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Primary Keys</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Product.id</code> - Auto-increment integer</li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">User.id</code> - CUID string</li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Account</code> - Composite key: [provider, providerAccountId]</li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Session.sessionToken</code> - Unique string</li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">VerificationToken</code> - Composite key: [identifier, token]</li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Authenticator</code> - Composite key: [userId, credentialID]</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Unique Constraints</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">User.email</code> - Unique email addresses</li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Session.sessionToken</code> - Unique session tokens</li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Authenticator.credentialID</code> - Unique credential IDs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Cascade Deletes</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Deleting a User automatically deletes all associated Accounts</li>
                <li>• Deleting a User automatically deletes all associated Sessions</li>
                <li>• Deleting a User automatically deletes all associated Authenticators</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/architecture" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">🏗️ Architecture Overview</h3>
            <p className="text-gray-600 text-sm">Learn about the overall system architecture.</p>
          </Link>

          <Link 
            href="/docs/api" 
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">🔧 API Reference</h3>
            <p className="text-gray-600 text-sm">Explore repository functions and data access patterns.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

