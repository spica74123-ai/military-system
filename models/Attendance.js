import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  userUid: { type: String, required: true },
  userName: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  status: { type: String, required: true }, // ลากิจ, ลาป่วย, มาปฏิบัติราชการ, ฯลฯ
  note: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
