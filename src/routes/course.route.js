const M = require('../models');
const logger = require('../helpers/logger');

module.exports = (router) => {
  router.get('/courses', async (req, res) => {
    logger.log('info', 'GET /courses', req);
    M.Course.getAll()
      .then((courses) => res.status(200).send(courses))
      .catch((e) => {
        res.statusMessage = e;
        logger.log('error', 'GET /courses failed', e);
        res.status(500).send();
      });
  });

  router.post('/courses', async (req, res) => {
    logger.log('info', 'received request: POST /courses\nbody:', req.body);
    M.Course.create(req.body)
      .then((course) => res.status(200).send(course))
      .catch((err) => {
        logger.log('error', 'POST /courses failed', err);
        res.sendStatus(500);
      });
  });
};
