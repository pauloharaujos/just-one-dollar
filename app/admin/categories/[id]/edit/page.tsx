import { getCategoryAction } from '@/app/admin/actions/categories/getCategory';
import { listCategoriesAction } from '@/app/admin/actions/categories/listCategories';
import EditCategoryClient from '@/ui/components/admin/Category/EditCategoryClient';
import { Category } from '@/repository/categoryRepository';

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const categoryId = parseInt(resolvedParams.id);

  const [categoryResult, categoriesResult] = await Promise.all([
    getCategoryAction(categoryId),
    listCategoriesAction(),
  ]);

  if (!categoryResult.success) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {categoryResult.error}</div>
      </div>
    );
  }

  if (!categoriesResult.success) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {categoriesResult.error}</div>
      </div>
    );
  }

  if (!categoryResult.category) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Category not found</div>
      </div>
    );
  }

  // Filter out current category and its children to prevent circular references
  const availableCategories = (categoriesResult.categories || []).filter(
    (c: Category) => c.id !== categoryId
  );

  return (
    <EditCategoryClient 
      category={categoryResult.category} 
      categories={availableCategories}
      categoryId={categoryId}
    />
  );
}

