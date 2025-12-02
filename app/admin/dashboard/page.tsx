import { getDashboardMetrics } from '@/services/admin/dashboardService';
import MetricsCard from '@/ui/components/admin/Dashboard/MetricsCard';
import RecentOrders from '@/ui/components/admin/Dashboard/RecentOrders';

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Total Orders"
          value={metrics.totalOrders.toString()}
          icon="📦"
        />
        <MetricsCard
          title="Total Revenue"
          value={`$${metrics.totalRevenue.toFixed(2)}`}
          icon="💰"
        />
        <MetricsCard
          title="Total Customers"
          value={metrics.totalCustomers.toString()}
          icon="👥"
        />
        <MetricsCard
          title="Total Products"
          value={metrics.totalProducts.toString()}
          icon="🛍️"
        />
      </div>

      <div className="mt-8">
        <RecentOrders orders={metrics.recentOrders} />
      </div>
    </div>
  );
}

