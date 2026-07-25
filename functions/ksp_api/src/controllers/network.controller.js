const networkService = require('../services/networkAnalysis.service');
const { successResponse } = require('../utils/response');

async function getNetwork(req, res, next) {
  try {
    const network = await networkService.getNetworkGraph();
    res.json(successResponse(network));
  } catch (err) {
    next(err);
  }
}

module.exports = { getNetwork };
