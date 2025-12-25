// ================= HERO SLIDES =================

export interface HeroSlide {
  id: string;
  image: string;
  imgId?: string;
  title: string;
  subtitle: string;
  enabled: boolean;
  sortOrder: number;
  createdAt: string;
}

// ================= PRODUCTS =================

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  fabric: string;
  price: number;
  salePrice?: number;
  images: string[];
  imgIds?: string[];
  page: 'home' | 'shop' | 'both';
  pageType: 'hero' | 'home' | 'shop';
  featured: boolean;
  sortOrder: number;
  enabled?: boolean;
  createdAt: string;
}

// ================= CART =================

export interface CartItem extends Product {
  quantity: number;
}

// ================= ORDERS =================

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  createdAt: string;
}

// ================= USERS =================

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}
