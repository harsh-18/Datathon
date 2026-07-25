import React from 'react';

const levelStyles = {
  Critical: 'ksp-badge-critical',
  High: 'ksp-badge-high',
  Medium: 'ksp-badge-medium',
  Low: 'ksp-badge-low',
};

export default function RiskBadge({ level, score }) {
  const computedLevel = level || (score >= 85 ? 'Critical' : score >= 60 ? 'High' : score >= 40 ? 'Medium' : 'Low');
  const badgeClass = levelStyles[computedLevel] || levelStyles.Low;

  return (
    <span className={badgeClass}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {computedLevel}
      {score !== undefined && (
        <span className="opacity-70 font-mono ml-0.5">({score})</span>
      )}
    </span>
  );
}
