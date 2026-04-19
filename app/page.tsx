'use client';

import React, { useState, useEffect } from 'react';

// Refactored Components
import TabSocialStats from '@/components/TabSocialStats';
import TabAnalytics from '@/components/TabAnalytics';
import TabDatabaseManager from '@/components/TabDatabaseManager';
import TabOrgChart from '@/components/TabOrgChart';
import TabReportStatus from '@/components/TabReportStatus';
import TabAssignDuty from '@/components/TabAssignDuty';
import TabUploadVTC from '@/components/TabUploadVTC';


// ==========================================
// 1. Initial Mock Data (สำหรับตั้งต้น)
// ==========================================
const INITIAL_USERS = [
  { uid: 'U001', idCard: 'admin', milId: '1234', rank: 'พ.อ.', fname: 'ทดสอบ', lname: 'ระบบ', nickname: 'เทสต์', position: 'ผู้ดูแลระบบ', dept: 'ส่วนบังคับบัญชา', phone: '080-000-0000', email: 'admin@army.go.th', lineId: 'admin_test', address: '123 ถ.ราชดำเนิน กทม.', birthdate: '01/01/2520', isAdmin: true, postCount: 45 },
  { uid: 'U002', idCard: 'user', milId: '1234', rank: 'ร.อ.', fname: 'สมชาย', lname: 'ใจดี', nickname: 'ชาย', position: 'เจ้าหน้าที่ธุรการ', dept: 'แผนกธุรการ', phone: '081-111-1111', email: 'somchai@army.go.th', lineId: 'somchai.j', address: '456 ถ.พหลโยธิน กทม.', birthdate: '15/05/2530', isAdmin: false, postCount: 12 },
  { uid: 'U003', idCard: 'user2', milId: '1234', rank: 'จ.ส.อ.', fname: 'รักชาติ', lname: 'ยิ่งชีพ', nickname: 'ชาติ', position: 'เสมียน', dept: 'แผนกแผนและโครงการ', phone: '082-222-2222', email: 'rukchat@army.go.th', lineId: 'rukchat99', address: '789 ลพบุรี', birthdate: '20/08/2535', isAdmin: false, postCount: 8 },
  { uid: 'U004', idCard: 'user3', milId: '1234', rank: 'ส.อ.', fname: 'กล้าหาญ', lname: 'ชาญชัย', nickname: 'กล้า', position: 'เจ้าหน้าที่', dept: 'แผนกจัดการ', phone: '083-333-3333', email: 'klahan@army.go.th', lineId: 'kla.han', address: '101 สระบุรี', birthdate: '10/10/2540', isAdmin: false, postCount: 20 },
];

const MOCK_POSTS = [
  { id: 1, date: '17/04/2026', link: 'https://facebook.com/post1', platform: 'Facebook' },
  { id: 2, date: '16/04/2026', link: 'https://x.com/post2', platform: 'X (Twitter)' },
  { id: 3, date: '15/04/2026', link: 'https://tiktok.com/@army/video/12345', platform: 'TikTok' },
  { id: 4, date: '14/04/2026', link: 'https://pantip.com/topic/12345678', platform: 'Pantip' },
];

const MOCK_TASKS = [
  { id: 1, date: '17/04/2026', detail: 'จัดทำรายงานสรุปยอดกำลังพลประจำสัปดาห์', progress: '✅ เสร็จสมบูรณ์' },
  { id: 2, date: '16/04/2026', detail: 'เตรียมเอกสารการประชุม ศปก.ทบ.', progress: '⏳ อยู่ระหว่างดำเนินการ' },
];

const MOCK_DUTY = [
  { id: 1, date: '20/04/2026', type: 'นายทหารเวร', time: '08:00 - 16:00', status: 'รอปฏิบัติงาน' },
  { id: 2, date: '10/04/2026', type: 'เวรรักษาการณ์', time: '16:00 - 24:00', status: 'ปฏิบัติแล้ว' },
];

const MOCK_CALENDAR = [
  { id: 1, date: '18/04/2026', title: 'ประชุมประจำเดือน', detail: 'ณ ห้องประชุม 1 อาคาร ศปก.ทบ.', admin: 'พ.อ. ทดสอบ ระบบ' },
  { id: 2, date: '25/04/2026', title: 'ตรวจเยี่ยมกำลังพล', detail: 'เตรียมความพร้อมบริเวณกองร้อย', admin: 'พ.อ. ทดสอบ ระบบ' },
];

const MOCK_ZOOM = [
  { id: 1, title: 'ประชุมด่วน ศปก.ทบ.', date: '17/04/2026', time: '14:00', link: '#', admin: 'พ.อ. ทดสอบ ระบบ' },
  { id: 2, title: 'อบรมการใช้งานระบบใหม่', date: '19/04/2026', time: '09:00', link: '#', admin: 'ร.อ. สมชาย ใจดี' },
];

const MOCK_DOCS = [
  { id: 1, orderNum: '123/2569', title: 'คำสั่งแต่งตั้งเวรปฏิบัติหน้าที่', dept: 'แผนกธุรการ', date: '15/04/2026', year: '2569', url: '#' },
  { id: 2, orderNum: '124/2569', title: 'รายงานการฝึกประจำปี', dept: 'แผนกแผนและโครงการ', date: '14/04/2026', year: '2569', url: '#' },
];

// ==========================================
// Custom CSS for Advanced Animations
// ==========================================
const globalStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
  .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
  .animate-slide-in-right { animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
  .animate-scale-in { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-blob { animation: blob 7s infinite; }
  
  .glass-panel {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.4);
  }
  .dark .glass-panel {
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(156, 163, 175, 0.5); border-radius: 20px; }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(71, 85, 105, 0.5); }
  
  @media print {
    body * { visibility: hidden; }
    #printable-area, #printable-area * { visibility: visible; }
    #printable-area { position: absolute; left: 0; top: 0; width: 100%; }
    .no-print { display: none !important; }
  }
