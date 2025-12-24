import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import Order from "../../models/order";

// GET /api/orders - Get orders (for customer by email)
export async function GET(req: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    
    const orders = await Order.find({ customerEmail: email })
      .sort({ createdAt: -1 });
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// POST /api/orders - Create new order
export async function POST(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { customerName, customerEmail, customerPhone, address, items, total } = body;
    
    if (!customerName || !customerEmail || !customerPhone || !address || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const order = await Order.create({
      customerName,
      customerEmail,
      customerPhone,
      address,
      items,
      total,
      status: 'Pending',
    });
    
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
