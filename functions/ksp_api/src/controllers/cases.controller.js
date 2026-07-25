const crimeRepo = require('../repositories/crimeData.repository');
const { filterCases } = require('../utils/filters');
const { successResponse } = require('../utils/response');

async function getCases(req, res, next) {
  try {
    const allCases = await crimeRepo.findAllCases();
    const filtered = filterCases(allCases, req.query);
    res.json(successResponse(filtered));
  } catch (err) {
    next(err);
  }
}

module.exports = { getCases };
