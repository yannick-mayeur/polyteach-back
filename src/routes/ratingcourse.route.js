const M = require('../models');

module.exports = (router) => {
  router.post('/ratingcourse', async (req, res) => {
    M.RatingCourse.create(req.body)
      .then((ratingcourse) => res.status(200).send(ratingcourse))
      .catch((err) => {
        res.statusMessage = err;
        res.sendStatus(500);
      });
  });
};