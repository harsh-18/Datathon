import React from 'react';
import { Shield, Radio, Server, Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-950/80 border border-blue-800 rounded-lg flex items-center justify-center">
          <Shield className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-extrabold text-white tracking-wide">CrimeLens Karnataka</h1>
            <span className="bg-blue-950 text-blue-300 text-xs px-2 py-0.5 rounded font-mono border border-blue-800">KSP SCRB INTELLIGENCE</span>
          </div>
          <p className="text-xs text-gray-400">Catalyst-Powered AI Crime Analytics & Visualization Platform</p>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 bg-gray-800/80 px-3 py-1.5 rounded-lg border border-gray-700 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-gray-300 font-medium">Project: CrimeLens-Karnataka</span>
          <Server className="w-3.5 h-3.5 text-emerald-400 ml-1" />
        </div>

        <div className="flex items-center gap-2 bg-red-950/50 border border-red-900 px-3 py-1.5 rounded-lg text-xs">
          <Radio className="w-3.5 h-3.5 text-red-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="text-red-300 font-semibold uppercase tracking-wider">State Threat Level: ELEVATED</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 font-mono bg-gray-950 px-3 py-1.5 rounded border border-gray-800">
          <Activity className="w-3.5 h-3.5 text-blue-400" />
          <span>KSP-HQ | LIVE FEED</span>
        </div>
      </div>
    </header>
  );
}
