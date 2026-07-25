const seedData = require('../data/seedData');

class CrimeDataRepository {
  async findAllCases() {
    return seedData.cases || [];
  }

  async findCasesByDistrict(districtName) {
    if (!districtName || districtName === 'All') return seedData.cases || [];
    return (seedData.cases || []).filter(
      c => c.district.toLowerCase() === districtName.toLowerCase()
    );
  }

  async getTrendsData() {
    return seedData.spatiotemporalTrends || { monthly: [], hourly: [] };
  }
}

module.exports = new CrimeDataRepository();
