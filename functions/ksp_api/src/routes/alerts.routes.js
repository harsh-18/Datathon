const express = require('express');
const router = express.Router();
const controller = require('../controllers/alerts.controller');

router.get('/', controller.getAlerts);

module.exports = router;
