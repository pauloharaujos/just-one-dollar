'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { getCategoryTree } from '@/services/admin/categoryService';
import type { Category } from '@/repository/categoryRepository';

/**
 * Server action to get category tree
 */
export async function getCategoryTreeAction(): Promise<{ 
  success: boolean;
  tree?: Category[];
  error?: string;
}> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const tree = await getCategoryTree();

    return { success: true, tree };
  } catch (error) {
    console.error('Error fetching category tree:', error);
    return {
      success: false,
      error: 'An error occurred while fetching category tree',
    };
  }
}

