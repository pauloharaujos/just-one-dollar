'use server';

import { Product } from '@/prisma/generated/client';
import { getSession } from '@/services/admin/auth/jwtService';
import { getProduct } from '@/services/admin/productService';

/**
 * Server action to get a single product by ID
 */
export async function getProductAction(
  id: number
): Promise<{ 
  success: boolean;
  product?: Product;
  error?: string;
}> {
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
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      success: false,
      error: 'An error occurred while fetching product',
    };
  }
}

