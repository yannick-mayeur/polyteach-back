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

  router.get('/videos/:idVideo', login, async (req, res) => {
    logger.log('info', 'received request: GET /videos/:idVideo\nbody:', req.params);
    M.Video.getVideoById(req.params.idVideo).then((video) => {
      res.status(200).send(video);
    })
      .catch(err => {
        res.statusMessage = err;
        res.status(500).send();
      });
  });
};