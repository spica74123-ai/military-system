import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import WorkReport from '@/models/WorkReport';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userUid = searchParams.get('userUid');
    await connectToDatabase();
    const query = userUid ? { userUid } : {};
    const reports = await WorkReport.find(query).sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const report = await WorkReport.create(body);
    return NextResponse.json({ success: true, data: report }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
