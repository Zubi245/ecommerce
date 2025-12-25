import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    
    const normalized = users.map(u => ({
      id: u._id.toString(),
      username: u.username,
      role: u.role,
    }));
    
    return NextResponse.json(normalized);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
