'use client';

import type { Category } from './types';

interface CategoryTreeProps {
  categories: Category[];
  selectedIds: number[];
  onToggle: (id: number, checked: boolean) => void;
  level?: number;
}

export default function CategoryTree({ 
  categories, 
  selectedIds, 
  onToggle, 
  level = 0 
}: CategoryTreeProps) {
  return (
    <div className={`${level > 0 ? 'ml-6 border-l-2 border-gray-200' : ''}`}>
      {categories.map((category) => (
        <div key={category.id} className={level === 0 ? 'mt-2' : 'mt-2 ml-4'}>
          <label
            className={`flex items-center p-2 rounded-lg border-2 transition-colors cursor-pointer ${
              selectedIds.includes(category.id)
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(category.id)}
              onChange={(e) => onToggle(category.id, e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm font-medium text-gray-900">{category.name}</span>
          </label>
          {category.children && category.children.length > 0 && (
            <CategoryTree 
              categories={category.children} 
              selectedIds={selectedIds}
              onToggle={onToggle}
              level={level + 1} 
            />
          )}
        </div>
      ))}
    </div>
  );
}

