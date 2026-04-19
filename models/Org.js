import mongoose from 'mongoose';

const OrgSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  level: { type: String, required: true },
  parentId: { type: String, default: null },
}, { timestamps: true });

export default mongoose.models.Org || mongoose.model('Org', OrgSchema);
