const express = require('express');
const router = express.Router();
const controller = require('../controllers/network.controller');

router.get('/', controller.getNetwork);

module.exports = router;
