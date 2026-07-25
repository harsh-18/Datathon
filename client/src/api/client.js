import seedData from '../data/seed_data.json';

// In Catalyst environment, APIs route under /server/ksp_api/api/
// In local standalone Express backend, APIs route under http://localhost:3000/api/
const BASE_URL = window.location.hostname === 'localhost' && window.location.port === '5173'
  ? 'http://localhost:3000/api'
  : '/server/ksp_api/api';

async function fetchWithFallback(endpoint, fallbackData) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${BASE_URL}${endpoint}`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const json = await res.json();
      if (json.success) return json.data;
    }
  } catch (e) {
    console.warn(`[KSP API] Endpoint ${endpoint} offline or unreachable. Using fallback seed data.`, e.message);
  }
  return fallbackData;
}

export async function getOverview() {
  const fallback = {
    totalFIRs: seedData.districts.reduce((acc, d) => acc + d.totalCases, 0),
    activeHotspots: seedData.districts.filter(d => d.riskLevel === 'Critical' || d.riskLevel === 'High').length,
    repeatOffendersCount: seedData.suspects.filter(s => s.repeatOffender).length,
    criticalDistrictsCount: seedData.districts.filter(d => d.riskLevel === 'Critical').length,
    crimeSpikeNotice: "38.2% surge in transit-hub robbery & snatching across Bengaluru Urban and Tumakuru",
    riskLevelSummary: "HIGH ALERT (Monsoon Night Surveillance Active)",
    topCrimeCategories: [
      { name: "Mobile & Property Theft", count: 1850, percentage: 36.5 },
      { name: "Cyber & Financial Fraud", count: 1240, percentage: 24.4 },
      { name: "Burglary & House Breaking", count: 890, percentage: 17.5 },
      { name: "Assault & Disputes", count: 620, percentage: 12.2 },
      { name: "Vehicle & Highway Theft", count: 470, percentage: 9.4 }
    ],
    recentIncidents: seedData.cases
  };
  return fetchWithFallback('/overview', fallback);
}

export async function getDistricts() {
  return fetchWithFallback('/districts', seedData.districts);
}

export async function getCases(filters = {}) {
  let filtered = [...seedData.cases];
  if (filters.district) {
    filtered = filtered.filter(c => c.district.toLowerCase() === filters.district.toLowerCase());
  }
  if (filters.crimeType) {
    filtered = filtered.filter(c => c.crimeType.toLowerCase().includes(filters.crimeType.toLowerCase()));
  }
  return fetchWithFallback(`/cases${filters.district ? `?district=${filters.district}` : ''}`, filtered);
}

export async function getHotspots() {
  const fallback = seedData.districts.map(d => ({
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
  return fetchWithFallback('/hotspots', fallback);
}

export async function getTrends() {
  return fetchWithFallback('/trends', seedData.spatiotemporalTrends);
}

export async function getNetwork() {
  const fallback = {
    nodes: seedData.networkNodes,
    edges: seedData.networkEdges
  };
  return fetchWithFallback('/network', fallback);
}

export async function getOffenders() {
  return fetchWithFallback('/offenders', seedData.suspects);
}

export async function getAlerts() {
  return fetchWithFallback('/alerts', seedData.alerts);
}

export async function getSocioInsights() {
  const fallback = seedData.districts.map(d => ({
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
  return fetchWithFallback('/socio-insights', fallback);
}

export async function queryData(queryText) {
  try {
    const res = await fetch(`${BASE_URL}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: queryText })
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success) return json;
    }
  } catch (e) {
    console.warn('[KSP API] Query endpoint offline. Running client-side NLP fallback.', e.message);
  }

  // Client-side rule matching fallback
  const q = (queryText || '').toLowerCase();
  if (q.includes('hotspot') || q.includes('bengaluru')) {
    return {
      answer: "Bengaluru Urban is currently marked CRITICAL with a risk score of 88/100 due to a 38.2% spike in transit-hub thefts & cyber frauds.",
      data: seedData.districts.filter(d => d.name.includes('Bengaluru'))
    };
  } else if (q.includes('cyber') || q.includes('mysuru')) {
    return {
      answer: "Mysuru district has an emerging cyber fraud cluster targeting senior citizens and tourists, defrauding over INR 18.5 Lakhs recently.",
      data: seedData.alerts.filter(a => a.crimeType.includes('Cyber'))
    };
  } else if (q.includes('offender') || q.includes('repeat') || q.includes('thief')) {
    return {
      answer: "Found 4 active repeat offenders. Top high-risk repeat offender is 'Ravi Kumar @ Bullet Ravi' linked to 5+ snatching FIRs across Bengaluru Urban & Tumakuru.",
      data: seedData.suspects.filter(s => s.repeatOffender)
    };
  } else {
    return {
      answer: `Parsed query: "${queryText}". Overview: 5,070 total FIRs across 10 key districts. Bengaluru Urban, Hubballi-Dharwad, and Tumakuru are currently high-risk corridors.`,
      data: seedData.districts
    };
  }
}
