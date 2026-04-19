import mongoose from 'mongoose';

const WorkReportSchema = new mongoose.Schema({
  userUid:  { type: String, required: true, index: true },
  userName: { type: String, required: true },
  date:     { type: String, required: true }, // "YYYY-MM-DD"
  detail:   { type: String, required: true },
  status:   { type: String, required: true, default: '⏳ อยู่ระหว่างดำเนินการ' },
}, { timestamps: true });

export default mongoose.models.WorkReport || mongoose.model('WorkReport', WorkReportSchema);
