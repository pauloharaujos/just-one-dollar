'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { getCategoryTree } from '@/services/admin/categoryService';

/**
 * Server action to get category tree
 */
export async function getCategoryTreeAction(): Promise<{ success: boolean; tree?: any[]; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const tree = await getCategoryTree();

    return { success: true, tree };
  } catch (error: any) {
    console.error('Error fetching category tree:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while fetching category tree',
    };
  }
}

