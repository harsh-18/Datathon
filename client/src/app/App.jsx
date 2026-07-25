import React, { useState, useEffect } from 'react';
import Header from '../shared/components/Header';
import Sidebar from '../shared/components/Sidebar';
import FilterBar from '../shared/components/FilterBar';

import OverviewPage from '../features/overview/pages/OverviewPage';
import DistrictsPage from '../features/districts/pages/DistrictsPage';
import HotspotsPage from '../features/hotspots/pages/HotspotsPage';
import TrendsPage from '../features/trends/pages/TrendsPage';
import NetworkPage from '../features/network/pages/NetworkPage';
import OffendersPage from '../features/offenders/pages/OffendersPage';
import RiskScoringPage from '../features/riskScoring/pages/RiskScoringPage';
import AlertsPage from '../features/alerts/pages/AlertsPage';
import SocioInsightsPage from '../features/socioInsights/pages/SocioInsightsPage';
import AskDataPage from '../features/askData/pages/AskDataPage';

import { 
  getOverview, 
  getDistricts, 
  getHotspots, 
  getTrends, 
  getNetwork, 
  getOffenders, 
  getAlerts, 
  getSocioInsights 
} from '../shared/services/apiClient';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCrimeType, setSelectedCrimeType] = useState('All Categories');
  const [selectedSeverity, setSelectedSeverity] = useState('All');

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
        console.error('Error loading dashboard data:', err);
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

  const filteredDistricts = districts.filter(d => {
    if (selectedDistrict !== 'All' && d.name !== selectedDistrict) return false;
    if (selectedSeverity !== 'All' && d.riskLevel !== selectedSeverity) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-ksp-bg text-slate-100 flex flex-col font-sans antialiased">
      <Header />

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
              <p className="text-xs">Loading KSP SCRB Intelligence Platform...</p>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <OverviewPage 
                  overviewData={overviewData} 
                  districts={filteredDistricts} 
                  onSelectDistrict={setSelectedDistrict}
                  onNavigate={setActiveTab}
                />
              )}
              {activeTab === 'districts' && (
                <DistrictsPage 
                  districts={filteredDistricts} 
                  selectedDistrict={selectedDistrict} 
                  onSelectDistrict={setSelectedDistrict} 
                />
              )}
              {activeTab === 'map' && (
                <HotspotsPage 
                  districts={filteredDistricts} 
                  hotspots={hotspots} 
                  onSelectDistrict={setSelectedDistrict} 
                />
              )}
              {activeTab === 'trends' && (
                <TrendsPage 
                  trendsData={trends} 
                />
              )}
              {activeTab === 'network' && (
                <NetworkPage 
                  networkData={network} 
                />
              )}
              {activeTab === 'offenders' && (
                <OffendersPage 
                  offenders={offenders} 
                />
              )}
              {activeTab === 'scoring' && (
                <RiskScoringPage 
                  districts={districts} 
                />
              )}
              {activeTab === 'alerts' && (
                <AlertsPage 
                  alerts={alerts} 
                />
              )}
              {activeTab === 'socio' && (
                <SocioInsightsPage 
                  socioInsights={socioInsights} 
                />
              )}
              {activeTab === 'ask' && (
                <AskDataPage />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
