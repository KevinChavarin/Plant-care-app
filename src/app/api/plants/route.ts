import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { PlantModel } from '@/models/Plant';

export async function GET() {
  try {
    await connectDB();
    const plants = await PlantModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    return NextResponse.json(
      { error: 'Error fetching plants' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const plantData = await request.json();
    
    const plant = new PlantModel(plantData);
    await plant.save();
    
    return NextResponse.json(plant, { status: 201 });
  } catch (error) {
    console.error('Error creating plant:', error);
    return NextResponse.json(
      { error: 'Error creating plant' },
      { status: 500 }
    );
  }
}
