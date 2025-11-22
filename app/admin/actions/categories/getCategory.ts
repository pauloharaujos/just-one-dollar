'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { getCategory } from '@/services/admin/categoryService';
import type { Category } from '@/repository/categoryRepository';

/**
 * Server action to get a single category by ID
 */
export async function getCategoryAction(
  id: number
): Promise<{ 
  success: boolean;
  category?: Category;
  error?: string;
}> {
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
  } catch (error) {
    console.error('Error fetching category:', error);
    return {
      success: false,
      error: 'An error occurred while fetching category',
    };
  }
}

