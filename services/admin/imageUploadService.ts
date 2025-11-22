import { v2 as cloudinary } from 'cloudinary';

let isConfigured = false;

function configureCloudinary() {
  if (isConfigured) {
    return;
  }

  if (process.env.CLOUDINARY_URL) {
    cloudinary.config();
    isConfigured = true;
    return;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
    isConfigured = true;
  } else {
    console.error('Cloudinary configuration missing. Required variables:', {
      hasCloudName: !!cloudName,
      hasApiKey: !!apiKey,
      hasApiSecret: !!apiSecret,
      hasCloudinaryUrl: !!process.env.CLOUDINARY_URL,
    });
  }
}

// Validate Cloudinary configuration
function ensureCloudinaryConfigured() {
  configureCloudinary();
  
  const config = cloudinary.config();
  if (!config.cloud_name || !config.api_key || !config.api_secret) {
    throw new Error(
      'Cloudinary not configured. Please set CLOUDINARY_URL or CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, and NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variables.'
    );
  }
}

/**
 * Upload product image to Cloudinary
 * Images are stored with the pattern: {SKU}.png
 */
export async function uploadProductImage(
  file: File,
  sku: string
): Promise<{ url: string; publicId: string }> {
  ensureCloudinaryConfigured();
  const publicId = sku;

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

    const returnedPublicId = result.public_id;
    const skuOnly = returnedPublicId.replace(/^images\//, '');

    return {
      url: result.secure_url,
      publicId: skuOnly,
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
  ensureCloudinaryConfigured();
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

