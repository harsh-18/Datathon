const express = require('express');
const router = express.Router();
const controller = require('../controllers/districts.controller');

router.get('/', controller.getDistricts);

module.exports = router;
