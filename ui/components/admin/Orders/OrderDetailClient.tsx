'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import { updateOrderStatusAction } from '@/app/admin/actions/orders/updateOrderStatus';

interface Product {
  name: string;
  sku: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  name: string;
  sku: string;
  product: Product;
}

interface Address {
  firstName: string;
  lastName: string;
  company: string | null;
  street1: string;
  street2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface Order {
  id: number;
  orderNumber: string;
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
  };
  billingAddress: Address;
  shippingAddress: Address;
  orderItems: OrderItem[];
}

interface OrderDetailClientProps {
  order: Order;
}

export default function OrderDetailClient({ order: initialOrder }: OrderDetailClientProps) {
  const router = useRouter();
  const [order, setOrder] = useState(initialOrder);
  const [isPending, startTransition] = useTransition();

  const handleStatusUpdate = async (status: 'COMPLETED' | 'CANCELLED') => {
    startTransition(async () => {
      const result = await updateOrderStatusAction(order.id, status);
      
      if (result.success && result.order) {
        setOrder(prev => ({ ...prev, status: result.order!.status }));
      } else {
        console.error('Error updating status:', result.error);
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'REFUNDED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ← Back to Orders
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}
            >
              {order.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleStatusUpdate('COMPLETED')}
            disabled={isPending || order.status === 'COMPLETED' || order.status === 'CANCELLED'}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Updating...' : 'Ship Order'}
          </button>
          <button
            onClick={() => handleStatusUpdate('CANCELLED')}
            disabled={isPending || order.status === 'COMPLETED' || order.status === 'CANCELLED'}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Updating...' : 'Cancel Order'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start border-b pb-4 last:border-b-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(order.tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-gray-900">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Information</h2>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Order Number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.orderNumber}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span
                      className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(order.createdAt).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Customer</h2>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.user.name || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.user.email}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
              <address className="text-sm not-italic text-gray-900">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                <br />
                {order.shippingAddress.street1}
                {order.shippingAddress.street2 && (
                  <>
                    <br />
                    {order.shippingAddress.street2}
                  </>
                )}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
                <br />
                <br />
                Phone: {order.shippingAddress.phone}
              </address>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h2>
              <address className="text-sm not-italic text-gray-900">
                {order.billingAddress.firstName} {order.billingAddress.lastName}
                <br />
                {order.billingAddress.street1}
                {order.billingAddress.street2 && (
                  <>
                    <br />
                    {order.billingAddress.street2}
                  </>
                )}
                <br />
                {order.billingAddress.city}, {order.billingAddress.state}{' '}
                {order.billingAddress.postalCode}
                <br />
                {order.billingAddress.country}
                <br />
                <br />
                Phone: {order.billingAddress.phone}
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
