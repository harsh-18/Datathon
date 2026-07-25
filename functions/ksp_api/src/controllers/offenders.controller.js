const offenderRepo = require('../repositories/offender.repository');
const { successResponse } = require('../utils/response');

async function getOffenders(req, res, next) {
  try {
    const suspects = await offenderRepo.findAllOffenders();
    res.json(successResponse(suspects));
  } catch (err) {
    next(err);
  }
}

module.exports = { getOffenders };
