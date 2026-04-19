import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

// [PUT] อัปเดตข้อมูลกำลังพล
export async function PUT(req, { params }) {
  try {
    const { uid } = await params;
    const body = await req.json();
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ uid }, body, { new: true });
    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

// [DELETE] ลบกำลังพล
export async function DELETE(req, { params }) {
  try {
    const { uid } = await params;
    await connectToDatabase();

    await User.findOneAndDelete({ uid });
    return NextResponse.json({ success: true, message: 'ลบข้อมูลสำเร็จ' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
