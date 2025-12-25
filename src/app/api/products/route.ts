import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export async function GET(req: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    
    const query: Record<string, unknown> = { enabled: true };
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (category) {
      query.category = category;
    }
    
    let productsQuery = Product.find(query).sort({ sortOrder: 1, createdAt: -1 });
    
    if (limit) {
      productsQuery = productsQuery.limit(parseInt(limit));
    }
    
    const products = await productsQuery;
    
    const normalized = products.map(p => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      category: p.category,
      fabric: p.fabric,
      price: p.price,
      salePrice: p.salePrice,
      images: p.images,
      page: p.page,
      pageType: p.pageType,
      featured: p.featured,
      sortOrder: p.sortOrder,
      enabled: p.enabled,
      createdAt: p.createdAt.toISOString(),
    }));
    
    return NextResponse.json(normalized);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
