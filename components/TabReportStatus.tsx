import React, { useState, useEffect } from 'react';

interface TabReportStatusProps {
  usersList: any[];
}

const TabReportStatus: React.FC<TabReportStatusProps> = ({ usersList }) => {
  const [selectedUserUid, setSelectedUserUid] = useState('');
  const [status, setStatus] = useState('มาปฏิบัติราชการ');
  const [note, setNote] = useState('');
  const [attendances, setAttendances] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      const resp = await fetch('/api/attendance');
      const result = await resp.json();
      if (result.success) setAttendances(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    if (!selectedUserUid) return;
    setIsSaving(true);
    const user = usersList.find(u => u.uid === selectedUserUid);
    const dateStr = new Date().toISOString().split('T')[0];

    const payload = {
      userUid: selectedUserUid,
      userName: user ? `${user.rank}${user.fname} ${user.lname}` : 'Unknown',
      date: dateStr,
      status,
      note
    };

    try {
      const resp = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await resp.json();
      if (result.success) {
        fetchAttendances();
        setNote('');
        alert('บันทึกสถานะเรียบร้อยแล้ว');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border border-slate-200/80 dark:border-slate-700/80 p-8 sm:p-10 max-w-2xl mx-auto mt-6 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="font-black text-3xl mb-2 tracking-tight text-slate-800 dark:text-white">จัดการสถานะกำลังพลประจำวัน</h3>
          <p className="text-sm font-medium text-slate-500 mb-10">(เลือกรายชื่อเพื่อบันทึก ลา/ขาด/ไปราชการ)</p>
          
          <div className="space-y-6">
            <div className="group">
              <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-slate-500">เลือกกำลังพล</label>
              <select 
                value={selectedUserUid} 
                onChange={e => setSelectedUserUid(e.target.value)} 
                className="w-full p-4 border border-slate-200 dark:border-slate-600/70 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 outline-none font-semibold transition-all cursor-pointer"
              >
                <option value="">-- เลือกรายชื่อ --</option>
                {usersList.map(u => (
                  <option key={u.uid} value={u.uid}>{u.rank}{u.fname} {u.lname} ({u.dept})</option>
                ))}
              </select>
            </div>
            
            <div className="group">
              <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-slate-500">สถานะ</label>
              <select 
                value={status} 
                onChange={e => setStatus(e.target.value)} 
                className="w-full p-4 border border-slate-200 dark:border-slate-600/70 rounded-2xl bg-slate-50 dark:bg-slate-900 outline-none font-semibold transition-all cursor-pointer"
              >
                <option value="มาปฏิบัติราชการ">มาปฏิบัติราชการ</option>
                <option value="ลากิจ">ลากิจ</option>
                <option value="ลาป่วย">ลาป่วย</option>
                <option value="ลาพักผ่อน">ลาพักผ่อน</option>
                <option value="ไปราชการ">ไปราชการ</option>
                <option value="ขาดราชการ">ขาดราชการ</option>
              </select>
            </div>
            
            <div className="group">
              <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-slate-500">หมายเหตุ/เหตุผล</label>
              <input 
                type="text" 
                value={note} 
                onChange={e => setNote(e.target.value)} 
                placeholder="ระบุรายละเอียดเพิ่มเติม..." 
                className="w-full p-4 border border-slate-200 dark:border-slate-600/70 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 outline-none font-semibold transition-all" 
              />
            </div>
            
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="w-full py-4.5 mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-2xl shadow-lg active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
            >
              {isSaving ? 'กำลังบันทึก...' : 'บันทึกสถานะประจำวัน'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
        <h4 className="font-black text-xl mb-6 flex items-center gap-2">
          <span>ประวัติการลงสถานะล่าสุด</span>
          <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full uppercase">Today</span>
        </h4>
        <div className="space-y-3">
          {attendances.length === 0 ? (
            <p className="text-center text-slate-400 py-4 font-bold">ยังไม่มีข้อมูลของวันนี้</p>
          ) : (
            attendances.slice(0, 5).map((a, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                <div>
                  <p className="font-bold text-slate-800 dark:text-white text-sm">{a.userName}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{a.note || 'ไม่มีหมายเหตุ'}</p>
                </div>
                <div className={`px-4 py-1.5 rounded-lg text-xs font-black shadow-sm ${
                  a.status === 'มาปฏิบัติราชการ' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {a.status}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TabReportStatus;
