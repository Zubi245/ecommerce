import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    const normalized = {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      category: product.category,
      fabric: product.fabric,
      price: product.price,
      salePrice: product.salePrice,
      images: product.images,
      page: product.page,
      pageType: product.pageType,
      featured: product.featured,
      sortOrder: product.sortOrder,
      enabled: product.enabled,
      createdAt: product.createdAt.toISOString(),
    };
    
    return NextResponse.json(normalized);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
