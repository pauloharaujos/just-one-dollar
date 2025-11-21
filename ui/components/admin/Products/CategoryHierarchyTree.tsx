'use client';

import CategoryTree from './CategoryTree';
import type { Category } from './types';

interface CategoryHierarchyTreeProps {
  categories: Category[];
  selectedIds: number[];
  onToggle: (id: number, checked: boolean) => void;
}

function buildCategoryTree(categories: Category[]): Category[] {
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
}

export default function CategoryHierarchyTree({
  categories,
  selectedIds,
  onToggle,
}: CategoryHierarchyTreeProps) {
  const tree = buildCategoryTree(categories);
  
  return (
    <div className="max-h-64 overflow-y-auto">
      <CategoryTree 
        categories={tree} 
        selectedIds={selectedIds}
        onToggle={onToggle}
      />
    </div>
  );
}

