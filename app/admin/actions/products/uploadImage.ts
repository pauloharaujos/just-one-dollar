'use server';

import { getSession } from '@/services/admin/auth/jwtService';
import { uploadProductImage } from '@/services/admin/imageUploadService';

/**
 * Server action to upload a product image
 */
export async function uploadProductImageAction(
  formData: FormData
): Promise<{ 
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}> {
  try {
    const session = await getSession();
    
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    const file = formData.get('file') as File;
    const sku = formData.get('sku') as string;

    if (!file || !sku) {
      return { success: false, error: 'File and SKU are required' };
    }

    const result = await uploadProductImage(file, sku);

    return {
      success: true,
      url: result.url,
      publicId: result.publicId,
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Cloudinary not configured')) {
        return {
          success: false,
          error: 'Cloudinary is not configured. Please check your environment variables.',
        };
      }
      if (error.message.includes('Must supply api_key')) {
        return {
          success: false,
          error: 'Cloudinary API key is missing. Please configure CLOUDINARY_API_KEY or CLOUDINARY_URL.',
        };
      }
      return {
        success: false,
        error: error.message || 'An error occurred while uploading image',
      };
    }
    
    return {
      success: false,
      error: 'An error occurred while uploading image',
    };
  }
}

