'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { ChevronLeft, ChevronRight, ShoppingBag, Check } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop&auto=format';

const getSafeImage = (img: string | undefined | null) => {
  if (!img || typeof img !== 'string') return FALLBACK_IMAGE;
  const trimmed = img.trim();
  if (trimmed.length > 0 && (trimmed.startsWith('http') || trimmed.startsWith('data:'))) {
    return trimmed;
  }
  return FALLBACK_IMAGE;
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          router.push('/shop');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        router.push('/shop');
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id, router]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const nextImage = () => {
    if (!product) return;
    setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0);
  };

  const prevImage = () => {
    if (!product) return;
    setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
    setIsHovering(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-[4/5] bg-gray-200 animate-pulse rounded-sm" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3" />
            <div className="h-12 bg-gray-200 animate-pulse rounded w-2/3" />
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <button 
        onClick={() => router.back()} 
        className="flex items-center text-gray-500 hover:text-brand-black mb-8 transition-colors"
      >
        <ChevronLeft size={20} /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4 select-none">
          <div 
            className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-sm relative group"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div 
              className="flex w-full h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${selectedImage * 100}%)` }}
            >
              {product.images.map((img, idx) => (
                <div key={idx} className="w-full h-full flex-shrink-0 relative overflow-hidden">
                  <img 
                    src={getSafeImage(img)} 
                    alt={`${product.name} - View ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{
                      transformOrigin: zoomOrigin,
                      transform: isHovering && idx === selectedImage ? 'scale(1.5)' : 'scale(1)',
                      transition: 'transform 0.4s ease-out',
                    }}
                  />
                </div>
              ))}
            </div>

            {product.salePrice && (
              <div className="absolute top-4 left-4 bg-brand-pink text-white text-sm font-bold px-4 py-1 uppercase tracking-wider shadow-lg z-10">
                Sale
              </div>
            )}

            {product.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-brand-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hidden md:block"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-brand-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hidden md:block"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square overflow-hidden border-2 transition-all duration-300 rounded-sm ${
                  selectedImage === idx 
                  ? 'border-brand-black opacity-100' 
                  : 'border-transparent hover:border-gray-300 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={getSafeImage(img)}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col h-full">
          <p className="text-gray-500 uppercase tracking-widest text-sm mb-2">{product.category}</p>
          <h1 className="font-serif text-4xl text-brand-black mb-4">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-8 border-b border-gray-100 pb-8">
            <div className="text-3xl font-light">
              {product.salePrice ? (
                <>
                  <span className="text-brand-pink font-bold mr-3">PKR {product.salePrice.toLocaleString()}</span>
                  <span className="text-gray-400 line-through text-xl">PKR {product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-brand-black font-bold">PKR {product.price.toLocaleString()}</span>
              )}
            </div>
          </div>

          <div className="prose prose-sm text-gray-600 mb-8">
            <h3 className="text-brand-black font-serif text-lg mb-2">Description</h3>
            <p className="mb-4">{product.description}</p>
            
            <h3 className="text-brand-black font-serif text-lg mb-2">Fabric Details</h3>
            <p><strong>Type:</strong> {product.fabric}</p>
            <p><strong>Items Included:</strong> Shirt, Trouser, Dupatta</p>
          </div>

          <div className="mt-auto">
            <div className="flex space-x-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 py-4 text-sm uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isAdded 
                  ? 'bg-green-600 text-white' 
                  : 'bg-brand-black text-white hover:bg-gold-500'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={20} />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              <button 
                onClick={() => router.push('/checkout')}
                className="flex-1 py-4 text-sm uppercase tracking-widest font-bold bg-gold-500 text-white hover:bg-gold-600 transition-all duration-300"
              >
                Checkout
              </button>
            </div>
            <p className="text-xs text-center text-gray-400 mt-4">
              Free shipping on orders above PKR 5,000. 30-day return policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
