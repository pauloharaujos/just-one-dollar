'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { getCustomer } from '@/services/admin/customerService';

/**
 * Server action to get a single customer by ID
 */
export async function getCustomerAction(
  id: string
): Promise<{ success: boolean; customer?: any; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const customer = await getCustomer(id);

    if (!customer) {
      return { success: false, error: 'Customer not found' };
    }

    return { success: true, customer };
  } catch (error: any) {
    console.error('Error fetching customer:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while fetching customer',
    };
  }
}

