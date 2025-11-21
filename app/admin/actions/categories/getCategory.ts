'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { getCategory } from '@/services/admin/categoryService';

/**
 * Server action to get a single category by ID
 */
export async function getCategoryAction(
  id: number
): Promise<{ success: boolean; category?: any; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const category = await getCategory(id);

    if (!category) {
      return { success: false, error: 'Category not found' };
    }

    return { success: true, category };
  } catch (error: any) {
    console.error('Error fetching category:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while fetching category',
    };
  }
}

