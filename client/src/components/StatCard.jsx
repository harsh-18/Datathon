import React from 'react';

export default function StatCard({ title, value, subtext, change, icon: Icon, color = 'blue' }) {
  const colorMap = {
    blue: 'text-blue-400 bg-blue-950/40 border-blue-900',
    red: 'text-red-400 bg-red-950/40 border-red-900',
    amber: 'text-amber-400 bg-amber-950/40 border-amber-900',
    emerald: 'text-emerald-400 bg-emerald-950/40 border-emerald-900',
    purple: 'text-purple-400 bg-purple-950/40 border-purple-900'
  };

  return (
    <div className="ksp-card flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-extrabold text-white mt-1 font-mono">{value}</h3>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            <span className={`text-xs font-semibold ${change > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {change > 0 ? `+${change}%` : `${change}%`}
            </span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        )}
      </div>
      {Icon && (
        <div className={`p-2.5 rounded-lg border ${colorMap[color] || colorMap.blue}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
