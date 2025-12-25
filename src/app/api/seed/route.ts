import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Slider from '@/models/Slider';

const INITIAL_SLIDERS = [
  {
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop',
    title: 'Luxury Unstitched Collection',
    subtitle: 'Experience the elegance of premium fabrics',
    enabled: true,
    sortOrder: 0,
  },
  {
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop',
    title: 'Summer Lawn Edition',
    subtitle: 'Vibrant prints for the season',
    enabled: true,
    sortOrder: 1,
  },
  {
    image: 'https://images.unsplash.com/photo-1596783439326-8439e3038681?q=80&w=2070&auto=format&fit=crop',
    title: 'Wedding Festivities',
    subtitle: 'Embroidered perfection for special occasions',
    enabled: true,
    sortOrder: 2,
  },
];

async function seedSliders() {
  await connectDB();
  
  // Check if sliders already exist
  const existingCount = await Slider.countDocuments();
  
  if (existingCount > 0) {
    return { 
      message: 'Sliders already seeded', 
      count: existingCount 
    };
  }
  
  // Seed sliders
  const sliders = await Slider.insertMany(INITIAL_SLIDERS);
  
  return { 
    message: 'Sliders seeded successfully', 
    count: sliders.length 
  };
}

export async function GET() {
  try {
    const result = await seedSliders();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error seeding sliders:', error);
    return NextResponse.json({ error: 'Failed to seed sliders' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const result = await seedSliders();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error seeding sliders:', error);
    return NextResponse.json({ error: 'Failed to seed sliders' }, { status: 500 });
  }
}
