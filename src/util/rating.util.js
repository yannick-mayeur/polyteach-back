const M = require('../models');
const logger = require('../helpers/logger');

const ratingUtil = {
  /**
   *
   * @param rows        The result of our query on the "possescourse" (course) or "see" (video) table to know if a user
   *                    has the right to rate a course (if he has access to it)
   * @param idUser      The user ID
   * @param idObject    The video or course ID
   * @param valueRating The rating
   * @param res         The res given by the POST request
   * @param type        The type of the rated object (either a course or a video)
   */
  checkRightToRate: function(rows, idUser, idObject, valueRating, res, type) {
    if(rows.length === 0)
    {
      res.statusMessage = 'No rights to rate';
      res.sendStatus(403);
    }
    else
    {
      if(type === 'course')
      {
        M.RatingCourse.getRating(idUser,idObject)
          .then((rows) => checkIfRatingExist(rows,idUser,idObject,valueRating,res,type))
          .catch((err) => {
            logger.log('POST getRating failed with : ' +err.stack);
            res.sendStatus(500);
          });
      }
      else if(type === 'video')
      {
        M.RatingVideo.getRating(idUser,idObject)
          .then((rows) => checkIfRatingExist(rows,idUser,idObject,valueRating,res,type))
          .catch((err) => {
            logger.log('POST getSee failed with : ' +err.stack);
            res.sendStatus(500);
          });
      }
    }
  }
};

function checkIfRatingExist(rows, idUser, idObject, valueRating, res, type) {
  if(rows.length === 0)
  {
    if(type === 'course')
    {
      M.RatingCourse.create(idUser,idObject,valueRating).then((ratingcourse) => res.status(200).send(ratingcourse))
        .catch((err) => {
          logger.log('POST RatingCourse.create failed with : ' +err.stack);
          res.sendStatus(500);
        });
    }
    else if(type === 'video')
    {
      M.RatingVideo.create(idUser,idObject,valueRating).then((ratingvideo) => res.status(200).send(ratingvideo))
        .catch((err) => {
          logger.log('POST RatingVideo.create failed with : ' +err.stack);
          res.sendStatus(500);
        });
    }
  }
  else
  {
    if(type === 'course')
    {
      M.RatingCourse.create(idUser,idObject,valueRating).then((ratingcourse) => res.status(200).send(ratingcourse))
        .catch((err) => {
          logger.log('POST RatingVideo.create failed with : ' +err.stack);
          res.sendStatus(500);
        });
    }
    else if(type === 'video')
    {
      M.RatingVideo.update(idUser,idObject,valueRating).then((ratingvideo) => res.status(200).send(ratingvideo))
        .catch((err) => {
          logger.log('POST RatingVideo.update failed with : ' +err.stack);
          res.send(500);
        });
    }
  }
}

module.exports = ratingUtil;