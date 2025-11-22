'use client';

import CategoryHierarchyTree from './CategoryHierarchyTree';
import type { Category } from './types';

interface CategorySelectorProps {
  categories: Category[];
  selectedIds: number[];
  onToggle: (id: number, checked: boolean) => void;
}

export default function CategorySelector({
  categories,
  selectedIds,
  onToggle,
}: CategorySelectorProps) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
      {categories.length > 0 ? (
        <CategoryHierarchyTree
          categories={categories}
          selectedIds={selectedIds}
          onToggle={onToggle}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500 mb-4">
            No categories available
          </p>
          <a
            href="/admin/categories/new"
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-indigo-600 hover:text-indigo-900"
          >
            Create a category first
          </a>
        </div>
      )}
    </div>
  );
}

