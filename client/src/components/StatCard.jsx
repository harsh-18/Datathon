import React from 'react';

const colorMap = {
  blue:    { icon: 'text-blue-400', bg: 'ksp-stat-blue' },
  red:     { icon: 'text-red-400', bg: 'ksp-stat-red' },
  amber:   { icon: 'text-amber-400', bg: 'ksp-stat-amber' },
  emerald: { icon: 'text-emerald-400', bg: 'ksp-stat-emerald' },
  purple:  { icon: 'text-purple-400', bg: 'ksp-stat-purple' },
};

export default function StatCard({ title, value, subtext, change, icon: Icon, color = 'blue' }) {
  const theme = colorMap[color] || colorMap.blue;

  return (
    <div className={`ksp-card ${theme.bg} animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{title}</p>
          <h3 className="text-[28px] font-extrabold text-white leading-none font-mono tracking-tight">{value}</h3>
          {subtext && (
            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{subtext}</p>
          )}
          {change !== undefined && (
            <div className="flex items-center gap-1.5 mt-3">
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                change > 0 
                  ? 'text-red-400 bg-red-500/10' 
                  : 'text-emerald-400 bg-emerald-500/10'
              }`}>
                {change > 0 ? `↑ ${change}%` : `↓ ${Math.abs(change)}%`}
              </span>
              <span className="text-[10px] text-slate-600">vs last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04] ${theme.icon}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
