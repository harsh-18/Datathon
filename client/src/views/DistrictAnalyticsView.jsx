import React, { useState } from 'react';
import RiskBadge from '../components/RiskBadge';
import { Building2, Shield, Users, AlertTriangle, ArrowUpRight, Search } from 'lucide-react';

export default function DistrictAnalyticsView({ districts = [], selectedDistrict, onSelectDistrict }) {
  const [search, setSearch] = useState('');

  const currentDistrict = districts.find(d => d.name === selectedDistrict) || districts[0] || {};

  const filteredDistricts = districts.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.topCrime.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & District Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            District & Police Station Intelligence Drill-down
          </h2>
          <p className="text-xs text-gray-400">Select any Karnataka district to view station-level statistics, risk indices, and demographic factors.</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-xs text-gray-200 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-blue-500 w-60"
          />
        </div>
      </div>

      {/* Selected District Deep Dive Hero */}
      {currentDistrict.name && (
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950/40 border border-gray-800 rounded-xl p-5 shadow-lg">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4 pb-4 border-b border-gray-800">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-extrabold text-white tracking-wide">{currentDistrict.name}</h3>
                <RiskBadge level={currentDistrict.riskLevel} score={currentDistrict.riskScore} />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Primary Crime Pattern: <span className="text-amber-400 font-semibold">{currentDistrict.topCrime}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Jurisdiction Code:</span>
              <span className="text-xs font-mono font-bold bg-gray-950 px-2 py-1 rounded text-blue-400 border border-gray-800">
                DIST-{currentDistrict.districtId || currentDistrict.id}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-gray-950/80 p-3 rounded-lg border border-gray-800">
              <span className="text-gray-400 text-[11px] block">Total Registered FIRs</span>
              <span className="text-lg font-bold font-mono text-white mt-0.5 block">{currentDistrict.totalCases}</span>
              <span className={`text-[10px] ${currentDistrict.monthChangePercent > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {currentDistrict.monthChangePercent > 0 ? `+${currentDistrict.monthChangePercent}% MoM` : `${currentDistrict.monthChangePercent}% MoM`}
              </span>
            </div>

            <div className="bg-gray-950/80 p-3 rounded-lg border border-gray-800">
              <span className="text-gray-400 text-[11px] block">Active Police Stations</span>
              <span className="text-lg font-bold font-mono text-white mt-0.5 block">{currentDistrict.policeStationCount} Units</span>
              <span className="text-[10px] text-gray-500">KSP Network Connected</span>
            </div>

            <div className="bg-gray-950/80 p-3 rounded-lg border border-gray-800">
              <span className="text-gray-400 text-[11px] block">Repeat Offenders Active</span>
              <span className="text-lg font-bold font-mono text-amber-400 mt-0.5 block">{currentDistrict.activeRepeatOffenders} Tracked</span>
              <span className="text-[10px] text-gray-500">Cross-station links</span>
            </div>

            <div className="bg-gray-950/80 p-3 rounded-lg border border-gray-800">
              <span className="text-gray-400 text-[11px] block">Urbanization Index</span>
              <span className="text-lg font-bold font-mono text-blue-400 mt-0.5 block">{currentDistrict.urbanizationIndex} / 100</span>
              <span className="text-[10px] text-gray-500">Pop: {(currentDistrict.population / 100000).toFixed(1)}L</span>
            </div>
          </div>
        </div>
      )}

      {/* Grid of All Karnataka Districts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDistricts.map((d) => (
          <div
            key={d.id}
            onClick={() => onSelectDistrict(d.name)}
            className={`ksp-card ksp-card-interactive ${
              selectedDistrict === d.name ? 'border-blue-500 bg-blue-950/20' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-sm font-bold text-white">{d.name}</h4>
                <p className="text-[11px] text-gray-400">{d.policeStationCount} Police Stations</p>
              </div>
              <RiskBadge level={d.riskLevel} score={d.riskScore} />
            </div>

            <div className="mt-3 pt-3 border-t border-gray-800/80 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-gray-500 block">FIR Volume</span>
                <span className="font-mono font-bold text-gray-200">{d.totalCases}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 block">MoM Growth</span>
                <span className={`font-mono font-bold ${d.monthChangePercent > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {d.monthChangePercent > 0 ? `+${d.monthChangePercent}%` : `${d.monthChangePercent}%`}
                </span>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-gray-400 flex items-center justify-between">
              <span className="truncate">Top Crime: <strong className="text-gray-300">{d.topCrime}</strong></span>
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 shrink-0 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
