const express = require('express');
const router = express.Router();
const controller = require('../controllers/cases.controller');

router.get('/', controller.getCases);

module.exports = router;
