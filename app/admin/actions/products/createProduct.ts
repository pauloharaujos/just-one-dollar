'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { createProduct } from '@/services/admin/productService';
import { revalidatePath } from 'next/cache';
import { uploadProductImageAction } from './uploadImage';

export interface CreateProductData {
  name: string;
  sku: string;
  url: string;
  description: string;
  price: number;
  visible: boolean;
  categoryIds: number[];
}

/**
 * Server action to create a new product
 */
export async function createProductAction(
  data: CreateProductData
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    await createProduct({
      name: data.name,
      sku: data.sku,
      url: data.url,
      description: data.description,
      price: data.price,
      visible: data.visible,
      categoryIds: data.categoryIds,
    });

    revalidatePath('/admin/products');
    
    return { success: true };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      error: 'An error occurred while creating product',
    };
  }
}

/**
 * Server action to create a product with image upload
 * This combines both operations for convenience
 */
export async function createProductWithImageAction(
  productData: CreateProductData,
  imageFile: File | null
): Promise<{ 
  success: boolean;
  error?: string;
}> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    if (imageFile && productData.sku) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('sku', productData.sku);

      const uploadResult = await uploadProductImageAction(formData);
      if (!uploadResult.success) {
        return { success: false, error: uploadResult.error || 'Failed to upload image' };
      }
    }

    const result = await createProductAction(productData);
    
    if (!result.success) {
      return result;
    }

    revalidatePath('/admin/products');
    
    return { success: true };
  } catch (error) {
    console.error('Error creating product with image:', error);
    return {
      success: false,
      error: 'An error occurred while creating product',
    };
  }
}

