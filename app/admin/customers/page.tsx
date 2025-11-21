import { listCustomersAction } from '@/app/admin/actions/customers/listCustomers';
import CustomersClient from '@/ui/components/admin/Customers/CustomersClient';

interface SearchParams {
  page?: string;
  search?: string;
}

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const search = params.search || '';

  const result = await listCustomersAction(
    {
      search: search || undefined,
    },
    {
      page,
      limit: 20,
    }
  );

  if (!result.success || !result.data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {result.error || 'No data available'}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
      </div>

      <CustomersClient initialData={result.data} />
    </div>
  );
}

