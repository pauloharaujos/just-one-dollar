'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { listCategories } from '@/services/admin/categoryService';

/**
 * Server action to list all categories
 */
export async function listCategoriesAction(): Promise<{ success: boolean; categories?: any[]; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const categories = await listCategories();

    return { success: true, categories };
  } catch (error: any) {
    console.error('Error listing categories:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while fetching categories',
    };
  }
}

