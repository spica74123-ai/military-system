import mongoose from 'mongoose';

const DutySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  userUid: { type: String, required: true },
  userName: { type: String, required: true },
  type: { type: String, required: true }, // นายทหารเวร, เวรรักษาการณ์
  time: { type: String, default: '07:30 - 07:30' },
  status: { type: String, default: 'รอปฏิบัติงาน' }
}, { timestamps: true });

export default mongoose.models.Duty || mongoose.model('Duty', DutySchema);