`;

// ==========================================
// 2. Main Application Component
// ==========================================
export default function App() {
  // --- Global States ---
  const [globalUsers, setGlobalUsers] = useState<any[]>(INITIAL_USERS);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const result = await response.json();
        if (result.success) {
          setGlobalUsers(result.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const [user, setUser] = useState<any>(null);
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('checkin');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Login States
  const [idCard, setIdCard] = useState('');
  const [milId, setMilId] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginMsg, setLoginMsg] = useState('');

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCard || !milId) {
      setLoginMsg('❌ กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    setLoginLoading(true);
    setLoginMsg('');

    setTimeout(async () => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idCard, milId })
        });
        const result = await response.json();

        if (result.success) {
          setIsAnimatingOut(true);
          setTimeout(() => {
            const userData = result.data;
            setUser(userData);
            setActiveTab(userData.isAdmin ? 'analytics' : 'checkin');
            setIsAnimatingOut(false);
            setLoginLoading(false);
          }, 500);
        } else {
          setLoginMsg('❌ ' + (result.message || 'เลขประจำตัว หรือ รหัสผ่านไม่ถูกต้อง'));
          setLoginLoading(false);
        }
      } catch (error) {
        console.error('Login error:', error);
        setLoginMsg('❌ เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
        setLoginLoading(false);
      }
    }, 800);
  };

  const handleLogout = () => {
    setUser(null);
    setIdCard('');
    setMilId('');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const getPageTitle = (tab: string) => {
    const titles: Record<string, string> = {
      checkin: 'บันทึกเวลาปฏิบัติงาน',
      social: 'ระบบโพสต์เทิดทูนสถาบัน',
      tasks: 'รายงานผลการปฏิบัติงาน',
      myduty: 'ตารางเวรปฏิบัติงานของฉัน',
      calendar: 'ปฏิทินกิจกรรมหน่วย',
      zoom: 'ห้องประชุมออนไลน์ (Zoom)',
      documents: 'คลังเอกสารและคำสั่ง',
      directory: 'ทำเนียบกำลังพล',
      analytics: 'ภาพรวมระบบ (Dashboard)',
      reportStatus: 'จัดการสถานะกำลังพล',
      assignDuty: 'จัดตารางเวรมาตรฐาน',
      orgchart: 'โครงสร้างหน่วย',
      uploadVTC: 'อัปโหลดภาพ VTC',
      socialStats: 'สถิติการโพสต์เทิดทูนฯ',
      manageUsers: 'จัดการฐานข้อมูลกำลังพล'
    };
    return titles[tab] || 'ตั้งค่าระบบ';
  };

  return (
    <>
      <style>{globalStyles}</style>

      {/* Global Responsive Overlay for mobile sidebar */}
      {user && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[40] md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {!user ? (
        // --- Login Screen ---
        <div className={`relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-slate-50'}`}>
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '4s' }}></div>

          <button onClick={toggleTheme} className="absolute top-6 right-6 p-3 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-lg hover:scale-110 transition-transform z-10 text-slate-800 dark:text-white border border-white/20">
            {theme === 'light' ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          </button>

          <div className={`relative w-full max-w-md p-10 rounded-[2rem] shadow-2xl glass-panel transition-all duration-500 ease-out ${isAnimatingOut ? 'opacity-0 scale-95 translate-y-10' : 'opacity-100 scale-100 translate-y-0'} animate-scale-in`}>
            <div className="text-center mb-10">
              <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 shadow-[0_10px_40px_rgba(37,99,235,0.4)] bg-white dark:bg-slate-900 relative group animate-float overflow-hidden border-4 border-slate-50 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <img src="/logo.png" alt="Logo" className="w-28 h-28 object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">ฝกพ.ศปก.ทบ.</h1>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 inline-block px-4 py-1.5 rounded-full shadow-sm">ระบบบริหารจัดการกำลังพล</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="group animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-slate-500 dark:text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">เลขประจำตัวประชาชน</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-5 h-5 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <input type="text" value={idCard} onChange={e => setIdCard(e.target.value)} className="w-full pl-11 p-4 border border-slate-200 dark:border-slate-600/60 rounded-2xl bg-white/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all dark:text-white font-medium shadow-sm hover:border-blue-300" placeholder="ทดสอบพิมพ์: admin หรือ user" />
                </div>
              </div>
              <div className="group animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-slate-500 dark:text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">รหัสผ่าน</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-5 h-5 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <input type="password" value={milId} onChange={e => setMilId(e.target.value)} className="w-full pl-11 p-4 border border-slate-200 dark:border-slate-600/60 rounded-2xl bg-white/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all dark:text-white font-medium shadow-sm hover:border-blue-300" placeholder="ทดสอบพิมพ์: 1234" />
                </div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <button type="submit" disabled={loginLoading} className="w-full py-4 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] hover:-translate-y-1 transform transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none flex justify-center items-center group overflow-hidden relative">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  {loginLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : <span className="relative z-10 flex items-center gap-2">เข้าสู่ระบบ <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></span>}
                </button>
              </div>
              {loginMsg && <div className="text-rose-500 bg-rose-50 dark:bg-rose-900/30 border border-rose-100 dark:border-rose-800 p-4 rounded-xl text-center mt-4 text-sm font-bold animate-fade-in-up shadow-sm">{loginMsg}</div>}
            </form>
          </div>
        </div>
      ) : (
        // --- Main Layout ---
        <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0f172a] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>

          {/* Sidebar */}
          <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed md:relative w-[280px] h-full flex flex-col z-50 transition-transform duration-400 ease-in-out bg-white/95 dark:bg-slate-800/95 backdrop-blur-2xl border-r border-slate-200/80 dark:border-slate-700/50 shadow-2xl md:shadow-none`}>
            <div className="h-20 flex items-center px-6 border-b border-slate-200/80 dark:border-slate-700/50 justify-between mt-2 md:mt-0 shrink-0">
              <div className="flex items-center gap-4 animate-slide-in-right">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700/60 overflow-hidden relative group shrink-0">
                  <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <span className="text-lg font-extrabold tracking-wide block leading-tight text-slate-800 dark:text-white">ฝกพ.ศปก.</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">Human Resources</span>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
              <div className="px-2 pb-2 pt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-slide-in-right">การปฏิบัติงาน</div>
              <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} label="ลงเวลาทำงาน" isActive={activeTab === 'checkin'} onClick={() => handleTabChange('checkin')} delay="50ms" />
              <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>} label="บันทึกโพสต์เทิดทูนฯ" isActive={activeTab === 'social'} onClick={() => handleTabChange('social')} delay="100ms" />
              <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>} label="รายงานการทำงาน" isActive={activeTab === 'tasks'} onClick={() => handleTabChange('tasks')} delay="150ms" />
              <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} label="ตารางเวรของฉัน" isActive={activeTab === 'myduty'} onClick={() => handleTabChange('myduty')} delay="200ms" />

              <div className="px-2 pb-2 pt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-slide-in-right" style={{ animationDelay: '250ms' }}>ข้อมูลส่วนกลาง</div>
              <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} label="ปฏิทินปฏิบัติงาน" isActive={activeTab === 'calendar'} onClick={() => handleTabChange('calendar')} delay="300ms" />
              <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>} label="ห้องประชุม Zoom" isActive={activeTab === 'zoom'} onClick={() => handleTabChange('zoom')} delay="350ms" />
              <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} label="คลังเอกสาร/คำสั่ง" isActive={activeTab === 'documents'} onClick={() => handleTabChange('documents')} delay="400ms" />
              <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} label="ทำเนียบกำลังพล" isActive={activeTab === 'directory'} onClick={() => handleTabChange('directory')} delay="450ms" />

              {user.isAdmin && (
                <>
                  <div className="px-2 pb-2 pt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-slide-in-right" style={{ animationDelay: '500ms' }}>สำหรับผู้ดูแลระบบ</div>
                  <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} label="ภาพรวม (Dashboard)" isActive={activeTab === 'analytics'} onClick={() => handleTabChange('analytics')} delay="550ms" />
                  <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} label="จัดการฐานข้อมูลกำลังพล" isActive={activeTab === 'manageUsers'} onClick={() => handleTabChange('manageUsers')} delay="580ms" />
                  <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} label="โครงสร้างหน่วย" isActive={activeTab === 'orgchart'} onClick={() => handleTabChange('orgchart')} delay="600ms" />
                  <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>} label="จัดการสถานะกำลังพล" isActive={activeTab === 'reportStatus'} onClick={() => handleTabChange('reportStatus')} delay="650ms" />
                  <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>} label="จัดตารางเวรมาตรฐาน" isActive={activeTab === 'assignDuty'} onClick={() => handleTabChange('assignDuty')} delay="700ms" />
                  <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>} label="อัปโหลดภาพ VTC" isActive={activeTab === 'uploadVTC'} onClick={() => handleTabChange('uploadVTC')} delay="750ms" />
                  <SidebarItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} label="สถิติการโพสต์เทิดทูนฯ" isActive={activeTab === 'socialStats'} onClick={() => handleTabChange('socialStats')} delay="800ms" />
                </>
              )}
            </div>

            {/* User Profile Footer */}
            <div className="p-4 m-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md relative group overflow-hidden shrink-0 transition-all cursor-pointer animate-slide-in-right" style={{ animationDelay: '900ms' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {user.fname.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{user.rank}{user.fname}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user.position}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col min-w-0 h-screen relative">

            {/* Top Header */}
            <header className="h-20 bg-white/70 dark:bg-[#0f172a]/70 backdrop-blur-2xl border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between px-6 z-20 sticky top-0 shadow-sm">
              <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <div className="animate-fade-in-up">
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                    {getPageTitle(activeTab)}
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5 hidden sm:block">
                    {new Date().toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-0.5 transition-all">
                  {theme === 'light' ? <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> : <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                </button>
                <button onClick={handleLogout} className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-800 hover:-translate-y-0.5 transition-all text-sm font-bold flex items-center gap-2">
                  <span className="hidden sm:inline">ออกจากระบบ</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
              </div>
            </header>

            {/* Dynamic Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar relative" id="printable-area">
              <div key={activeTab} className="max-w-7xl mx-auto space-y-8 pb-10 w-full">
                {activeTab === 'checkin' && <TabCheckIn user={user} />}
                {activeTab === 'social' && <TabSocial user={user} />}
                {activeTab === 'tasks' && <TabTasks user={user} />}
                {activeTab === 'myduty' && <TabMyDuty />}
                {activeTab === 'calendar' && <TabCalendar />}
                {activeTab === 'zoom' && <TabZoom />}
                {activeTab === 'documents' && <TabDocuments />}

                {activeTab === 'directory' && <TabDirectory usersList={globalUsers} />}

                {/* Admin Tabs */}
                {activeTab === 'analytics' && user.isAdmin && <TabAnalytics usersList={globalUsers} />}

                {activeTab === 'manageUsers' && user.isAdmin && (
                  <TabManageUsers
                    usersList={globalUsers}
                    setUsersList={setGlobalUsers}
                  />
                )}

                {/* แทนที่หน้า Settings ที่อยู่ระหว่างพัฒนาด้วย TabDatabaseManager */}
                {activeTab === 'settings' && user.isAdmin && (
                  <TabDatabaseManager 
                    usersList={globalUsers} 
                    MOCK_POSTS={MOCK_POSTS}
                    MOCK_DOCS={MOCK_DOCS}
                    MOCK_DUTY={MOCK_DUTY}
                  />
                )}

                {activeTab === 'orgchart' && user.isAdmin && <TabOrgChart />}
                {activeTab === 'reportStatus' && user.isAdmin && <TabReportStatus usersList={globalUsers} />}
                {activeTab === 'assignDuty' && user.isAdmin && <TabAssignDuty usersList={globalUsers} />}
                {activeTab === 'uploadVTC' && user.isAdmin && <TabUploadVTC />}
                {activeTab === 'socialStats' && user.isAdmin && <TabSocialStats usersList={globalUsers} />}

              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

// ==========================================
// 4. Sub-Components
// ==========================================

function SidebarItem({ icon, label, isActive, onClick, delay = '0ms' }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void, delay?: string }) {
  return (
    <button onClick={onClick} className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3.5 transition-all duration-300 font-semibold text-[13px] group relative animate-slide-in-right ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}`} style={{ animationDelay: delay }}>
      {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white rounded-r-full shadow-sm animate-scale-in"></div>}
      <span className={`transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-md' : 'group-hover:scale-110 group-hover:text-blue-500'}`}>{icon}</span>
      <span className="tracking-wide">{label}</span>
    </button>
  );
}

