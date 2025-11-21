'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCategoryAction } from '@/app/admin/actions/categories/createCategory';

interface Category {
  id: number;
  name: string;
  parentId: number | null;
}

interface NewCategoryClientProps {
  categories: Category[];
}

export default function NewCategoryClient({ categories }: NewCategoryClientProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    parentId: '',
    visible: true,
  });
  const [error, setError] = useState('');

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      url: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const result = await createCategoryAction({
        name: formData.name,
        url: formData.url,
        description: formData.description || undefined,
        parentId: formData.parentId ? parseInt(formData.parentId) : undefined,
        visible: formData.visible,
      });

      if (result.success) {
        router.push('/admin/categories');
      } else {
        setError(result.error || 'Failed to create category');
        setSaving(false);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      setError('An error occurred while creating the category');
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          ← Back to Categories
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Create New Category</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-800">{error}</div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="bg-gray-50 -mx-6 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="block w-full rounded-lg border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 text-gray-900 placeholder:text-gray-400"
                    placeholder="Enter category name"
                  />
                </div>

                <div>
                  <label htmlFor="url" className="block text-sm font-semibold text-gray-900 mb-2">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="url"
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="block w-full rounded-lg border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 text-gray-900 placeholder:text-gray-400"
                    placeholder="category-url-slug"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    URL-friendly version of the name (e.g., mens-clothing)
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="block w-full rounded-lg border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 text-gray-900 placeholder:text-gray-400"
                    placeholder="Enter category description"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 -mx-6 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Hierarchy</h3>
              </div>

              <div>
                <label htmlFor="parentId" className="block text-sm font-semibold text-gray-900 mb-2">
                  Parent Category
                </label>
                <select
                  id="parentId"
                  value={formData.parentId}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                  className="block w-full rounded-lg border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 text-gray-900"
                >
                  <option value="">None (Root Category)</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-gray-600">
                  Leave empty to make this a root category
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 -mx-6 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Visibility</h3>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <input
                  id="visible"
                  type="checkbox"
                  checked={formData.visible}
                  onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="visible" className="ml-3 block text-sm font-medium text-gray-900">
                  Make this category visible on the storefront
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Creating Category...' : 'Create Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
