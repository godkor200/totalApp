const express = require('express');
const router = express.Router();
const userPage = require('../controllers/userPage');

router.post('', userPage);

module.exports = router;
