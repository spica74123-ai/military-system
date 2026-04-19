import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  idCard: { type: String, required: true, unique: true }, // ใช้เป็น Username
  milId: { type: String, required: true },               // ใช้เป็น Password
  rank: { type: String },
  fname: { type: String, required: true },
  lname: { type: String },
  position: { type: String },
  dept: { type: String },
  isAdmin: { type: Boolean, default: false },
  postCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
