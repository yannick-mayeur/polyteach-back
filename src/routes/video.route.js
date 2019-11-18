const M = require('../models');
const logger = require('../helpers/logger');

module.exports = (router) => {
  router.post('/video', async (req, res) => {
    logger.log('info', 'received request: POST /video\nbody:', req.body);
    M.Video.create(req.body)
      .then((video) => res.status(200).send(video))
      .catch((err) => {
        logger.log('error', 'POST /video failed', err);
        res.sendStatus(500);
      });
  });

  router.get('/video/getByName', async (req, res) => {
    M.Video.getVideoByName(req.video.videoName).then((video) => {
      res.status(200).send(video);
    })
      .catch(err => {
        res.statusMessage = err;
        res.status(500).send();
      });
  });
};