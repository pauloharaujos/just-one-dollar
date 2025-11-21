'use client';

import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

interface Order {
  id: number;
  orderNumber: string;
  total: number;
  subtotal: number;
  tax: number;
  status: string;
  createdAt: Date;
}

interface Address {
  id: number;
  firstName: string;
  lastName: string;
  street1: string;
  street2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface Customer {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  cpf: string | null;
  age: number | null;
  createdAt: Date;
  orders: Order[];
  addresses: Address[];
}

interface CustomerDetailClientProps {
  customer: Customer;
}

export default function CustomerDetailClient({ customer }: CustomerDetailClientProps) {
  const router = useRouter();

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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          ← Back to Customers
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Customer Details</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h2>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{customer.name || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{customer.email}</dd>
                </div>
                {customer.phone && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.phone}</dd>
                  </div>
                )}
                {customer.cpf && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">CPF</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.cpf}</dd>
                  </div>
                )}
                {customer.age && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Age</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.age}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order History ({customer.orders.length})
              </h2>
              {customer.orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {customer.orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.orderNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(order.total)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href={`/admin/orders/${order.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No orders yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Addresses ({customer.addresses.length})
              </h2>
              {customer.addresses.length > 0 ? (
                <div className="space-y-4">
                  {customer.addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 ${address.isDefault ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
                    >
                      {address.isDefault && (
                        <span className="text-xs font-semibold text-indigo-800 mb-2 block">
                          Default Address
                        </span>
                      )}
                      <address className="text-sm not-italic text-gray-900">
                        {address.firstName} {address.lastName}
                        <br />
                        {address.street1}
                        {address.street2 && (
                          <>
                            <br />
                            {address.street2}
                          </>
                        )}
                        <br />
                        {address.city}, {address.state} {address.postalCode}
                        <br />
                        {address.country}
                        <br />
                        <br />
                        Phone: {address.phone}
                      </address>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No addresses on file</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
