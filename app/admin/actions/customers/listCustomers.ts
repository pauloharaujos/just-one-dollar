'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { listCustomers } from '@/services/admin/customerService';
import type { CustomerWithCounts } from '@/repository/customerRepository';

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
): Promise<{ 
  success: boolean;
  data?: {
    customers: CustomerWithCounts[];
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

    const result = await listCustomers(filters, pagination);

    return { success: true, data: result };
  } catch (error) {
    console.error('Error listing customers:', error);
    return {
      success: false,
      error: 'An error occurred while fetching customers',
    };
  }
}

