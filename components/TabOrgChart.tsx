import React, { useState, useEffect } from 'react';

const TabOrgChart: React.FC = () => {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [level, setLevel] = useState('Level 1: ส่วนบังคับบัญชา');
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('-');

  useEffect(() => {
    fetchOrgs();
  }, []);

  const fetchOrgs = async () => {
    try {
      const resp = await fetch('/api/org');
      const result = await resp.json();
      if (result.success) setOrgs(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    if (!name) return;
    const newOrg = {
      id: 'O' + Date.now(),
      name,
      level,
      parentId: parentId === '-' ? null : parentId
    };
    try {
      const resp = await fetch('/api/org', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrg)
      });
      const result = await resp.json();
      if (result.success) {
        fetchOrgs();
        setName('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ยืนยันลบโครงสร้างนี้?')) return;
    try {
      const resp = await fetch(`/api/org?id=${id}`, { method: 'DELETE' });
      const result = await resp.json();
      if (result.success) fetchOrgs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-8 no-print">
        <h3 className="font-black text-2xl mb-8 flex items-center gap-3"><span className="text-blue-500">➕</span> เพิ่มโครงสร้างหน่วย</h3>
        <div className="space-y-6">
          <div className="group">
            <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-slate-500">ระดับชั้น (Level)</label>
            <select value={level} onChange={e => setLevel(e.target.value)} className="w-full p-4 border border-slate-200 dark:border-slate-600/70 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/50 outline-none font-medium transition-all">
              <option>Level 1: ส่วนบังคับบัญชา</option>
              <option>Level 2: ส่วนกำลังพล</option>
              <option>Level 3: แผนก</option>
            </select>
          </div>
          <div className="group">
            <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-slate-500">ชื่อหน่วยงาน / แผนก</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="เช่น แผนกธุรการ" className="w-full p-4 border border-slate-200 dark:border-slate-600/70 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all" />
          </div>
          <div className="group">
            <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-slate-500">สังกัดขึ้นตรงกับ</label>
            <select value={parentId} onChange={e => setParentId(e.target.value)} className="w-full p-4 border border-slate-200 dark:border-slate-600/70 rounded-2xl bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all">
              <option value="-">-</option>
              {orgs.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </div>
          <button onClick={handleSave} className="w-full py-4.5 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all">บันทึกโครงสร้าง</button>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-8 flex flex-col relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-slate-100 dark:border-slate-700/50 relative z-10 gap-4">
          <h3 className="font-black text-2xl text-slate-800 dark:text-white tracking-tight">ผังโครงสร้างหน่วย <span className="text-sm font-semibold text-slate-500 tracking-normal">(Org Chart)</span></h3>
          <button onClick={() => window.print()} className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors shadow-sm no-print flex items-center gap-2 uppercase tracking-widest">
            พิมพ์ผังหน่วย
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800 relative z-10">
          {orgs.length === 0 ? (
             <div className="p-10 text-center text-slate-400 font-bold">ยังไม่ได้กำหนดโครงสร้างหน่วยงาน</div>
          ) : (
            <div className="space-y-4">
              {orgs.filter(o => !o.parentId).map(root => (
                <div key={root.id} className="space-y-4">
                   <div className="font-extrabold text-lg p-4 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 rounded-2xl text-blue-800 dark:text-blue-300 flex justify-between items-center shadow-sm border border-blue-200/50 dark:border-blue-700/50">
                    <span className="flex items-center gap-3"><span className="text-2xl">🏛️</span> {root.name}</span>
                    <button onClick={() => handleDelete(root.id)} className="text-red-500 hover:text-white hover:bg-red-500 text-[10px] font-bold px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg no-print transition-all">ลบ</button>
                  </div>
                  <div className="ml-8 pl-8 border-l-[3px] border-dashed border-slate-300/70 dark:border-slate-600/70 space-y-4">
                    {orgs.filter(o => o.parentId === root.id).map(child => (
                      <div key={child.id} className="space-y-4">
                        <div className="font-bold text-[15px] p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-between items-center shadow-sm relative before:absolute before:-left-[35px] before:top-1/2 before:w-[35px] before:border-t-[3px] before:border-dashed before:border-slate-300/70 dark:before:border-slate-600/70">
                          <span className="flex items-center gap-3"><span className="text-xl">🛡️</span> {child.name}</span>
                          <button onClick={() => handleDelete(child.id)} className="text-red-500 hover:text-white hover:bg-red-500 text-[10px] font-bold px-3 py-1.5 bg-slate-50 dark:bg-slate-700 rounded-lg transition-all no-print">ลบ</button>
                        </div>
                        {/* Level 3 */}
                        <div className="ml-8 pl-8 border-l-[3px] border-dashed border-slate-300/70 dark:border-slate-600/70 space-y-3">
                           {orgs.filter(o => o.parentId === child.id).map(sub => (
                             <div key={sub.id} className="text-sm font-semibold p-3.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 flex justify-between items-center relative before:absolute before:-left-[35px] before:top-1/2 before:w-[35px] before:border-t-[3px] before:border-dashed before:border-slate-300/70 dark:before:border-slate-600/70">
                               <span className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300"><span className="opacity-70">🏷️</span> {sub.name}</span>
                               <button onClick={() => handleDelete(sub.id)} className="text-red-400 hover:text-red-600 text-xs font-bold no-print">ลบ</button>
                             </div>
                           ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabOrgChart;
