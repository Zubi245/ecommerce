import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';
import { productsApi } from '../services/api';
import { db } from '../services/db';
import { Product, HeroSlide } from '../types';
import { ArrowRight } from 'lucide-react';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch featured products from API, fallback to local db
        let fetchedProducts: Product[] = [];
        try {
          fetchedProducts = await productsApi.getAll({ featured: true, limit: 8 });
          if (fetchedProducts.length === 0) {
            fetchedProducts = await productsApi.getAll({ limit: 8 });
          }
        } catch {
          // Fallback to localStorage
          const enabledProducts = db.getEnabledProducts();
          const featured = enabledProducts.filter(p => p.featured).slice(0, 8);
          fetchedProducts = featured.length > 0 ? featured : enabledProducts.slice(0, 8);
        }
        setProducts(fetchedProducts);

        // Hero slides from localStorage (can be moved to API later)
        const heroSlides = db.getHeroSlides();
        setSlides(heroSlides);
      } catch (error) {
        console.error('Error loading data:', error);
        setProducts([]);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Listen for real-time updates (for admin changes)
    const handleProductsUpdate = () => loadData();
    const handleHeroSlidesUpdate = () => {
      const heroSlides = db.getHeroSlides();
      setSlides(heroSlides);
    };

    window.addEventListener('productsUpdated', handleProductsUpdate);
    window.addEventListener('heroSlidesUpdated', handleHeroSlidesUpdate);

    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdate);
      window.removeEventListener('heroSlidesUpdated', handleHeroSlidesUpdate);
    };
  }, []);

  // Auto-slide for hero
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
      <SEO 
        title="Luxury Unstitched Suits" 
        description="Discover the finest collection of unstitched ladies suits in Pakistan. Premium Lawn, Velvet, and Chiffon fabrics for every occasion."
      />

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
              onError={(e) => (e.currentTarget.src = slides[0].image)}
              loading="lazy"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
              <p className="text-gold-400 uppercase tracking-[0.2em] mb-4 text-xs md:text-sm animate-fade-in-up">New Arrivals 2024</p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6 animate-fade-in-up leading-tight" style={{ animationDelay: '0.2s' }}>{slide.title}</h1>
              <p className="text-base md:text-xl font-light mb-6 md:mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>{slide.subtitle}</p>
              <Link 
                to="/shop" 
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop" className="inline-flex items-center space-x-2 text-brand-black hover:text-gold-500 font-medium uppercase tracking-wide border-b border-black hover:border-gold-500 pb-1 transition-all">
            <span>View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
