const M = require('../models');
const logger = require('../helpers/logger');
const util = require('../util/rating.util');

// MIDDLEWARE
const login = require('../middleware/login.middleware');

module.exports = (router) => {
  const type = 'course';
  router.post('/ratingcourse', login, async (req, res) => {
    const request = 'post';
    const idUser = req.user.id;
    const idCourse = req.body.idCourseRatingCourse;
    const valueRating = req.body.valueRatingCourse;
    M.PossesCourse.checkPossessionCourse(idUser, idCourse)
      .then((rows) => util.checkRightToRate(rows,idUser,idCourse,valueRating,res,type,request))
      .catch((err) => {
        logger.log('POST /ratingcourse failed with : ' + err.stack);
        res.sendStatus(500);
      });
  });

  router.put('/ratingcourse', login, async (req,res) => {
    const request = 'put';
    const idUser = req.user.id;
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

