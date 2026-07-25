const express = require('express');
const router = express.Router();
const controller = require('../controllers/hotspots.controller');

router.get('/', controller.getHotspots);

module.exports = router;
