import mongoose from 'mongoose';

const VtcSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  imageUrl: { type: String }, // Base64
  adminName: { type: String }
}, { timestamps: true });

export default mongoose.models.Vtc || mongoose.model('Vtc', VtcSchema);
