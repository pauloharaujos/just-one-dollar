'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { listOrders } from '@/services/admin/orderService';
import type { OrderStatus } from '@/prisma/generated';

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
): Promise<{ success: boolean; orders?: any; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const result = await listOrders(filters, pagination);

    return { success: true, orders: result };
  } catch (error: any) {
    console.error('Error listing orders:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while fetching orders',
    };
  }
}

