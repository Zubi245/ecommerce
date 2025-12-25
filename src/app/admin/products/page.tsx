'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/types';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { db } from '@/data/db';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    try {
      const data = db.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      db.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">Products</h2>
        <div className="bg-white rounded shadow p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Products</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition">
          <Plus size={20} />
          Add Product
        </button>
      </div>
      
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      src={product.images?.[0] || 'https://placehold.co/50x50'} 
                      alt={product.name}
                      className="w-10 h-10 rounded object-cover mr-3"
                    />
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.salePrice ? (
                    <div>
                      <span className="text-brand-pink font-medium">PKR {product.salePrice.toLocaleString()}</span>
                      <span className="text-gray-400 line-through text-sm ml-2">PKR {product.price.toLocaleString()}</span>
                    </div>
                  ) : (
                    <span>PKR {product.price.toLocaleString()}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${product.enabled !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.enabled !== false ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-blue-500 hover:text-blue-700 mr-3">
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
