const express = require('express');

const router = express.Router();

require('./course.route')(router);

module.exports = router;
