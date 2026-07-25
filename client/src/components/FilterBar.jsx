import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export default function FilterBar({ 
  districts = [], 
  selectedDistrict, 
  onDistrictChange,
  selectedCrimeType,
  onCrimeTypeChange,
  selectedSeverity,
  onSeverityChange,
  onReset
}) {
  const crimeTypes = [
    'All Categories',
    'Mobile & Property Theft',
    'Cyber Financial Fraud',
    'Tourist Snatching',
    'Commercial Godown Burglary',
    'Highway Cargo Hijack',
    'Vehicle Theft'
  ];

  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-lg p-3 mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
        <Filter className="w-4 h-4 text-blue-400" />
        <span>COMMAND FILTERS:</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* District Selector */}
        <div>
          <label className="text-[10px] text-gray-400 block mb-1 font-medium">District Jurisdiction</label>
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="bg-gray-950 border border-gray-700 text-gray-200 text-xs rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Karnataka Districts (10)</option>
            {districts.map(d => (
              <option key={d.id} value={d.name}>{d.name} ({d.riskLevel})</option>
            ))}
          </select>
        </div>

        {/* Crime Type Selector */}
        <div>
          <label className="text-[10px] text-gray-400 block mb-1 font-medium">Crime Classification</label>
          <select
            value={selectedCrimeType}
            onChange={(e) => onCrimeTypeChange(e.target.value)}
            className="bg-gray-950 border border-gray-700 text-gray-200 text-xs rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
          >
            {crimeTypes.map(ct => (
              <option key={ct} value={ct}>{ct}</option>
            ))}
          </select>
        </div>

        {/* Severity Selector */}
        <div>
          <label className="text-[10px] text-gray-400 block mb-1 font-medium">Risk Level</label>
          <select
            value={selectedSeverity}
            onChange={(e) => onSeverityChange(e.target.value)}
            className="bg-gray-950 border border-gray-700 text-gray-200 text-xs rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Risk Levels</option>
            <option value="Critical">Critical Only</option>
            <option value="High">High & Above</option>
            <option value="Medium">Medium & Above</option>
          </select>
        </div>

        {/* Reset button */}
        <button
          onClick={onReset}
          className="mt-4 self-end flex items-center gap-1 text-xs text-gray-400 hover:text-white px-2 py-1.5 rounded hover:bg-gray-800 transition"
          title="Reset Filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
