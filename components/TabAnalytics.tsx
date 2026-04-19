import React from 'react';
import StatCard from './StatCard';

interface TabAnalyticsProps {
  usersList: any[];
}

const TabAnalytics: React.FC<TabAnalyticsProps> = ({ usersList }) => {
  const totalPosts = usersList.reduce((acc, u) => acc + (u.postCount || 0), 0);
  
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <StatCard 
          title="กำลังพลทั้งหมด" 
          value={usersList.length} 
          icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} 
          color="blue" 
          delay="0" 
        />
        <StatCard 
          title="ยอดรวมการโพสต์" 
          value={totalPosts} 
          icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} 
          color="emerald" 
          delay="100" 
        />
        <StatCard 
          title="คิวเวรประจำวัน" 
          value="2" 
          icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} 
          color="amber" 
          delay="200" 
        />
        <StatCard 
          title="รายงาน VTC" 
          value="ครบถ้วน" 
          icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553 2.276A1 1 0 0121 13.17V17a2 2 0 01-2 2H5a2 2 0 01-2-2v-3.83a1 1 0 01.553-.894L8 10M15 10l-3-1.5L9 10m6 0v4a2 2 0 01-2 2H11a2 2 0 01-2-2v-4m6 0l-3-1.5L9 10" /></svg>} 
          color="rose" 
          delay="300" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leaderboard Section */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-700/50">
            <h3 className="font-extrabold text-lg text-slate-800 dark:text-white flex items-center gap-2">
              <span className="animate-float inline-block">🏆</span> ผู้นำการโพสต์
            </h3>
            <span className="text-[10px] font-bold uppercase text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800/50">
              สถิติเดือนนี้
            </span>
          </div>
          
          <div className="space-y-4">
            {[...usersList].sort((a, b) => (b.postCount || 0) - (a.postCount || 0)).slice(0, 5).map((u, idx) => (
              <div key={u.uid} className="flex items-center justify-between p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 hover:border-orange-200 dark:hover:border-orange-800 transition-all hover:bg-white hover:shadow-md group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-110 transition-transform ${
                    idx === 0 ? 'bg-gradient-to-br from-orange-400 to-amber-500 text-white' : 
                    idx === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-700' : 
                    idx === 2 ? 'bg-gradient-to-br from-amber-600 to-orange-700 text-white' : 
                    'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-400'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                      {u.rank}{u.fname}
                    </p>
                    <p className="text-[10px] font-semibold text-slate-500 truncate max-w-[120px] mt-0.5 uppercase">
                      {u.dept}
                    </p>
                  </div>
                </div>
                <div className="font-black text-sm text-orange-500 bg-white dark:bg-slate-800 shadow-sm border border-orange-100 dark:border-slate-700 px-4 py-2 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  {u.postCount || 0}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section Placeholder */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-8 flex items-center justify-center min-h-[450px] relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900/50 opacity-80" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(156, 163, 175, 0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          <div className="text-center relative z-10 p-10 rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl max-w-md w-full transform hover:scale-105 transition-transform duration-500">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 border border-white dark:border-slate-600 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-inner animate-float">
              <svg className="w-12 h-12 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
            </div>
            <h4 className="font-black text-2xl mb-3 text-slate-800 dark:text-white tracking-tight">แผนที่พิกัดประจำวัน</h4>
            <p className="text-sm font-medium text-slate-500 max-w-[250px] mx-auto leading-relaxed">
              พื้นที่สำหรับเชื่อมต่อ API แผนที่ (Leaflet.js / Google Maps) เพื่อดูจุดลงเวลาแบบ Real-time ของกำลังพลในหน่วย
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabAnalytics;
