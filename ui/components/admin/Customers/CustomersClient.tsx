'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Pagination from '@/ui/components/admin/Pagination';
import SearchBar from '@/ui/components/admin/SearchBar';
import type { CustomerWithCounts } from '@/repository/customerRepository';

interface CustomersResponse {
  customers: CustomerWithCounts[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface CustomersClientProps {
  initialData: CustomersResponse;
}

export default function CustomersClient({ initialData }: CustomersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    
    // Reset to page 1 when searching
    params.set('page', '1');
    
    router.push(`/admin/customers?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/admin/customers?${params.toString()}`);
  };

  return (
    <div>
      <SearchBar
        searchValue={search}
        onSearchChange={(value) => setSearch(value)}
        onSearchSubmit={handleSearch}
        placeholder="Search customers by name, email, or phone..."
      />

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {initialData && initialData.customers.length > 0 ? (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Addresses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member Since
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {initialData.customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.name || 'No name'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.phone || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer._count.orders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer._count.addresses}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/customers/${customer.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Details
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
            <p className="text-gray-500">No customers found</p>
          </div>
        )}
      </div>
    </div>
  );
}
