import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  MapPin, 
  TrendingUp, 
  Network, 
  Users, 
  Cpu, 
  BellRing, 
  BarChart3, 
  MessageSquareCode 
} from 'lucide-react';
import { TAB_ROUTES } from '../constants/routes';

export default function Sidebar({ activeTab, onTabChange }) {
  const navItems = [
    { id: TAB_ROUTES.OVERVIEW, label: 'Executive Overview', icon: LayoutDashboard },
    { id: TAB_ROUTES.DISTRICTS, label: 'District Analytics', icon: Building2 },
    { id: TAB_ROUTES.HOTSPOTS, label: 'Geospatial Hotspots', icon: MapPin, badge: 'LIVE' },
    { id: TAB_ROUTES.TRENDS, label: 'Spatiotemporal Trends', icon: TrendingUp },
    { id: TAB_ROUTES.NETWORK, label: 'Network Link Graph', icon: Network },
    { id: TAB_ROUTES.OFFENDERS, label: 'Repeat Offenders', icon: Users },
    { id: TAB_ROUTES.SCORING, label: 'AI Risk Engine', icon: Cpu },
    { id: TAB_ROUTES.ALERTS, label: 'Anomaly Alerts', icon: BellRing, badge: '4 New' },
    { id: TAB_ROUTES.SOCIO, label: 'Socio Insights', icon: BarChart3 },
    { id: TAB_ROUTES.ASK, label: 'Ask Crime Data', icon: MessageSquareCode }
  ];

  return (
    <aside className="w-64 bg-gray-900/90 border-r border-gray-800 flex flex-col shrink-0 min-h-[calc(100vh-57px)]">
      <div className="p-4 border-b border-gray-800/80">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">COMMAND CENTER NAVIGATION</p>
      </div>

      <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  item.badge === 'LIVE' 
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                    : 'bg-red-950 text-red-400 border border-red-800'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800 bg-gray-950/60 m-2 rounded-lg">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span className="font-semibold text-gray-300">Deployment Target</span>
          <span className="text-amber-400 font-mono text-[10px]">Zoho Catalyst</span>
        </div>
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Running on Catalyst Slate & Serverless Functions node.
        </p>
      </div>
    </aside>
  );
}
