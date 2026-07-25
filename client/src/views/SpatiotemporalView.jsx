import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { TrendingUp, Clock, AlertCircle, Info } from 'lucide-react';

export default function SpatiotemporalView({ trendsData }) {
  if (!trendsData || !trendsData.monthly) {
    return <div className="p-8 text-center text-gray-400">Loading Spatiotemporal Trend Analysis...</div>;
  }

  const { monthly, hourly } = trendsData;

  const callouts = [
    { title: "Robbery Spike", text: "Robbery increased 38.2% in Bengaluru Urban compared to last month.", severity: "Critical" },
    { title: "Cybercrime Cluster", text: "Cyber financial fraud cluster emerging rapidly across Mysuru.", severity: "High" },
    { title: "Night Theft Surge", text: "Night-time commercial burglary & snatching rising in Hubballi-Dharwad.", severity: "High" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          Spatiotemporal Crime Pattern & Trend Analysis
        </h2>
        <p className="text-xs text-gray-400">Month-over-month trajectory, hourly time-of-day peak detection, and automated anomaly callouts.</p>
      </div>

      {/* Analytical Callouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {callouts.map((c, i) => (
          <div key={i} className="bg-gray-950 border border-gray-800 rounded-lg p-3 flex items-start gap-3">
            <div className={`p-2 rounded-lg shrink-0 ${c.severity === 'Critical' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-200">{c.title}</span>
              <p className="text-xs text-gray-400 mt-0.5">{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Crime Trend Line Chart */}
        <div className="ksp-card">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Monthly FIR Registration Trajectory
            </h3>
            <span className="text-xs text-gray-400 font-mono">2026 YTD</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#f9fafb', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="theft" name="Theft & Snatching" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="cyber" name="Cyber Fraud" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="burglary" name="Burglary" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Incident Distribution Bar Chart */}
        <div className="ksp-card">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Time-of-Day Incident Peak Distribution
            </h3>
            <span className="text-xs text-gray-400 font-mono">24-Hour Cycle</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="timeSlot" stroke="#9ca3af" fontSize={10} />
                <YAxis stroke="#9ca3af" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#f9fafb', fontSize: '12px' }} />
                <Bar dataKey="count" name="Incidents Logged" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
