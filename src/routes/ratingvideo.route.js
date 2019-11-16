const M = require('../models');
const logger = require('../helpers/logger');
const util = require('../util/rating.util');

module.exports = (router) => {
  router.post('/ratingvideo', async (req, res) => {
    const type = 'video';
    const idUser = req.body.idUserRatingVideo;
    const idVideo = req.body.idVideoRatingVideo;
    const valueRating = req.body.valueRatingVideo;
    M.See.getSee(idUser,idVideo)
      .then((rows) => util.checkRightToRate(rows,idUser,idVideo,valueRating,res,type))
      .catch((err) => {
        logger.log('POST /ratingvideo failed with : ' + err.stack);
        res.sendStatus(500);
      });
  });
};
