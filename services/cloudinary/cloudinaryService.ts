/**
 * Get Cloudinary public ID for a product image based on SKU
 * Images are stored in the 'images/' folder in Cloudinary
 * Returns the full path including folder so CldImage can find it
 */
export function getCloudinaryPublicId(sku: string): string {
  return `images/${sku}`;
}

