const M = require('../models');
const logger = require('../helpers/logger');

const ratingCourseUtil = {
  checkRightToRate: function(rows, resultArray, res) {
    if(rows.length === 0)
    {
      res.statusMessage = 'No rights to rate a course';
      res.sendStatus(403);
    }
    else
    {
      M.RatingCourse.getRating(resultArray)
        .then((rows) => checkIfRatingExist(rows,resultArray,res))
        .catch((err) => {
          logger.log('POST getRating failed with : ' +err.stack);
          res.sendStatus(500);
        });
    }
  }
};

function checkIfRatingExist(rows, resultArray, res) {
  if(rows.length === 0)
  {
    M.RatingCourse.create(resultArray).then((ratingcourse) => res.status(200).send(ratingcourse))
      .catch((err) => {
        logger.log('POST RatingCourse.create failed with : ' +err.stack);
        res.sendStatus(500);
      });
  }
  else
  {
    M.RatingCourse.update(resultArray).then((ratingcourse) => res.status(200).send(ratingcourse))
      .catch((err) => {
        logger.log('POST RatingCourse.update failed with : ' +err.stack);
        res.sendStatus(500);
      });
  }
}

module.exports = ratingCourseUtil;