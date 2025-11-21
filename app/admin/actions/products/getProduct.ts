'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { getProduct } from '@/services/admin/productService';

/**
 * Server action to get a single product by ID
 */
export async function getProductAction(
  id: number
): Promise<{ success: boolean; product?: any; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const product = await getProduct(id);

    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    return { success: true, product };
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while fetching product',
    };
  }
}

