const districtRepo = require('../repositories/district.repository');
const { successResponse } = require('../utils/response');

async function getSocioInsights(req, res, next) {
  try {
    const districts = await districtRepo.findAll();
    const insights = districts.map(d => ({
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

    res.json(successResponse(insights));
  } catch (err) {
    next(err);
  }
}

module.exports = { getSocioInsights };
