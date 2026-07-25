const queryService = require('../services/queryInterpreter.service');
const { successResponse } = require('../utils/response');

async function processQuery(req, res, next) {
  try {
    const result = await queryService.processQuery(req.body.query);
    res.json(successResponse(result));
  } catch (err) {
    next(err);
  }
}

module.exports = { processQuery };
