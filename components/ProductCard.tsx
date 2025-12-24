import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Eye, X, Check } from 'lucide-react';

// More reliable fallback image
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&auto=format';

const getPrimaryImage = (product: Product) => {
  if (!product || !product.images || !Array.isArray(product.images)) {
    return FALLBACK_IMAGE;
  }
  const raw = product.images[0];
  const trimmed = typeof raw === 'string' ? raw.trim() : '';
  if (trimmed.length > 0 && (trimmed.startsWith('http') || trimmed.startsWith('data:'))) {
    // Add cache-busting parameter to ensure fresh load for HTTP URLs
    if (trimmed.startsWith('http')) {
      return `${trimmed}?t=${Date.now()}`;
    }
    // Return base64 URLs as-is
    return trimmed;
  }
  return FALLBACK_IMAGE;
};

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <Link to={`/product/${product.id}`} className="block">
        <div className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 relative transform hover:-translate-y-1 animate-fade-in">
          <div className="relative overflow-hidden aspect-[4/5]">
            <img 
              key={product.images?.[0] || 'fallback'}
              src={getPrimaryImage(product)} 
              alt={product.name} 
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {product.salePrice && (
              <div className="absolute top-4 left-4 bg-brand-pink text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                Sale
              </div>
            )}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            {/* Action Buttons */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
              <button 
                onClick={handleQuickView}
                className="bg-white p-3 rounded-full text-brand-black shadow-lg hover:bg-gold-500 hover:text-white transition-colors"
                title="Quick View"
              >
                <Eye size={20} />
              </button>
              <button 
                onClick={handleAddToCart}
                className={`bg-white p-3 rounded-full shadow-lg transition-colors ${isAdded ? 'bg-green-500 text-white' : 'text-brand-black hover:bg-gold-500 hover:text-white'}`}
                title="Add to Cart"
              >
                {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{product.category}</p>
            <h3 className="font-serif text-lg font-medium text-brand-black mb-2 hover:text-gold-500 transition-colors truncate">
              {product.name}
            </h3>
            <div className="flex items-center space-x-2">
              {product.salePrice ? (
                <>
                  <span className="text-brand-pink font-bold">PKR {product.salePrice.toLocaleString()}</span>
                  <span className="text-gray-400 line-through text-sm">PKR {product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-brand-black font-bold">PKR {product.price.toLocaleString()}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
      {isQuickViewOpen && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsQuickViewOpen(false)}
        >
          <div 
            className="bg-white rounded-sm shadow-2xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden relative animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsQuickViewOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-gray-100 text-gray-600 hover:text-red-500 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="h-64 md:h-[500px] bg-gray-100">
                        <img
                          src={getPrimaryImage(product)}
                          alt={product.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                          className="w-full h-full object-cover"
                        />
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">{product.category}</span>
              <h2 className="font-serif text-3xl text-brand-black mb-4">{product.name}</h2>
              
              <div className="mb-6 border-b border-gray-100 pb-6">
                {product.salePrice ? (
                  <div className="text-2xl">
                    <span className="text-brand-pink font-bold mr-3">PKR {product.salePrice.toLocaleString()}</span>
                    <span className="text-gray-400 line-through text-lg">PKR {product.price.toLocaleString()}</span>
                  </div>
                ) : (
                  <span className="text-brand-black font-bold text-2xl">PKR {product.price.toLocaleString()}</span>
                )}
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed line-clamp-4">{product.description}</p>

              <div className="space-y-3">
                <button 
                  onClick={handleAddToCart}
                  className={`w-full py-4 uppercase tracking-widest text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isAdded 
                    ? 'bg-green-600 text-white' 
                    : 'bg-brand-black text-white hover:bg-gold-500'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={18} />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
                
                <Link 
                  to={`/product/${product.id}`}
                  className="block w-full border border-gray-300 text-gray-700 py-3 uppercase tracking-widest text-sm font-bold hover:bg-gray-50 transition-colors text-center"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};