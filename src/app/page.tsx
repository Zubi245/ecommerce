import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Home - Premium Pakistani Ethnic Wear',
  description: 'Shop the latest collection of premium Pakistani ethnic wear at Saim Ethnic. Discover luxury unstitched suits, lawn, velvet, chiffon, and party wear with free shipping on orders above PKR 5000.',
  keywords: ['Pakistani clothing online', 'ethnic wear Pakistan', 'unstitched suits', 'lawn collection', 'velvet suits Pakistan', 'Saim Ethnic'],
  openGraph: {
    title: 'Saim Ethnic - Premium Pakistani Ethnic Wear',
    description: 'Shop the latest collection of premium Pakistani ethnic wear',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
