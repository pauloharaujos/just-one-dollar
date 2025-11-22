'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { listCategories } from '@/services/admin/categoryService';

/**
 * Server action to list all categories
 */
export async function listCategoriesAction() {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const categories = await listCategories();

    return { success: true, categories };
  } catch (error) {
    console.error('Error listing categories:', error);
    return {
      success: false,
      error: 'An error occurred while fetching categories',
    };
  }
}

