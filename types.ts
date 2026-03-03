// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type?: string;
  created_at?: string;
  modified_at?: string;
}

// Select-dropdown metafield value shape from Cosmic API
export interface SelectDropdownValue {
  key: string;
  value: string;
}

// File metafield value shape
export interface CosmicFile {
  url: string;
  imgix_url: string;
}

// Product Category
export interface ProductCategory extends CosmicObject {
  metadata: {
    name: string;
    description?: string;
    category_image?: CosmicFile;
  };
}

// Inventory status type literals (exact values from content model)
export type InventoryStatusKey = 'in_stock' | 'low_stock' | 'out_of_stock';

// Product
export interface Product extends CosmicObject {
  metadata: {
    product_name: string;
    description?: string;
    price: number;
    compare_at_price?: number;
    product_image?: CosmicFile;
    gallery?: CosmicFile[];
    category?: ProductCategory | string;
    inventory_status: SelectDropdownValue;
    weight?: string;
  };
}

// Customer Review
export interface CustomerReview extends CosmicObject {
  metadata: {
    reviewer_name: string;
    rating: SelectDropdownValue;
    review_text: string;
    product?: Product | string;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guard helpers
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export function getRatingNumber(rating: unknown): number {
  const value = getMetafieldValue(rating);
  const num = parseInt(value, 10);
  return isNaN(num) ? 0 : num;
}

export function isProductCategory(obj: unknown): obj is ProductCategory {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'slug' in obj &&
    'metadata' in obj
  );
}

export function isProduct(obj: unknown): obj is Product {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'slug' in obj &&
    'metadata' in obj
  );
}