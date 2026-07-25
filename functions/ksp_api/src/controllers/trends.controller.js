const trendService = require('../services/trendAnalysis.service');
const { successResponse } = require('../utils/response');

async function getTrends(req, res, next) {
  try {
    const trends = await trendService.getSpatiotemporalTrends();
    res.json(successResponse(trends));
  } catch (err) {
    next(err);
  }
}

module.exports = { getTrends };
