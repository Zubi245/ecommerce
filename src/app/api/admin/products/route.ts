import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
});

export async function GET() {
  try {
    await connectDB();
    
    const products = await Product.find().sort({ createdAt: -1 });
    
    const normalized = products.map(p => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      category: p.category,
      fabric: p.fabric,
      price: p.price,
      salePrice: p.salePrice,
      images: p.images || [],
      imgIds: p.imgIds || [],
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

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    
    // Ensure imgIds array matches images array length
    const images = body.images || [];
    const imgIds = body.imgIds || [];
    
    const product = new Product({
      ...body,
      images,
      imgIds,
    });
    await product.save();
    
    return NextResponse.json({
      id: product._id.toString(),
      name: product.name,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }
    
    // Get product to delete its images from ImageKit
    const product = await Product.findById(id);
    if (product && product.imgIds && product.imgIds.length > 0) {
      // Delete all images from ImageKit
      for (const fileId of product.imgIds) {
        if (fileId) {
          try {
            await imagekit.deleteFile(fileId);
          } catch (imgError) {
            console.error('Error deleting image from ImageKit:', imgError);
          }
        }
      }
    }
    
    await Product.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }
    
    // Ensure imgIds is included in updates
    if (updates.images && !updates.imgIds) {
      updates.imgIds = [];
    }
    
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      id: product._id.toString(),
      name: product.name,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
