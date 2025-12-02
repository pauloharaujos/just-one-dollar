export default function APIPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">API Documentation</h1>
      
      <p className="text-lg text-gray-700 mb-8">
        The platform uses a combination of Next.js API routes and Server Actions for backend operations. 
        API routes are used for external integrations (like Stripe webhooks) and some customer operations, 
        while Server Actions handle most admin and customer-facing operations.
      </p>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Authentication API</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">NextAuth Endpoint</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2">
            <strong>Endpoint:</strong> <code className="bg-gray-200 px-1 rounded">/api/auth/[...nextauth]</code>
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Methods:</strong> GET, POST
          </p>
          <p className="text-gray-700">
            Handles all NextAuth operations including sign-in, sign-out, OAuth callbacks, and session management.
            This is automatically handled by NextAuth v5.
          </p>
        </div>

        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <pre>{`// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;`}</pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer API</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Customer Account</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2">
            <strong>Endpoint:</strong> <code className="bg-gray-200 px-1 rounded">POST /api/customer/create</code>
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Authentication:</strong> Not required
          </p>
          <p className="text-gray-700 mb-4">
            Creates a new customer account with email and password.
          </p>

          <div className="mb-4">
            <p className="text-gray-700 font-semibold mb-2">Request Body:</p>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">{`{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}`}</pre>
          </div>

          <div>
            <p className="text-gray-700 font-semibold mb-2">Success Response (201):</p>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">{`{
  "success": true,
  "user": {
    "id": "clx...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}`}</pre>
          </div>

          <div className="mt-4">
            <p className="text-gray-700 font-semibold mb-2">Error Responses:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li><strong>400</strong>: Missing required fields</li>
              <li><strong>409</strong>: Email already in use</li>
              <li><strong>500</strong>: Internal server error</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Stripe Webhook API</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Stripe Webhook Handler</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2">
            <strong>Endpoint:</strong> <code className="bg-gray-200 px-1 rounded">POST /api/stripe/webhook</code>
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Authentication:</strong> Stripe signature verification
          </p>
          <p className="text-gray-700 mb-4">
            Handles Stripe webhook events, particularly <code className="bg-gray-200 px-1 rounded">checkout.session.completed</code> 
            to update order and payment status.
          </p>

          <div className="mb-4">
            <p className="text-gray-700 font-semibold mb-2">Headers:</p>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">{`stripe-signature: t=...,v1=...`}</pre>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 font-semibold mb-2">Request Body:</p>
            <p className="text-gray-700 text-sm">
              Raw request body (string) from Stripe webhook event
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 font-semibold mb-2">Success Response (200):</p>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">{`{
  "received": true
}`}</pre>
          </div>

          <div>
            <p className="text-gray-700 font-semibold mb-2">Error Responses:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li><strong>400</strong>: Missing or invalid Stripe signature</li>
              <li><strong>404</strong>: Order payment not found</li>
              <li><strong>500</strong>: Webhook processing failed</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Webhook Processing Flow</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
          <li>Receive webhook request with Stripe signature</li>
          <li>Verify signature using webhook secret</li>
          <li>Parse event type (checkout.session.completed)</li>
          <li>Extract order metadata from session</li>
          <li>Update order payment status to COMPLETED</li>
          <li>Update order status to COMPLETED</li>
          <li>Return success response</li>
        </ol>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <p className="text-yellow-800 mb-2">
            <strong>Testing:</strong> Use Stripe CLI to forward webhooks locally:
          </p>
          <pre className="bg-yellow-100 p-2 rounded text-sm">{`stripe listen --events checkout.session.completed \\
  --forward-to localhost:3000/api/stripe/webhook`}</pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Server Actions</h2>
        
        <p className="text-gray-700 mb-4">
          Most operations use Next.js Server Actions instead of traditional API routes. Server Actions provide 
          type-safe, server-side functions that can be called directly from client components.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin Server Actions</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2">Located in <code className="bg-gray-200 px-1 rounded">app/admin/actions/</code>:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li><strong>Products</strong>: createProductAction, updateProductAction, deleteProductAction, uploadProductImageAction</li>
            <li><strong>Categories</strong>: createCategoryAction, updateCategoryAction, deleteCategoryAction</li>
            <li><strong>Orders</strong>: updateOrderStatusAction</li>
            <li><strong>Auth</strong>: loginAction, logoutAction</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Customer Server Actions</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2">Located in <code className="bg-gray-200 px-1 rounded">app/cart/actions/</code> and <code className="bg-gray-200 px-1 rounded">app/checkout/actions/</code>:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li><strong>Cart</strong>: addToCart, updateCartItemQuantity, removeFromCart, getCart</li>
            <li><strong>Checkout</strong>: placeOrder, saveAddress, deleteAddress, getCheckoutData</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Server Action Example</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <pre>{`// app/cart/actions/cartActions.ts
'use server';

import { addToCart as addToCartService } from '@/services/cart/cartService';

export async function addToCart(
  productId: number,
  quantity: number = 1
): Promise<CartResult> {
  try {
    return await addToCartService(productId, quantity);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, error: 'Failed to add item to cart' };
  }
}`}</pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">API Design Principles</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Separation of Concerns</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>API routes handle HTTP-specific concerns (headers, signatures)</li>
              <li>Server Actions handle form submissions and client interactions</li>
              <li>Services contain business logic</li>
              <li>Repositories handle data access</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Handling</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Consistent error response format</li>
              <li>Appropriate HTTP status codes</li>
              <li>User-friendly error messages</li>
              <li>Server-side error logging</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Type Safety</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>TypeScript for all API routes and actions</li>
              <li>Type-safe request/response handling</li>
              <li>Prisma-generated types for database operations</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Security</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Authentication required for protected endpoints</li>
              <li>Stripe webhook signature verification</li>
              <li>Input validation and sanitization</li>
              <li>SQL injection prevention via Prisma</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Response Formats</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Success Response</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">{`{
  "success": true,
  "data": { ... }
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Error Response</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">{`{
  "success": false,
  "error": "Error message here"
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">HTTP Status Codes</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li><strong>200</strong>: Success</li>
            <li><strong>201</strong>: Created</li>
            <li><strong>400</strong>: Bad Request (validation errors)</li>
            <li><strong>401</strong>: Unauthorized (authentication required)</li>
            <li><strong>404</strong>: Not Found</li>
            <li><strong>409</strong>: Conflict (e.g., email already exists)</li>
            <li><strong>500</strong>: Internal Server Error</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Future API Endpoints</h2>
        
        <p className="text-gray-700 mb-4">
          The admin panel documentation mentions API routes that may be implemented as Server Actions or 
          traditional API routes depending on the use case:
        </p>

        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li><strong>Admin Auth</strong>: /api/admin/auth/login, /api/admin/auth/logout, /api/admin/auth/session</li>
            <li><strong>Products</strong>: /api/admin/products (GET, POST), /api/admin/products/[id] (GET, PUT, DELETE)</li>
            <li><strong>Orders</strong>: /api/admin/orders (GET), /api/admin/orders/[id] (GET), /api/admin/orders/[id]/status (PUT)</li>
            <li><strong>Customers</strong>: /api/admin/customers (GET), /api/admin/customers/[id] (GET)</li>
            <li><strong>Categories</strong>: /api/admin/categories (GET, POST), /api/admin/categories/tree (GET), /api/admin/categories/[id] (GET, PUT, DELETE)</li>
            <li><strong>Dashboard</strong>: /api/admin/dashboard/metrics (GET)</li>
          </ul>
        </div>

        <p className="text-gray-700 mt-4">
          These endpoints may be implemented as Server Actions (preferred in Next.js 15) or traditional API routes 
          depending on specific requirements and integration needs.
        </p>
      </section>
    </div>
  );
}


