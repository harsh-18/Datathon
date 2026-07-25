const express = require('express');
const router = express.Router();
const controller = require('../controllers/socioInsights.controller');

router.get('/', controller.getSocioInsights);

module.exports = router;