function TabCheckIn({ user }: { user: any }) {
  const [statusMsg, setStatusMsg] = useState('');
  const [isPulsing, setIsPulsing] = useState(false);
  const [todayRecords, setTodayRecords] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchToday = async () => {
      try {
        const res = await fetch(`/api/attendance?date=${todayStr}`);
        const result = await res.json();
        if (result.success) {
          setTodayRecords(result.data.filter((r: any) => r.userUid === user.uid));
        }
      } catch (e) {
        console.error('Fetch attendance error:', e);
      } finally {
        setLoadingHistory(false);
      }
    };
    fetchToday();
  }, [user.uid, todayStr]);

  const handleCheckIn = () => {
    setIsPulsing(true);
    setStatusMsg('กำลังค้นหาพิกัด GPS ของคุณ...');

    const doSave = async (lat: number | null, lng: number | null) => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
        const body = {
          userUid: user.uid,
          userName: `${user.rank}${user.fname} ${user.lname}`,
          date: todayStr,
          time: timeStr,
          lat: lat ?? 0,
          lng: lng ?? 0,
          status: 'ปฏิบัติงาน'
        };
        const res = await fetch('/api/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const result = await res.json();
        if (result.success) {
          setStatusMsg(`✅ บันทึกเวลา ${timeStr} น. สำเร็จ!`);
          setTodayRecords(prev => [result.data, ...prev.filter(r => r._id !== result.data._id)]);
          setTimeout(() => setStatusMsg(''), 5000);
        } else {
          setStatusMsg('❌ บันทึกไม่สำเร็จ: ' + result.message);
        }
      } catch (err) {
        setStatusMsg('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ');
      } finally {
        setIsPulsing(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => doSave(pos.coords.latitude, pos.coords.longitude),
        () => doSave(null, null)
      );
    } else {
      doSave(null, null);
    }
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white dark:border-slate-700/60 p-10 sm:p-16 text-center max-w-xl mx-auto relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
        <div className="relative z-10">
          <div className="w-36 h-36 mx-auto mb-10 relative animate-float">
            <div className={`absolute inset-0 bg-blue-500 rounded-full ${isPulsing ? 'animate-ping opacity-60' : 'opacity-10 dark:opacity-20'}`}></div>
            <div className="absolute inset-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center border-[6px] border-white dark:border-slate-600 shadow-[0_10px_30px_rgba(37,99,235,0.2)]"><svg className="w-14 h-14 text-blue-600 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
          </div>
          <h3 className="text-3xl font-black mb-4 text-slate-800 dark:text-white tracking-tight">ลงเวลาปฏิบัติงาน</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-12 text-sm max-w-sm mx-auto leading-relaxed font-medium">คลิกปุ่มด้านล่างเพื่อให้ระบบบันทึกพิกัด GPS และเวลาทำงานปัจจุบันของคุณเข้าระบบส่วนกลาง</p>
          <button onClick={handleCheckIn} disabled={isPulsing} className="group w-full max-w-sm mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white font-bold py-5 px-6 rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all duration-300 text-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none overflow-hidden relative">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            {isPulsing ? (<svg className="animate-spin h-6 w-6 text-white relative z-10" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>) : <svg className="w-6 h-6 group-hover:-translate-y-1 relative z-10 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>}
            <span className="relative z-10">{isPulsing ? 'กำลังบันทึก...' : 'กดเพื่อลงเวลาทำงานทันที'}</span>
          </button>
          <div className="h-10 mt-8 flex items-center justify-center">
            {statusMsg && <span className={`font-bold text-sm px-5 py-2.5 rounded-full border animate-fade-in-up shadow-sm ${statusMsg.includes('✅') ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800' : statusMsg.includes('❌') ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-900/30 dark:border-rose-800' : 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800'}`}>{statusMsg}</span>}
          </div>
        </div>
      </div>

      {/* Today's history */}
      <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 rounded-[2rem] shadow-lg border border-slate-200/80 dark:border-slate-700/80 p-8">
        <h4 className="font-black text-lg text-slate-800 dark:text-white mb-6 flex items-center gap-3">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          ประวัติการลงเวลาวันนี้
          <span className="text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full">{todayStr}</span>
        </h4>
        {loadingHistory ? (
          <div className="flex items-center justify-center py-8 text-slate-400">
            <svg className="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            กำลังโหลด...
          </div>
        ) : todayRecords.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="font-bold">ยังไม่มีการลงเวลาวันนี้</p>
          </div>
        ) : (
          <div className="space-y-5">
            {todayRecords.map((r, i) => (
              <div key={r._id || i} className="rounded-2xl border border-emerald-100 dark:border-emerald-800/50 overflow-hidden animate-fade-in-up shadow-sm">
                {/* Record header row */}
                <div className="flex items-center justify-between px-5 py-4 bg-emerald-50 dark:bg-emerald-900/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">{r.status || 'ปฏิบัติงาน'}</p>
                      {r.lat && r.lat !== 0 && r.lng && r.lng !== 0 ? (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                          📍 {Number(r.lat).toFixed(5)}, {Number(r.lng).toFixed(5)}
                        </p>
                      ) : (
                        <p className="text-[11px] text-slate-400 mt-0.5">📍 ไม่ได้รับพิกัด GPS</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 block leading-none">{r.time || '--:--'}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">น.</span>
                  </div>
                </div>

                {/* Map embed — show when GPS coords exist */}
                {r.lat && r.lat !== 0 && r.lng && r.lng !== 0 && (
                  <div className="relative">
                    <iframe
                      title={`map-${r._id || i}`}
                      width="100%"
                      height="220"
                      style={{ border: 0, display: 'block' }}
                      loading="lazy"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${Number(r.lng) - 0.005}%2C${Number(r.lat) - 0.005}%2C${Number(r.lng) + 0.005}%2C${Number(r.lat) + 0.005}&layer=mapnik&marker=${Number(r.lat)}%2C${Number(r.lng)}`}
                    />
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${r.lat}&mlon=${r.lng}#map=16/${r.lat}/${r.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute bottom-2 right-2 text-[10px] font-bold bg-white/90 text-blue-600 px-2.5 py-1 rounded-lg shadow border border-blue-100 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      เปิดใน OpenStreetMap ↗
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TabSocial({ user }: { user: any }) {
  const [link, setLink] = useState('');
  const [date, setDate] = useState('');
  const [platform, setPlatform] = useState('Facebook');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts?userUid=${user.uid}`);
        const result = await res.json();
        if (result.success) setPosts(result.data);
      } catch (e) {
        console.error('Fetch posts error:', e);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, [user.uid]);

  const platformsList = ['Facebook', 'X (Twitter)', 'Instagram', 'TikTok', 'Dek-D', 'Pantip', 'อื่นๆ'];

  const getPlatformStyle = (pf: string, isActive: boolean) => {
    if (isActive) {
      if (pf === 'Facebook') return 'bg-[#1877F2] text-white shadow-lg shadow-[#1877F2]/40 scale-105 border-transparent';
      if (pf === 'X (Twitter)') return 'bg-slate-800 text-white shadow-lg shadow-slate-800/40 scale-105 dark:bg-slate-100 dark:text-slate-900 border-transparent';
      if (pf === 'Instagram') return 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/40 scale-105 border-transparent';
      if (pf === 'TikTok') return 'bg-black text-[#00f2fe] shadow-lg shadow-black/40 scale-105 dark:bg-white dark:text-black border-transparent';
      if (pf === 'Dek-D') return 'bg-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/40 scale-105 border-transparent';
      if (pf === 'Pantip') return 'bg-[#2E204A] text-white shadow-lg shadow-[#2E204A]/40 scale-105 border-transparent';
      return 'bg-slate-500 text-white shadow-lg shadow-slate-500/40 scale-105 border-transparent';
    }
    return 'bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700';
  };

  const getPlatformIconColor = (pf: string) => {
    if (pf === 'Facebook') return 'bg-[#1877F2] text-white';
    if (pf === 'X (Twitter)') return 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900';
    if (pf === 'Instagram') return 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white';
    if (pf === 'TikTok') return 'bg-black text-[#00f2fe] dark:bg-white dark:text-black';
    if (pf === 'Dek-D') return 'bg-[#FF7A00] text-white';
    if (pf === 'Pantip') return 'bg-[#2E204A] text-white';
    return 'bg-slate-400 text-white';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!link || !date || !platform) return;
    setIsSubmitting(true);
    try {
      const body = {
        userUid: user.uid,
        userName: `${user.rank}${user.fname} ${user.lname}`,
        platform,
        link,
        date
      };
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const result = await res.json();
      if (result.success) {
        setPosts(prev => [result.data, ...prev]);
        setLink('');
        setDate('');
      }
    } catch (e) {
      console.error('Submit post error:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-fade-in-up">
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[2rem] shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/80 p-8 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-400/10 dark:bg-orange-500/10 rounded-full blur-2xl"></div>
        <div className="flex items-center gap-4 mb-8 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 text-white flex items-center justify-center shadow-[0_8px_15px_rgba(249,115,22,0.3)] animate-float"><svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></div>
          <div><h3 className="font-black text-2xl text-slate-800 dark:text-white">บันทึกลิงก์โพสต์</h3><p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">กิจกรรมเทิดทูนสถาบัน</p></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="group">
            <label className="block text-[11px] font-bold uppercase tracking-widest mb-3 text-slate-500 group-focus-within:text-orange-500 transition-colors">ช่องทาง (Platform)</label>
            <div className="flex flex-wrap gap-2.5">
              {platformsList.map(pf => (
                <button
                  key={pf} type="button" onClick={() => setPlatform(pf)}
                  className={`px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-300 uppercase tracking-wide ${getPlatformStyle(pf, platform === pf)}`}
                >{pf}</button>
              ))}
            </div>
          </div>

          <div className="group"><label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-slate-500 group-focus-within:text-orange-500 transition-colors">วันที่โพสต์</label><input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full p-4 border border-slate-200 dark:border-slate-600/70 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all dark:text-white font-medium hover:border-orange-300 shadow-sm cursor-pointer" /></div>
          <div className="group"><label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-slate-500 group-focus-within:text-orange-500 transition-colors">URL ลิงก์โพสต์</label><input type="url" value={link} onChange={e => setLink(e.target.value)} required placeholder="https://..." className="w-full p-4 border border-slate-200 dark:border-slate-600/70 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all dark:text-white font-medium hover:border-orange-300 shadow-sm" /></div>

          <button type="submit" disabled={isSubmitting} className="w-full py-4.5 mt-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold rounded-2xl shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_30px_rgba(249,115,22,0.4)] hover:-translate-y-1 transform transition-all duration-300 active:scale-[0.98] flex justify-center items-center gap-2 overflow-hidden relative group">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            {isSubmitting ? <span className="animate-pulse relative z-10">กำลังบันทึก...</span> : <span className="relative z-10 flex items-center gap-2">ส่งบันทึกข้อมูล <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></span>}
          </button>
        </form>
      </div>

      <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-[2rem] shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/80 p-8 flex flex-col hover:shadow-xl transition-shadow duration-300 animate-fade-in-up animation-delay-100">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-700/50">
          <h3 className="font-black text-xl text-slate-800 dark:text-white">ประวัติการส่งลิงก์ล่าสุด</h3>
          <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-500 py-1.5 px-4 rounded-full shadow-inner">{posts.length} รายการ</span>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {loadingPosts ? (
            <div className="flex items-center justify-center py-12 text-slate-400">
              <svg className="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              กำลังโหลด...
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <svg className="w-12 h-12 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              <p className="font-bold">ยังไม่มีประวัติการบันทึกโพสต์</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((p, idx) => (
                <div key={p._id || idx} className="group flex items-center justify-between p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in-up shadow-sm" style={{ animationDelay: `${(idx % 10) * 80}ms` }}>
                  <div className="flex items-center gap-5 overflow-hidden">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300 ${getPlatformIconColor(p.platform)}`}>
                      <span className="font-black text-xl">{p.platform.charAt(0)}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">{p.platform}</span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{p.date}</span>
                      </div>
                      <a href={p.link} className="text-[13px] font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 truncate block transition-colors leading-relaxed max-w-[200px] sm:max-w-[300px]">{p.link}</a>
                    </div>
                  </div>
                  <a href={p.link} target="_blank" rel="noreferrer" className="shrink-0 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-300 hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all hover:scale-110 border border-slate-200 dark:border-slate-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabTasks({ user }: { user: any }) {
  const [detail, setDetail] = useState('');
  const [taskStatus, setTaskStatus] = useState('⏳ อยู่ระหว่างดำเนินการ');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [submitMsg, setSubmitMsg] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`/api/reports?userUid=${user.uid}`);
        const result = await res.json();
        if (result.success) setReports(result.data);
      } catch (e) {
        console.error('Fetch reports error:', e);
      } finally {
        setLoadingReports(false);
      }
    };
    fetchReports();
  }, [user.uid]);

  const handleSubmit = async () => {
    if (!detail.trim()) return;
    setIsSubmitting(true);
    setSubmitMsg('');
    try {
      const body = {
        userUid: user.uid,
        userName: `${user.rank}${user.fname} ${user.lname}`,
        date: new Date().toISOString().split('T')[0],
        detail,
        status: taskStatus
      };
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const result = await res.json();
      if (result.success) {
        setReports(prev => [result.data, ...prev]);
        setDetail('');
        setSubmitMsg('✅ ส่งรายงานสำเร็จ!');
        setTimeout(() => setSubmitMsg(''), 4000);
      }
    } catch (e) {
      console.error('Submit report error:', e);
      setSubmitMsg('❌ เกิดข้อผิดพลาด');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/80 p-8 hover:shadow-xl transition-shadow duration-300">
        <h3 className="font-black text-2xl text-slate-800 dark:text-white mb-8 flex items-center gap-3"><span className="text-blue-500 animate-float inline-block">📝</span> ส่งรายงานทำงาน</h3>
        <div className="space-y-6">
          <div className="group"><label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-slate-500 group-focus-within:text-blue-500 transition-colors">รายละเอียดงาน</label><textarea rows={5} value={detail} onChange={e => setDetail(e.target.value)} className="w-full p-4 border border-slate-200 dark:border-slate-600/70 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all dark:text-white resize-none shadow-sm hover:border-blue-300 font-medium" placeholder="สรุปงานที่ทำในวันนี้..."></textarea></div>
          <div className="group"><label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-slate-500 group-focus-within:text-blue-500 transition-colors">สถานะ</label><select value={taskStatus} onChange={e => setTaskStatus(e.target.value)} className="w-full p-4 border border-slate-200 dark:border-slate-600/70 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all dark:text-white font-medium shadow-sm hover:border-blue-300 cursor-pointer"><option>⏳ อยู่ระหว่างดำเนินการ</option><option>✅ เสร็จสมบูรณ์</option><option>⚠️ ติดปัญหา/รอตรวจสอบ</option></select></div>
          {submitMsg && <div className={`text-sm font-bold text-center py-2 rounded-xl animate-fade-in-up ${submitMsg.includes('✅') ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' : 'bg-rose-50 text-rose-600 dark:bg-rose-900/30'}`}>{submitMsg}</div>}
          <button onClick={handleSubmit} disabled={isSubmitting || !detail.trim()} className="w-full py-5 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] hover:-translate-y-1 transform transition-all duration-300 active:scale-[0.98] flex justify-center items-center gap-2 group relative overflow-hidden disabled:opacity-60 disabled:hover:translate-y-0"><div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div><span className="relative z-10 flex items-center gap-2">{isSubmitting ? 'กำลังส่ง...' : <>ส่งรายงาน <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></>}</span></button>
        </div>
      </div>
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[2rem] shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/80 p-8 flex flex-col hover:shadow-xl transition-shadow duration-300 animate-fade-in-up animation-delay-100">
        <h3 className="font-black text-xl text-slate-800 dark:text-white mb-8 pb-4 border-b border-slate-100 dark:border-slate-700/50">ประวัติการรายงานของฉัน <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-500 py-1 px-3 rounded-full ml-2">{reports.length} รายการ</span></h3>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loadingReports ? (
            <div className="flex items-center justify-center py-12 text-slate-400">
              <svg className="animate-spin h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              กำลังโหลด...
            </div>
          ) : reports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <svg className="w-12 h-12 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              <p className="font-bold">ยังไม่มีประวัติการรายงาน</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((t, idx) => (
                <div key={t._id || idx} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in-up shadow-sm group" style={{ animationDelay: `${(idx % 10) * 80}ms` }}>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg flex items-center gap-1.5 border border-blue-100 dark:border-blue-800/50"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> {t.date}</span>
                    <span className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border shadow-sm ${t.status?.includes('เสร็จ') ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50' : t.status?.includes('ติดปัญหา') ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800/50' : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50'}`}>{t.status}</span>
                  </div>
                  <p className="text-[15px] font-semibold text-slate-700 dark:text-slate-300 leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t.detail}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabMyDuty() {
  return (
    <div className="animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/80 p-8 sm:p-10">
        <h3 className="font-black text-3xl text-slate-800 dark:text-white mb-2 tracking-tight">ตารางเวรปฏิบัติงาน</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">ตรวจสอบคิวเวรและเวลาปฏิบัติหน้าที่ของคุณ</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MOCK_DUTY.map((d, idx) => (
            <div key={d.id} className="relative p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700/60 bg-white dark:bg-slate-900 shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-400 animate-fade-in-up group overflow-hidden" style={{ animationDelay: `${idx * 150}ms` }}>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="text-blue-600 dark:text-blue-400 font-black text-2xl mb-2 flex items-center gap-2"><svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> {d.date}</div>
                <div className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-6 flex items-center gap-2 bg-slate-50 dark:bg-slate-800 w-fit px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {d.time} น.</div>
                <div className="font-extrabold text-slate-800 dark:text-slate-100 mb-6 text-lg group-hover:text-blue-600 transition-colors">{d.type}</div>
                <div className={`inline-flex items-center justify-center w-full px-4 py-3 rounded-xl text-xs font-bold shadow-sm border ${d.status === 'ปฏิบัติแล้ว' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50' : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50'}`}>
                  {d.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabCalendar() {
  return (
    <div className="animate-fade-in-up space-y-8">
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/80 p-8 sm:p-10">
        <h3 className="font-black text-3xl text-slate-800 dark:text-white mb-2 tracking-tight flex items-center gap-3"><span className="animate-float inline-block">🗓️</span> ปฏิทินภารกิจหน่วย</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium ml-11">แสดงกิจกรรมสำคัญและการนัดหมายของ ศปก.ทบ.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {MOCK_CALENDAR.map((c, idx) => (
            <div key={c.id} className="flex gap-5 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/60 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:shadow-[0_10px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 animate-fade-in-up shadow-sm group" style={{ animationDelay: `${idx * 150}ms` }}>
              <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 border border-indigo-100 dark:border-indigo-800/50 flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-0.5">{c.date.split('/')[1]}</span>
                <span className="text-3xl font-black leading-none">{c.date.split('/')[0]}</span>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-extrabold text-lg text-slate-800 dark:text-white mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{c.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> {c.detail}</p>
                <p className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 inline-block px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 w-fit">👤 {c.admin}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabZoom() {
  return (
    <div className="animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/80 p-8 sm:p-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-3xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner animate-float"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></div>
          <div><h3 className="font-black text-3xl text-slate-800 dark:text-white tracking-tight">ห้องประชุมออนไลน์</h3><p className="text-sm font-medium text-slate-500 mt-1">ลิงก์เข้าร่วมการประชุม Zoom</p></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MOCK_ZOOM.map((z, idx) => (
            <div key={z.id} className="p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900 hover:shadow-xl hover:-translate-y-2 transition-all duration-400 shadow-sm animate-fade-in-up flex flex-col justify-between group" style={{ animationDelay: `${idx * 150}ms` }}>
              <div>
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mb-5 border border-slate-100 dark:border-slate-700 text-[#2D8CFF] group-hover:scale-110 transition-transform"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.585 13.607l-.27-.012H1.886l3.236-3.137L1.886 7.32h2.429l.27-.012 2.457 2.378-2.457 3.921zm3.87 0l-.27-.012H5.755l3.237-3.137L5.755 7.32h2.43l.27-.012 2.456 2.378-2.456 3.921zm3.87 0l-.27-.012H9.626l3.236-3.137L9.626 7.32h2.429l.27-.012 2.457 2.378-2.457 3.921zm7.42-2.31l-.269-.012h-2.429l3.237-3.137-3.237-3.138h2.429l.27-.012 2.456 2.378-2.456 3.921z" /></svg></div>
                <h4 className="font-extrabold text-xl mb-5 text-slate-800 dark:text-white line-clamp-2 leading-tight group-hover:text-[#2D8CFF] transition-colors">{z.title}</h4>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 bg-white dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm w-fit"><svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> {z.date}</div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 bg-white dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm w-fit"><svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {z.time} น.</div>
                </div>
              </div>
              <a href={z.link} className="block text-center w-full py-4 bg-gradient-to-r from-[#2D8CFF] to-[#0b5cff] text-white font-bold rounded-2xl shadow-[0_8px_15px_rgba(45,140,255,0.3)] hover:shadow-[0_12px_20px_rgba(45,140,255,0.4)] active:scale-95 transition-all overflow-hidden relative">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">เข้าร่วมประชุม <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabDocuments() {
  const [search, setSearch] = useState('');
  return (
    <div className="animate-fade-in-up space-y-8">
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-6 flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="relative z-10"><h3 className="font-black text-2xl text-slate-800 dark:text-white flex items-center gap-3"><span className="text-blue-500 text-3xl">🗂️</span> คลังเอกสาร/คำสั่ง</h3><p className="text-sm font-medium text-slate-500 mt-2">สืบค้นเอกสารสำคัญภายใน ศปก.ทบ.</p></div>
        <div className="w-full md:w-80 relative group z-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
          <input type="text" placeholder="ค้นหา เลขที่คำสั่ง, เรื่อง..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-11 p-4 border border-slate-200 dark:border-slate-600 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/50 outline-none text-sm font-medium transition-all shadow-sm" />
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-5 px-8 font-bold text-slate-500 uppercase tracking-widest text-[10px]">เลขที่คำสั่ง</th><th className="py-5 px-8 font-bold text-slate-500 uppercase tracking-widest text-[10px]">เรื่อง</th><th className="py-5 px-8 font-bold text-slate-500 uppercase tracking-widest text-[10px] hidden md:table-cell">แผนก</th><th className="py-5 px-8 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-center">วันที่ลง</th><th className="py-5 px-8 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-center">เปิดอ่าน</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {MOCK_DOCS.filter(d => d.title.includes(search) || d.orderNum.includes(search)).map((d, idx) => (
                <tr key={d.id} className="hover:bg-blue-50/50 dark:hover:bg-slate-800/80 transition-colors animate-fade-in-up group" style={{ animationDelay: `${idx * 100}ms` }}>
                  <td className="py-5 px-8 font-extrabold text-blue-600 dark:text-blue-400 text-[13px]">{d.orderNum}</td><td className="py-5 px-8 font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{d.title}</td><td className="py-5 px-8 hidden md:table-cell"><span className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-500 shadow-sm">{d.dept}</span></td><td className="py-5 px-8 text-center text-xs font-semibold text-slate-500">{d.date}<br /><span className="text-[10px] text-slate-400 mt-1 block">พ.ศ.{d.year}</span></td><td className="py-5 px-8 text-center"><button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-blue-600 hover:bg-blue-600 dark:hover:bg-blue-600 dark:text-blue-400 dark:hover:text-white hover:text-white px-5 py-2 rounded-xl font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 mx-auto"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> เปิด</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabDirectory({ usersList }: { usersList: any[] }) {
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // ดึงรายชื่อแผนกที่ไม่ซ้ำกันมาทำ Dropdown Filter
  const uniqueDepts = ['All', ...new Set(usersList.map(u => u.dept).filter(Boolean))];

  // Process data: Filter -> Sort
  const processedUsers = usersList.filter(u => {
    const matchSearch = u.fname.toLowerCase().includes(search.toLowerCase()) ||
      u.lname.toLowerCase().includes(search.toLowerCase()) ||
      (u.phone && u.phone.includes(search));
    const matchDept = filterDept === 'All' || u.dept === filterDept;
    return matchSearch && matchDept;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.fname.localeCompare(b.fname);
    if (sortBy === 'postCount') return (b.postCount || 0) - (a.postCount || 0);
    return 0;
  });

  return (
    <>
      <div className="space-y-8 animate-fade-in-up">

        {/* Header & Controls Area */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-700/60 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl"></div>

          <div className="relative z-10 w-full xl:w-auto">
            <h3 className="font-black text-3xl text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
              <span className="text-emerald-500 text-4xl animate-float inline-block">👥</span> ทำเนียบกำลังพล
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-2 ml-14">
              แสดงข้อมูลติดต่อ (พบ {processedUsers.length} จาก {usersList.length} นาย)
            </p>
          </div>

          {/* Controls (Search, Filter, Sort) */}
          <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto relative z-10">
            {/* Filter Dept */}
            <div className="relative w-full md:w-48">
              <select
                value={filterDept}
                onChange={e => setFilterDept(e.target.value)}
                className="w-full p-4 border border-slate-200 dark:border-slate-600 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/50 outline-none shadow-sm transition-all text-sm font-bold text-slate-700 dark:text-slate-200 appearance-none cursor-pointer"
              >
                {uniqueDepts.map(d => <option key={d} value={d}>{d === 'All' ? '🏢 แสดงทุกแผนก' : d}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            {/* Sort By */}
            <div className="relative w-full md:w-48">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full p-4 border border-slate-200 dark:border-slate-600 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/50 outline-none shadow-sm transition-all text-sm font-bold text-slate-700 dark:text-slate-200 appearance-none cursor-pointer"
              >
                <option value="name">🔤 เรียงตามชื่อ (ก-ฮ)</option>
                <option value="postCount">🔥 เรียงตามยอดโพสต์</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            {/* Search */}
            <div className="w-full md:w-64 relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input
                type="text"
                placeholder="ค้นหา ชื่อ, สกุล, เบอร์..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 p-4 border border-slate-200 dark:border-slate-600 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/50 outline-none shadow-sm transition-all text-sm font-bold"
              />
            </div>
          </div>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {processedUsers.map((u, i) => (
            <div key={u.uid} onClick={() => setSelectedUser(u)} className={`bg-white dark:bg-slate-800 rounded-[2rem] p-7 shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:-translate-y-2 border border-slate-200/60 dark:border-slate-700/60 transition-all duration-400 animate-fade-in-up group relative overflow-hidden cursor-pointer`} style={{ animationDelay: `${(i % 10) * 50}ms` }}>
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-700 dark:to-slate-800 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-3xl font-black text-slate-400 dark:text-slate-500 shadow-inner border border-white/50 dark:border-slate-600 shrink-0 group-hover:scale-110 transition-transform duration-300 group-hover:text-emerald-500">
                      {u.fname.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h4 className="font-extrabold text-lg text-slate-800 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{u.rank}{u.fname}</h4>
                        {u.isAdmin && <span className="shrink-0 w-4 h-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shadow-sm" title="ผู้ดูแลระบบ"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2l1.6 3.2 3.5.5-2.5 2.5.6 3.5-3.2-1.7-3.2 1.7.6-3.5-2.5-2.5 3.5-.5L10 2z" /></svg></span>}
                      </div>
                      <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 truncate uppercase tracking-wide">{u.position}</p>
                      <div className="mt-2 inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate max-w-full shadow-sm">
                        {u.dept || 'ไม่ระบุแผนก'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 dark:border-slate-700/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm group/item">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500 group-hover/item:scale-110 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-all duration-300 shadow-sm border border-emerald-100 dark:border-emerald-800/50"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>
                      <span className="font-bold text-slate-600 dark:text-slate-300 group-hover/item:text-emerald-500 transition-colors">{u.phone || '-'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/50 rounded-lg shadow-sm" title="ยอดโพสต์เทิดทูนฯ">
                      <span className="text-orange-500 text-xs">🔥</span>
                      <span className="text-xs font-black text-orange-600 dark:text-orange-400">{u.postCount || 0}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm group/item">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 group-hover/item:scale-110 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all duration-300 shadow-sm border border-blue-100 dark:border-blue-800/50"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
                    <span className="font-bold text-slate-600 dark:text-slate-300 truncate group-hover/item:text-blue-500 transition-colors">{u.email || '-'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {processedUsers.length === 0 && (
          <div className="py-24 text-center bg-white dark:bg-slate-800 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700 animate-fade-in-up">
            <div className="w-20 h-20 mx-auto bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">ไม่พบรายชื่อที่ค้นหา</h4>
            <p className="text-sm font-medium text-slate-500">ลองใช้คำค้นหา หรือเปลี่ยนตัวกรองแผนกอีกครั้ง</p>
          </div>
        )}
      </div>

      {/* User Profile Modal Component */}
      {selectedUser && <UserProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </>
  );
}

function UserProfileModal({ user, onClose }: { user: any, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 md:p-6 lg:p-12 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity animate-fade-in" 
        style={{ animationDuration: '0.4s' }} 
        onClick={onClose}
      />
      
      <div className="relative w-full h-full md:h-90vh md:max-h-[95vh] md:max-w-4xl bg-white dark:bg-slate-900 md:rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-in flex flex-col border border-white/10">
        
        <div className="flex-1 overflow-y-auto custom-scrollbar relative scroll-smooth">
          {/* Header Hero Section */}
          <div className="h-32 sm:h-48 relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-600 to-blue-900">
            <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 z-30 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/25 text-white rounded-full backdrop-blur-xl transition-all shadow-xl border border-white/20 active:scale-90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
          </div>

          {/* Content Section */}
          <div className="px-6 md:px-12 pb-10 relative z-10 bg-white dark:bg-slate-900">
            
            {/* Avatar & Basic Info */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 sm:-mt-20 mb-10 relative z-20">
              <div className="relative group">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2.5rem] bg-white dark:bg-slate-800 p-2 shadow-2xl shrink-0 border-4 border-white dark:border-slate-800 transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-5xl sm:text-6xl font-black text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-600 shadow-inner overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent"></div>
                    {user.fname.charAt(0)}
                  </div>
                </div>
                {user.isAdmin && (
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl border-4 border-white dark:border-slate-800 text-white flex items-center justify-center shadow-lg animate-float" title="Admin Account">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2l1.3 2.6 2.9.4-2.1 2.1.5 2.9-2.6-1.4-2.6 1.4.5-2.9-2.1-2.1 2.9-.4L10 2z" /></svg>
                  </div>
                )}
              </div>

              <div className="text-center md:text-left flex-1 pb-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{user.rank}{user.fname} {user.lname}</h2>
                  <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-200 dark:border-emerald-800/50">Active</div>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-extrabold text-lg sm:text-xl flex items-center justify-center md:justify-start gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {user.position}
                </p>
              </div>
              
              <div className="flex gap-2 mb-2">
                <button className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl transition-all active:scale-90 border border-slate-200 dark:border-slate-700 shadow-sm"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg></button>
                <button className="p-3 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center gap-2 border border-blue-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                  <span className="text-sm">มอบหมายงาน</span>
                </button>
              </div>
            </div>

            <div className="space-y-10">
              {/* Category: Contact Info */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200 dark:to-slate-700/50"></div>
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">ข้อมูลการติดต่อและบัญชี</h3>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200 dark:to-slate-700/50"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ProfileField icon="📞" label="เบอร์โทรศัพท์" value={user.phone || '-'} linkType="tel" linkValue={user.phone} />
                  <ProfileField icon="✉️" label="อีเมล" value={user.email || '-'} linkType="mailto" linkValue={user.email} />
                  <ProfileField icon="🗨️" label="LINE ID" value={user.lineId || '-'} />
                  <ProfileField icon="🆔" label="รหัสนายทหาร" value={user.milId || '-'} />
                  <ProfileField icon="🪪" label="เลขบัตรประชาชน" value={user.idCard || '-'} />
                  <ProfileField icon="🎂" label="วันเกิด (ปีปัจจุบัน)" value={user.birthdate || '-'} />
                </div>
              </section>

              {/* Category: General Info */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200 dark:to-slate-700/50"></div>
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">รายละเอียดกำลังพล</h3>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200 dark:to-slate-700/50"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ProfileField icon="🏢" label="สังกัด/แผนก" value={user.dept || 'ไม่ระบุแผนก'} />
                  <ProfileField icon="🗣️" label="ชื่อเล่น" value={user.nickname || '-'} />
                  <div className="md:col-span-2">
                    <ProfileField icon="🏠" label="ที่อยู่ปัจจุบัน" value={user.address || '-'} />
                  </div>
                </div>
              </section>

              {/* Category: Performance Status */}
              <section className="bg-slate-50 dark:bg-slate-800/40 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700/50">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 text-center">สถิติและสถานะการปฏิบัติงาน</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 rounded-[2rem] flex items-center justify-between shadow-sm relative overflow-hidden group transition-all hover:shadow-md">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center text-2xl shadow-inner border border-orange-100 dark:border-orange-950">💛</div>
                      <div>
                        <span className="block font-black text-orange-600 dark:text-orange-400 text-lg leading-none">{user.postCount || 0}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ยอดโพสต์เทิดทูนฯ</span>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-slate-200 dark:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>

                  <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 rounded-[2rem] flex items-center justify-between shadow-sm relative overflow-hidden group transition-all hover:shadow-md">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center text-2xl shadow-inner border border-blue-100 dark:border-blue-950">🛡️</div>
                      <div>
                        <span className="block font-black text-blue-600 dark:text-blue-400 text-lg leading-none">4/8</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">การเข้าเวรเดือนนี้</span>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-slate-200 dark:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ icon, label, value, linkType, linkValue }: { icon: string, label: string, value: string, linkType?: string, linkValue?: string }) {
  const content = (
    <div className={`bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl flex items-center gap-4 border border-slate-100 dark:border-slate-800/80 transition-all group ${linkValue && value !== '-' ? 'hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md cursor-pointer hover:bg-white dark:hover:bg-slate-800' : 'hover:border-slate-200 dark:hover:border-slate-700'}`}>
      <div className={`w-11 h-11 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-lg shadow-sm border border-slate-100 dark:border-slate-600/50 transition-all ${linkValue && value !== '-' ? 'group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white' : ''}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className={`text-sm font-extrabold truncate ${linkValue && value !== '-' ? 'group-hover:text-blue-600 dark:group-hover:text-blue-400 text-slate-800 dark:text-slate-200' : 'text-slate-700 dark:text-slate-200'}`}>{value}</p>
      </div>
      {linkValue && value !== '-' && (
        <div className="text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </div>
      )}
    </div>
  );

  if (linkValue && value !== '-') {
    return <a href={`${linkType}:${linkValue}`} target={linkType === 'tel' ? undefined : '_blank'} className="block">{content}</a>;
  }
  return content;
}


// --- ADMIN TABS ---



function TabManageUsers({ usersList, setUsersList }: { usersList: any[], setUsersList: React.Dispatch<React.SetStateAction<any[]>> }) {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    idCard: '', milId: '1234', rank: '', fname: '', lname: '', position: '', dept: '', isAdmin: false
  });

  const filteredUsers = usersList.filter(u => u.fname.includes(search) || u.idCard.includes(search) || u.dept.includes(search));

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({ idCard: '', milId: '1234', rank: '', fname: '', lname: '', position: '', dept: '', isAdmin: false });
    setShowModal(true);
  };

  const handleOpenEdit = (user: any) => {
    setEditingUser(user);
    setFormData({ ...user });
    setShowModal(true);
  };

  const handleDelete = async (uid: any) => {
    if (window.confirm('คุณต้องการลบผู้ใช้งานนี้ใช่หรือไม่?')) {
      try {
        const response = await fetch(`/api/users/${uid}`, { method: 'DELETE' });
        const result = await response.json();
        if (result.success) {
          setUsersList(prev => prev.filter(u => u.uid !== uid));
        } else {
          alert('Error: ' + result.message);
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('เกิดข้อผิดพลาดในการลบข้อมูล');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // [PUT] Update User
        const response = await fetch(`/api/users/${editingUser.uid}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (result.success) {
          setUsersList(prev => prev.map(u => u.uid === editingUser.uid ? result.data : u));
        } else {
          alert('Error: ' + result.message);
        }
      } else {
        // [POST] Create User
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (result.success) {
          setUsersList([result.data, ...usersList]);
        } else {
          alert('Error: ' + result.message);
        }
      }
      setShowModal(false);
    } catch (error) {
      console.error('Save error:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  return (
    <>
      <div className="space-y-8 animate-fade-in-up">
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-6 flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden">
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"></div>
          <div className="relative z-10"><h3 className="font-black text-2xl text-slate-800 dark:text-white flex items-center gap-3"><span className="text-blue-500 text-3xl">⚙️</span> จัดการฐานข้อมูลกำลังพล</h3><p className="text-sm font-medium text-slate-500 mt-2">เพิ่ม ลบ แก้ไข รายชื่อและสิทธิ์การใช้งาน (Admin)</p></div>
          <div className="flex gap-4 relative z-10 w-full md:w-auto">
            <input type="text" placeholder="ค้นหา ชื่อ, เลข ปชช..." value={search} onChange={e => setSearch(e.target.value)} className="w-full md:w-64 p-3.5 border rounded-xl bg-slate-50 dark:bg-slate-900 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm shadow-sm" />
            <button onClick={handleOpenAdd} className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 rounded-xl font-bold transition-all shadow-[0_8px_15px_rgba(37,99,235,0.2)] hover:-translate-y-1">➕ เพิ่มกำลังพล</button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
          {/* Desktop Version: Table */}
          <div className="hidden md:block overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-5 px-6 font-bold text-slate-500 uppercase tracking-widest text-[10px]">ชื่อ-สกุล (ตำแหน่ง)</th>
                  <th className="py-5 px-6 font-bold text-slate-500 uppercase tracking-widest text-[10px]">เลข ปชช. (Username)</th>
                  <th className="py-5 px-6 font-bold text-slate-500 uppercase tracking-widest text-[10px]">แผนก</th>
                  <th className="py-5 px-6 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-center">สิทธิ์</th>
                  <th className="py-5 px-6 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {filteredUsers.map((u, idx) => (
                  <tr key={u.uid} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/80 transition-colors animate-fade-in-up" style={{ animationDelay: `${(idx % 10) * 50}ms` }}>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800 dark:text-white">{u.rank}{u.fname} {u.lname}</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">{u.position}</div>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-600 dark:text-slate-400">{u.idCard}</td>
                    <td className="py-4 px-6"><span className="bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-500">{u.dept}</span></td>
                    <td className="py-4 px-6 text-center">
                      {u.isAdmin ? <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-1 rounded text-[10px] font-bold border border-purple-200 dark:border-purple-800/50">Admin</span> : <span className="bg-slate-100 text-slate-500 dark:bg-slate-800 px-2 py-1 rounded text-[10px] font-bold">User</span>}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button onClick={() => handleOpenEdit(u)} className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded-lg transition-colors mr-2">✏️ แก้ไข</button>
                      <button onClick={() => handleDelete(u.uid)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg transition-colors">🗑️ ลบ</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Version: Cards */}
          <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-700/50">
            {filteredUsers.map((u, idx) => (
              <div key={u.uid} className="p-6 space-y-4 animate-fade-in-up" style={{ animationDelay: `${(idx % 10) * 50}ms` }}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-bold text-lg text-slate-800 dark:text-white">{u.rank}{u.fname} {u.lname}</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-bold mt-0.5">{u.position}</div>
                  </div>
                  {u.isAdmin ? <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2.5 py-1 rounded-lg text-[10px] font-black border border-purple-200 dark:border-purple-800/50 uppercase tracking-wider">Admin</span> : <span className="bg-slate-100 text-slate-500 dark:bg-slate-800 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">User</span>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Username</span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{u.idCard}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">แผนก</span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate block">{u.dept}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => handleOpenEdit(u)} className="flex-1 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-black text-xs rounded-2xl border border-blue-100 dark:border-blue-800/50 transition-all active:scale-95 flex items-center justify-center gap-2">
                    <span className="text-base">✏️</span> แก้ไขข้อมูล
                  </button>
                  <button onClick={() => handleDelete(u.uid)} className="flex-1 py-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-black text-xs rounded-2xl border border-rose-100 dark:border-rose-800/50 transition-all active:scale-95 flex items-center justify-center gap-2">
                    <span className="text-base">🗑️</span> ลบรายชื่อ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)}></div>
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl p-8 animate-scale-in max-h-[90vh] overflow-y-auto custom-scrollbar border border-slate-200 dark:border-slate-700">
            <h3 className="font-black text-2xl mb-6 text-slate-800 dark:text-white flex items-center gap-2">{editingUser ? '✏️ แก้ไขข้อมูลกำลังพล' : '➕ เพิ่มกำลังพลใหม่'}</h3>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div><label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">เลข ปชช. (Username)</label><input type="text" required value={formData.idCard} onChange={e => setFormData({ ...formData, idCard: e.target.value })} className="w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 dark:border-slate-700 outline-none focus:border-blue-500 transition-colors" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">รหัสผ่าน (ตั้งต้น 1234)</label><input type="text" required value={formData.milId} onChange={e => setFormData({ ...formData, milId: e.target.value })} className="w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 dark:border-slate-700 outline-none focus:border-blue-500 transition-colors" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">ยศ</label><input type="text" value={formData.rank} onChange={e => setFormData({ ...formData, rank: e.target.value })} className="w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 dark:border-slate-700 outline-none focus:border-blue-500 transition-colors" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">ชื่อ</label><input type="text" required value={formData.fname} onChange={e => setFormData({ ...formData, fname: e.target.value })} className="w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 dark:border-slate-700 outline-none focus:border-blue-500 transition-colors" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">สกุล</label><input type="text" value={formData.lname} onChange={e => setFormData({ ...formData, lname: e.target.value })} className="w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 dark:border-slate-700 outline-none focus:border-blue-500 transition-colors" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">ตำแหน่ง</label><input type="text" value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })} className="w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 dark:border-slate-700 outline-none focus:border-blue-500 transition-colors" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">แผนก</label><input type="text" value={formData.dept} onChange={e => setFormData({ ...formData, dept: e.target.value })} className="w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 dark:border-slate-700 outline-none focus:border-blue-500 transition-colors" /></div>
                <div className="flex items-center pt-8">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.isAdmin} onChange={e => setFormData({ ...formData, isAdmin: e.target.checked })} className="w-5 h-5 rounded text-blue-600 border-slate-300 dark:border-slate-600 focus:ring-blue-500 dark:bg-slate-900" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">ให้สิทธิ์ผู้ดูแลระบบ (Admin)</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-4 pt-6 border-t border-slate-100 dark:border-slate-700">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-bold rounded-xl transition-colors">ยกเลิก</button>
                <button type="submit" className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors">บันทึกข้อมูล</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// End of Dashboard component


