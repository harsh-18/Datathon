const districtRepo = require('../repositories/district.repository');
const crimeRepo = require('../repositories/crimeData.repository');
const offenderRepo = require('../repositories/offender.repository');
const { successResponse } = require('../utils/response');

async function getOverview(req, res, next) {
  try {
    const districts = await districtRepo.findAll();
    const cases = await crimeRepo.findAllCases();
    const suspects = await offenderRepo.findAllOffenders();

    const totalCases = districts.reduce((acc, d) => acc + d.totalCases, 0);
    const activeHotspots = districts.filter(d => d.riskLevel === 'Critical' || d.riskLevel === 'High').length;
    const repeatOffendersCount = suspects.filter(s => s.repeatOffender).length;
    const criticalDistrictsCount = districts.filter(d => d.riskLevel === 'Critical').length;

    const data = {
      totalFIRs: totalCases,
      activeHotspots,
      repeatOffendersCount,
      criticalDistrictsCount,
      crimeSpikeNotice: "38.2% surge in transit-hub robbery & snatching across Bengaluru Urban and Tumakuru",
      riskLevelSummary: "HIGH ALERT (Monsoon Night Surveillance Active)",
      topCrimeCategories: [
        { name: "Mobile & Property Theft", count: 1850, percentage: 36.5 },
        { name: "Cyber & Financial Fraud", count: 1240, percentage: 24.4 },
        { name: "Burglary & House Breaking", count: 890, percentage: 17.5 },
        { name: "Assault & Disputes", count: 620, percentage: 12.2 },
        { name: "Vehicle & Highway Theft", count: 470, percentage: 9.4 }
      ],
      recentIncidents: cases
    };

    res.json(successResponse(data));
  } catch (err) {
    next(err);
  }
}

module.exports = { getOverview };
