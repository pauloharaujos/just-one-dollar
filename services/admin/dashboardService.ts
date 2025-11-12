import { getOrdersCount, getAllOrders } from '@/repository/orderRepository';
import { getCustomersCount } from '@/repository/customerRepository';
import { getProductsCount, getRecommendedProducts } from '@/repository/productRepository';
import { Prisma, Product } from '@/prisma/generated';

type OrderFromGetAllOrders = Prisma.OrderGetPayload<{
  include: {
    user: true;
    billingAddress: true;
    shippingAddress: true;
    orderItems: {
      include: {
        product: true;
      };
    };
  };
}>;

export interface DashboardMetrics {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  recentOrders: OrderFromGetAllOrders[];
  topProducts: Product[];
}

/**
 * Get dashboard metrics
 */
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const [orders, customers, products] = await Promise.all([
    getOrdersCount(),
    getCustomersCount(),
    getProductsCount(),
  ]);

  const pendingOrders = await getOrdersCount({ status: 'PENDING' });

  const completedOrdersData = await getAllOrders(
    { status: 'COMPLETED' },
    { page: 1, limit: 1000 }
  );
  const totalRevenue = completedOrdersData.orders.reduce((sum, order) => sum + order.total, 0);

  const recentOrdersData = await getAllOrders({}, { page: 1, limit: 10 });

  const topProductsData = await getRecommendedProducts(10);

  return {
    totalOrders: orders,
    totalRevenue,
    totalCustomers: customers,
    totalProducts: products,
    pendingOrders,
    recentOrders: recentOrdersData.orders,
    topProducts: topProductsData,
  };
}

/**
 * Get recent orders
 */
export async function getRecentOrders(limit: number = 10): Promise<OrderFromGetAllOrders[]> {
  const result = await getAllOrders({}, { page: 1, limit });
  return result.orders;
}

/**
 * Get top products
 */
export async function getTopProducts(limit: number = 10): Promise<Product[]> {
  return getRecommendedProducts(limit);
}

