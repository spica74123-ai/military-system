
import connectToDatabase from './lib/mongodb.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local
dotenv.config({ path: path.join(__dirname, '.env.local') });

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

// Since mongoose is imported inside connectToDatabase, we need to handle it
import mongoose from 'mongoose';

testConnection();
