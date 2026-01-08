'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface CategoryItem {
  name: string;
  image: string;
  description: string;
  count: number;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Predefined category images and descriptions
  const categoryInfo: Record<string, { image: string; description: string }> = {
    'Linen': { 
      image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2000',
      description: 'Breathable and comfortable linen fabric perfect for all seasons'
    },
    'Cotton': { 
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=2000',
      description: 'Soft and natural cotton fabric for everyday comfort'
    },
    'Lawn': { 
      image: 'https://images.unsplash.com/photo-1621609764095-646fd0537cc6?q=80&w=2000',
      description: 'Lightweight lawn collection ideal for summer wear'
    },
    'Silk': { 
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964',
      description: 'Luxurious and elegant silk fabric for special occasions'
    },
    'Dhanak': { 
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974',
      description: 'Warm and cozy dhanak fabric for winter collection'
    },
    'Viscose': { 
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070',
      description: 'Smooth and flowing viscose fabric with elegant drape'
    },
    'Khaddar': { 
      image: 'https://images.unsplash.com/photo-1596783439326-8439e3038681?q=80&w=2070',
      description: 'Traditional handwoven khaddar fabric with authentic texture'
    },
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        
        // Define the 7 main categories
        const mainCategories = ['Linen', 'Cotton', 'Lawn', 'Silk', 'Dhanak', 'Viscose', 'Khaddar'];
        
        // Fetch all products to count by category
        const res = await fetch('/api/products');
        if (res.ok) {
          const products = await res.json();
          
          // Count products by category
          const categoryCounts: Record<string, number> = {};
          products.forEach((product: any) => {
            if (product.category && product.enabled !== false) {
              categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
            }
          });
          
          // Create category list for all 7 categories
          const categoryList: CategoryItem[] = mainCategories.map((name) => ({
            name,
            count: categoryCounts[name] || 0,
            image: categoryInfo[name]?.image || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2000',
            description: categoryInfo[name]?.description || 'Premium collection',
          }));
          
          setCategories(categoryList);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl text-brand-black mb-4">Shop by Category</h1>
        <p className="text-gray-500">Explore our curated collections of premium fabrics</p>
      </div>

      {loading ? (
        <div className="space-y-8">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/shop?category=${encodeURIComponent(category.name)}`}
              className="group relative overflow-hidden rounded-sm aspect-[3/4] shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:from-black/80 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <h3 className="font-serif text-xl md:text-2xl lg:text-3xl mb-2 text-center transform group-hover:scale-105 transition-transform duration-300">
                  {category.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-200 mb-2">
                  {category.count} {category.count === 1 ? 'Product' : 'Products'}
                </p>
                <p className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  {category.description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs md:text-sm border border-white px-4 py-2 rounded-full uppercase tracking-wider">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
