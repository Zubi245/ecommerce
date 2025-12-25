import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    
    const totalRevenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    return NextResponse.json({ 
      totalOrders, 
      totalRevenue, 
      totalUsers, 
      totalProducts 
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
