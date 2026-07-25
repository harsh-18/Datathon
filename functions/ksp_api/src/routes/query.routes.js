const express = require('express');
const router = express.Router();
const controller = require('../controllers/query.controller');

router.post('/', controller.processQuery);

module.exports = router;
