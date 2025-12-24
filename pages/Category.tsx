import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../services/db1';

export const Category = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const products = db.getProducts();
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    setCategories(uniqueCategories);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-brand-black">
        Shop by <span className="text-gold-500">Category</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/shop?category=${encodeURIComponent(category)}`}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="p-8 text-center">
              <h2 className="text-xl font-serif font-bold text-brand-black mb-4 group-hover:text-gold-500 transition-colors">
                {category}
              </h2>
              <p className="text-gray-600 text-sm">
                Explore our {category.toLowerCase()} collection
              </p>
              <div className="mt-4 inline-block text-gold-500 group-hover:scale-110 transition-transform">
                →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};