const express = require('express');
const router = express.Router();
const modify = require('../controllers/modify');

router.post('/', modify);

module.exports = router;
