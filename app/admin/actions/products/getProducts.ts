'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { listProducts } from '@/services/admin/productService';
import type { ListProductsResult } from '@/repository/productRepository';

export type ProductsResponse = ListProductsResult;

/**
 * Server action to get products with pagination and search
 */
export async function getProducts(
  page: number = 1,
  limit: number = 20,
  search?: string
) {
  try {
    const session = await getSession();
    
    if (!session) {
      return { error: 'Unauthorized' };
    }

    const result = await listProducts(
      { search },
      { page, limit }
    );

    return result;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { error: 'An error occurred while fetching products' };
  }
}

