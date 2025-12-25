import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    
    const categories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $match: { _id: { $ne: '' } } },
      { $sort: { count: -1 } },
    ]);
    
    const result = categories.map((c, index) => ({
      id: `cat-${index}`,
      name: c._id,
      productCount: c.count,
    }));
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
