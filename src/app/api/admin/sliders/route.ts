import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Slider from '@/models/Slider';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
});

export async function GET() {
  try {
    await connectDB();
    
    const sliders = await Slider.find().sort({ sortOrder: 1, createdAt: -1 });
    
    const normalized = sliders.map(s => ({
      id: s._id.toString(),
      image: s.image,
      imgId: s.imgId || '',
      title: s.title,
      subtitle: s.subtitle,
      enabled: s.enabled,
      sortOrder: s.sortOrder,
      createdAt: s.createdAt.toISOString(),
    }));
    
    return NextResponse.json(normalized);
  } catch (error) {
    console.error('Error fetching sliders:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch sliders', details: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const slider = new Slider({
      ...body,
      imgId: body.imgId || '',
    });
    await slider.save();
    
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
    
    // If image is being changed, delete old image from ImageKit
    if (updates.image) {
      const existingSlider = await Slider.findById(id);
      if (existingSlider && existingSlider.imgId && existingSlider.imgId !== updates.imgId) {
        try {
          await imagekit.deleteFile(existingSlider.imgId);
        } catch (imgError) {
          console.error('Error deleting old image from ImageKit:', imgError);
        }
      }
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
    
    // Get slider to delete its image from ImageKit
    const slider = await Slider.findById(id);
    if (slider && slider.imgId) {
      try {
        await imagekit.deleteFile(slider.imgId);
      } catch (imgError) {
        console.error('Error deleting image from ImageKit:', imgError);
      }
    }
    
    await Slider.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting slider:', error);
    return NextResponse.json({ error: 'Failed to delete slider' }, { status: 500 });
  }
}
