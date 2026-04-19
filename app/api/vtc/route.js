import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Vtc from '@/models/Vtc';

export async function GET() {
  try {
    await connectToDatabase();
    const vtcLogs = await Vtc.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: vtcLogs });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const newVtc = await Vtc.create(body);
    return NextResponse.json({ success: true, data: newVtc });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
