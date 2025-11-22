import * as categoryRepository from '@/repository/categoryRepository';
import * as urlRewriteRepository from '@/repository/urlRewriteRepository';

export interface CategoryFormData {
  name: string;
  url: string;
  description?: string;
  parentId?: number;
  visible: boolean;
}

/**
 * List all categories
 */
export async function listCategories() {
  return categoryRepository.getAllCategories();
}

/**
 * Get category tree
 */
export async function getCategoryTree() {
  return categoryRepository.getCategoryTree();
}

/**
 * Get a single category by ID
 */
export async function getCategory(id: number) {
  return categoryRepository.getCategoryById(id);
}

/**
 * Create a new category
 */
export async function createCategory(data: CategoryFormData) {
  // Validate URL uniqueness
  const existingUrl = await categoryRepository.getCategoryByUrl(data.url);
  if (existingUrl) {
    throw new Error('A category with this URL already exists');
  }

  // Validate parent exists if specified
  if (data.parentId) {
    const parent = await categoryRepository.getCategoryById(data.parentId);
    if (!parent) {
      throw new Error('Parent category not found');
    }
  }

  const category = await categoryRepository.createCategory(data);

  // Create or update URL rewrite for the category
  try {
    await urlRewriteRepository.upsertCanonicalRewrite(
      `/${data.url}`,
      'CATEGORY',
      category.id,
      `/${data.url}`
    );
  } catch (error) {
    console.error('Error creating URL rewrite for category:', error);
    // Don't fail the category creation if URL rewrite fails
  }

  return category;
}

/**
 * Update an existing category
 */
export async function updateCategory(id: number, data: Partial<CategoryFormData>) {
  const existingCategory = await categoryRepository.getCategoryById(id);
  
  if (!existingCategory) {
    throw new Error('Category not found');
  }

  // Validate URL uniqueness if changing
  if (data.url && data.url !== existingCategory.url) {
    const existingUrl = await categoryRepository.getCategoryByUrl(data.url);
    if (existingUrl) {
      throw new Error('A category with this URL already exists');
    }

    // Update or create URL rewrite
    try {
      await urlRewriteRepository.upsertCanonicalRewrite(
        `/${data.url}`,
        'CATEGORY',
        id,
        `/${data.url}`
      );
    } catch (error) {
      console.error('Error updating URL rewrite for category:', error);
    }
  }

  // Validate parent exists if specified
  if (data.parentId && data.parentId !== existingCategory.parentId) {
    // Prevent circular references - category cannot be its own parent
    if (data.parentId === id) {
      throw new Error('A category cannot be its own parent');
    }

    const parent = await categoryRepository.getCategoryById(data.parentId);
    if (!parent) {
      throw new Error('Parent category not found');
    }

    // Check for circular references in the hierarchy
    const parentAncestors = await checkCategoryAncestors(data.parentId);
    if (parentAncestors.includes(id)) {
      throw new Error('Cannot set parent as it would create a circular reference');
    }
  }

  return categoryRepository.updateCategory(id, data);
}

/**
 * Delete a category
 */
export async function deleteCategory(id: number) {
  const category = await categoryRepository.getCategoryById(id);
  
  if (!category) {
    throw new Error('Category not found');
  }

  // Prevent deletion if category has children
  const children = await categoryRepository.getCategoryChildren(id);
  if (children.length > 0) {
    throw new Error('Cannot delete category with children. Please delete or move children first');
  }

  return categoryRepository.deleteCategory(id);
}

/**
 * Helper: Check all ancestors of a category (prevent circular references)
 */
async function checkCategoryAncestors(categoryId: number): Promise<number[]> {
  const ancestors: number[] = [];
  let currentId = categoryId;

  while (currentId) {
    const category = await categoryRepository.getCategoryById(currentId);
    if (!category || !category.parentId) break;
    
    ancestors.push(category.parentId);
    currentId = category.parentId;

    // Prevent infinite loops
    if (ancestors.length > 100) break;
  }

  return ancestors;
}

/**
 * Generate a URL-friendly string from a category name
 */
export function generateCategoryUrl(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

