'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import Pagination from '@/ui/components/admin/Pagination';
import SearchBar from '@/ui/components/admin/SearchBar';

interface User {
  name: string | null;
  email: string;
}

interface Order {
  id: number;
  orderNumber: string;
  total: number;
  subtotal: number;
  tax: number;
  status: string;
  createdAt: Date;
  user: User;
}

interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface OrdersClientProps {
  initialData: OrdersResponse;
}

export default function OrdersClient({ initialData }: OrdersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ search, status: statusFilter, page: '1' });
  };

  const handlePageChange = (page: number) => {
    updateURL({ page: page.toString() });
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    updateURL({ status, page: '1' });
  };

  const updateURL = (params: Record<string, string>) => {
    startTransition(() => {
      const newSearchParams = new URLSearchParams(searchParams);
      
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, value);
        } else {
          newSearchParams.delete(key);
        }
      });

      router.push(`/admin/orders?${newSearchParams.toString()}`);
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
    <>
      <SearchBar
        searchValue={search}
        onSearchChange={(value) => setSearch(value)}
        onSearchSubmit={handleSearch}
        placeholder="Search orders..."
      >
        <select
          value={statusFilter}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={isPending}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="REFUNDED">Refunded</option>
        </select>
      </SearchBar>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {initialData && initialData.orders.length > 0 ? (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subtotal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax
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
                {initialData.orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.user.name || order.user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(order.subtotal)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(order.tax)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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

            <Pagination
              currentPage={initialData.page}
              totalPages={initialData.totalPages}
              total={initialData.total}
              limit={initialData.limit}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>
    </>
  );
}
