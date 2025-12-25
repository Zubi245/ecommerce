'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';

export const Header = () => {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isAdmin = pathname?.startsWith('/admin');

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/category', label: 'Category' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-black text-white text-[10px] md:text-xs text-center py-2 tracking-widest uppercase px-4">
        Free Shipping on Orders Above PKR 5000
      </div>

      {/* Navbar */}
      <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-brand-black p-1 hover:text-gold-500 transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-serif font-bold tracking-tighter text-brand-black hover:scale-105 transition-transform duration-300">
            SAIM <span className="text-gold-500 hover:text-gold-600 transition-colors duration-300">ETHNIC</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:!flex space-x-8 text-sm font-medium uppercase tracking-wide text-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-gold-500 transition-all duration-300 hover:scale-105 font-medium relative group transform hover:-translate-y-0.5"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link href="/cart" className="text-gray-600 hover:text-gold-500 transition-colors relative">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className={`bg-white w-[80%] max-w-sm h-full shadow-xl transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <span className="font-serif font-bold text-xl">Menu</span>
              <button onClick={() => setIsMenuOpen(false)} className="hover:text-gold-500 transition-colors"><X size={24} /></button>
            </div>
            <div className="flex flex-col p-6 space-y-6 text-sm font-bold uppercase tracking-wide">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 border-b border-gray-50 hover:text-gold-500 hover:bg-gold-500/10 transition-all duration-300 hover:translate-x-2 rounded"
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gold-600 hover:bg-gold-600/10 transition-all duration-300 hover:translate-x-2 rounded">
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
