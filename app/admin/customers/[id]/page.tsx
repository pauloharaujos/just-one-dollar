import { getCustomerAction } from '@/app/admin/actions/customers/getCustomer';
import CustomerDetailClient from '@/ui/components/admin/Customers/CustomerDetailClient';

export default async function CustomerDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const result = await getCustomerAction(resolvedParams.id);

  if (!result.success) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {result.error}</div>
      </div>
    );
  }

  if (!result.customer) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Customer not found</div>
      </div>
    );
  }

  return <CustomerDetailClient customer={result.customer} />;
}

