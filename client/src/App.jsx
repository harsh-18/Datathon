import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FilterBar from './components/FilterBar';

import OverviewView from './views/OverviewView';
import DistrictAnalyticsView from './views/DistrictAnalyticsView';
import HotspotMapView from './views/HotspotMapView';
import SpatiotemporalView from './views/SpatiotemporalView';
import NetworkAnalysisView from './views/NetworkAnalysisView';
import OffenderProfilesView from './views/OffenderProfilesView';
import RiskScoringView from './views/RiskScoringView';
import AlertsView from './views/AlertsView';
import SocioInsightsView from './views/SocioInsightsView';
import AskDataView from './views/AskDataView';

import { 
  getOverview, 
  getDistricts, 
  getHotspots, 
  getTrends, 
  getNetwork, 
  getOffenders, 
  getAlerts, 
  getSocioInsights 
} from './api/client';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Filters State
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCrimeType, setSelectedCrimeType] = useState('All Categories');
  const [selectedSeverity, setSelectedSeverity] = useState('All');

  // Data States
  const [overviewData, setOverviewData] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [hotspots, setHotspots] = useState([]);
  const [trends, setTrends] = useState(null);
  const [network, setNetwork] = useState(null);
  const [offenders, setOffenders] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [socioInsights, setSocioInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      try {
        const [ov, dist, hs, tr, net, off, alt, socio] = await Promise.all([
          getOverview(),
          getDistricts(),
          getHotspots(),
          getTrends(),
          getNetwork(),
          getOffenders(),
          getAlerts(),
          getSocioInsights()
        ]);

        setOverviewData(ov);
        setDistricts(dist);
        setHotspots(hs);
        setTrends(tr);
        setNetwork(net);
        setOffenders(off);
        setAlerts(alt);
        setSocioInsights(socio);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadAllData();
  }, []);

  const handleResetFilters = () => {
    setSelectedDistrict('All');
    setSelectedCrimeType('All Categories');
    setSelectedSeverity('All');
  };

  // Filter districts based on current filter state
  const filteredDistricts = districts.filter(d => {
    if (selectedDistrict !== 'All' && d.name !== selectedDistrict) return false;
    if (selectedSeverity !== 'All' && d.riskLevel !== selectedSeverity) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col font-sans">
      <Header 
        selectedDistrict={selectedDistrict} 
        onDistrictChange={setSelectedDistrict} 
      />

      <div className="flex flex-1">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          <FilterBar
            districts={districts}
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
            selectedCrimeType={selectedCrimeType}
            onCrimeTypeChange={setSelectedCrimeType}
            selectedSeverity={selectedSeverity}
            onSeverityChange={setSelectedSeverity}
            onReset={handleResetFilters}
          />

          {loading ? (
            <div className="p-12 text-center text-gray-400 space-y-2">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs">Initializing KSP SCRB Crime Intelligence Platform...</p>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <OverviewView 
                  overviewData={overviewData} 
                  districts={filteredDistricts} 
                  onSelectDistrict={setSelectedDistrict}
                  onNavigate={setActiveTab}
                />
              )}
              {activeTab === 'districts' && (
                <DistrictAnalyticsView 
                  districts={filteredDistricts} 
                  selectedDistrict={selectedDistrict} 
                  onSelectDistrict={setSelectedDistrict} 
                />
              )}
              {activeTab === 'map' && (
                <HotspotMapView 
                  districts={filteredDistricts} 
                  hotspots={hotspots} 
                  onSelectDistrict={setSelectedDistrict} 
                />
              )}
              {activeTab === 'trends' && (
                <SpatiotemporalView 
                  trendsData={trends} 
                />
              )}
              {activeTab === 'network' && (
                <NetworkAnalysisView 
                  networkData={network} 
                />
              )}
              {activeTab === 'offenders' && (
                <OffenderProfilesView 
                  offenders={offenders} 
                />
              )}
              {activeTab === 'scoring' && (
                <RiskScoringView 
                  districts={districts} 
                />
              )}
              {activeTab === 'alerts' && (
                <AlertsView 
                  alerts={alerts} 
                />
              )}
              {activeTab === 'socio' && (
                <SocioInsightsView 
                  socioInsights={socioInsights} 
                />
              )}
              {activeTab === 'ask' && (
                <AskDataView />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
