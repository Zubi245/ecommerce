'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { CheckCircle } from 'lucide-react';

const FALLBACK_IMAGE = 'https://placehold.co/200x200.png?text=Sam+Fabrics';

const getSafeImage = (img: string | undefined | null) => {
  const trimmed = typeof img === 'string' ? img.trim() : '';
  return trimmed.length > 0 ? trimmed : FALLBACK_IMAGE;
};

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !isSuccess) {
      router.push('/cart');
    }
  }, [items, isSuccess, router]);

  if (items.length === 0 && !isSuccess) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          address: `${formData.address}, ${formData.city}`,
          items: items,
          total: cartTotal
        }),
      });
      
      clearCart();
      setIsProcessing(false);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error placing order:', error);
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="inline-block p-4 rounded-full bg-green-100 text-green-600 mb-6">
          <CheckCircle size={64} />
        </div>
        <h1 className="font-serif text-4xl mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-500 mb-8">Thank you for shopping with Sam Fabrics. Your order is being processed.</p>
        <button 
          onClick={() => router.push('/')}
          className="bg-brand-black text-white px-8 py-3 uppercase tracking-widest text-sm font-bold hover:bg-gold-500 transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-lg font-bold mb-6 border-b pb-2">Shipping Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                <input required name="name" onChange={handleChange} className="w-full border border-gray-300 p-3 focus:outline-none focus:border-brand-black" type="text" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                <input required name="phone" onChange={handleChange} className="w-full border border-gray-300 p-3 focus:outline-none focus:border-brand-black" type="tel" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email Address</label>
              <input required name="email" onChange={handleChange} className="w-full border border-gray-300 p-3 focus:outline-none focus:border-brand-black" type="email" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                <input required name="address" onChange={handleChange} className="w-full border border-gray-300 p-3 focus:outline-none focus:border-brand-black" type="text" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">City</label>
                <input required name="city" onChange={handleChange} className="w-full border border-gray-300 p-3 focus:outline-none focus:border-brand-black" type="text" />
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={isProcessing}
                className={`w-full bg-brand-black text-white py-4 uppercase tracking-widest text-sm font-bold hover:bg-gold-500 transition-colors ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? 'Processing...' : `Place Order (PKR ${cartTotal.toLocaleString()})`}
              </button>
              <p className="text-xs text-gray-500 mt-4 text-center">Payment Method: Cash on Delivery (Standard)</p>
            </div>
          </form>
        </div>

        <div className="bg-gray-50 p-6 rounded-sm h-fit">
          <h2 className="text-lg font-bold mb-6 border-b pb-2">Your Order</h2>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
            {items.map(item => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={getSafeImage(item.images?.[0])}
                  alt={item.name}
                  loading="lazy"
                  className="w-16 h-16 object-cover rounded-sm"
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                />
                <div className="flex-1">
                  <h4 className="font-serif text-sm font-bold">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.quantity} x PKR {(item.salePrice || item.price).toLocaleString()}</p>
                </div>
                <div className="text-sm font-bold">
                  PKR {((item.salePrice || item.price) * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between items-center text-xl font-bold">
            <span>Total</span>
            <span>PKR {cartTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
