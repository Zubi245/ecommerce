'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { Product, HeroSlide } from '@/types';
import { ArrowRight } from 'lucide-react';

export default function HomeClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load hero slides from API
        const slidersRes = await fetch('/api/admin/sliders');
        if (slidersRes.ok) {
          const slidersData = await slidersRes.json();
          const enabledSlides = slidersData.filter((s: HeroSlide) => s.enabled);
          setSlides(enabledSlides);
        }

        // Load products from API
        const productsRes = await fetch('/api/products?limit=8');
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden bg-gray-900">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover animate-scale-slow"
              loading="lazy"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
              <p className="text-gold-400 uppercase tracking-[0.2em] mb-4 text-xs md:text-sm animate-fade-in-up">New Arrivals 2024</p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6 animate-fade-in-up leading-tight" style={{ animationDelay: '0.2s' }}>{slide.title}</h1>
              <p className="text-base md:text-xl font-light mb-6 md:mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>{slide.subtitle}</p>
              <Link
                href="/shop"
                className="bg-white text-brand-black px-6 md:px-8 py-3 uppercase tracking-widest text-xs md:text-sm font-bold hover:bg-gold-500 hover:text-white transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: '0.6s' }}
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-gold-500 text-xs md:text-sm uppercase tracking-widest font-bold mb-2">Curated For You</p>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-black">Featured Collection</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse aspect-[4/5] rounded-sm" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available yet.</p>
            <p className="text-gray-400 text-sm mt-2">Add products from the admin dashboard.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/shop" className="inline-flex items-center space-x-2 text-brand-black hover:text-gold-500 font-medium uppercase tracking-wide border-b border-black hover:border-gold-500 pb-1 transition-all">
            <span>View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
