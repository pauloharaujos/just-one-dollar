export interface Category {
  id: number;
  name: string;
  parentId: number | null;
  children?: Category[];
}

export interface ProductFormData {
  name: string;
  sku: string;
  url: string;
  description: string;
  price: string;
  visible: boolean;
  categoryIds: number[];
}

