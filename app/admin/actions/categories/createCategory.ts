'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { createCategory } from '@/services/admin/categoryService';
import { revalidatePath } from 'next/cache';
import type { CategoryFormData } from '@/services/admin/categoryService';
import type { Category } from '@/repository/categoryRepository';

/**
 * Server action to create a new category
 */
export async function createCategoryAction(
  data: CategoryFormData
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

    const category = await createCategory(data);

    revalidatePath('/admin/categories');

    return { success: true, category };
  } catch (error) {
    console.error('Error creating category:', error);
    return {
      success: false,
      error: 'An error occurred while creating category',
    };
  }
}

