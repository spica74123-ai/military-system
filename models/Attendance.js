import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  userUid:  { type: String, required: true, index: true },
  userName: { type: String, required: true },
  date:     { type: String, required: true }, // YYYY-MM-DD
  time:     { type: String, default: '' },    // HH:MM
  status:   { type: String, required: true }, // ปฏิบัติงาน, ลากิจ, ลาป่วย ฯลฯ
  lat:      { type: Number, default: 0 },
  lng:      { type: Number, default: 0 },
  note:     { type: String, default: '' }
}, { timestamps: true });

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
