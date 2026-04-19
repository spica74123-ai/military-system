import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'emerald' | 'amber' | 'rose';
  delay: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, delay }) => {
  const colorMap = {
    blue: 'from-blue-500 to-indigo-600 shadow-blue-500/20 text-blue-50 bg-blue-500/10 border-blue-200/50 dark:border-blue-500/20',
    emerald: 'from-emerald-500 to-teal-600 shadow-emerald-500/20 text-emerald-50 bg-emerald-500/10 border-emerald-200/50 dark:border-emerald-500/20',
    amber: 'from-amber-500 to-orange-500 shadow-amber-500/20 text-amber-50 bg-amber-500/10 border-amber-200/50 dark:border-amber-500/20',
    rose: 'from-rose-500 to-pink-600 shadow-rose-500/20 text-rose-50 bg-rose-500/10 border-rose-200/50 dark:border-rose-500/20',
  };

  const style = colorMap[color];
  const [gradientFrom, gradientTo, shadowColor, textColor, bgColor, borderColor] = style.split(' ');

  return (
    <div 
      className={`relative overflow-hidden rounded-[2rem] p-6 lg:p-7 border ${bgColor} ${borderColor} bg-white dark:bg-slate-800 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-400 group animate-fade-in-up shadow-sm`} 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div 
        className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-[0.08] dark:opacity-10 group-hover:scale-150 transition-transform duration-700 ease-out`}
      />
      
      <div className="relative z-10 flex justify-between items-start h-full">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] leading-tight mb-2 truncate">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 dark:text-white tracking-tight truncate">
            {value}
          </h3>
        </div>
        
        <div 
          className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradientFrom} ${gradientTo} text-white shadow-[0_8px_15px_rgba(0,0,0,0.1)] ${shadowColor} group-hover:scale-110 group-hover:rotate-6 transition-all duration-400 animate-float shrink-0 ml-4`}
          style={{ animationDelay: `${delay}ms` }}
        >
          {React.isValidElement(icon) 
            ? React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6 lg:w-7 lg:h-7' }) 
            : icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
