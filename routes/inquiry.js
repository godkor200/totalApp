const express = require('express');
const router = express.Router();
const inquiry = require('../controllers/inquiry');

router.get('/', inquiry);

module.exports = router;
