const M = require('../models');

module.exports = (router) => {
  router.post('/ratingcourse', async (req, res) => {
    M.RatingCourse.getRating(req.body)
      .then((row) => checkIfRatingExist(row,req,res))
      .catch((err) => {
        res.statusMessage = err;
        res.sendStatus(500);
      });
  });
};

function checkIfRatingExist(row, req, res) {
  if(row.length === 0)
  {
    M.RatingCourse.create(req.body).then((ratingcourse) => res.status(200).send(ratingcourse))
      .catch((err) => {
        res.statusMessage = err;
        res.sendStatus(500);
      });
  }
  else
  {
    M.RatingCourse.update(req.body).then((ratingcourse) => res.status(200).send(ratingcourse))
      .catch((err) => {
        res.statusMessage = err;
        res.sendStatus(500);
      });
  }
}