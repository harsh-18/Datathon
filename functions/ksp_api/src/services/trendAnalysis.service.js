const crimeRepo = require('../repositories/crimeData.repository');

class TrendAnalysisService {
  async getSpatiotemporalTrends() {
    const trends = await crimeRepo.getTrendsData();
    const callouts = [
      { title: "Robbery Spike", text: "Robbery increased 38.2% in Bengaluru Urban compared to last month.", severity: "Critical" },
      { title: "Cybercrime Cluster", text: "Cyber financial fraud cluster emerging rapidly across Mysuru.", severity: "High" },
      { title: "Night Theft Surge", text: "Night-time commercial burglary & snatching rising in Hubballi-Dharwad.", severity: "High" }
    ];

    return {
      ...trends,
      analyticalCallouts: callouts
    };
  }
}

module.exports = new TrendAnalysisService();
