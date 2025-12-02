import prisma from '@/prisma/prismaClient';
import type { Prisma } from '@/prisma/generated';

export async function getProductByUrlKey(productUrlKey: string) {
  return prisma.product.findUnique({
    where: { url: productUrlKey }
  });
}

export async function getProductById(id: number) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      productCategories: {
        include: {
          category: true,
        },
      },
    },
  });
}

export async function getRecommendedProducts(limit: number = 4) {
  return prisma.product.findMany({
    where: { visible: true },
    take: limit,
    orderBy: { id: 'asc' }
  });
}

export interface ProductFilters {
  search?: string;
  visible?: boolean;
  categoryId?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export type ProductListItem = Prisma.ProductGetPayload<{
  include: {
    productCategories: {
      include: {
        category: true;
      };
    };
  };
}>;

export interface ListProductsResult {
  products: ProductListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getAllProducts(
  filters: ProductFilters = {},
  pagination: PaginationParams = {}
): Promise<ListProductsResult> {
  const page = pagination.page || 1;
  const limit = pagination.limit || 20;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { sku: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  if (filters.visible !== undefined) {
    where.visible = filters.visible;
  }

  if (filters.categoryId) {
    where.productCategories = {
      some: {
        categoryId: filters.categoryId,
      },
    };
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { id: 'desc' },
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProductsCount(filters: ProductFilters = {}) {
  const where: any = {};

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { sku: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  if (filters.visible !== undefined) {
    where.visible = filters.visible;
  }

  return prisma.product.count({ where });
}

export async function createProduct(data: {
  name: string;
  sku: string;
  url: string;
  description: string;
  price: number;
  visible: boolean;
}) {
  return prisma.product.create({
    data: {
      name: data.name,
      sku: data.sku,
      url: data.url,
      description: data.description,
      price: data.price,
      visible: data.visible,
    },
  });
}

export async function updateProduct(id: number, data: {
  name?: string;
  sku?: string;
  url?: string;
  description?: string;
  price?: number;
  visible?: boolean;
  categoryIds?: number[];
}) {
  if (data.categoryIds !== undefined) {
    await prisma.productCategory.deleteMany({
      where: { productId: id },
    });

    if (data.categoryIds.length > 0) {
      await prisma.productCategory.createMany({
        data: data.categoryIds.map((categoryId) => ({
          productId: id,
          categoryId,
        })),
      });
    }
  }

  const productData: any = {};
  if (data.name) productData.name = data.name;
  if (data.sku) productData.sku = data.sku;
  if (data.url) productData.url = data.url;
  if (data.description) productData.description = data.description;
  if (data.price !== undefined) productData.price = data.price;
  if (data.visible !== undefined) productData.visible = data.visible;

  return prisma.product.update({
    where: { id },
    data: productData,
    include: {
      productCategories: {
        include: {
          category: true,
        },
      },
    },
  });
}

/**
 * Check if product has any order items
 */
export async function hasOrderItems(productId: number): Promise<boolean> {
  const count = await prisma.orderItem.count({
    where: { productId },
  });
  return count > 0;
}

/**
 * Check if product has any quote items
 */
export async function hasQuoteItems(productId: number): Promise<boolean> {
  const count = await prisma.quoteItem.count({
    where: { productId },
  });
  return count > 0;
}

export async function deleteProduct(id: number) {
  return prisma.product.delete({
    where: { id },
  });
}
