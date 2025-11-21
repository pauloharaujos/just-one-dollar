'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  url: string;
  description: string | null;
  parentId: number | null;
  visible: boolean;
  createdAt: Date;
  _count: {
    productCategories: number;
  };
  parent: {
    name: string;
  } | null;
  children: Category[];
}

interface CategoriesClientProps {
  initialCategories: Category[];
  deleteAction: (id: number) => Promise<{ success: boolean; error?: string }>;
}

export default function CategoriesClient({ initialCategories, deleteAction }: CategoriesClientProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [viewMode, setViewMode] = useState<'flat' | 'tree'>('flat');

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const result = await deleteAction(id);
      
      if (result.success) {
        setCategories(categories.filter((c) => c.id !== id));
      } else {
        alert(result.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('An error occurred while deleting the category');
    }
  };

  const buildCategoryTree = (categories: Category[]): Category[] => {
    const categoryMap = new Map<number, Category>();
    const rootCategories: Category[] = [];

    categories.forEach((category) => {
      categoryMap.set(category.id, { ...category, children: [] });
    });

    categories.forEach((category) => {
      const node = categoryMap.get(category.id)!;
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          parent.children!.push(node);
        }
      } else {
        rootCategories.push(node);
      }
    });

    return rootCategories;
  };

  const CategoryTreeView = ({
    categories,
    onDelete,
  }: {
    categories: Category[];
    onDelete: (id: number) => void;
  }) => {
    const tree = buildCategoryTree(categories);

    const CategoryNode = ({ category, level = 0 }: { category: Category; level?: number }) => {
      const hasChildren = category.children && category.children.length > 0;

      return (
        <div className={`${level > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}>
          <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="text-sm font-medium text-gray-900 flex items-center">
                {hasChildren && <span className="mr-2">📁</span>}
                {category.name}
                {category.description && (
                  <span className="ml-2 text-sm text-gray-500">- {category.description}</span>
                )}
              </div>
              <span className="text-xs text-gray-500">
                ({category._count.productCategories} products)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  category.visible
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {category.visible ? 'Visible' : 'Hidden'}
              </span>
              <Link
                href={`/admin/categories/${category.id}/edit`}
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(category.id)}
                className="text-red-600 hover:text-red-900 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
          {hasChildren && (
            <div className="mt-2">
              {category.children!.map((child) => (
                <CategoryNode key={child.id} category={child} level={level + 1} />
              ))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="p-6 space-y-2">
        {tree.map((rootCategory) => (
          <CategoryNode key={rootCategory.id} category={rootCategory} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <div className="flex gap-2 rounded-md bg-gray-100 p-1">
          <button
            onClick={() => setViewMode('flat')}
            className={`px-3 py-1 text-sm font-medium rounded ${
              viewMode === 'flat' ? 'bg-white text-gray-900 shadow' : 'text-gray-600'
            }`}
          >
            Flat View
          </button>
          <button
            onClick={() => setViewMode('tree')}
            className={`px-3 py-1 text-sm font-medium rounded ${
              viewMode === 'tree' ? 'bg-white text-gray-900 shadow' : 'text-gray-600'
            }`}
          >
            Tree View
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {categories.length > 0 ? (
          viewMode === 'flat' ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      {category.description && (
                        <div className="text-sm text-gray-500">{category.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.url}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.parent?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {category._count.productCategories}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          category.visible
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {category.visible ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <CategoryTreeView
              categories={categories}
              onDelete={handleDelete}
            />
          )
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">No categories found</p>
            <Link
              href="/admin/categories/new"
              className="mt-4 inline-block text-indigo-600 hover:text-indigo-900"
            >
              Create your first category
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
