import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sam Fabrics - Luxury Unstitched Suits',
  description: 'Discover the finest collection of unstitched ladies suits in Pakistan. Premium Lawn, Velvet, and Chiffon fabrics for every occasion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen font-sans">
            <Header />
            <main className="flex-grow bg-brand-light">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
