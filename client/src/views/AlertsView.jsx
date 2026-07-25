import React from 'react';
import RiskBadge from '../components/RiskBadge';
import { BellRing, ShieldAlert, CheckCircle, ArrowUpRight } from 'lucide-react';

export default function AlertsView({ alerts = [] }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BellRing className="w-5 h-5 text-red-400" />
          Anomaly & Emerging Crime Trend Alerts (SCRB Dispatch)
        </h2>
        <p className="text-xs text-gray-400">Automated system alerts generated from multi-station FIR spikes, modus operandi clustering, and repeat offender sightings.</p>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="ksp-card border-l-4 border-l-red-500 bg-gray-900/90 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-900">
                    {alert.id}
                  </span>
                  <h3 className="text-base font-bold text-white">{alert.title}</h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Jurisdiction: <span className="text-gray-200 font-medium">{alert.district}</span> | Category: <span className="text-amber-400 font-medium">{alert.crimeType}</span>
                </p>
              </div>
              <RiskBadge level={alert.severity} />
            </div>

            <p className="text-xs text-gray-300 leading-relaxed bg-gray-950/60 p-2.5 rounded border border-gray-800">
              {alert.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-950 p-2.5 rounded border border-gray-800">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">EVIDENCE TRAIL & DETECTED PATTERN</span>
                <p className="text-gray-300 font-mono text-[11px] mt-1">{alert.evidence}</p>
              </div>

              <div className="bg-blue-950/40 p-2.5 rounded border border-blue-900 text-blue-200">
                <span className="text-[10px] text-blue-300 uppercase font-semibold block">RECOMMENDED COMMAND ACTION</span>
                <p className="text-emerald-400 font-medium text-[11px] mt-1">{alert.recommendedAction}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
