import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  userUid:  { type: String, required: true, index: true },
  userName: { type: String, required: true },
  platform: { type: String, required: true },
  link:     { type: String, required: true },
  date:     { type: String, required: true }, // "YYYY-MM-DD"
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
