import React, { useState, useEffect } from 'react';

const TabUploadVTC: React.FC = () => {
  const [title, setTitle] = useState('');
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [vtcLogs, setVtcLogs] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchVtcLogs();
  }, []);

  const fetchVtcLogs = async () => {
    try {
      const resp = await fetch('/api/vtc');
      const result = await resp.json();
      if (result.success) setVtcLogs(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!title || !imagePreview) return;
    setIsUploading(true);
    const dateStr = new Date().toLocaleDateString('th-TH');
    const timeStr = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const payload = {
      title,
      date: dateStr,
      time: timeStr,
      imageUrl: imagePreview,
      adminName: 'Admin'
    };

    try {
      const resp = await fetch('/api/vtc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await resp.json();
      if (result.success) {
        fetchVtcLogs();
        setTitle('');
        setImagePreview(null);
        alert('อัปโหลดข้อมูล VTC เรียบร้อยแล้ว');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border border-slate-200/80 dark:border-slate-700/80 p-8 sm:p-10 max-w-xl mx-auto mt-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm animate-float">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <div>
            <h3 className="font-black text-2xl text-slate-800 dark:text-white tracking-tight">อัปโหลดภาพรายงาน VTC</h3>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">บันทึกรูปภาพเหตุการณ์ลงฐานข้อมูล</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="group">
            <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-slate-500">ชื่องาน / การประชุม</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-4 border border-slate-200 dark:border-slate-600/70 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 outline-none font-semibold transition-all shadow-sm" 
              placeholder="ระบุหัวข้อ VTC..." 
            />
          </div>
          
          <div className="group">
            <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-slate-500">เลือกไฟล์รูปภาพ</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="w-full p-3 border border-slate-200 dark:border-slate-600/70 rounded-2xl bg-slate-50 dark:bg-slate-900 outline-none file:mr-5 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-white dark:file:bg-slate-800 file:text-blue-600 cursor-pointer shadow-sm text-sm" 
            />
          </div>
          
          <div className="w-full h-64 rounded-[2rem] border-2 border-dashed border-slate-300 dark:border-slate-600/70 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-900 group transition-colors hover:border-blue-400">
            {imagePreview ? (
              <img src={imagePreview} className="h-full w-full object-contain p-2 animate-scale-in" alt="Preview" />
            ) : (
              <span className="text-slate-400 font-semibold flex flex-col items-center group-hover:text-blue-500 transition-colors">
                <svg className="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                ตัวอย่างรูปภาพ
              </span>
            )}
          </div>
          
          <button 
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full py-4.5 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
          >
            {isUploading ? 'กำลังอัปโหลด...' : 'บันทึกลงฐานข้อมูลพื้นฐาน'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <h4 className="font-black text-2xl text-center text-slate-800 dark:text-white mb-2">คลังภาพรายงานล่าสุด</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vtcLogs.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 font-bold border-2 border-dashed border-slate-200 rounded-[2.5rem]">ยังไม่มีรูปภาพในคลัง</div>
          ) : (
            vtcLogs.map((log, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all group animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="h-44 overflow-hidden relative">
                  <img src={log.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={log.title} />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600/90 backdrop-blur-md text-[10px] font-black text-white px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-widest">{log.date}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-black text-slate-800 dark:text-white line-clamp-1 mb-2">{log.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {log.time} น.</span>
                    <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Admin</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TabUploadVTC;
