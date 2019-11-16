const M = require('../models');
const logger = require('../helpers/logger');
const util = require('../util/ratingcourse.util');

module.exports = (router) => {
  router.post('/ratingcourse', async (req, res) => {
    const resultArray = [req.body.idUserRatingCourse, req.body.idCourseRatingCourse, req.body.valueRatingCourse];
    M.RatingCourse.checkPossessionCourse(resultArray)
      .then((rows) => util.checkRightToRate(rows,resultArray,res))
      .catch((err) => {
        logger.log('POST /ratingcourse failed with : ' + err.stack);
        res.sendStatus(500);
      });
  });
};

