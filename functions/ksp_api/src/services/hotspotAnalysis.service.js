const districtRepo = require('../repositories/district.repository');

class HotspotAnalysisService {
  async getHotspots() {
    const districts = await districtRepo.findAll();
    return districts.map(d => ({
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
  }
}

module.exports = new HotspotAnalysisService();
