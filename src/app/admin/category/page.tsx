'use client';

import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  productCount: number;
}

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">Categories</h2>
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
        <h2 className="text-3xl font-bold">Categories</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition">
          <Plus size={20} />
          Add Category
        </button>
      </div>
      
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{category.productCount} products</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-blue-500 hover:text-blue-700 mr-3">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
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
