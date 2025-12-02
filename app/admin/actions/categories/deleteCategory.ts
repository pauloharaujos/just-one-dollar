'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { deleteCategory } from '@/services/admin/categoryService';
import { revalidatePath } from 'next/cache';

/**
 * Server action to delete a category
 */
export async function deleteCategoryAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    await deleteCategory(id);

    revalidatePath('/admin/categories');

    return { success: true };
  } catch (error) {
    console.error('Error deleting category:', error);
    return {
      success: false,
      error: 'An error occurred while deleting category',
    };
  }
}

