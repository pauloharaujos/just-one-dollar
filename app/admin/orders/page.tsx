import { listOrdersAction } from '@/app/admin/actions/orders/listOrders';
import OrdersClient from '@/ui/components/admin/Orders/OrdersClient';

interface SearchParams {
  page?: string;
  search?: string;
  status?: string;
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const search = params.search || '';
  const status = params.status || '';

  const result = await listOrdersAction(
    {
      search: search || undefined,
      status: status as any || undefined,
    },
    {
      page,
      limit: 20,
    }
  );

  if (!result.success) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {result.error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
      </div>

      <OrdersClient initialData={result.orders} />
    </div>
  );
}

