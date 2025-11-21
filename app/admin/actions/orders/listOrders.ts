'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { listOrders } from '@/services/admin/orderService';
import type { OrderStatus } from '@/prisma/generated';
import type { OrderListItem } from '@/repository/orderRepository';

/**
 * Server action to list orders with filters and pagination
 */
export async function listOrdersAction(
  filters: {
    status?: OrderStatus;
    search?: string;
    userId?: string;
  } = {},
  pagination: {
    page?: number;
    limit?: number;
  } = {}
): Promise<{ 
  success: boolean;
  data?: {
    orders: OrderListItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: string;
}> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const result = await listOrders(filters, pagination);

    return { success: true, data: result };
  } catch (error) {
    console.error('Error listing orders:', error);
    return {
      success: false,
      error: 'An error occurred while fetching orders',
    };
  }
}

