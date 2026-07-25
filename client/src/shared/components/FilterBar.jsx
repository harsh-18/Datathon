import React from 'react';
import { Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { CRIME_TYPE_LIST } from '../constants/crimeTypes';

export default function FilterBar({ 
  districts = [], selectedDistrict, onDistrictChange,
  selectedCrimeType, onCrimeTypeChange,
  selectedSeverity, onSeverityChange, onReset
}) {
  return (
    <div className="ksp-card !p-3 mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        <SlidersHorizontal className="w-4 h-4 text-blue-400" />
        <span>Filters</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div>
          <label className="text-[10px] text-slate-500 block mb-1 font-semibold uppercase tracking-wider">
            District
          </label>
          <select value={selectedDistrict} onChange={(e) => onDistrictChange(e.target.value)} className="ksp-select">
            <option value="All">All Karnataka (10)</option>
            {districts.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-500 block mb-1 font-semibold uppercase tracking-wider">
            Crime Type
          </label>
          <select value={selectedCrimeType} onChange={(e) => onCrimeTypeChange(e.target.value)} className="ksp-select">
            {CRIME_TYPE_LIST.map(ct => (
              <option key={ct} value={ct}>{ct}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-500 block mb-1 font-semibold uppercase tracking-wider">
            Risk Level
          </label>
          <select value={selectedSeverity} onChange={(e) => onSeverityChange(e.target.value)} className="ksp-select">
            <option value="All">All Levels</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
        </div>

        <button onClick={onReset} className="ksp-btn-ghost mt-4 self-end" title="Reset Filters">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
