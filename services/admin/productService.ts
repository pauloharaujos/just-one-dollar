import * as productRepository from '@/repository/productRepository';
import * as categoryRepository from '@/repository/categoryRepository';
import * as urlRewriteRepository from '@/repository/urlRewriteRepository';

export interface ProductFormData {
  name: string;
  sku: string;
  url: string;
  description: string;
  price: number;
  visible: boolean;
  categoryIds?: number[];
}

/**
 * List products with filters and pagination
 */
export async function listProducts(filters: {
  search?: string;
  visible?: boolean;
  categoryId?: number;
} = {}, pagination: {
  page?: number;
  limit?: number;
} = {}) {
  return productRepository.getAllProducts(filters, pagination);
}

/**
 * Get a single product by ID
 */
export async function getProduct(id: number) {
  return productRepository.getProductById(id);
}

/**
 * Create a new product
 */
export async function createProduct(data: ProductFormData) {
  // Validate SKU uniqueness
  const existingProduct = await productRepository.getAllProducts({
    search: data.sku,
  });

  if (existingProduct.products.length > 0) {
    throw new Error('A product with this SKU already exists');
  }

  // Validate URL uniqueness
  const existingUrl = await productRepository.getProductByUrlKey(data.url);
  if (existingUrl) {
    throw new Error('A product with this URL already exists');
  }

  // Validate price
  if (data.price <= 0) {
    throw new Error('Price must be greater than 0');
  }

  // Validate categories exist
  if (data.categoryIds && data.categoryIds.length > 0) {
    for (const categoryId of data.categoryIds) {
      const category = await categoryRepository.getCategoryById(categoryId);
      if (!category) {
        throw new Error(`Category with ID ${categoryId} not found`);
      }
    }
  }

  const product = await productRepository.createProduct({
    name: data.name,
    sku: data.sku,
    url: data.url,
    description: data.description,
    price: data.price,
    visible: data.visible,
  });

  // Assign product to categories if provided
  if (data.categoryIds && data.categoryIds.length > 0) {
    for (const categoryId of data.categoryIds) {
      await categoryRepository.assignProductToCategory(product.id, categoryId);
    }
  }

  // Create or update URL rewrite for the product
  try {
    await urlRewriteRepository.upsertCanonicalRewrite(
      `/${data.url}`,
      'PRODUCT',
      product.id,
      `/${data.url}`
    );
  } catch (error) {
    console.error('Error creating URL rewrite for product:', error);
    // Don't fail the product creation if URL rewrite fails
  }

  // Return product with categories
  return productRepository.getProductById(product.id);
}

/**
 * Update an existing product
 */
export async function updateProduct(id: number, data: Partial<ProductFormData>) {
  const existingProduct = await productRepository.getProductById(id);
  
  if (!existingProduct) {
    throw new Error('Product not found');
  }

  // Validate SKU uniqueness if changing
  if (data.sku && data.sku !== existingProduct.sku) {
    const existingWithSku = await productRepository.getAllProducts({
      search: data.sku,
    });
    
    if (existingWithSku.products.length > 0) {
      throw new Error('A product with this SKU already exists');
    }
  }

  // Validate URL uniqueness if changing
  if (data.url && data.url !== existingProduct.url) {
    const existingUrl = await productRepository.getProductByUrlKey(data.url);
    if (existingUrl) {
      throw new Error('A product with this URL already exists');
    }
  }

  // Validate price if changing
  if (data.price !== undefined && data.price <= 0) {
    throw new Error('Price must be greater than 0');
  }

  // Validate categories exist if changing
  if (data.categoryIds && data.categoryIds.length > 0) {
    for (const categoryId of data.categoryIds) {
      const category = await categoryRepository.getCategoryById(categoryId);
      if (!category) {
        throw new Error(`Category with ID ${categoryId} not found`);
      }
    }
  }

  const product = await productRepository.updateProduct(id, data);

  // Update URL rewrite if URL changed
  if (data.url) {
    try {
      await urlRewriteRepository.upsertCanonicalRewrite(
        `/${data.url}`,
        'PRODUCT',
        id,
        `/${data.url}`
      );
    } catch (error) {
      console.error('Error updating URL rewrite for product:', error);
    }
  }

  return product;
}

/**
 * Delete a product
 */
export async function deleteProduct(id: number) {
  const product = await productRepository.getProductById(id);
  
  if (!product) {
    throw new Error('Product not found');
  }

  // Check if product has any order items
  const hasOrderItems = await productRepository.hasOrderItems(id);
  if (hasOrderItems) {
    throw new Error('Cannot delete this product because it has been ordered by customers. To remove it from your storefront, edit the product and uncheck "Make this product visible on the storefront" instead.');
  }

  // Check if product has any quote items
  const hasQuoteItems = await productRepository.hasQuoteItems(id);
  if (hasQuoteItems) {
    throw new Error('Cannot delete this product because it is referenced in customer quotes. To remove it from your storefront, edit the product and uncheck "Make this product visible on the storefront" instead.');
  }

  return productRepository.deleteProduct(id);
}

/**
 * Generate a URL-friendly string from a product name
 */
export function generateProductUrl(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

