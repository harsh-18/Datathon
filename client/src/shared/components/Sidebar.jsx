import React from 'react';
import { 
  LayoutDashboard, Building2, MapPin, TrendingUp, Network, 
  Users, Cpu, BellRing, BarChart3, MessageSquareCode, ChevronRight 
} from 'lucide-react';
import { TAB_ROUTES } from '../constants/routes';

export default function Sidebar({ activeTab, onTabChange }) {
  const navGroups = [
    {
      label: 'INTELLIGENCE',
      items: [
        { id: TAB_ROUTES.OVERVIEW, label: 'Executive Overview', icon: LayoutDashboard },
        { id: TAB_ROUTES.DISTRICTS, label: 'District Analytics', icon: Building2 },
        { id: TAB_ROUTES.HOTSPOTS, label: 'Geospatial Hotspots', icon: MapPin, badge: 'LIVE', badgeColor: 'emerald' },
        { id: TAB_ROUTES.TRENDS, label: 'Temporal Trends', icon: TrendingUp },
      ]
    },
    {
      label: 'INVESTIGATIONS',
      items: [
        { id: TAB_ROUTES.NETWORK, label: 'Network Graph', icon: Network },
        { id: TAB_ROUTES.OFFENDERS, label: 'Repeat Offenders', icon: Users },
      ]
    },
    {
      label: 'AI & ALERTS',
      items: [
        { id: TAB_ROUTES.SCORING, label: 'AI Risk Engine', icon: Cpu },
        { id: TAB_ROUTES.ALERTS, label: 'Anomaly Alerts', icon: BellRing, badge: '4', badgeColor: 'red' },
        { id: TAB_ROUTES.SOCIO, label: 'Socio Insights', icon: BarChart3 },
        { id: TAB_ROUTES.ASK, label: 'Ask CrimeLens', icon: MessageSquareCode },
      ]
    }
  ];

  return (
    <aside className="w-[250px] bg-[#0d1321]/80 backdrop-blur-sm border-r border-[#1e293b]/60 flex flex-col shrink-0 min-h-[calc(100vh-53px)]">
      <nav className="p-3 flex-1 overflow-y-auto space-y-5 pt-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] px-3 mb-2">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`group w-full flex items-center justify-between px-3 py-2 rounded-lg text-[12px] font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm shadow-blue-500/5'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-[15px] h-[15px] transition-colors ${
                        isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'
                      }`} />
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold ${
                          item.badgeColor === 'emerald' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <ChevronRight className="w-3 h-3 text-blue-400/60" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#1e293b]/50">
        <div className="bg-[#0a0e1a]/80 border border-[#1e293b]/60 rounded-lg p-3">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="font-semibold text-slate-300">Deployment</span>
            <span className="text-amber-400 font-mono text-[10px]">Zoho Catalyst</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            <p className="text-[10px] text-slate-500">CrimeLens-Karnataka • Active</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
