import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Org from '@/models/Org';

export async function GET() {
  try {
    await connectToDatabase();
    const orgs = await Org.find({});
    return NextResponse.json({ success: true, data: orgs });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await connectToDatabase();
    if (!body.id) body.id = 'O' + Date.now();
    const newOrg = await Org.create(body);
    return NextResponse.json({ success: true, data: newOrg });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await connectToDatabase();
    await Org.findOneAndDelete({ id });
    return NextResponse.json({ success: true, message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
