import { getProductForEditAction } from '@/app/admin/actions/products/edit/getProductForEdit';
import BackButton from '@/ui/components/admin/Products/BackButton';
import PageHeader from '@/ui/components/admin/Products/PageHeader';
import EditProductForm from '@/ui/components/admin/Products/EditProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);

  const result = await getProductForEditAction(productId);
  
  if (!result.success || !result.data) {
    return (
      <div>
        <PageHeader title="Edit Product">
          <BackButton />
        </PageHeader>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">
            Error loading product: {result.error || 'Product not found'}
          </p>
        </div>
      </div>
    );
  }

  const { product, categories } = result.data;

  return (
    <div>
      <PageHeader title="Edit Product">
        <BackButton />
      </PageHeader>

      <EditProductForm product={product} categories={categories} />
    </div>
  );
}

