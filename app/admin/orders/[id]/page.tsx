import { getOrderAction } from '@/app/admin/actions/orders/getOrder';
import OrderDetailClient from '@/ui/components/admin/Orders/OrderDetailClient';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const orderId = parseInt(resolvedParams.id);

  const result = await getOrderAction(orderId);

  if (!result.success) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {result.error}</div>
      </div>
    );
  }

  if (!result.order) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Order not found</div>
      </div>
    );
  }

  return <OrderDetailClient order={result.order} />;
}

