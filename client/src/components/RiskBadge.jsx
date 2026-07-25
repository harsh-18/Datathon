import React from 'react';

export default function RiskBadge({ level, score }) {
  let badgeClass = "bg-emerald-900/60 text-emerald-400 border-emerald-700";
  
  if (level === 'Critical' || (score && score >= 85)) {
    badgeClass = "bg-red-950/80 text-red-400 border-red-700 alert-pulse-critical";
  } else if (level === 'High' || (score && score >= 70)) {
    badgeClass = "bg-amber-950/80 text-amber-400 border-amber-700";
  } else if (level === 'Medium' || (score && score >= 50)) {
    badgeClass = "bg-yellow-950/80 text-yellow-400 border-yellow-700";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {level || (score >= 85 ? 'Critical' : score >= 70 ? 'High' : score >= 50 ? 'Medium' : 'Low')}
      {score !== undefined && <span className="opacity-85 font-mono">({score})</span>}
    </span>
  );
}
