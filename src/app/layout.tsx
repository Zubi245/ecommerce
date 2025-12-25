import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Saim Ethnic - Premium Pakistani Clothing & Ethnic Wear Online',
    template: '%s | Saim Ethnic'
  },
  description: 'Shop premium Pakistani ethnic wear at Saim Ethnic. Discover luxury unstitched suits, lawn, velvet, chiffon, and party wear. Free shipping on orders above PKR 5000.',
  keywords: ['Pakistani clothing', 'ethnic wear', 'unstitched suits', 'lawn suits', 'velvet suits', 'chiffon suits', 'Pakistani fashion', 'Saim Ethnic', 'online clothing Pakistan'],
  authors: [{ name: 'Saim Ethnic' }],
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://saimethnic.com',
    siteName: 'Saim Ethnic',
    title: 'Saim Ethnic - Premium Pakistani Clothing & Ethnic Wear',
    description: 'Shop premium Pakistani ethnic wear at Saim Ethnic. Discover luxury unstitched suits, lawn, velvet, chiffon, and party wear.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saim Ethnic - Premium Pakistani Clothing',
    description: 'Shop premium Pakistani ethnic wear online',
  },
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
