const M = require('../models');
const logger = require('../helpers/logger');
const util = require('../util/rating.util');

// MIDDLEWARE
const login = require('../middleware/login.middleware');

module.exports = (router) => {
  const type = 'video';
  router.post('/ratingvideo', login, async (req, res) => {
    const request = 'post';
    const idUser = req.user.id;
    const idVideo = req.body.idVideoRatingVideo;
    const valueRating = req.body.valueRatingVideo;
    M.See.getSee(idUser,idVideo)
      .then((rows) => util.checkRightToRate(rows,idUser,idVideo,valueRating,res,type,request))
      .catch((err) => {
        logger.log('POST /ratingvideo failed with : ' + err.stack);
        res.sendStatus(500);
      });
  });

  router.put('/ratingvideo', login, async (req, res) => {
    const request = 'put';
    const idUser = req.user.id;
    const idVideo = req.body.idVideoRatingVideo;
    const valueRating = req.body.valueRatingVideo;
    M.See.getSee(idUser,idVideo)
      .then((rows) => util.checkRightToRate(rows,idUser,idVideo,valueRating,res,type,request))
      .catch((err) => {
        logger.log('PUT /ratingvideo failed with : ' + err.stack);
        res.sendStatus(500);
      });
  });
};
