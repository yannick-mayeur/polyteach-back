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

  router.post('/courses', async (req, res) => {
    M.Course.create(req.body)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        res.statusMessage = err;
        res.sendStatus(500);
      });
  });
};
