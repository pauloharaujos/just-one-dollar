'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { updateCategory } from '@/services/admin/categoryService';
import { revalidatePath } from 'next/cache';
import type { CategoryFormData } from '@/services/admin/categoryService';
import type { Category } from '@/repository/categoryRepository';

/**
 * Server action to update a category
 */
export async function updateCategoryAction(
  id: number,
  data: Partial<CategoryFormData>
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

    const category = await updateCategory(id, data);

    revalidatePath('/admin/categories');
    revalidatePath(`/admin/categories/${id}/edit`);

    return { success: true, category };
  } catch (error) {
    console.error('Error updating category:', error);
    return {
      success: false,
      error: 'An error occurred while updating category',
    };
  }
}

