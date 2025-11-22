'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCloudinaryPublicId } from '@/services/cloudinary/cloudinaryService';
import { useImagePreview } from '@/ui/components/admin/Products/useImagePreview';
import type { Category, ProductFormData } from '@/ui/components/admin/Products/types';
import type { Product } from '@/app/admin/actions/products/edit/getProductForEdit';
import ErrorAlert from '@/ui/components/admin/Products/ErrorAlert';
import FormSection from '@/ui/components/admin/Products/FormSection';
import BasicInformationForm from '@/ui/components/admin/Products/BasicInformationForm';
import CategorySelector from '@/ui/components/admin/Products/CategorySelector';
import VisibilityToggle from '@/ui/components/admin/Products/VisibilityToggle';
import ImageUpload from '@/ui/components/admin/Products/ImageUpload';
import FormActions from '@/ui/components/admin/Products/FormActions';

interface EditProductFormProps {
  product: Product;
  categories: Category[];
}

export default function EditProductForm({ product, categories }: EditProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const { selectedImage, imagePreview, handleImageChange } = useImagePreview();
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: product.name,
    sku: product.sku,
    url: product.url,
    description: product.description,
    price: product.price.toString(),
    visible: product.visible,
    categoryIds: product.productCategories
      ? product.productCategories.map((pc) => pc.category.id)
      : [],
  });

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      url: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
    });
  };

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        categoryIds: [...formData.categoryIds, categoryId],
      });
    } else {
      setFormData({
        ...formData,
        categoryIds: formData.categoryIds.filter((id) => id !== categoryId),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    setUploadingImage(!!selectedImage);

    try {
      const [
        { uploadProductImageAction },
        { updateProductAction }
      ] = await Promise.all([
        import('@/app/admin/actions/products/uploadImage'),
        import('@/app/admin/actions/products/updateProduct'),
      ]);

      if (selectedImage && formData.sku) {
        const formDataImage = new FormData();
        formDataImage.append('file', selectedImage);
        formDataImage.append('sku', formData.sku);

        const uploadResult = await uploadProductImageAction(formDataImage);
        if (!uploadResult.success) {
          setError(uploadResult.error || 'Failed to upload image');
          setSaving(false);
          setUploadingImage(false);
          return;
        }
        setUploadingImage(false);
      }

      const result = await updateProductAction(product.id, {
        name: formData.name,
        sku: formData.sku,
        url: formData.url,
        description: formData.description,
        price: parseFloat(formData.price),
        visible: formData.visible,
        categoryIds: formData.categoryIds,
      });

      if (!result.success) {
        setError(result.error || 'Failed to update product');
        setSaving(false);
        setUploadingImage(false);
        return;
      }

      router.push('/admin/products');
    } catch (error: unknown) {
      console.error('Error updating product:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while updating the product');
      setSaving(false);
      setUploadingImage(false);
    }
  };

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dsaqqraws';
  const publicId = product.sku ? getCloudinaryPublicId(product.sku) : null;
  const existingImageUrl = publicId
    ? `https://res.cloudinary.com/${cloudName}/image/upload/c_limit,w_1920/f_auto/q_auto/${publicId}`
    : null;

  return (
    <>
      <ErrorAlert message={error} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                <FormSection title="Basic Information">
                  <BasicInformationForm
                    name={formData.name}
                    sku={formData.sku}
                    url={formData.url}
                    description={formData.description}
                    price={formData.price}
                    onNameChange={handleNameChange}
                    onSkuChange={(sku) => setFormData({ ...formData, sku })}
                    onUrlChange={(url) => setFormData({ ...formData, url })}
                    onDescriptionChange={(description) => setFormData({ ...formData, description })}
                    onPriceChange={(price) => setFormData({ ...formData, price })}
                  />
                </FormSection>

                <FormSection title="Categories">
                  <CategorySelector
                    categories={categories}
                    selectedIds={formData.categoryIds}
                    onToggle={handleCategoryChange}
                  />
                </FormSection>

                <FormSection title="Visibility">
                  <VisibilityToggle
                    checked={formData.visible}
                    onChange={(visible) => setFormData({ ...formData, visible })}
                  />
                </FormSection>

                <FormActions
                  submitLabel="Save Changes"
                  submittingLabel="Saving Changes..."
                  isSubmitting={saving}
                  isUploading={uploadingImage}
                />
              </form>
            </div>
          </div>
        </div>

        <div>
          <ImageUpload
            selectedImage={selectedImage}
            imagePreview={imagePreview}
            existingImageUrl={existingImageUrl}
            productName={product.name}
            sku={product.sku}
            onImageChange={handleImageChange}
          />
        </div>
      </div>
    </>
  );
}
