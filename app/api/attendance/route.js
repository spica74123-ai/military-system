import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Attendance from '@/models/Attendance';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    await connectToDatabase();
    const query = date ? { date } : {};
    const attendances = await Attendance.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: attendances });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    // Use findOneAndUpdate to record/update status for the user on specific date
    const attendance = await Attendance.findOneAndUpdate(
      { userUid: body.userUid, date: body.date },
      body,
      { upsert: true, new: true }
    );
    return NextResponse.json({ success: true, data: attendance });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
