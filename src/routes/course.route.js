const M = require('../models');
const logger = require('../helpers/logger');

module.exports = (router) => {
  router.get('/courses', async (req, res) => {
    logger.info('received request: GET /courses');
    M.Course.getAll()
      .then((courses) => res.status(200).send(courses))
      .catch((e) => {
        res.statusMessage = e;
        logger.error('GET /courses failed with: ' + e.stack);
        res.status(500).send();
      });
  });

  router.post('/courses', async (req, res) => {
    logger.info('received request: POST /courses\nbody: ' + req.body);
    M.Course.create(req.body)
      .then((course) => res.status(200).send(course))
      .catch((err) => {
        logger.error('POST failed with body: ' + req.body);
        res.statusMessage = err;
        res.sendStatus(500);
      });
  });
};
