const M = require('../models');
const logger = require('../helpers/logger');

// MIDDLEWARE
const login = require('../middleware/login.middleware');

module.exports = (router) => {
  router.post('/videos', login, async (req, res) => {
    logger.log('info', 'received request: POST /videos\nbody:', req.body);
    M.Video.create(req.body)
      .then((video) => res.status(200).send(video))
      .catch((err) => {
        logger.log('error', 'POST /videos failed', err);
        res.sendStatus(500);
      });
  });

  router.get('/video/:idVideo', login, async (req, res) => {
    logger.log('info', 'received request: GET /video/:idVideo\nparams:', req.params);
    M.Video.getVideoById(req.params.idVideo).then((video) => {
      res.status(200).send(video);
    })
      .catch(err => {
        logger.log('error', 'GET /video/:idVideo failed', err);
        res.statusMessage = err;
        res.status(500).send();
      });
  });

  router.get('/video/:idVideo/ratingvideo', login, async (req, res) => {
    M.RatingVideo.getAvgRating(req.params.idVideo).then((rating) => {
      res.status(200).send(rating);
    })
      .catch(err => {
        res.statusMessage = err;
        res.status(500).send();
      });
  });
};