const M = require('../models');

module.exports = (router) => {
  router.post('/ratingvideo', async (req, res) => {
    M.RatingVideo.create(req.body)
      .then((ratingvideo) => res.status(200).send(ratingvideo))
      .catch((err) => {
        res.statusMessage = err;
        res.sendStatus(500);
      });
  });
};
