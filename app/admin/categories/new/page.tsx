import { listCategoriesAction } from '@/app/admin/actions/categories/listCategories';
import NewCategoryClient from '@/ui/components/admin/Category/NewCategoryClient';

export default async function NewCategoryPage() {
  const result = await listCategoriesAction();
  
  if (!result.success) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {result.error}</div>
      </div>
    );
  }

  const categories = result.categories || [];

  return <NewCategoryClient categories={categories} />;
}

