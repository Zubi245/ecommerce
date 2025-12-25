'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types';
import { SlidersHorizontal } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  
  const [minInput, setMinInput] = useState<string>('');
  const [maxInput, setMaxInput] = useState<string>('');
  const [appliedRange, setAppliedRange] = useState({ min: 0, max: 1000000 });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
          
          const cats = [...new Set(data.map((p: Product) => p.category).filter(Boolean))] as string[];
          setCategories(['All', ...cats]);

          if (data.length > 0) {
            const prices = data.map((p: Product) => p.salePrice || p.price).filter((p: number) => !isNaN(p));
            if (prices.length > 0) {
              const min = Math.floor(Math.min(...prices));
              const max = Math.ceil(Math.max(...prices));
              setMinInput(min.toString());
              setMaxInput(max.toString());
              setAppliedRange({ min, max });
            }
          }
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    const categoryParam = searchParams?.get('category');
    if (categoryParam) {
      setFilter(categoryParam);
    }
  }, [searchParams]);

  const handlePriceApply = () => {
    let min = parseInt(minInput);
    let max = parseInt(maxInput);
    if (isNaN(min)) min = 0;
    if (isNaN(max)) max = 1000000;
    if (min < 0) min = 0;
    if (max < 0) max = 0;
    if (max < min) {
      const temp = max;
      max = min;
      min = temp;
      setMinInput(min.toString());
      setMaxInput(max.toString());
    }
    setAppliedRange({ min, max });
  };

  const handleResetFilters = () => {
    setFilter('All');
    if (products.length > 0) {
      const prices = products.map(p => p.salePrice || p.price);
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setMinInput(min.toString());
      setMaxInput(max.toString());
      setAppliedRange({ min, max });
    }
  };

  const filteredProducts = products.filter(p => {
    const price = p.salePrice || p.price;
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesPrice = price >= appliedRange.min && price <= appliedRange.max;
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col mb-8">
        <h1 className="font-serif text-3xl text-brand-black mb-6">Shop Collection</h1>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 rounded-sm shadow-sm border border-gray-100">
          <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            <div className="flex space-x-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 text-sm uppercase tracking-wide rounded-full transition-all whitespace-nowrap ${
                    filter === cat 
                    ? 'bg-brand-black text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-auto flex flex-wrap items-center gap-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
            <div className="flex items-center text-gray-500 gap-2">
              <SlidersHorizontal size={16} />
              <span className="text-sm font-bold uppercase tracking-wide">Price:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                value={minInput}
                onChange={(e) => setMinInput(e.target.value)}
                className="w-20 p-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-brand-black"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                min="0"
                value={maxInput}
                onChange={(e) => setMaxInput(e.target.value)}
                className="w-20 p-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-brand-black"
                placeholder="Max"
              />
              <button
                onClick={handlePriceApply}
                className="bg-brand-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-gold-500 transition-colors"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse aspect-[4/5] rounded-sm" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-sm">
          <h3 className="font-serif text-2xl text-gray-400 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          <button 
            onClick={handleResetFilters}
            className="mt-4 text-brand-pink underline hover:text-brand-black"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-6">Showing {filteredProducts.length} results</p>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse aspect-[4/5] rounded-sm" />
          ))}
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
