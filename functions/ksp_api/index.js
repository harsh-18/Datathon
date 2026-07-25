const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Load Seed Data
const dataPath = path.join(__dirname, 'data', 'seed_data.json');
let seedData = {};
try {
  const raw = fs.readFileSync(dataPath, 'utf8');
  seedData = JSON.parse(raw);
} catch (err) {
  console.error('Error loading seed data:', err);
}

// 1. Executive Overview API
app.get('/api/overview', (req, res) => {
  const totalCases = seedData.districts?.reduce((acc, d) => acc + d.totalCases, 0) || 5070;
  const activeHotspots = seedData.districts?.filter(d => d.riskLevel === 'Critical' || d.riskLevel === 'High').length || 5;
  const totalRepeatOffenders = seedData.suspects?.filter(s => s.repeatOffender).length || 4;
  const criticalDistricts = seedData.districts?.filter(d => d.riskLevel === 'Critical') || [];
  
  res.json({
    success: true,
    data: {
      totalFIRs: totalCases,
      activeHotspots: activeHotspots,
      repeatOffendersCount: totalRepeatOffenders,
      criticalDistrictsCount: criticalDistricts.length,
      crimeSpikeNotice: "38.2% surge in transit-hub robbery & snatching across Bengaluru Urban and Tumakuru",
      riskLevelSummary: "HIGH ALERT (Monsoon Night Surveillance Active)",
      topCrimeCategories: [
        { name: "Mobile & Property Theft", count: 1850, percentage: 36.5 },
        { name: "Cyber & Financial Fraud", count: 1240, percentage: 24.4 },
        { name: "Burglary & House Breaking", count: 890, percentage: 17.5 },
        { name: "Assault & Disputes", count: 620, percentage: 12.2 },
        { name: "Vehicle & Highway Theft", count: 470, percentage: 9.4 }
      ],
      recentIncidents: seedData.cases || []
    }
  });
});

// 2. Districts API
app.get('/api/districts', (req, res) => {
  res.json({ success: true, data: seedData.districts || [] });
});

// 3. Cases / FIRs API
app.get('/api/cases', (req, res) => {
  let cases = seedData.cases || [];
  if (req.query.district) {
    cases = cases.filter(c => c.district.toLowerCase() === req.query.district.toLowerCase());
  }
  if (req.query.crimeType) {
    cases = cases.filter(c => c.crimeType.toLowerCase().includes(req.query.crimeType.toLowerCase()));
  }
  res.json({ success: true, data: cases });
});

// 4. Hotspots Map API
app.get('/api/hotspots', (req, res) => {
  const hotspots = (seedData.districts || []).map(d => ({
    id: d.id,
    name: d.name,
    lat: d.lat,
    lng: d.lng,
    riskScore: d.riskScore,
    riskLevel: d.riskLevel,
    totalCases: d.totalCases,
    monthChangePercent: d.monthChangePercent,
    topCrime: d.topCrime,
    policeStationCount: d.policeStationCount,
    recommendedAction: d.riskScore > 75 
      ? "Deploy intensive night beats & ANPR checkpoint cameras" 
      : "Standard patrol & localized surveillance"
  }));
  res.json({ success: true, data: hotspots });
});

// 5. Spatiotemporal Trends API
app.get('/api/trends', (req, res) => {
  res.json({ success: true, data: seedData.spatiotemporalTrends || {} });
});

// 6. Network Link Analysis API
app.get('/api/network', (req, res) => {
  res.json({
    success: true,
    data: {
      nodes: seedData.networkNodes || [],
      edges: seedData.networkEdges || []
    }
  });
});

// 7. Repeat Offenders API
app.get('/api/offenders', (req, res) => {
  res.json({ success: true, data: seedData.suspects || [] });
});

// 8. Anomaly & Emerging Trend Alerts API
app.get('/api/alerts', (req, res) => {
  res.json({ success: true, data: seedData.alerts || [] });
});

// 9. Socio-Economic Correlations API
app.get('/api/socio-insights', (req, res) => {
  const insights = (seedData.districts || []).map(d => ({
    district: d.name,
    population: d.population,
    urbanizationIndex: d.urbanizationIndex,
    economicStressIndex: d.economicStressIndex,
    unemploymentRate: d.unemploymentRate,
    migrationIndex: d.migrationIndex,
    totalCases: d.totalCases,
    topCrime: d.topCrime,
    correlationInsight: d.urbanizationIndex > 70 
      ? "High urbanization correlates strongly with cyber fraud and snatching near transit nodes."
      : "High economic stress correlates with burglary and agricultural/boundary land disputes."
  }));
  res.json({ success: true, data: insights });
});

// 10. Natural Language Query API (Deterministic Rule-Based Matching)
app.post('/api/query', (req, res) => {
  const query = (req.body.query || '').toLowerCase().trim();
  let answer = "I parsed your query against KSP crime records.";
  let results = [];

  if (query.includes('hotspot') || query.includes('bengaluru')) {
    answer = "Bengaluru Urban is currently marked CRITICAL with a risk score of 88/100 due to a 38.2% spike in transit-hub thefts & cyber frauds.";
    results = seedData.districts.filter(d => d.name.includes('Bengaluru'));
  } else if (query.includes('cyber') || query.includes('mysuru')) {
    answer = "Mysuru district has an emerging cyber fraud cluster targeting senior citizens and tourists, defrauding over INR 18.5 Lakhs recently.";
    results = seedData.alerts.filter(a => a.crimeType.includes('Cyber'));
  } else if (query.includes('offender') || query.includes('repeat') || query.includes('thief')) {
    answer = "Found 4 active repeat offenders. Top high-risk repeat offender is 'Ravi Kumar @ Bullet Ravi' linked to 5+ snatching FIRs across Bengaluru Urban & Tumakuru.";
    results = seedData.suspects.filter(s => s.repeatOffender);
  } else if (query.includes('risk') || query.includes('why')) {
    answer = "Risk scores are calculated dynamically based on: Month-over-month spike (30%), Repeat offender density (25%), Night-time crime ratio (20%), and Socio-economic stress index (25%).";
    results = seedData.districts.sort((a, b) => b.riskScore - a.riskScore);
  } else {
    answer = `Parsed query: "${req.body.query}". Overview: 5,070 total FIRs across 10 key districts. Bengaluru Urban, Hubballi-Dharwad, and Tumakuru are currently high-risk corridors.`;
    results = seedData.districts;
  }

  res.json({
    success: true,
    query: req.body.query,
    answer,
    data: results
  });
});

// Health check / Root
app.get('/', (req, res) => {
  res.json({ message: "KSP Crime Intelligence & Analytics Platform API is running on Zoho Catalyst Functions" });
});

// Export Express app for Catalyst Function or run standalone
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`KSP API Server running locally on http://localhost:${PORT}`);
  });
}

module.exports = app;
