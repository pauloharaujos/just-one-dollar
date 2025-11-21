'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { updateOrderStatus } from '@/services/admin/orderService';
import { revalidatePath } from 'next/cache';
import type { OrderStatus } from '@/prisma/generated';

/**
 * Server action to update order status
 */
export async function updateOrderStatusAction(
  id: number,
  status: OrderStatus
): Promise<{ success: boolean; order?: any; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    if (!status) {
      return { success: false, error: 'Status is required' };
    }

    const order = await updateOrderStatus(id, status);

    revalidatePath('/admin/orders');
    revalidatePath(`/admin/orders/${id}`);

    return { success: true, order };
  } catch (error: any) {
    console.error('Error updating order status:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while updating order status',
    };
  }
}

