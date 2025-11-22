'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { updateProduct } from '@/services/admin/productService';
import { revalidatePath } from 'next/cache';

/**
 * Server action to toggle product visibility
 */
export async function toggleProductVisibilityAction(
  id: number,
  visible: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    await updateProduct(id, { visible });
    
    revalidatePath('/admin/products');
    
    return { success: true };
  } catch (error: unknown) {
    console.error('Error toggling product visibility:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An error occurred while updating product visibility' 
    };
  }
}
