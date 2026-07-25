import React from 'react';
import { Shield, Radio, Server, Activity, Wifi } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-[#0d1321]/95 backdrop-blur-xl border-b border-[#1e293b]/80 px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50">
      {/* Left: Brand */}
      <div className="flex items-center gap-3.5">
        <div className="relative p-2.5 bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
          <Shield className="w-6 h-6 text-blue-400" />
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0d1321] animate-pulse"></div>
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[17px] font-extrabold text-white tracking-tight">
              CrimeLens <span className="text-gradient-blue">Karnataka</span>
            </h1>
            <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold border border-blue-500/20 tracking-wider">
              KSP SCRB
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5 tracking-wide">
            Catalyst-Powered AI Crime Analytics & Visualization
          </p>
        </div>
      </div>

      {/* Right: Status Indicators */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Connection Status */}
        <div className="flex items-center gap-2 bg-emerald-500/5 px-3 py-1.5 rounded-lg border border-emerald-500/15 text-xs">
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400 font-medium text-[11px]">Connected</span>
        </div>

        {/* Threat Level */}
        <div className="flex items-center gap-2 bg-red-500/5 border border-red-500/15 px-3 py-1.5 rounded-lg text-xs">
          <div className="w-2 h-2 rounded-full bg-red-500 alert-pulse-critical"></div>
          <span className="text-red-400 font-bold uppercase tracking-wider text-[11px]">ELEVATED</span>
        </div>

        {/* Live Feed */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-500 font-mono bg-[#0a0e1a] px-3 py-1.5 rounded-lg border border-[#1e293b]">
          <Activity className="w-3.5 h-3.5 text-blue-400" />
          <span>KSP-HQ LIVE</span>
        </div>
      </div>
    </header>
  );
}
