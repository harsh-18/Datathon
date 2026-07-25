import React from 'react';
import { BarChart3, TrendingUp, Users, Building, Activity } from 'lucide-react';

export default function SocioInsightsView({ socioInsights = [] }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          Socio-Demographic & Economic Crime Correlation Insights
        </h2>
        <p className="text-xs text-gray-400">Analytical indicators mapping urbanization, economic stress, migration, and unemployment against specific offense patterns.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socioInsights.map((item, idx) => (
          <div key={idx} className="ksp-card bg-gray-900/90 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-800">
              <h3 className="text-sm font-bold text-white">{item.district}</h3>
              <span className="text-xs font-mono text-gray-400">Pop: {(item.population / 100000).toFixed(1)} Lakhs</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-gray-950 p-2 rounded border border-gray-800">
                <span className="text-[10px] text-gray-500 block">Urbanization</span>
                <span className="font-mono font-bold text-blue-400">{item.urbanizationIndex}/100</span>
              </div>
              <div className="bg-gray-950 p-2 rounded border border-gray-800">
                <span className="text-[10px] text-gray-500 block">Econ Stress</span>
                <span className="font-mono font-bold text-amber-400">{item.economicStressIndex}/100</span>
              </div>
              <div className="bg-gray-950 p-2 rounded border border-gray-800">
                <span className="text-[10px] text-gray-500 block">Unemployment</span>
                <span className="font-mono font-bold text-red-400">{item.unemploymentRate}%</span>
              </div>
              <div className="bg-gray-950 p-2 rounded border border-gray-800">
                <span className="text-[10px] text-gray-500 block">Migration</span>
                <span className="font-mono font-bold text-purple-400">{item.migrationIndex}/100</span>
              </div>
            </div>

            <div className="bg-gray-950/80 p-2.5 rounded border border-gray-800 text-xs">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">ANALYTICAL CORRELATION FINDING</span>
              <p className="text-gray-300 text-[11px] mt-1 leading-relaxed">{item.correlationInsight}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
