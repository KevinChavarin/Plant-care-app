import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { PlantModel } from '@/models/Plant';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const plant = await PlantModel.findById(id);
    
    if (!plant) {
      return NextResponse.json(
        { error: 'Plant not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(plant);
  } catch (error) {
    console.error('Error fetching plant:', error);
    return NextResponse.json(
      { error: 'Error fetching plant' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const plantData = await request.json();
    
    const plant = await PlantModel.findByIdAndUpdate(
      id,
      plantData,
      { new: true, runValidators: true }
    );
    
    if (!plant) {
      return NextResponse.json(
        { error: 'Plant not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(plant);
  } catch (error) {
    console.error('Error updating plant:', error);
    return NextResponse.json(
      { error: 'Error updating plant' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const plant = await PlantModel.findByIdAndDelete(id);
    
    if (!plant) {
      return NextResponse.json(
        { error: 'Plant not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Plant deleted successfully' });
  } catch (error) {
    console.error('Error deleting plant:', error);
    return NextResponse.json(
      { error: 'Error deleting plant' },
      { status: 500 }
    );
  }
}
