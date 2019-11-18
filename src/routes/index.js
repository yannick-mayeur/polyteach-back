const express = require('express');

const router = express.Router();

require('./course.route')(router);
require('./connexion.route')(router);
require('./student.route')(router);
require('./ping.route')(router);

module.exports = router;
