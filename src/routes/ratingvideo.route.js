const M = require('../models');
const logger = require('../helpers/logger');
const util = require('../util/rating.util');

// MIDDLEWARE
const login = require('../middleware/login.middleware');

module.exports = (router) => {
  router.post('/ratingvideo', login, async (req, res) => {
    const request = 'post';
    const idUser = req.user.id;
    const idVideo = req.body.idVideoRatingVideo;
    const valueRating = req.body.valueRatingVideo;
    M.Video.getCourseById(idVideo)
      .then((idCourse) => util.checkRightToRateVideo(idCourse,idVideo,idUser,res,valueRating,request))
      .catch((err) => {
        logger.info('POST /ratingvideo failed with : ' + err.stack);
        res.sendStatus(500);
      });
  });

  router.put('/ratingvideo', login, async (req, res) => {
    const request = 'put';
    const idUser = req.user.id;
    const idVideo = req.body.idVideoRatingVideo;
    const valueRating = req.body.valueRatingVideo;
    M.Video.getCourseById(idVideo)
      .then((idCourse) => util.checkRightToRateVideo(idCourse,idVideo,idUser,res,valueRating,request))
      .catch((err) => {
        logger.info('PUT /ratingvideo failed with : ' + err.stack);
        res.sendStatus(500);
      });
  });
};
