import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userUid = searchParams.get('userUid');
    await connectToDatabase();
    const query = userUid ? { userUid } : {};
    const posts = await Post.find(query).sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const post = await Post.create(body);
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
