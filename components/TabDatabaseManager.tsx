import React, { useState } from 'react';

interface DbStatCardProps {
  title: string;
  count: number;
  max: number;
  color: 'blue' | 'orange' | 'emerald' | 'purple';
  icon: string;
  delay: string;
}

const DbStatCard: React.FC<DbStatCardProps> = ({ title, count, max, color, icon, delay }) => {
  const colorStyles = {
    blue: 'bg-blue-500', 
    orange: 'bg-orange-500', 
    emerald: 'bg-emerald-500', 
    purple: 'bg-purple-500'
  };
  const textStyles = {
    blue: 'text-blue-600 dark:text-blue-400', 
    orange: 'text-orange-600 dark:text-orange-400', 
    emerald: 'text-emerald-600 dark:text-emerald-400', 
    purple: 'text-purple-600 dark:text-purple-400'
  };
  const percent = Math.min(100, Math.round((count / max) * 100));

  return (
    <div 
      className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up" 
      style={{ animationDelay: delay }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-lg border border-slate-200/50 dark:border-slate-600 uppercase tracking-widest">
          Max: {max.toLocaleString()}
        </span>
      </div>
      <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-widest">{title}</h4>
      <div className={`text-3xl font-black mb-4 ${textStyles[color]}`}>
        {count.toLocaleString()} <span className="text-sm font-bold text-slate-400">รายการ</span>
      </div>

      <div className="w-full bg-slate-100 dark:bg-slate-700/50 rounded-full h-2 mb-2 overflow-hidden shadow-inner">
        <div 
          className={`h-full rounded-full ${colorStyles[color]} relative overflow-hidden`} 
          style={{ width: `${percent}%` }}
        >
          <div className="absolute inset-0 bg-white/20 w-full h-full animate-[slideInRight_1s_ease-out]"></div>
        </div>
      </div>
      <p className="text-[10px] font-bold text-slate-400 text-right">ใช้พื้นที่ไป {percent}%</p>
    </div>
  );
};

interface TabDatabaseManagerProps {
  usersList: any[];
  MOCK_POSTS: any[];
  MOCK_DOCS: any[];
  MOCK_DUTY: any[];
}

const TabDatabaseManager: React.FC<TabDatabaseManagerProps> = ({ usersList, MOCK_POSTS, MOCK_DOCS, MOCK_DUTY }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      alert('✅ ปรับปรุงประสิทธิภาพฐานข้อมูล (Optimize & Re-index) เสร็จสมบูรณ์!\n\nระบบจะสามารถค้นหาและประมวลผลข้อมูลได้รวดเร็วขึ้น');
    }, 2500);
  };

  const handleBackup = () => {
    alert('💾 ระบบกำลังเตรียมไฟล์ Backup (db_backup_2026.json) สำหรับดาวน์โหลด...');
  };

  const handleClearData = () => {
    if (window.confirm('⚠️ คำเตือนร้ายแรง: ข้อมูลทั้งหมดในฐานข้อมูล (ยกเว้นบัญชี Admin) จะถูกลบอย่างถาวรและไม่สามารถกู้คืนได้\n\nคุณแน่ใจหรือไม่ว่าต้องการดำเนินการต่อ?')) {
      alert('✅ ล้างฐานข้อมูลเสร็จสิ้น! ระบบได้กลับคืนสู่ค่าเริ่มต้น (Factory Reset)');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-8 sm:p-10 relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000"></div>
        <div className="relative z-10">
          <h3 className="font-black text-3xl text-slate-800 dark:text-white flex items-center gap-4 tracking-tight">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-sm animate-float">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            </div>
            การจัดการฐานข้อมูลระบบ
          </h3>
          <p className="text-sm font-medium text-slate-500 mt-4 max-w-2xl leading-relaxed sm:ml-[4.5rem]">
            ส่วนควบคุมสำหรับผู้ดูแลระบบ เพื่อตรวจสอบปริมาณพื้นที่จัดเก็บ (Storage Quota), การสำรองข้อมูล (Backup) และการบำรุงรักษาตารางข้อมูลต่างๆ ภายในระบบ ฝกพ.ศปก.ทบ.
          </p>
        </div>
      </div>

      {/* Database Stats */}
      <div>
        <h4 className="font-black text-lg text-slate-800 dark:text-white mb-4 px-2 flex items-center gap-2">
          <span className="text-blue-500">📊</span> ปริมาณข้อมูลและการจัดเก็บ (Database Storage)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DbStatCard title="ตารางกำลังพล (Users)" count={usersList.length} max={1000} color="blue" icon="👥" delay="100ms" />
          <DbStatCard title="ตารางโพสต์ (Social Posts)" count={MOCK_POSTS.length} max={5000} color="orange" icon="💛" delay="200ms" />
          <DbStatCard title="ตารางคลังเอกสาร (Docs)" count={MOCK_DOCS.length} max={2000} color="emerald" icon="🗂️" delay="300ms" />
          <DbStatCard title="ตารางเวร (Duty Roster)" count={MOCK_DUTY.length} max={10000} color="purple" icon="📅" delay="400ms" />
        </div>
      </div>

      {/* Database Operations */}
      <div className="pt-4">
        <h4 className="font-black text-lg text-slate-800 dark:text-white mb-4 px-2 flex items-center gap-2">
          <span className="text-slate-500">🛠️</span> เครื่องมือจัดการและซ่อมบำรุง (Maintenance Tools)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Backup */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-6 border border-blue-100 dark:border-blue-800/50">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              </div>
              <h5 className="font-extrabold text-lg mb-2 text-slate-800 dark:text-white">สำรองข้อมูล (Backup DB)</h5>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">ส่งออกข้อมูลทั้งหมดในระบบเป็นไฟล์ <span className="font-bold text-blue-500">.JSON</span> เพื่อดาวน์โหลดเก็บไว้ป้องกันข้อมูลสูญหาย</p>
            </div>
            <button onClick={handleBackup} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold rounded-2xl shadow-md shadow-blue-500/20 active:scale-95 transition-all">
              ส่งออกฐานข้อมูล (Export)
            </button>
          </div>

          {/* Optimize */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100 dark:border-emerald-800/50">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h5 className="font-extrabold text-lg mb-2 text-slate-800 dark:text-white">ปรับปรุงดัชนี (Re-index)</h5>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">จัดเรียง Index และล้าง Cache เพื่อแก้ปัญหาความหน่วงและช่วยให้ระบบค้นหาข้อมูลได้รวดเร็วขึ้น</p>
            </div>
            <button 
              onClick={handleOptimize} 
              disabled={isOptimizing} 
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-sm font-bold rounded-2xl shadow-md shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isOptimizing ? <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
              {isOptimizing ? 'กำลังรันสคริปต์ปรับปรุง...' : 'รัน Optimize System'}
            </button>
          </div>

          {/* Reset */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-900/30 text-rose-600 flex items-center justify-center mb-6 border border-rose-100 dark:border-rose-800/50">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </div>
              <h5 className="font-extrabold text-lg mb-2 text-rose-600 dark:text-rose-400">ล้างฐานข้อมูล (Factory Reset)</h5>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">ลบข้อมูลตารางการทำงานทั้งหมด <span className="font-bold text-rose-500">(อันตราย)</span> นิยมใช้ตอนเปลี่ยนปีงบประมาณ หรือเคลียร์ข้อมูลขยะ</p>
            </div>
            <button onClick={handleClearData} className="w-full py-4 bg-white dark:bg-slate-800 text-rose-600 hover:bg-rose-600 hover:text-white text-sm font-bold rounded-2xl border-2 border-rose-100 dark:border-rose-900/50 shadow-sm active:scale-95 transition-all">
              ⚠️ ล้างข้อมูลทั้งหมด (Clear DB)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabDatabaseManager;
