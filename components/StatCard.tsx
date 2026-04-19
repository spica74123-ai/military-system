import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'emerald' | 'amber' | 'rose';
  delay: string | number;
}

// Explicit light + dark bg/border per color — no splitting, no dynamic class fragmentation
const colorConfig: Record<StatCardProps['color'], {
  gradient: string;
  cardBg: string;
  cardBorder: string;
  glowOpacity: string;
}> = {
  blue: {
    gradient:    'from-blue-500 to-indigo-600',
    cardBg:      'bg-white dark:bg-slate-800',
    cardBorder:  'border-blue-100 dark:border-blue-500/30',
    glowOpacity: 'opacity-[0.07] dark:opacity-[0.18]',
  },
  emerald: {
    gradient:    'from-emerald-500 to-teal-600',
    cardBg:      'bg-white dark:bg-slate-800',
    cardBorder:  'border-emerald-100 dark:border-emerald-500/30',
    glowOpacity: 'opacity-[0.07] dark:opacity-[0.18]',
  },
  amber: {
    gradient:    'from-amber-500 to-orange-500',
    cardBg:      'bg-white dark:bg-slate-800',
    cardBorder:  'border-amber-100 dark:border-amber-500/30',
    glowOpacity: 'opacity-[0.07] dark:opacity-[0.18]',
  },
  rose: {
    gradient:    'from-rose-500 to-pink-600',
    cardBg:      'bg-white dark:bg-slate-800',
    cardBorder:  'border-rose-100 dark:border-rose-500/30',
    glowOpacity: 'opacity-[0.07] dark:opacity-[0.18]',
  },
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, delay }) => {
  const c = colorConfig[color];

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] p-6 lg:p-7 border ${c.cardBg} ${c.cardBorder} shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_15px_30px_rgba(0,0,0,0.35)] hover:-translate-y-2 transition-all duration-400 group animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Decorative gradient circle */}
      <div
        className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${c.gradient} ${c.glowOpacity} group-hover:scale-150 transition-transform duration-700 ease-out pointer-events-none`}
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
          className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${c.gradient} text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-400 animate-float shrink-0 ml-4`}
          style={{ animationDelay: `${delay}ms`, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
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
