'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface CategoryItem {
  name: string;
  image: string;
  count: number;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch('/api/categories');
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

    loadCategories();
  }, []);

  const defaultCategories: CategoryItem[] = [
    { name: 'Lawn', image: 'https://images.unsplash.com/photo-1621609764095-646fd0537cc6?q=80&w=2000', count: 0 },
    { name: 'Velvet', image: 'https://images.unsplash.com/photo-1596783439326-8439e3038681?q=80&w=2070', count: 0 },
    { name: 'Chiffon', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070', count: 0 },
    { name: 'Silk', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964', count: 0 },
    { name: 'Organza', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073', count: 0 },
    { name: 'Net', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2000', count: 0 },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl text-brand-black mb-4">Shop by Category</h1>
        <p className="text-gray-500">Explore our curated collections of premium fabrics</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse aspect-[3/4] rounded-sm" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {displayCategories.map((category) => (
            <Link
              key={category.name}
              href={`/shop?category=${encodeURIComponent(category.name)}`}
              className="group relative overflow-hidden rounded-sm aspect-[3/4]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="font-serif text-2xl md:text-3xl mb-2">{category.name}</h3>
                {category.count > 0 && (
                  <p className="text-sm text-gray-300">{category.count} Products</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
