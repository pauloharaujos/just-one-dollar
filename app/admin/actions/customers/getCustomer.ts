'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { getCustomer } from '@/services/admin/customerService';

/**
 * Server action to get a single customer by ID
 */
export async function getCustomerAction(
  id: string
) {
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
  } catch (error) {
    console.error('Error fetching customer:', error);
    return {
      success: false,
      error: 'An error occurred while fetching customer',
    };
  }
}

