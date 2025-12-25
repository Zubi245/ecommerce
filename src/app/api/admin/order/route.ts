import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';

export async function GET() {
  try {
    await connectDB();
    
    const orders = await Order.find().sort({ createdAt: -1 });
    
    const normalized = orders.map(o => ({
      id: o._id.toString(),
      customerName: o.customerName,
      customerEmail: o.customerEmail,
      customerPhone: o.customerPhone,
      address: o.address,
      items: o.items,
      total: o.total,
      status: o.status,
      createdAt: o.createdAt.toISOString(),
    }));
    
    return NextResponse.json(normalized);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    }
    
    const order = await Order.findByIdAndUpdate(id, body, { new: true });
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      id: order._id.toString(),
      status: order.status,
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    }
    
    const order = await Order.findByIdAndUpdate(id, updates, { new: true });
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      id: order._id.toString(),
      status: order.status,
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
