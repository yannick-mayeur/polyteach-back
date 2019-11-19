const M = require('../models');
const logger = require('../helpers/logger');
const util = require('../util/rating.util');

module.exports = (router) => {
  const type = 'video';
  router.post('/ratingvideo', async (req, res) => {
    const request = 'post';
    const idUser = util.getUserId(req);
    const idVideo = req.body.idVideoRatingVideo;
    const valueRating = req.body.valueRatingVideo;
    M.See.getSee(idUser,idVideo)
      .then((rows) => util.checkRightToRate(rows,idUser,idVideo,valueRating,res,type,request))
      .catch((err) => {
        logger.log('POST /ratingvideo failed with : ' + err.stack);
        res.sendStatus(500);
      });
  });

  router.put('/ratingvideo', async (req, res) => {
    const request = 'put';
    const idUser = util.getUserId(req);
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
