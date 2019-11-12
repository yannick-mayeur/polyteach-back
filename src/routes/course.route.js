const M = require('../models');

module.exports = (router) => {
  router.get('/courses', async (req, res) => {
    M.Course.getAll()
      .then((courses) => res.status(200).send(courses))
      .catch((err) => {
        res.statusMessage = err;
        res.status(500).send();
      });
  });
};
