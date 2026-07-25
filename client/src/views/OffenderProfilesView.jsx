import React from 'react';
import RiskBadge from '../components/RiskBadge';
import { Users, FileText, MapPin, Tag, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function OffenderProfilesView({ offenders = [] }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-400" />
          Repeat & Habitual Offender Intelligence Profiles
        </h2>
        <p className="text-xs text-gray-400">Track multi-district habitual offenders, linked FIR numbers, modus operandi signatures, and active police recommendations.</p>
      </div>

      {/* Offender Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offenders.map((offender) => (
          <div key={offender.id} className="ksp-card bg-gray-900/90 border-gray-800 space-y-4">
            {/* Top Bar: Name, Risk, ID */}
            <div className="flex items-start justify-between pb-3 border-b border-gray-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-white">{offender.name}</h3>
                  <RiskBadge score={offender.riskScore} />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Age: <span className="text-gray-200">{offender.age}</span> | Gender: <span className="text-gray-200">{offender.gender}</span> | Status: <span className="text-amber-400 font-semibold">{offender.status}</span>
                </p>
              </div>
              <span className="font-mono text-xs text-blue-400 bg-gray-950 px-2 py-1 rounded border border-gray-800">
                {offender.id}
              </span>
            </div>

            {/* Active Jurisdictions & Linked Cases */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-950/80 p-2.5 rounded border border-gray-800">
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider block flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  Active Districts
                </span>
                <p className="text-gray-200 font-medium mt-1">{offender.districtsActive.join(', ')}</p>
              </div>

              <div className="bg-gray-950/80 p-2.5 rounded border border-gray-800">
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider block flex items-center gap-1">
                  <FileText className="w-3 h-3 text-red-400" />
                  Linked FIR Cases
                </span>
                <p className="text-gray-200 font-mono font-bold mt-1">{offender.linkedCases.join(', ')}</p>
              </div>
            </div>

            {/* Modus Operandi Tags */}
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <Tag className="w-3 h-3 text-purple-400" />
                Modus Operandi Signatures
              </span>
              <div className="flex flex-wrap gap-1.5">
                {offender.modusOperandiTags.map((mo, idx) => (
                  <span key={idx} className="bg-purple-950/60 text-purple-300 border border-purple-800 text-[11px] px-2 py-0.5 rounded font-medium">
                    {mo}
                  </span>
                ))}
              </div>
            </div>

            {/* Investigation Recommendation Box */}
            <div className="bg-blue-950/40 border border-blue-900/80 rounded-lg p-3 text-xs">
              <span className="text-blue-300 font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                SCRB Investigation Advisory
              </span>
              <p className="text-gray-300 mt-1 text-[11px] leading-relaxed">{offender.investigationRecommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
