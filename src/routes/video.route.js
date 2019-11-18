const M = require('../models');
const logger = require('../helpers/logger');

module.exports = (router) => {
  router.post('/videos', async (req, res) => {
    logger.log('info', 'received request: POST /videos\nbody:', req.body);
    M.Video.create(req.body)
      .then((video) => res.status(200).send(video))
      .catch((err) => {
        logger.log('error', 'POST /videos failed', err);
        res.sendStatus(500);
      });
  });

  router.get('/video/:idVideo', async (req, res) => {
    M.Video.getVideoById(req.params.idVideo).then((video) => {
      res.status(200).send(video);
    })
      .catch(err => {
        res.statusMessage = err;
        res.status(500).send();
      });
  });
};