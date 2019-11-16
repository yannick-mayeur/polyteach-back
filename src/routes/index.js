const express = require('express');

const router = express.Router();

require('./ratingcourse.route')(router);
require('./course.route')(router);
require('./ratingvideo.route')(router);

module.exports = router;
