import React, { useState } from 'react';
import RiskBadge from '../components/RiskBadge';
import { Cpu, Sliders, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function RiskScoringView({ districts = [] }) {
  const [selectedDistrictName, setSelectedDistrictName] = useState(districts[0]?.name || 'Bengaluru Urban');
  
  // Interactive Risk Weight Sliders
  const [spikeWeight, setSpikeWeight] = useState(30);
  const [offenderWeight, setOffenderWeight] = useState(25);
  const [nightWeight, setNightWeight] = useState(20);
  const [socioWeight, setSocioWeight] = useState(25);

  const activeDistrict = districts.find(d => d.name === selectedDistrictName) || districts[0] || {};

  // Deterministic Explainable Risk Score calculation
  const calculateScore = (d) => {
    if (!d || !d.totalCases) return 75;
    const spikeFactor = Math.min(100, Math.max(0, (d.monthChangePercent || 15) * 2));
    const offenderFactor = Math.min(100, (d.activeRepeatOffenders || 5) * 7);
    const nightFactor = 70; // Baseline night crime concentration
    const socioFactor = d.economicStressIndex || 50;

    const totalWeight = spikeWeight + offenderWeight + nightWeight + socioWeight;
    const weightedSum = 
      (spikeFactor * spikeWeight) +
      (offenderFactor * offenderWeight) +
      (nightFactor * nightWeight) +
      (socioFactor * socioWeight);

    return Math.round(weightedSum / (totalWeight || 100));
  };

  const calculatedScore = calculateScore(activeDistrict);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-400" />
          Explainable AI-Style Predictive Risk Engine
        </h2>
        <p className="text-xs text-gray-400">Transparent deterministic risk assessment model attributing weight factors to crime spikes, repeat offender presence, and socio-economic stress.</p>
      </div>

      {/* Main Grid: Factor Weights Control & Calculated Result */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Model Parameter Controls */}
        <div className="ksp-card space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800">
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              Risk Model Factor Weight Attribution
            </h3>
            <span className="text-xs text-gray-400 font-mono">Interactive Model</span>
          </div>

          {/* District Selector */}
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Target District Jurisdiction</label>
            <select
              value={selectedDistrictName}
              onChange={(e) => setSelectedDistrictName(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 text-gray-200 text-xs rounded-lg p-2 focus:outline-none focus:border-blue-500"
            >
              {districts.map(d => (
                <option key={d.id} value={d.name}>{d.name} (Current Score: {d.riskScore})</option>
              ))}
            </select>
          </div>

          {/* Factor Sliders */}
          <div className="space-y-3 pt-2 text-xs">
            <div>
              <div className="flex justify-between text-gray-300 mb-1">
                <span>MoM Crime Volume Spike Weight</span>
                <span className="font-mono text-blue-400 font-bold">{spikeWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={spikeWeight}
                onChange={(e) => setSpikeWeight(Number(e.target.value))}
                className="w-full accent-blue-500 bg-gray-950 h-1.5 rounded"
              />
            </div>

            <div>
              <div className="flex justify-between text-gray-300 mb-1">
                <span>Repeat Offender Concentration Weight</span>
                <span className="font-mono text-amber-400 font-bold">{offenderWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={offenderWeight}
                onChange={(e) => setOffenderWeight(Number(e.target.value))}
                className="w-full accent-amber-500 bg-gray-950 h-1.5 rounded"
              />
            </div>

            <div>
              <div className="flex justify-between text-gray-300 mb-1">
                <span>Night-time Incident Concentration Weight</span>
                <span className="font-mono text-red-400 font-bold">{nightWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={nightWeight}
                onChange={(e) => setNightWeight(Number(e.target.value))}
                className="w-full accent-red-500 bg-gray-950 h-1.5 rounded"
              />
            </div>

            <div>
              <div className="flex justify-between text-gray-300 mb-1">
                <span>Socio-Economic Stress Index Weight</span>
                <span className="font-mono text-purple-400 font-bold">{socioWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={socioWeight}
                onChange={(e) => setSocioWeight(Number(e.target.value))}
                className="w-full accent-purple-500 bg-gray-950 h-1.5 rounded"
              />
            </div>
          </div>
        </div>

        {/* Explainable Result Box */}
        <div className="ksp-card space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800">
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Calculated Risk Index & Factor Explanation
            </h3>
          </div>

          <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-medium block">PREDICTIVE RISK INDEX</span>
              <div className="text-3xl font-extrabold text-white font-mono mt-1">
                {calculatedScore} <span className="text-xs text-gray-500 font-normal">/ 100</span>
              </div>
            </div>
            <RiskBadge score={calculatedScore} />
          </div>

          {/* Explanation Callout */}
          <div className="bg-gray-950/80 p-4 rounded-lg border border-gray-800 space-y-2 text-xs">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">EXPLAINABLE ATTRIBUTION SUMMARY</span>
            <p className="text-gray-300 leading-relaxed">
              Risk score for <strong className="text-white">{activeDistrict.name}</strong> evaluated at <strong className="text-amber-400">{calculatedScore}/100</strong>.
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-400 pt-1">
              <li>Month-over-month crime growth: <span className="text-gray-200 font-mono">{activeDistrict.monthChangePercent}%</span> (Weight: {spikeWeight}%)</li>
              <li>Active repeat offenders in jurisdiction: <span className="text-gray-200 font-mono">{activeDistrict.activeRepeatOffenders}</span> (Weight: {offenderWeight}%)</li>
              <li>District Economic Stress Index: <span className="text-gray-200 font-mono">{activeDistrict.economicStressIndex}/100</span> (Weight: {socioWeight}%)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
