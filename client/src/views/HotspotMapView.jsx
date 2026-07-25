import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import RiskBadge from '../components/RiskBadge';
import { MapPin, ShieldAlert, Navigation } from 'lucide-react';

export default function HotspotMapView({ districts = [], hotspots = [], onSelectDistrict }) {
  const [activeCrimeFilter, setActiveCrimeFilter] = useState('All');

  // Center of Karnataka (approx 14.5204, 75.7224)
  const mapCenter = [14.5204, 75.7224];

  const filteredHotspots = hotspots.filter(h => {
    if (activeCrimeFilter === 'All') return true;
    return h.topCrime.toLowerCase().includes(activeCrimeFilter.toLowerCase());
  });

  return (
    <div className="space-y-4">
      {/* Map Header & Quick Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-400" />
            Geospatial Crime Hotspot Map (Karnataka State Police)
          </h2>
          <p className="text-xs text-gray-400">Interactive spatial visualization of risk zones, FIR concentrations, and recommended tactical actions.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-gray-900 p-1 rounded-lg border border-gray-800 text-xs">
          {['All', 'Theft', 'Cybercrime', 'Burglary'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveCrimeFilter(filter)}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                activeCrimeFilter === filter
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container Card */}
      <div className="ksp-card p-2 relative">
        <div className="h-[520px] w-full rounded-lg overflow-hidden border border-gray-800">
          <MapContainer 
            center={mapCenter} 
            zoom={7} 
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a> Dark Matter'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {filteredHotspots.map((spot) => {
              const isCritical = spot.riskLevel === 'Critical';
              const isHigh = spot.riskLevel === 'High';
              
              const strokeColor = isCritical ? '#ef4444' : isHigh ? '#f59e0b' : '#10b981';
              const fillColor = isCritical ? '#ef4444' : isHigh ? '#f59e0b' : '#10b981';
              const radius = isCritical ? 24 : isHigh ? 18 : 12;

              return (
                <CircleMarker
                  key={spot.id}
                  center={[spot.lat, spot.lng]}
                  radius={radius}
                  pathOptions={{
                    color: strokeColor,
                    fillColor: fillColor,
                    fillOpacity: 0.45,
                    weight: 2
                  }}
                >
                  <Popup>
                    <div className="p-1 space-y-2 text-xs min-w-[220px]">
                      <div className="flex items-center justify-between border-b border-gray-700 pb-1.5">
                        <strong className="text-sm font-bold text-white">{spot.name}</strong>
                        <RiskBadge level={spot.riskLevel} score={spot.riskScore} />
                      </div>

                      <div className="space-y-1 text-gray-300">
                        <p>Total FIRs: <strong className="text-white font-mono">{spot.totalCases}</strong> ({spot.monthChangePercent > 0 ? `+${spot.monthChangePercent}%` : `${spot.monthChangePercent}%`})</p>
                        <p>Top Crime: <strong className="text-amber-400">{spot.topCrime}</strong></p>
                        <p>Police Stations: <strong className="text-gray-200">{spot.policeStationCount} Units</strong></p>
                      </div>

                      <div className="bg-gray-900 p-2 rounded border border-gray-700 mt-2 text-[11px]">
                        <span className="text-gray-400 block font-semibold text-[10px] uppercase tracking-wide">Recommended Police Action:</span>
                        <p className="text-emerald-400 font-medium mt-0.5">{spot.recommendedAction}</p>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>

        {/* Floating Map Legend Overlay */}
        <div className="absolute bottom-6 right-6 bg-gray-900/90 border border-gray-800 rounded-lg p-3 shadow-xl backdrop-blur text-xs z-[1000] space-y-2">
          <span className="font-bold text-gray-300 uppercase text-[10px] tracking-wider block">HOTSPOT SEVERITY LEGEND</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block border border-red-300"></span>
            <span className="text-gray-300 font-medium">Critical Risk (Score ≥ 85)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block border border-amber-300"></span>
            <span className="text-gray-300 font-medium">High Risk (Score 70-84)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block border border-emerald-300"></span>
            <span className="text-gray-300 font-medium">Medium / Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
