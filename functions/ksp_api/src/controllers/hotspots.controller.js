const hotspotService = require('../services/hotspotAnalysis.service');
const { successResponse } = require('../utils/response');

async function getHotspots(req, res, next) {
  try {
    const hotspots = await hotspotService.getHotspots();
    res.json(successResponse(hotspots));
  } catch (err) {
    next(err);
  }
}

module.exports = { getHotspots };
