# Sam Fabrics - E-Commerce Platform

A modern, full-stack e-commerce platform for premium unstitched ladies suits built with React, TypeScript, and Vite.

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite 7 (build tool)
- React Router DOM 6 (routing)
- Tailwind CSS 4 (styling)
- Framer Motion (animations)
- Lucide React (icons)
- React Beautiful DnD (drag & drop)

### Backend
- Next.js 16 API Routes
- MongoDB with Mongoose 9
- JWT Authentication
- Cloudinary (image uploads)

## Project Structure

```
sam-fabrics-admin/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── Layout.tsx       # Main layout with navbar/footer
│   ├── ProductCard.tsx
│   └── SEO.tsx
├── context/
│   └── CartContext.tsx  # Shopping cart state management
├── pages/               # Frontend pages
│   ├── Home.tsx         # Landing page with hero slider
│   ├── Shop.tsx         # Product listing with filters
│   ├── Cart.tsx         # Shopping cart
│   ├── Checkout.tsx     # Order checkout
│   ├── ProductDetail.tsx
│   ├── Category.tsx
│   ├── AdminDashboard.tsx
│   ├── Login.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── services/
│   └── db.ts            # LocalStorage-based data service
├── src/
│   ├── admin/           # Admin panel pages
│   │   ├── layout.tsx
│   │   ├── page.tsx     # Dashboard overview
│   │   ├── category/
│   │   ├── products/
│   │   ├── order/
│   │   └── users/
│   └── backend/         # API & server logic
│       ├── api/
│       │   ├── admin/   # Admin API routes
│       │   └── upload/  # File upload routes
│       ├── lib/
│       │   ├── auth.ts
│       │   ├── cloudinary.ts
│       │   └── db.ts    # MongoDB connection
│       ├── middlewares/
│       │   └── adminAuth.ts
│       ├── models/      # Mongoose schemas
│       │   ├── category.ts
│       │   ├── order.ts
│       │   ├── products.ts
│       │   └── user.ts
│       └── services/    # Business logic
│           ├── category.services.ts
│           ├── order.services.ts
│           └── product.services.ts
├── types.ts             # TypeScript interfaces
├── vite.config.ts
└── package.json
```

## Features

### Customer Features
- Hero slider with auto-rotation
- Product catalog with category & price filters
- Product detail pages with image gallery
- Shopping cart with localStorage persistence
- Checkout flow
- Responsive design (mobile-first)
- WhatsApp integration for support

### Admin Features
- Dashboard with stats overview
- Product management (CRUD)
- Hero slides management
- Order management with status updates
- Drag & drop product sorting
- Image upload to Cloudinary
- User management

## Data Models

### Product
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  fabric: string;
  price: number;
  salePrice?: number;
  images: string[];
  page: 'home' | 'shop' | 'both';
  pageType: 'hero' | 'home' | 'shop';
  featured: boolean;
  sortOrder: number;
  enabled?: boolean;
  createdAt: string;
}
```

### Order
```typescript
interface Order {
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
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance
- Cloudinary account (for image uploads)

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with:

```env
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_key  # Optional
```

### Development

```bash
# Start development server
npm run dev
```

The app runs on `http://localhost:3000`

### Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## API Routes

### Admin Routes
- `GET /api/admin/dashboard` - Dashboard stats
- `GET/POST /api/admin/products` - Product CRUD
- `GET/POST /api/admin/categories` - Category management
- `GET/PATCH /api/admin/orders` - Order management
- `GET/POST /api/admin/users` - User management

### Upload Routes
- `POST /api/upload` - Image upload to Cloudinary

## Categories

Supported fabric categories:
- Velvet
- Lawn
- Chiffon
- Jacquard
- Linen
- Net
- Organza
- Silk
- Cotton
- Khaddar
- Marina
- Banarsi

## License

Private - All rights reserved.

---

Built with ❤️ for Sam Fabrics
