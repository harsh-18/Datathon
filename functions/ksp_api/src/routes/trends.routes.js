const express = require('express');
const router = express.Router();
const controller = require('../controllers/trends.controller');

router.get('/', controller.getTrends);

module.exports = router;
