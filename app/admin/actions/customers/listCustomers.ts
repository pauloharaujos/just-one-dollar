'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { listCustomers } from '@/services/admin/customerService';

/**
 * Server action to list customers with filters and pagination
 */
export async function listCustomersAction(
  filters: {
    search?: string;
  } = {},
  pagination: {
    page?: number;
    limit?: number;
  } = {}
): Promise<{ success: boolean; customers?: any; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const result = await listCustomers(filters, pagination);

    return { success: true, customers: result };
  } catch (error: any) {
    console.error('Error listing customers:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while fetching customers',
    };
  }
}

