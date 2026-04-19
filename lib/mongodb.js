import mongoose from 'mongoose';
import dns from 'dns';

let cached = global.mongoose;
if (!cached) { 
    cached = global.mongoose = { conn: null, promise: null }; 
}

async function connectToDatabase() {
    // DNS fix for Windows SRV issues
    try {
        dns.setServers(['8.8.8.8', '8.8.4.4']);
    } catch (e) {
        // Silently fail if not allowed
    }

    if (cached.conn) {
        console.log('Using cached database connection');
        return cached.conn;
    }

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        console.error('MONGODB_URI is missing!');
        throw new Error('กรุณากำหนดค่า MONGODB_URI ในไฟล์ .env.local');
    }

    if (!cached.promise) {
        console.log('Creating new database connection...');
        const opts = { bufferCommands: false };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('MongoDB connected successfully');
            return mongoose;
        }).catch(err => {
            console.error('MongoDB connection promise error:', err);
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        console.error('Await MongoDB promise failed:', e);
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectToDatabase;
