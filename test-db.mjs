
import connectToDatabase from './lib/mongodb.js';
import mongoose from 'mongoose';

async function testConnection() {
  console.log('Testing MongoDB connection...');
  try {
    const db = await connectToDatabase();
    if (db) {
      console.log('--- CONNECTION SUCCESSFUL ---');
      console.log('Database Name:', mongoose.connection.name);
      process.exit(0);
    }
  } catch (error) {
    console.error('--- CONNECTION FAILED ---');
    console.error(error);
    process.exit(1);
  }
}

testConnection();
