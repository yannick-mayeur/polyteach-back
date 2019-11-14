const express = require('express');

const router = express.Router();

require('./ratingcourse.route')(router);
require('./course.route')(router);
require('./ratingvideo.route')(router);
require('./connexion.route')(router);
require('./student.route')(router);
require('./ping.route')(router);
require('./video.route')(router);
require('./live.route')(router);
module.exports = router;
