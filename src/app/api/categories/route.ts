import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    
    const categories = await Product.aggregate([
      { $match: { enabled: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $match: { _id: { $ne: '' } } },
      { $sort: { count: -1 } },
    ]);
    
    const result = categories.map(c => ({
      name: c._id,
      count: c.count,
      image: `https://images.unsplash.com/photo-1596783439326-8439e3038681?q=80&w=2070`,
    }));
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
