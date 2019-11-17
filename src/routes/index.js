const express = require('express');

const router = express.Router();

require('./course.route')(router);
require('./connexion.route')(router);
require('./student.route')(router);

module.exports = router;
