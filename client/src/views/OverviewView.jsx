import React from 'react';
import StatCard from '../components/StatCard';
import RiskBadge from '../components/RiskBadge';
import { FileText, MapPin, Users, AlertTriangle, Flame, ShieldAlert, ArrowUpRight } from 'lucide-react';

export default function OverviewView({ overviewData, districts = [], onSelectDistrict, onNavigate }) {
  if (!overviewData) return <div className="p-8 text-center text-gray-400">Loading SCRB Overview Data...</div>;

  const { totalFIRs, activeHotspots, repeatOffendersCount, criticalDistrictsCount, crimeSpikeNotice, topCrimeCategories, recentIncidents } = overviewData;

  const topDistricts = [...districts].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Crime Spike Alert Banner */}
      <div className="bg-gradient-to-r from-red-950/80 via-red-900/40 to-gray-900 border border-red-800 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-900/60 rounded-full alert-pulse-critical text-red-300">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">CRITICAL ANOMALY ALERT</span>
              <span className="text-[10px] bg-red-900 text-red-200 px-2 py-0.5 rounded font-mono">AUTOMATED DETECT</span>
            </div>
            <p className="text-sm font-semibold text-white mt-0.5">{crimeSpikeNotice}</p>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('alerts')}
          className="bg-red-900 hover:bg-red-800 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition"
        >
          <span>View Anomaly Evidence</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Active FIRs"
          value={totalFIRs?.toLocaleString() || "5,070"}
          subtext="State-wide registered cases"
          change={14.2}
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Active Hotspot Zones"
          value={activeHotspots || "5"}
          subtext="Critical & High risk districts"
          change={28.5}
          icon={MapPin}
          color="red"
        />
        <StatCard
          title="Repeat Offenders Tracked"
          value={repeatOffendersCount || "4"}
          subtext="Multi-jurisdiction offenders"
          change={33.3}
          icon={Users}
          color="amber"
        />
        <StatCard
          title="Critical Risk Districts"
          value={criticalDistrictsCount || "1"}
          subtext="Risk Score ≥ 85 / 100"
          change={100}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Main Grid: Top Crime Breakdown & High-Risk Districts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crime Category Breakdown */}
        <div className="ksp-card">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-400" />
              State Crime Distribution
            </h3>
            <span className="text-xs text-gray-400 font-mono">Current Quarter</span>
          </div>

          <div className="space-y-4">
            {(topCrimeCategories || []).map((cat, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300 font-medium">{cat.name}</span>
                  <span className="text-gray-400 font-mono">{cat.count} FIRs ({cat.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-950 rounded-full h-2 overflow-hidden border border-gray-800">
                  <div 
                    className={`h-full rounded-full ${
                      idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-amber-500' : idx === 2 ? 'bg-blue-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${cat.percentage * 2}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High-Risk Districts Table */}
        <div className="ksp-card">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-400" />
              High-Risk District Standings
            </h3>
            <button 
              onClick={() => onNavigate('districts')}
              className="text-xs text-blue-400 hover:underline"
            >
              View All Districts →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-500 border-b border-gray-800 font-medium">
                  <th className="pb-2">District</th>
                  <th className="pb-2">FIR Count</th>
                  <th className="pb-2">Spike %</th>
                  <th className="pb-2">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-mono">
                {topDistricts.map((d) => (
                  <tr 
                    key={d.id} 
                    onClick={() => { onSelectDistrict(d.name); onNavigate('districts'); }}
                    className="hover:bg-gray-800/40 cursor-pointer transition"
                  >
                    <td className="py-2.5 font-semibold text-gray-200">{d.name}</td>
                    <td className="py-2.5 text-gray-300">{d.totalCases}</td>
                    <td className="py-2.5">
                      <span className={d.monthChangePercent > 0 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                        {d.monthChangePercent > 0 ? `+${d.monthChangePercent}%` : `${d.monthChangePercent}%`}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <RiskBadge level={d.riskLevel} score={d.riskScore} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Incidents Feed */}
      <div className="ksp-card">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
          <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            Recent Logged FIR Incidents (KSP Network)
          </h3>
          <span className="text-xs text-gray-400 font-mono">Real-time Feed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(recentIncidents || []).map((inc) => (
            <div key={inc.id} className="bg-gray-950/80 border border-gray-800 rounded-lg p-3 hover:border-gray-700 transition">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono text-blue-400 font-semibold">{inc.firNumber}</span>
                <span className="text-[10px] text-gray-500">{inc.date} | {inc.timeOfDay}</span>
              </div>
              <h4 className="text-xs font-bold text-gray-200">{inc.crimeType}</h4>
              <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{inc.summary}</p>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-900 text-[10px] text-gray-400">
                <span>{inc.policeStation}</span>
                <span className={`px-1.5 py-0.5 rounded font-semibold ${inc.severity === 'Critical' ? 'bg-red-950 text-red-400' : 'bg-amber-950 text-amber-400'}`}>
                  {inc.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
