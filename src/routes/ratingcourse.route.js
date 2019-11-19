const M = require('../models');
const logger = require('../helpers/logger');
const util = require('../util/rating.util');

module.exports = (router) => {
  const type = 'course';
  router.post('/ratingcourse', async (req, res) => {
    const request = 'post';
    const idUser = req.body.idUserRatingCourse;
    const idCourse = req.body.idCourseRatingCourse;
    const valueRating = req.body.valueRatingCourse;
    M.PossesCourse.checkPossessionCourse(idUser, idCourse)
      .then((rows) => util.checkRightToRate(rows,idUser,idCourse,valueRating,res,type,request))
      .catch((err) => {
        logger.log('POST /ratingcourse failed with : ' + err.stack);
        res.sendStatus(500);
      });
  });

  router.put('/ratingcourse', async (req,res) => {
    const request = 'put';
    const idUser = req.body.idUserRatingCourse;
    const idCourse = req.body.idCourseRatingCourse;
    const valueRating = req.body.valueRatingCourse;
    M.PossesCourse.checkPossessionCourse(idUser, idCourse)
      .then((rows) => util.checkRightToRate(rows,idUser,idCourse,valueRating,res,type,request))
      .catch((err) => {
        logger.log('PUT /ratingcourse failed with : ' + err.stack);
        res.sendStatus(500);
      });
  });
};

