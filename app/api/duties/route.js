import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Duty from '@/models/Duty';

export async function GET() {
  try {
    await connectToDatabase();
    const duties = await Duty.find({}).sort({ date: 1 });
    return NextResponse.json({ success: true, data: duties });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    if (!body.id) body.id = 'D' + Date.now();
    const newDuty = await Duty.create(body);
    return NextResponse.json({ success: true, data: newDuty });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await connectToDatabase();
    await Duty.findOneAndDelete({ id });
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
