'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { listCategories } from '@/services/admin/categoryService';
import type { Category } from '@/ui/components/admin/Products/types';

/**
 * Server action to get categories for new product page
 */
export async function getCategoriesForNewProductAction(): Promise<{ success: boolean; categories?: Category[]; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const categories = await listCategories();

    return { success: true, categories };
  } catch (error: unknown) {
    console.error('Error fetching categories for new product:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching categories',
    };
  }
}
