import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Slider from '@/models/Slider';

export async function GET() {
  try {
    console.log("DB is connecting")
    await connectDB();
    console.log("DB is connected")
    
    const sliders = await Slider.find().sort({ sortOrder: 1, createdAt: -1 });
    
    const normalized = sliders.map(s => ({
      id: s._id.toString(),
      image: s.image,
      title: s.title,
      subtitle: s.subtitle,
      enabled: s.enabled,
      sortOrder: s.sortOrder,
      createdAt: s.createdAt.toISOString(),
    }));
    
    console.log(normalized)
    return NextResponse.json(normalized);
  } catch (error) {
    console.error('Error fetching sliders:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching sliders:', message);
    return NextResponse.json({ error: 'Failed to fetch sliders', details: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    console.log("DB is Connecting")
    await connectDB();
    console.log("DB Connected")
    
    const body = await req.json();
    const slider = new Slider(body);
    await slider.save();
    
    console.log(slider)
    return NextResponse.json({
      id: slider._id.toString(),
      title: slider.title,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating slider:', error);
    return NextResponse.json({ error: 'Failed to create slider' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Slider ID required' }, { status: 400 });
    }
    
    const slider = await Slider.findByIdAndUpdate(id, updates, { new: true });
    
    if (!slider) {
      return NextResponse.json({ error: 'Slider not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      id: slider._id.toString(),
      title: slider.title,
    });
  } catch (error) {
    console.error('Error updating slider:', error);
    return NextResponse.json({ error: 'Failed to update slider' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Slider ID required' }, { status: 400 });
    }
    
    await Slider.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting slider:', error);
    return NextResponse.json({ error: 'Failed to delete slider' }, { status: 500 });
  }
}
