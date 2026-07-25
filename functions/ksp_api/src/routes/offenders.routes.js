const express = require('express');
const router = express.Router();
const controller = require('../controllers/offenders.controller');

router.get('/', controller.getOffenders);

module.exports = router;
