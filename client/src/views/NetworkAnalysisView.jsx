import React, { useState } from 'react';
import { Network, UserCheck, FileText, MapPin, Tag, Info, AlertTriangle } from 'lucide-react';

export default function NetworkAnalysisView({ networkData }) {
  const [selectedNode, setSelectedNode] = useState(null);

  if (!networkData || !networkData.nodes) {
    return <div className="p-8 text-center text-gray-400">Loading Criminal Network Graph...</div>;
  }

  const { nodes, edges } = networkData;

  // Preset fixed coordinates for force-graph simulation rendering in SVG viewport (800x480)
  const nodeCoords = {
    'SUS-01': { x: 200, y: 150 },
    'SUS-02': { x: 220, y: 320 },
    'SUS-03': { x: 620, y: 120 },
    'SUS-04': { x: 260, y: 410 },
    
    'CASE-1001': { x: 380, y: 180 },
    'CASE-1002': { x: 500, y: 160 },
    'CASE-1003': { x: 120, y: 220 },
    'CASE-1004': { x: 420, y: 380 },
    'CASE-1005': { x: 340, y: 440 },
    
    'LOC-01': { x: 460, y: 270 },
    'LOC-02': { x: 180, y: 460 },
    'MO-01': { x: 100, y: 100 },
    'MO-02': { x: 680, y: 260 }
  };

  const getNodeColor = (type, risk) => {
    if (type === 'suspect') return risk === 'Critical' ? '#ef4444' : '#f59e0b';
    if (type === 'case') return '#3b82f6';
    if (type === 'location') return '#10b981';
    return '#a855f7'; // MO tag
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Network className="w-5 h-5 text-purple-400" />
          Criminal Link & Association Network Analysis
        </h2>
        <p className="text-xs text-gray-400">Multi-entity graph linking Suspects, Registered FIRs, Hotspot Locations, and Shared Modus Operandi.</p>
      </div>

      {/* Main Grid: Interactive Graph & Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG Network Graph */}
        <div className="lg:col-span-2 ksp-card p-2 relative bg-gray-950">
          <div className="w-full h-[480px] overflow-hidden rounded border border-gray-800 relative">
            <svg className="w-full h-full text-xs font-mono" viewBox="0 0 800 500">
              {/* Edges */}
              {edges.map((edge, i) => {
                const sourceCoord = nodeCoords[edge.source] || { x: 400, y: 250 };
                const targetCoord = nodeCoords[edge.target] || { x: 400, y: 250 };
                const isSelected = selectedNode && (selectedNode.id === edge.source || selectedNode.id === edge.target);

                return (
                  <g key={i}>
                    <line
                      x1={sourceCoord.x}
                      y1={sourceCoord.y}
                      x2={targetCoord.x}
                      y2={targetCoord.y}
                      stroke={isSelected ? '#3b82f6' : '#374151'}
                      strokeWidth={isSelected ? 3 : 1.5}
                      strokeDasharray={edge.label.includes('Accomplice') ? '4,4' : 'none'}
                    />
                    <text
                      x={(sourceCoord.x + targetCoord.x) / 2}
                      y={(sourceCoord.y + targetCoord.y) / 2 - 4}
                      fill="#6b7280"
                      fontSize="9"
                      textAnchor="middle"
                    >
                      {edge.label}
                    </text>
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => {
                const coord = nodeCoords[node.id] || { x: 400, y: 250 };
                const isSelected = selectedNode?.id === node.id;
                const nodeColor = getNodeColor(node.type, node.risk);

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={isSelected ? 18 : 14}
                      fill={nodeColor}
                      fillOpacity={0.85}
                      stroke={isSelected ? '#ffffff' : '#1f2937'}
                      strokeWidth={isSelected ? 3 : 1.5}
                    />
                    <text
                      x={coord.x}
                      y={coord.y + 26}
                      fill="#f9fafb"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {node.label.split('(')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Node Types Legend */}
          <div className="mt-3 flex items-center justify-between px-3 text-[11px] text-gray-400 border-t border-gray-800 pt-2">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Suspect (Accused)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Case (FIR)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Location</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Modus Operandi</span>
          </div>
        </div>

        {/* Node Details Inspector Side Panel */}
        <div className="ksp-card">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" />
              Entity Association Inspector
            </h3>
          </div>

          {selectedNode ? (
            <div className="space-y-4 text-xs">
              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block">SELECTED NODE ID</span>
                <span className="font-mono text-sm font-bold text-blue-400 mt-0.5 block">{selectedNode.id}</span>
                <h4 className="text-sm font-bold text-white mt-2">{selectedNode.label}</h4>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-gray-900 text-gray-300 font-mono capitalize">{selectedNode.type}</span>
                  <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 font-semibold">{selectedNode.risk} Severity</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">DIRECT ASSOCIATIONS & LINKS</span>
                <div className="space-y-2">
                  {edges
                    .filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
                    .map((e, idx) => (
                      <div key={idx} className="bg-gray-950/80 p-2.5 rounded border border-gray-800 text-gray-300">
                        <span className="text-[10px] text-blue-400 font-mono block">{e.label}</span>
                        <span className="text-xs text-gray-200 font-medium">
                          {e.source === selectedNode.id ? e.target : e.source}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 space-y-2">
              <Network className="w-8 h-8 text-gray-600 mx-auto animate-bounce" />
              <p className="text-xs">Click any node on the graph to inspect criminal links, shared MOs, and case associations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
