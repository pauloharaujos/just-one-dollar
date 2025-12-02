export default function CloudinaryPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Cloudinary Integration</h1>
      
      <p className="text-lg text-gray-700 mb-8">
        The platform uses Cloudinary for image storage and delivery. Product images are automatically 
        uploaded to Cloudinary when created or edited in the admin panel, and the storefront uses optimized 
        Cloudinary images for fast, responsive product displays.
      </p>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Backend Image Upload</h2>
        
        <p className="text-gray-700 mb-4">
          When creating or editing products in the admin panel, images are automatically uploaded to Cloudinary 
          using a server action. The upload process is seamless and integrated into the product form workflow.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Flow</h3>
        <div className="bg-gray-50 p-6 rounded-lg mb-4">
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong>Admin Selects Image</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Image file selected in product form</li>
                <li>Client-side preview shown</li>
              </ul>
            </li>
            <li>
              <strong>Form Submission</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Product data and image file submitted</li>
                <li>Server action receives FormData</li>
              </ul>
            </li>
            <li>
              <strong>Image Upload</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Image uploaded to Cloudinary</li>
                <li>Stored in <code className="bg-gray-200 px-1 rounded">images/</code> folder</li>
                <li>Named as <code className="bg-gray-200 px-1 rounded">{`{SKU}.png`}</code></li>
              </ul>
            </li>
            <li>
              <strong>Product Creation/Update</strong>
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Product saved to database</li>
                <li>Image URL automatically available</li>
              </ul>
            </li>
          </ol>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Upload Service</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <pre>{`// services/admin/imageUploadService.ts
export async function uploadProductImage(
  file: File,
  sku: string
): Promise<{ url: string; publicId: string }> {
  ensureCloudinaryConfigured();
  
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        public_id: sku,
        folder: 'images',
        resource_type: 'image',
        format: 'png',
        overwrite: true,
      },
      (error, result) => {
        if (error) reject(error);
        else if (result) resolve(result);
      }
    ).end(buffer);
  });
  
  return {
    url: result.secure_url,
    publicId: sku,
  };
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Server Action</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <pre>{`// app/admin/actions/products/uploadImage.ts
export async function uploadProductImageAction(
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }
  
  const file = formData.get('file') as File;
  const sku = formData.get('sku') as string;
  
  const result = await uploadProductImage(file, sku);
  
  return {
    success: true,
    url: result.url,
    publicId: result.publicId,
  };
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Image Naming Convention</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li><strong>Folder</strong>: <code className="bg-gray-200 px-1 rounded">images/</code></li>
            <li><strong>Filename</strong>: <code className="bg-gray-200 px-1 rounded">{`{SKU}.png`}</code></li>
            <li><strong>Public ID</strong>: <code className="bg-gray-200 px-1 rounded">images/{`{SKU}`}</code></li>
            <li><strong>Overwrite</strong>: Existing images with same SKU are replaced</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Configuration</h3>
        <p className="text-gray-700 mb-2">
          Cloudinary can be configured using either:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>CLOUDINARY_URL</strong>: Complete connection string</li>
          <li><strong>Individual Variables</strong>: CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Storefront Image Display</h2>
        
        <p className="text-gray-700 mb-4">
          The storefront uses a reusable <code className="bg-gray-200 px-1 rounded">CloudinaryImage</code> component 
          that leverages <code className="bg-gray-200 px-1 rounded">next-cloudinary</code> for optimized image delivery.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">CloudinaryImage Component</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <pre>{`// ui/components/CloudinaryImage.tsx
'use client';

import { CldImage } from 'next-cloudinary';
import { getCloudinaryPublicId } from '@/services/cloudinary/cloudinaryService';

export default function CloudinaryImage({
  sku,
  alt,
  width,
  height,
  className
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={getCloudinaryPublicId(sku)}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Public ID Generation</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <pre>{`// services/cloudinary/cloudinaryService.ts
export function getCloudinaryPublicId(sku: string): string {
  return \`images/\${sku}\`;
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Usage Examples</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2"><strong>Product Page:</strong></p>
          <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm mb-4">{`<CloudinaryImage
  sku={product.sku}
  alt={product.name}
  width={800}
  height={600}
  className="w-full h-full object-contain"
/>`}</pre>

          <p className="text-gray-700 mb-2"><strong>Product Card:</strong></p>
          <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm mb-4">{`<CloudinaryImage
  sku={product.sku}
  alt={product.name}
  width={384}
  height={531}
  className="h-full w-full object-cover"
/>`}</pre>

          <p className="text-gray-700 mb-2"><strong>Cart Item:</strong></p>
          <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">{`<CloudinaryImage
  sku={item.product.sku}
  alt={item.product.name}
  width={100}
  height={100}
  className="rounded-lg"
/>`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Where Images Are Used</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Product Pages</strong>: Large product images</li>
          <li><strong>Category Pages</strong>: Product grid thumbnails</li>
          <li><strong>Homepage</strong>: Featured product cards</li>
          <li><strong>Shopping Cart</strong>: Cart item thumbnails</li>
          <li><strong>Order History</strong>: Order item images</li>
          <li><strong>Order Details</strong>: Product images in order view</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Image Optimization</h2>
        
        <p className="text-gray-700 mb-4">
          Cloudinary and <code className="bg-gray-200 px-1 rounded">next-cloudinary</code> provide automatic 
          image optimization:
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Automatic Format Selection</strong>: WebP, AVIF when supported</li>
          <li><strong>Responsive Images</strong>: Different sizes for different viewports</li>
          <li><strong>Lazy Loading</strong>: Images load as needed</li>
          <li><strong>CDN Delivery</strong>: Fast global image delivery</li>
          <li><strong>Quality Optimization</strong>: Automatic quality adjustment</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Next.js Image Optimization</h3>
        <p className="text-gray-700 mb-2">
          The <code className="bg-gray-200 px-1 rounded">CldImage</code> component integrates with Next.js Image 
          optimization, providing:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li>Automatic image sizing</li>
          <li>Blur placeholder support</li>
          <li>Priority loading for above-the-fold images</li>
          <li>Built-in lazy loading</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Configuration</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Environment Variables</h3>
        <div className="bg-gray-50 p-6 rounded-lg">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">{`# Option 1: Complete connection string
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# Option 2: Individual variables
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Next.js Configuration</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-2">
            Cloudinary domain must be added to Next.js image domains:
          </p>
          <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">{`// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    },
  ],
}`}</pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Image Management</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Deleting Images</h3>
        <p className="text-gray-700 mb-4">
          Images can be deleted from Cloudinary when products are removed:
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <pre>{`// services/admin/imageUploadService.ts
export async function deleteProductImage(sku: string): Promise<void> {
  ensureCloudinaryConfigured();
  const publicId = \`images/\${sku}\`;
  
  await cloudinary.uploader.destroy(publicId);
}`}</pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-6">Image URL Generation</h3>
        <p className="text-gray-700 mb-4">
          Direct image URLs can be generated for metadata and other uses:
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <pre>{`// services/admin/imageUploadService.ts
export function getProductImageUrl(sku: string): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return \`https://res.cloudinary.com/\${cloudName}/image/upload/images/\${sku}.png\`;
}`}</pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits</h2>
        
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
          <li><strong>Automatic Optimization</strong>: Images optimized for web delivery</li>
          <li><strong>CDN Performance</strong>: Fast global image delivery</li>
          <li><strong>Storage Management</strong>: No need to manage image storage infrastructure</li>
          <li><strong>Transformations</strong>: On-the-fly image transformations available</li>
          <li><strong>Scalability</strong>: Handles high traffic and large image catalogs</li>
          <li><strong>Cost Effective</strong>: Pay only for storage and bandwidth used</li>
        </ul>
      </section>
    </div>
  );
}


