import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

/**
 * Upload product image to Cloudinary
 * Images are stored with the pattern: {SKU}.png
 */
export async function uploadProductImage(
  file: File,
  sku: string
): Promise<{ url: string; publicId: string }> {
  const publicId = `images/${sku}`;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          public_id: publicId,
          folder: 'images',
          resource_type: 'image',
          format: 'png',
          overwrite: true,
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error('Upload failed - no result'));
        }
      ).end(buffer);
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Delete product image from Cloudinary
 */
export async function deleteProductImage(sku: string): Promise<void> {
  const publicId = `images/${sku}`;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Failed to delete image');
  }
}

/**
 * Get Cloudinary URL for a product image
 */
export function getProductImageUrl(sku: string): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    throw new Error('Cloudinary not configured');
  }
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/images/${sku}.png`;
}

