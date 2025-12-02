'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { getProduct } from '@/services/admin/productService';
import { listCategories } from '@/services/admin/categoryService';
import type { Category } from '@/ui/components/admin/Products/types';

export interface Product {
  id: number;
  name: string;
  sku: string;
  url: string;
  description: string;
  price: number;
  visible: boolean;
  productCategories: {
    category: {
      id: number;
      name: string;
    };
  }[];
}

export interface ProductEditData {
  product: Product;
  categories: Category[];
}

/**
 * Server action to get product and categories for edit page
 */
export async function getProductForEditAction(productId: number): Promise<{ 
  success: boolean; 
  data?: ProductEditData; 
  error?: string 
}> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const [productResult, categoriesResult] = await Promise.all([
      getProduct(productId),
      listCategories(),
    ]);

    if (!productResult) {
      return { success: false, error: 'Product not found' };
    }

    return { 
      success: true, 
      data: {
        product: productResult,
        categories: categoriesResult || []
      }
    };
  } catch (error: unknown) {
    console.error('Error fetching product for edit:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching product data',
    };
  }
}
