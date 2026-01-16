'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const FALLBACK_IMAGE = 'https://placehold.co/300x400.png?text=Sam+Fabrics';

const getSafeImage = (img: string | undefined | null) => {
  const trimmed = typeof img === 'string' ? img.trim() : '';
  return trimmed.length > 0 ? trimmed : FALLBACK_IMAGE;
};

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {items.length === 0 ? (
        <div className="text-center py-12 md:py-20">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base">Looks like you haven&apos;t added any luxury suits yet.</p>
          <Link 
            href="/shop" 
            className="inline-block bg-brand-black text-white px-6 md:px-8 py-3 uppercase tracking-widest text-xs md:text-sm font-bold hover:bg-gold-500 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <h1 className="font-serif text-2xl md:text-3xl mb-6 md:mb-8">Shopping Cart ({itemCount} items)</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {items.map((item) => {
                const finalPrice = item.salePrice || item.price;
                return (
                  <div key={item.id} className="flex gap-3 md:gap-4 bg-white p-3 md:p-4 shadow-sm rounded-sm">
                    <div className="w-20 h-28 md:w-24 md:h-32 flex-shrink-0 bg-gray-100 overflow-hidden rounded-sm">
                      <img
                        src={getSafeImage(item.images?.[0])}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                      />
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif font-medium text-base md:text-lg">{item.name}</h3>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">{item.category}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                        >
                          <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center border border-gray-200 rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 md:p-2 text-gray-600 hover:bg-gray-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={12} className="md:w-[14px] md:h-[14px]" />
                          </button>
                          <span className="w-6 md:w-8 text-center text-xs md:text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 md:p-2 text-gray-600 hover:bg-gray-50"
                          >
                            <Plus size={12} className="md:w-[14px] md:h-[14px]" />
                          </button>
                        </div>
                        <div className="text-right">
                          {item.salePrice && (
                            <p className="text-xs text-gray-400 line-through">PKR {(item.price * item.quantity).toLocaleString()}</p>
                          )}
                          <p className="font-bold text-base md:text-lg">PKR {(finalPrice * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-4 md:p-6 shadow-sm rounded-sm lg:sticky lg:top-24">
                <h3 className="font-serif text-lg md:text-xl mb-4 md:mb-6 border-b pb-3 md:pb-4">Order Summary</h3>
                
                <div className="space-y-2 md:space-y-3 text-sm text-gray-600 mb-4 md:mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>PKR {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-bold text-base md:text-lg mb-6 md:mb-8 pt-3 md:pt-4 border-t">
                  <span>Total</span>
                  <span>PKR {cartTotal.toLocaleString()}</span>
                </div>

                <button 
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-brand-black text-white py-3 md:py-4 uppercase tracking-widest text-xs md:text-sm font-bold hover:bg-gold-500 transition-colors flex justify-center items-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} className="md:w-4 md:h-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
