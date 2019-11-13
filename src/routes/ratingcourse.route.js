const M = require('../models');

module.exports = (router) => {
  router.post('/ratingcourse', async (req, res) => {
    M.RatingCourse.create(req.body)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        res.statusMessage = err;
        res.sendStatus(500);
      });
  });
};