import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    const { idCard, milId } = await req.json();
    await connectToDatabase();

    const user = await User.findOne({ idCard, milId });

    if (user) {
      // Return full profile excluding password
      const { milId: _, ...userProfile } = user.toObject();
      return NextResponse.json({ 
        success: true, 
        data: userProfile 
      });
    } else {
      return NextResponse.json({ success: false, message: 'เลขประจำตัว หรือ รหัสผ่านไม่ถูกต้อง' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
