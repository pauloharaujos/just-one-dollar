'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { updateProduct } from '@/services/admin/productService';
import { revalidatePath } from 'next/cache';
import type { ProductFormData } from '@/services/admin/productService';

/**
 * Server action to update a product
 */
export async function updateProductAction(
  id: number,
  data: Partial<ProductFormData>
): Promise<{ success: boolean; product?: any; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const product = await updateProduct(id, data);

    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${id}/edit`);

    return { success: true, product };
  } catch (error: any) {
    console.error('Error updating product:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while updating product',
    };
  }
}

