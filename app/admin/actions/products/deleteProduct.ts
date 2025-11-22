'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { deleteProduct as deleteProductService } from '@/services/admin/productService';
import { revalidatePath } from 'next/cache';

/**
 * Server action to delete a product
 */
export async function deleteProduct(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    await deleteProductService(id);
    
    revalidatePath('/admin/products');
    
    return { success: true };
  } catch (error: unknown) {
    console.error('Error deleting product:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An error occurred while deleting product' 
    };
  }
}

