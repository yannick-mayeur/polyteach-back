const M = require('../models');
const logger = require('../helpers/logger');

module.exports = (router) => {
  router.get('/students', async (req, res) => {
    logger.log('info', 'GET /students', req);
    M.Student.getAll()
      .then((students) => res.status(200).send(students))
      .catch((e) => {
        res.statusMessage = e;
        logger.log('error', 'GET /students failed', e);
        res.status(500).send();
      });
  });
};
