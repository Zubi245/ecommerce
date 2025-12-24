import axios from 'axios';
import { Product } from '../types';

const API_BASE = '/api';

// Products API
export const productsApi = {
  // Get all enabled products
  getAll: async (params?: { featured?: boolean; category?: string; limit?: number }): Promise<Product[]> => {
    const searchParams = new URLSearchParams();
    if (params?.featured) searchParams.set('featured', 'true');
    if (params?.category) searchParams.set('category', params.category);
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    
    const query = searchParams.toString();
    const url = `${API_BASE}/products${query ? `?${query}` : ''}`;
    
    const response = await axios.get<Product[]>(url);
    return response.data.map(normalizeProduct);
  },

  // Get single product by ID
  getById: async (id: string): Promise<Product | null> => {
    try {
      const response = await axios.get<Product>(`${API_BASE}/products/${id}`);
      return normalizeProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // Get featured products
  getFeatured: async (limit: number = 8): Promise<Product[]> => {
    return productsApi.getAll({ featured: true, limit });
  },
};

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<string[]> => {
    const response = await axios.get<string[]>(`${API_BASE}/categories`);
    return response.data;
  },
};

// Normalize MongoDB document to match frontend Product type
function normalizeProduct(doc: any): Product {
  return {
    id: doc._id?.toString() || doc.id,
    name: doc.name || '',
    description: doc.description || '',
    category: doc.category || '',
    fabric: doc.fabric || '',
    price: doc.price || 0,
    salePrice: doc.salePrice,
    images: doc.images || [],
    page: doc.page || 'shop',
    pageType: doc.pageType || 'shop',
    featured: doc.featured || false,
    sortOrder: doc.sortOrder || 0,
    enabled: doc.enabled !== false,
    createdAt: doc.createdAt || new Date().toISOString(),
  };
}
