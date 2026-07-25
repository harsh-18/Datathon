const anomalyService = require('../services/anomalyDetection.service');
const { successResponse } = require('../utils/response');

async function getAlerts(req, res, next) {
  try {
    const alerts = await anomalyService.getAlerts();
    res.json(successResponse(alerts));
  } catch (err) {
    next(err);
  }
}

module.exports = { getAlerts };
