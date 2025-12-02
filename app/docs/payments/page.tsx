export default function PaymentsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Payment Processing</h1>
      
      <p className="text-lg text-gray-700 mb-8">
        The platform integrates with Stripe for secure payment processing. The implementation uses 
        Stripe Checkout for a seamless payment experience with webhook handling for payment status updates.
      </p>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Flow</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Payment Process</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong>Customer Places Order</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Cart validated (items exist, products visible)</li>
                <li>Addresses validated (shipping and billing)</li>
                <li>Order created in database with status PENDING</li>
                <li>Order items created from cart items</li>
                <li>Order payment record initialized</li>
              </ul>
            </li>
            <li>
              <strong>Stripe Checkout Session Created</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Session created with order metadata</li>
                <li>Line items added from cart</li>
                <li>Success and cancel URLs configured</li>
                <li>Customer email included</li>
                <li>Session ID stored in order payment record</li>
              </ul>
            </li>
            <li>
              <strong>Customer Redirected to Stripe</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Redirect to Stripe Checkout page</li>
                <li>Customer enters payment details</li>
                <li>Stripe processes payment</li>
              </ul>
            </li>
            <li>
              <strong>Payment Completion</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Stripe sends webhook event</li>
                <li>Webhook handler validates signature</li>
                <li>Order payment status updated to COMPLETED</li>
                <li>Order status updated to COMPLETED</li>
                <li>Cart deactivated</li>
              </ul>
            </li>
            <li>
              <strong>Order Confirmation</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Customer redirected to success page</li>
                <li>Order confirmation displayed</li>
                <li>Order details available in customer account</li>
              </ul>
            </li>
          </ol>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Stripe Checkout Integration</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Checkout Session Creation</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <pre>{`// services/stripe/stripeService.ts
export async function createCheckoutSession(params: CheckoutSessionParams) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: \`\${baseUrl}/checkout/success?orderNumber=\${orderNumber}\`,
    cancel_url: \`\${baseUrl}/checkout\`,
    customer_email: customerEmail,
    metadata: {
      orderId: orderId.toString(),
      orderNumber,
    },
  });
  
  return { sessionId: session.id, url: session.url };
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Session Configuration</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Payment Methods</strong>: Card payments only</li>
          <li><strong>Mode</strong>: One-time payment (not subscription)</li>
          <li><strong>Currency</strong>: USD</li>
          <li><strong>Metadata</strong>: Order ID and order number for webhook processing</li>
          <li><strong>Success URL</strong>: Redirects to order confirmation page</li>
          <li><strong>Cancel URL</strong>: Returns to checkout page</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Webhook Handling</h2>
        
        <p className="text-gray-700 mb-4">
          Stripe webhooks are used to update order and payment status asynchronously after payment completion:
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">Webhook Endpoint</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2">
            <strong>Endpoint:</strong> <code className="bg-gray-200 px-1 rounded">POST /api/stripe/webhook</code>
          </p>
          <p className="text-gray-700">
            <strong>Event Type:</strong> <code className="bg-gray-200 px-1 rounded">checkout.session.completed</code>
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Webhook Processing</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <pre>{`// app/api/stripe/webhook/route.ts
export async function POST(request: NextRequest) {
  // 1. Get request body and signature
  const body = await request.text();
  const signature = headers().get('stripe-signature');
  
  // 2. Verify webhook signature
  const event = constructWebhookEvent(body, signature);
  
  // 3. Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const paymentData = handleCheckoutSessionCompleted(session);
    
    // 4. Update order payment status
    await updateOrderPayment(orderPayment.orderId, {
      stripePaymentIntent: paymentData.paymentIntentId,
      paymentStatus: 'COMPLETED',
      paymentMethod: paymentData.paymentMethod,
    });
    
    // 5. Update order status
    await updateOrderStatus(paymentData.orderId, 'COMPLETED');
  }
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Security</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Signature Verification</strong>: All webhooks verified using Stripe signature</li>
          <li><strong>Secret Key</strong>: Webhook secret stored in environment variables</li>
          <li><strong>Error Handling</strong>: Failed verifications return 400 status</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Testing Webhooks</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 mb-2">
            <strong>Using Stripe CLI:</strong>
          </p>
          <pre className="bg-yellow-100 p-2 rounded text-sm">{`stripe listen --events checkout.session.completed \\
  --forward-to localhost:3000/api/stripe/webhook`}</pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Status Tracking</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Statuses</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li><strong>PENDING</strong>: Order created, payment not yet processed</li>
            <li><strong>COMPLETED</strong>: Payment successfully processed</li>
            <li><strong>FAILED</strong>: Payment processing failed</li>
            <li><strong>REFUNDED</strong>: Payment refunded to customer</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Order Payment Model</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-sm text-gray-800">{`model OrderPayment {
  id                  Int
  orderId             Int           @unique
  stripeSessionId      String?       @unique
  stripePaymentIntent  String?       @unique
  paymentStatus       PaymentStatus  @default(PENDING)
  amount              Float
  currency            String        @default("usd")
  paymentMethod       String?
  createdAt           DateTime
  updatedAt           DateTime
}`}</pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Checkout Service</h2>
        
        <p className="text-gray-700 mb-4">
          The checkout service orchestrates the complete order placement and payment process:
        </p>

        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <pre>{`// services/checkout/checkoutService.ts
export async function placeOrderService(
  customerId: string,
  customerEmail: string,
  shippingAddressId: number,
  billingAddressId: number
): Promise<string> {
  // 1. Validate checkout
  const validation = await validateCheckout(
    customerId, 
    billingAddressId, 
    shippingAddressId
  );
  
  // 2. Calculate totals
  const totals = calculateTotals(validation.cart.quoteItems);
  
  // 3. Create order
  const order = await createOrder(
    customerId,
    billingAddressId,
    shippingAddressId,
    validation,
    totals
  );
  
  // 4. Process payment (create Stripe session)
  const stripeCheckoutUrl = await processPayment(
    order,
    customerEmail,
    items,
    totals.total
  );
  
  // 5. Deactivate cart
  await deactivateUserCart(validation.cart.id);
  
  return stripeCheckoutUrl;
}`}</pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Configuration</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Environment Variables</h3>
        <div className="bg-gray-50 p-6 rounded-lg">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">{`# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...          # Secret key from Stripe dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Publishable key (for future use)
STRIPE_WEBHOOK_SECRET=whsec_...        # Webhook signing secret`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Stripe Configuration</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li><strong>API Version</strong>: Latest Stripe API version</li>
            <li><strong>Currency</strong>: USD (configurable)</li>
            <li><strong>Mode</strong>: Payment (one-time, not subscription)</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Error Handling</h2>
        
        <p className="text-gray-700 mb-4">
          The payment system includes comprehensive error handling:
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Checkout Session Creation</strong>: Errors caught and user-friendly messages returned</li>
          <li><strong>Webhook Verification</strong>: Invalid signatures return 400 status</li>
          <li><strong>Payment Processing</strong>: Failed payments logged and order status tracked</li>
          <li><strong>Order Creation</strong>: Validation errors prevent invalid orders</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmation</h2>
        
        <p className="text-gray-700 mb-4">
          After successful payment, customers are redirected to the order confirmation page:
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Success Page</strong>: <code className="bg-gray-200 px-1 rounded">/checkout/success?orderNumber=...</code></li>
          <li><strong>Order Details</strong>: Complete order information displayed</li>
          <li><strong>Payment Confirmation</strong>: Payment status and method shown</li>
          <li><strong>Order History</strong>: Order available in customer account</li>
        </ul>
      </section>
    </div>
  );
}


