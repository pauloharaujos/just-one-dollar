'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useImagePreview } from '@/ui/components/admin/Products/useImagePreview';
import type { Category, ProductFormData } from '@/ui/components/admin/Products/types';
import ErrorAlert from '@/ui/components/admin/Products/ErrorAlert';
import FormSection from '@/ui/components/admin/Products/FormSection';
import BasicInformationForm from '@/ui/components/admin/Products/BasicInformationForm';
import CategorySelector from '@/ui/components/admin/Products/CategorySelector';
import VisibilityToggle from '@/ui/components/admin/Products/VisibilityToggle';
import ImageUpload from '@/ui/components/admin/Products/ImageUpload';
import FormActions from '@/ui/components/admin/Products/FormActions';

interface NewProductFormProps {
  categories: Category[];
}

export default function NewProductForm({ categories }: NewProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    sku: '',
    url: '',
    description: '',
    price: '',
    visible: true,
    categoryIds: [],
  });
  const [error, setError] = useState('');
  
  const { selectedImage, imagePreview, handleImageChange } = useImagePreview();

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
      const { createProductWithImageAction } = await import('@/app/admin/actions/products/createProduct');
      
      const result = await createProductWithImageAction(
        {
          name: formData.name,
          sku: formData.sku,
          url: formData.url,
          description: formData.description,
          price: parseFloat(formData.price),
          visible: formData.visible,
          categoryIds: formData.categoryIds,
        },
        selectedImage
      );

      if (!result.success) {
        setError(result.error || 'Failed to create product');
        setSaving(false);
        setUploadingImage(false);
        return;
      }

      // Success - redirect to products page
      router.push('/admin/products');
    } catch (error: unknown) {
      console.error('Error creating product:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while creating the product');
      setSaving(false);
      setUploadingImage(false);
    }
  };

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
            sku={formData.sku}
            onImageChange={handleImageChange}
          />
        </div>
      </div>
    </>
  );
}
