import { getCategoriesForNewProductAction } from '@/app/admin/actions/products/new/getCategoriesForNewProduct';
import BackButton from '@/ui/components/admin/Products/BackButton';
import PageHeader from '@/ui/components/admin/Products/PageHeader';
import NewProductForm from '@/ui/components/admin/Products/NewProductForm';

export default async function NewProductPage() {
  const categoriesResult = await getCategoriesForNewProductAction();
  
  if (!categoriesResult.success) {
    return (
      <div>
        <PageHeader title="Create New Product">
          <BackButton />
        </PageHeader>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">
            Error loading categories: {categoriesResult.error}
          </p>
        </div>
      </div>
    );
  }

  const categories = categoriesResult.categories || [];

  return (
    <div>
      <PageHeader title="Create New Product">
        <BackButton />
      </PageHeader>

      <NewProductForm categories={categories} />
    </div>
  );
}

