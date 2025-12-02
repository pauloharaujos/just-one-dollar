import Link from 'next/link';
import { listCategoriesAction } from '@/app/admin/actions/categories/listCategories';
import { deleteCategoryAction } from '@/app/admin/actions/categories/deleteCategory';
import CategoriesClient from '@/ui/components/admin/Category/CategoriesClient';

export default async function CategoriesPage() {
  const result = await listCategoriesAction();
  
  if (!result.success) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {result.error}</div>
      </div>
    );
  }

  const categories = result.categories || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <Link
          href="/admin/categories/new"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          Add Category
        </Link>
      </div>

      <CategoriesClient 
        initialCategories={categories} 
        deleteAction={deleteCategoryAction}
      />
    </div>
  );
}

