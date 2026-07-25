const districtRepo = require('../repositories/district.repository');
const { successResponse } = require('../utils/response');

async function getDistricts(req, res, next) {
  try {
    const districts = await districtRepo.findAll();
    res.json(successResponse(districts));
  } catch (err) {
    next(err);
  }
}

module.exports = { getDistricts };
