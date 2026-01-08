'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';

export const Header = () => {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/category', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-brand-black via-gray-900 to-brand-black text-white text-[10px] md:text-xs text-center py-2.5 tracking-widest uppercase px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        <span className="relative z-10 flex items-center justify-center gap-2">
          <span className="hidden sm:inline">✨</span>
          Free Shipping on Orders Above PKR 5000
          <span className="hidden sm:inline">✨</span>
        </span>
      </div>

      {/* Navbar */}
      <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'shadow-lg border-b border-gray-200' 
          : 'shadow-sm border-b border-gray-100'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden text-brand-black p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <h1 className="relative text-2xl md:text-3xl font-serif font-bold tracking-tight">
                  <span className="text-brand-black group-hover:text-gray-800 transition-colors duration-300">SAIM</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-600 ml-2 group-hover:from-gold-600 group-hover:to-gold-700 transition-all duration-300">
                    ETHNIC
                  </span>
                </h1>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className=" md:flex items-center space-x-1 flex-1 justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 group ${
                    isActive(link.href)
                      ? 'text-gold-600'
                      : 'text-gray-700 hover:text-gold-600'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold-500 to-gold-600 transform origin-left transition-transform duration-300 ${
                    isActive(link.href)
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                  <span className="absolute inset-0 bg-gold-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                </Link>
              ))}
            </div>

            {/* Cart Icon */}
            <Link 
              href="/cart" 
              className="relative group flex-shrink-0"
            >
              <div className="relative p-3 rounded-full bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-gold-500 group-hover:to-gold-600 transition-all duration-300">
                <ShoppingBag 
                  size={22} 
                  className="text-gray-700 group-hover:text-white transition-colors duration-300" 
                />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-pink-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className={`bg-white w-[85%] max-w-sm h-full shadow-2xl transition-transform duration-300 transform ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-serif font-bold">
                  <span className="text-brand-black">SAIM</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-600 ml-2">
                    ETHNIC
                  </span>
                </h2>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex flex-col p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`group flex items-center justify-between px-4 py-3.5 rounded-lg font-medium uppercase tracking-wide text-sm transition-all duration-300 ${
                    isActive(link.href)
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gold-600'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform duration-300 ${
                      isActive(link.href) ? 'rotate-0' : '-rotate-90 group-hover:rotate-0'
                    }`}
                  />
                </Link>
              ))}
              {isAdmin && (
                <Link 
                  href="/admin" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="flex items-center justify-between px-4 py-3.5 rounded-lg font-medium uppercase tracking-wide text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md mt-4"
                >
                  <span>Admin Dashboard</span>
                  <ChevronDown size={16} className="transform -rotate-90" />
                </Link>
              )}
            </div>

            {/* Mobile Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
              <p className="text-xs text-gray-500 text-center">
                Premium Pakistani Ethnic Wear
              </p>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </>
  );
};
