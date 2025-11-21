'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { getOrder } from '@/services/admin/orderService';
import type { OrderWithDetails } from '@/repository/orderRepository';

/**
 * Server action to get a single order by ID
 */
export async function getOrderAction(
  id: number
): Promise<{ 
  success: boolean;
  order?: OrderWithDetails;
  error?: string;
}> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const order = await getOrder(id);

    if (!order) {
      return { success: false, error: 'Order not found' };
    }

    return { success: true, order };
  } catch (error) {
    console.error('Error fetching order:', error);
    return {
      success: false,
      error: 'An error occurred while fetching order',
    };
  }
}

