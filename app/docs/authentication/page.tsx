export default function AuthenticationPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Authentication</h1>
      
      <p className="text-lg text-gray-700 mb-8">
        The platform implements a dual authentication system: NextAuth v5 for customer authentication 
        and a custom JWT implementation for admin authentication. This separation provides isolated security 
        boundaries and independent session management.
      </p>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Authentication (NextAuth)</h2>
        
        <p className="text-gray-700 mb-4">
          Customer authentication is handled by NextAuth v5, providing a secure, flexible authentication 
          system with multiple provider options.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentication Providers</h3>
        <div className="bg-gray-50 p-6 rounded-lg mb-4">
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Credentials Provider</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Email and password authentication</li>
                <li>Password hashing with bcryptjs</li>
                <li>User lookup in User table</li>
              </ul>
            </li>
            <li>
              <strong>Google OAuth</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Sign in with Google account</li>
                <li>Automatic account creation</li>
                <li>OAuth 2.0 flow</li>
              </ul>
            </li>
            <li>
              <strong>GitHub OAuth</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Sign in with GitHub account</li>
                <li>Automatic account creation</li>
                <li>OAuth 2.0 flow</li>
              </ul>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Configuration</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <pre>{`// auth.ts
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        // Email/password validation
      }
    }),
    Google,
    GitHub,
  ],
});`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Session Strategy</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>JWT Strategy</strong>: Sessions stored as JWT tokens</li>
          <li><strong>Session Data</strong>: User ID, name, email, image</li>
          <li><strong>Automatic Refresh</strong>: NextAuth handles token refresh</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Database Schema</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm text-gray-800">{`model User {
  id            String
  email         String   @unique
  password      String?  // For credentials auth
  name          String?
  emailVerified DateTime?
  image         String?
  accounts      Account[]  // OAuth accounts
  sessions      Session[]
  orders        Order[]
  addresses     Address[]
  quotes        Quote[]  // Shopping carts
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Protected Routes</h3>
        <p className="text-gray-700 mb-2">The following routes require customer authentication:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><code className="bg-gray-200 px-1 rounded">/cart</code> - Shopping cart</li>
          <li><code className="bg-gray-200 px-1 rounded">/checkout</code> - Checkout process</li>
          <li><code className="bg-gray-200 px-1 rounded">/customer/account</code> - Account management</li>
          <li><code className="bg-gray-200 px-1 rounded">/customer/order</code> - Order history</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Admin Authentication (Custom JWT)</h2>
        
        <p className="text-gray-700 mb-4">
          The admin panel uses a completely separate authentication system with custom JWT implementation, 
          providing isolated security and independent session management.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentication Flow</h3>
        <div className="bg-gray-50 p-6 rounded-lg mb-4">
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Admin submits login form at <code className="bg-gray-200 px-1 rounded">/admin/login</code></li>
            <li>Credentials verified against <code className="bg-gray-200 px-1 rounded">AdminUser</code> table</li>
            <li>Password compared using bcryptjs</li>
            <li>JWT token created with admin info (id, email, name, role)</li>
            <li>Token stored in HTTP-only cookie named <code className="bg-gray-200 px-1 rounded">admin_session</code></li>
            <li>Middleware validates token on each admin route request</li>
            <li>Invalid/expired tokens redirect to login</li>
          </ol>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">JWT Implementation</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <pre>{`// services/admin/auth/jwtService.ts
import { SignJWT, jwtVerify } from 'jose';

export async function createToken(payload: AdminSessionPayload): Promise<string> {
  const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET);
  
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyToken(token: string): Promise<AdminSessionPayload | null> {
  // Token verification logic
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Database Schema</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm text-gray-800">{`model AdminUser {
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
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Security Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>HTTP-only Cookies</strong>: Prevents XSS attacks</li>
          <li><strong>Password Hashing</strong>: bcryptjs with salt rounds</li>
          <li><strong>Token Expiration</strong>: 24-hour session expiration</li>
          <li><strong>Role-based Access</strong>: SUPER_ADMIN and ADMIN roles</li>
          <li><strong>Middleware Protection</strong>: All admin routes protected</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Protected Routes</h3>
        <p className="text-gray-700 mb-2">All routes under <code className="bg-gray-200 px-1 rounded">/admin/*</code> are protected except:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><code className="bg-gray-200 px-1 rounded">/admin/login</code> - Login page (public)</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Middleware Protection</h2>
        
        <p className="text-gray-700 mb-4">
          The middleware (<code className="bg-gray-200 px-1 rounded">middleware.ts</code>) handles route protection for both customer and admin routes:
        </p>

        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <pre>{`// middleware.ts
const protectedPaths = [
  '/admin',
  '/customer/account',
  '/checkout',
  '/cart'
];

export default auth(async (req) => {
  const isCustomerLoggedIn = !!req.auth;
  const isAdminRoute = pathname.startsWith('/admin');
  
  // Admin route protection
  if (isAdminRoute) {
    const adminCookie = req.cookies.get('admin_session');
    const session = await verifyToken(adminCookie?.value);
    if (!session) {
      return NextResponse.redirect('/admin/login');
    }
  }
  
  // Customer route protection
  if (isProtectedPath && !isCustomerLoggedIn) {
    return NextResponse.redirect('/customer/login');
  }
});`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Protection Logic</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
          <li>Middleware runs on every request</li>
          <li>Checks if route is protected</li>
          <li>For admin routes: Validates JWT token from cookie</li>
          <li>For customer routes: Validates NextAuth session</li>
          <li>Redirects to appropriate login page if not authenticated</li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Differences</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Feature</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Customer (NextAuth)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Admin (Custom JWT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700">Provider</td>
                <td className="px-4 py-3 text-sm text-gray-700">NextAuth v5</td>
                <td className="px-4 py-3 text-sm text-gray-700">Custom JWT (jose)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700">Session Storage</td>
                <td className="px-4 py-3 text-sm text-gray-700">JWT in session</td>
                <td className="px-4 py-3 text-sm text-gray-700">JWT in HTTP-only cookie</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700">OAuth Support</td>
                <td className="px-4 py-3 text-sm text-gray-700">Yes (Google, GitHub)</td>
                <td className="px-4 py-3 text-sm text-gray-700">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700">Database</td>
                <td className="px-4 py-3 text-sm text-gray-700">User, Account, Session tables</td>
                <td className="px-4 py-3 text-sm text-gray-700">AdminUser table only</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700">Roles</td>
                <td className="px-4 py-3 text-sm text-gray-700">Single user type</td>
                <td className="px-4 py-3 text-sm text-gray-700">SUPER_ADMIN, ADMIN</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Environment Variables</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Authentication</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm mb-4">{`AUTH_SECRET=your-secret-key
AUTH_URL=http://localhost:3000

# OAuth (optional)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...`}</pre>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">Admin Authentication</h3>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">{`ADMIN_JWT_SECRET=your-admin-secret-key`}</pre>
        </div>
      </section>
    </div>
  );
}


