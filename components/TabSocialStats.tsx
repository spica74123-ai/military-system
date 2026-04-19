import React from 'react';
import StatCard from './StatCard';

interface TabSocialStatsProps {
  usersList: any[];
}

const TabSocialStats: React.FC<TabSocialStatsProps> = ({ usersList }) => {
  const totalPosts = usersList.reduce((acc, u) => acc + (u.postCount || 0), 0);
  const totalParticipants = usersList.filter(u => (u.postCount || 0) > 0).length;
  const sortedUsers = [...usersList].sort((a, b) => (b.postCount || 0) - (a.postCount || 0));
  const topPoster = sortedUsers[0] ? `${sortedUsers[0].rank}${sortedUsers[0].fname}` : '-';
  
  // Calculate best department
  const deptStats: { [key: string]: number } = {};
  usersList.forEach(u => {
    if (u.dept) {
      deptStats[u.dept] = (deptStats[u.dept] || 0) + (u.postCount || 0);
    }
  });
  let bestDept = '-';
  let maxPosts = 0;
  for (const dept in deptStats) {
    if (deptStats[dept] > maxPosts) {
      maxPosts = deptStats[dept];
      bestDept = dept;
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-6 sm:p-8 animate-fade-in flex flex-col min-h-[600px]">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10 pb-8 border-b border-slate-200 dark:border-slate-700/50">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 text-white flex items-center justify-center shadow-[0_8px_15px_rgba(249,115,22,0.3)] shrink-0 animate-float">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <div>
            <h3 className="font-black text-2xl sm:text-3xl tracking-tight text-slate-800 dark:text-white">สรุปสถิติการโพสต์เทิดทูนฯ</h3>
            <p className="text-[11px] sm:text-[13px] font-bold text-slate-500 uppercase tracking-widest mt-1">รายงานผลการปฏิบัติงานประจำหน่วย</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full xl:w-auto no-print bg-slate-50 dark:bg-slate-900/50 p-2 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-inner">
          <input 
            type="date" 
            defaultValue="2026-04-17" 
            className="flex-1 md:flex-none p-3 border border-slate-200 dark:border-slate-600/70 rounded-xl bg-white dark:bg-slate-800 outline-none text-sm font-bold shadow-sm focus:ring-2 focus:ring-orange-500/50 transition-all" 
          />
          <button className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95">
            ค้นหาข้อมูล
          </button>
          <button 
            onClick={() => window.print()} 
            className="flex-1 md:flex-none px-6 py-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg> 
            พิมพ์รายงาน
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 no-print">
        <StatCard title="ยอดโพสต์รวม" value={totalPosts.toString()} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>} color="rose" delay={100} />
        <StatCard title="ผู้ร่วมกิจกรรม (นาย)" value={totalParticipants.toString()} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} color="emerald" delay={200} />
        <StatCard title="ผู้โพสต์สูงสุด" value={topPoster} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4" /></svg>} color="blue" delay={300} />
        <StatCard title="แผนกยอดเยี่ยม" value={bestDept} icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" /></svg>} color="amber" delay={400} />
      </div>

      <div className="overflow-x-auto flex-1 bg-white dark:bg-slate-800/50 rounded-3xl border border-slate-200/80 dark:border-slate-700/50 shadow-sm custom-scrollbar animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <table className="w-full text-left text-sm border-collapse min-w-[700px]">
          <thead className="bg-slate-50 dark:bg-slate-900/80">
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="py-5 pl-8 font-bold text-slate-400 uppercase tracking-widest text-[10px]">ลำดับ</th>
              <th className="py-5 font-bold text-slate-400 uppercase tracking-widest text-[10px]">ยศ ชื่อ-สกุล</th>
              <th className="py-5 font-bold text-slate-400 uppercase tracking-widest text-[10px]">สังกัด/แผนก</th>
              <th className="py-5 pr-8 text-center font-bold text-slate-400 uppercase tracking-widest text-[10px]">จำนวนการโพสต์ (ครั้ง)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {sortedUsers.map((u, idx) => (
              <tr key={u.uid} className={`group transition-all duration-300 ${idx === 0 ? "bg-orange-50/30 dark:bg-orange-900/10 hover:bg-orange-50/50 dark:hover:bg-orange-900/20" : "hover:bg-slate-50 dark:hover:bg-slate-800/80"}`}>
                <td className="py-5 pl-8 font-extrabold text-slate-400 dark:text-slate-500 text-lg flex items-center gap-3">
                  <span className={`w-9 h-9 flex items-center justify-center rounded-xl shadow-sm border transition-all duration-300 group-hover:scale-110 ${
                    idx === 0 ? 'bg-gradient-to-br from-orange-400 to-amber-500 text-white border-orange-300' : 
                    idx === 1 ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300' : 
                    idx === 2 ? 'bg-amber-600 text-white border-amber-500' : 
                    'bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}>
                    {idx + 1}
                  </span>
                </td>
                <td className="py-5">
                  <div className="font-bold text-slate-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors text-[15px]">
                    {u.rank}{u.fname} {u.lname}
                  </div>
                </td>
                <td className="py-5">
                  <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 border border-slate-200 dark:border-slate-700 shadow-sm">
                    {u.dept}
                  </span>
                </td>
                <td className="py-5 pr-8 text-center">
                  <span className="inline-block min-w-[3.5rem] px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-lg font-black text-orange-500 shadow-sm group-hover:scale-110 transition-transform group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-400">
                    {u.postCount || 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-200 dark:border-slate-700 flex justify-between items-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">สรุปผลรวมกิจกรรมทั้งหน่วย</span>
        <div className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
          <span className="text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-5 py-2.5 rounded-2xl shadow-sm border border-orange-200/50 dark:border-orange-800/30">
            {totalPosts} <span className="text-sm font-bold text-orange-600 dark:text-orange-400 ml-1">โพสต์สะสม</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TabSocialStats;
