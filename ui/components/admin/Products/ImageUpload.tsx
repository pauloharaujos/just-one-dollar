'use client';

import Image from 'next/image';

interface ImageUploadProps {
  selectedImage: File | null;
  imagePreview: string | null;
  sku: string;
  onImageChange: (file: File | null) => void;
  existingImageUrl?: string | null;
  productName?: string;
  uploadButtonText?: string;
  noteText?: string;
}

export default function ImageUpload({
  selectedImage,
  imagePreview,
  sku,
  onImageChange,
  existingImageUrl = null,
  productName = 'Product',
  uploadButtonText,
  noteText,
}: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onImageChange(file);
  };

  const isEditMode = existingImageUrl !== null && existingImageUrl !== undefined;
  const defaultButtonText = isEditMode ? 'Choose new image' : 'Choose an image';
  const defaultNoteText = isEditMode
    ? `Uploading a new image will replace the existing ${sku}.png file`
    : `Image will be uploaded as ${sku || 'SKU'}.png`;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-6 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Product Image</h3>
        <div className="space-y-5">
          {!imagePreview && existingImageUrl && (
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-4">Current Image:</p>
              <div className="relative aspect-square w-full border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={existingImageUrl}
                  alt={productName}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.no-image')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'no-image flex items-center justify-center h-full text-gray-400';
                      placeholder.innerHTML = `
                        <div class="text-center">
                          <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p class="mt-2 text-sm">No image available</p>
                        </div>
                      `;
                      parent.appendChild(placeholder);
                    }
                  }}
                />
              </div>
            </div>
          )}

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="mt-4">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  <span>{uploadButtonText || defaultButtonText}</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {imagePreview && (
            <div className="relative aspect-square w-full border-2 border-gray-200 rounded-lg overflow-hidden">
              <Image
                src={imagePreview}
                alt={isEditMode ? 'New image preview' : 'Product preview'}
                fill
                className="object-contain"
              />
            </div>
          )}

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <p className="text-sm text-indigo-900">
              <strong>Note:</strong> {noteText || defaultNoteText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

