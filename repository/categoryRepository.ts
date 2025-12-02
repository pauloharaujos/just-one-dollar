import prisma from '@/prisma/prismaClient';

export interface Category {
  id: number;
  name: string;
  url: string;
  description: string | null;
  parentId: number | null;
  parent?: Category | null;
  children?: Category[];
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
  productCategories?: any[];
}

/**
 * Get category by ID
 */
export async function getCategoryById(id: number): Promise<Category | null> {
  return prisma.category.findUnique({
    where: { id },
    include: {
      parent: true,
      children: {
        where: { visible: true },
        orderBy: { name: 'asc' },
      },
    },
  });
}

/**
 * Get category by URL
 */
export async function getCategoryByUrl(url: string): Promise<Category | null> {
  return prisma.category.findUnique({
    where: { url },
    include: {
      parent: true,
      children: {
        where: { visible: true },
        orderBy: { name: 'asc' },
      },
    },
  });
}

/**
 * Get all visible categories for sitemap generation
 */
export async function getAllVisibleCategories(): Promise<Category[]> {
  return prisma.category.findMany({
    where: { visible: true },
    include: {
      parent: true,
    },
    orderBy: { name: 'asc' },
  });
}

/**
 * Get root categories (no parent)
 */
export async function getRootCategories(): Promise<Category[]> {
  return prisma.category.findMany({
    where: {
      parentId: null,
      visible: true,
    },
    include: {
      children: {
        where: { visible: true },
        orderBy: { name: 'asc' },
      },
    },
    orderBy: { name: 'asc' },
  });
}

/**
 * Get category children
 */
export async function getCategoryChildren(parentId: number): Promise<Category[]> {
  return prisma.category.findMany({
    where: {
      parentId,
      visible: true,
    },
    include: {
      children: {
        where: { visible: true },
        orderBy: { name: 'asc' },
      },
    },
    orderBy: { name: 'asc' },
  });
}

/**
 * Get main categories for navigation menu (root categories with visible children)
 */
export async function getMainCategoriesForMenu(): Promise<Category[]> {
  return prisma.category.findMany({
    where: {
      parentId: null,
      visible: true,
    },
    include: {
      children: {
        where: { visible: true },
        orderBy: { name: 'asc' },
      },
    },
    orderBy: { name: 'asc' },
  });
}

/**
 * Get category breadcrumb path
 */
export async function getCategoryBreadcrumb(categoryId: number): Promise<Category[]> {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      parent: true,
    },
  });

  if (!category) return [];

  const breadcrumb: Category[] = [];
  let current: Category | null = category;

  while (current) {
    breadcrumb.unshift(current);
    if (current.parent) {
      const parentCategory: Category | null = await prisma.category.findUnique({
        where: { id: current.parent.id },
        include: { parent: true },
      });
      current = parentCategory;
    } else {
      current = null;
    }
  }

  return breadcrumb;
}

/**
 * Assign a product to a category
 */
export async function assignProductToCategory(productId: number, categoryId: number): Promise<void> {
  await prisma.productCategory.upsert({
    where: {
      productId_categoryId: {
        productId,
        categoryId,
      },
    },
    update: {
      updatedAt: new Date(),
    },
    create: {
      productId,
      categoryId,
    },
  });
}

/**
 * Remove a product from a category
 */
export async function removeProductFromCategory(productId: number, categoryId: number): Promise<void> {
  await prisma.productCategory.delete({
    where: {
      productId_categoryId: {
        productId,
        categoryId,
      },
    },
  });
}

/**
 * Get all products in a category
 */
export async function getProductsByCategory(categoryId: number): Promise<any[]> {
  return prisma.product.findMany({
    where: {
      visible: true,
      productCategories: {
        some: {
          categoryId,
        },
      },
    },
    orderBy: { name: 'asc' },
  });
}

/**
 * Get all categories for a product
 */
export async function getCategoriesByProduct(productId: number): Promise<Category[]> {
  return prisma.category.findMany({
    where: {
      visible: true,
      productCategories: {
        some: {
          productId,
        },
      },
    },
    include: {
      parent: true,
    },
    orderBy: { name: 'asc' },
  });
}

/**
 * Get all categories
 */
export async function getAllCategories() {
  return prisma.category.findMany({
    include: {
      parent: true,
      children: {
        include: {
          _count: {
            select: {
              productCategories: true,
            },
          },
        },
      },
      _count: {
        select: {
          productCategories: true,
        },
      },
    },
    orderBy: [
      { parentId: 'asc' },
      { name: 'asc' },
    ],
  });
}

/**
 * Get category tree (hierarchical structure)
 */
export async function getCategoryTree() {
  const categories = await prisma.category.findMany({
    orderBy: [
      { parentId: 'asc' },
      { name: 'asc' },
    ],
  });

  const tree: any[] = [];
  const map: Record<number, any> = {};

  categories.forEach((cat: any) => {
    map[cat.id] = { ...cat, children: [] };
  });

  categories.forEach((cat: any) => {
    if (cat.parentId) {
      if (map[cat.parentId]) {
        map[cat.parentId].children.push(map[cat.id]);
      }
    } else {
      tree.push(map[cat.id]);
    }
  });

  return tree;
}

/**
 * Create a new category
 */
export async function createCategory(data: {
  name: string;
  url: string;
  description?: string;
  parentId?: number;
  visible: boolean;
}) {
  return prisma.category.create({
    data,
  });
}

/**
 * Update a category
 */
export async function updateCategory(id: number, data: {
  name?: string;
  url?: string;
  description?: string;
  parentId?: number;
  visible?: boolean;
}) {
  return prisma.category.update({
    where: { id },
    data,
  });
}

/**
 * Delete a category
 */
export async function deleteCategory(id: number) {
  return prisma.category.delete({
    where: { id },
  });
}
