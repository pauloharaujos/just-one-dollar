'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { listProducts } from '@/services/admin/productService';

export interface ProductsResponse {
  products: {
    id: number;
    name: string;
    sku: string;
    price: number;
    visible: boolean;
    createdAt: Date;
    productCategories: {
      category: {
        name: string;
      };
    }[];
  }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Server action to get products with pagination and search
 */
export async function getProducts(
  page: number = 1,
  limit: number = 20,
  search?: string
): Promise<ProductsResponse | { error: string }> {
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

