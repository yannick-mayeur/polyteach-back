const M = require('../models');
const logger = require('../helpers/logger');

const ratingUtil = {
  /**
   *
   * @param rows        The result of our query on the "possescourse" (course) or "see" (video) table to know if a user
   *                    has the right to rate a course or a video (if he has access to it)
   * @param idUser      The user ID
   * @param idObject    The video or course ID
   * @param valueRating The rating
   * @param res         The res given by the POST or PUT request
   * @param type        The type of the rated object (either a course or a video)
   * @param request     The type of the request (either POST for a creation or PUT for an update)
   */
  checkRightToRate: function(rows, idUser, idObject, valueRating, res, type, request) {
    if(rows.length === 0)
    {
      res.statusMessage = 'No rights to rate';
      res.sendStatus(403);
    }
    else if (valueRating < 1 || valueRating > 5)
    {
      res.statusMessage = 'Bad rating value.The rating value has to be between 1 and 5';
      res.sendStatus(422);
    }
    else
    {
      if(type === 'course')
      {
        M.RatingCourse.getRating(idUser,idObject)
          .then((rows) => {
            if(request === 'post')
            {
              createRating(rows,idUser,idObject,valueRating,res,type);
            }
            else if (request === 'put')
            {
              updateRating(rows,idUser,idObject,valueRating,res,type);
            }
          })
          .catch((err) => {
            logger.log('POST getRating course failed with : ' +err.stack);
            res.sendStatus(500);
          });
      }
      else if(type === 'video')
      {
        M.RatingVideo.getRating(idUser,idObject)
          .then((rows) =>
          {
            if(request === 'post')
            {
              createRating(rows,idUser,idObject,valueRating,res,type);
            }
            else if (request === 'put')
            {
              updateRating(rows,idUser,idObject,valueRating,res,type);
            }
          })
          .catch((err) => {
            logger.log('POST getRating video failed with : ' +err.stack);
            res.sendStatus(500);
          });
      }
    }
  },

  checkRightToRateVideo(idCourse, idVideo, idUser, res, valueRating, request)
  {
    if(idCourse === null)
    {
      res.statusMessage = 'No course found from the video';
      res.sendStatus(400);
    }
    else
    {
      M.PossesCourse.checkPossessionCourse(idUser,idCourse['idcourse-video'])
        .then((rows) => this.checkRightToRate(rows,idUser,idVideo,valueRating,res,'video',request))
        .catch((err) => {
          logger.info('checkRighToRateVideo failed with : ' + err.stack);
          res.sendStatus(500);
        });
    }
  }
};

function createRating(rows, idUser, idObject, valueRating, res, type) {
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
          logger.info('POST RatingVideo.create failed with : ' +err.stack);
          res.sendStatus(500);
        });
    }
  }
  else
  {
    logger.info('POST Rating.create failed : Already existing rating. Cannot create exactly the same');
    res.sendStatus(400);
  }
}

function updateRating(rows, idUser, idObject, valueRating, res, type) {
  if(rows.length !== 0)
  {
    if(type === 'course')
    {
      M.RatingCourse.update(idUser,idObject,valueRating).then((ratingcourse) => res.status(200).send(ratingcourse))
        .catch((err) => {
          logger.log('POST RatingCourse.create failed with : ' +err.stack);
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
  else
  {
    logger.log('POST Rating.update failed : Rating not found for updating');
    res.sendStatus(400);
  }
}

module.exports = ratingUtil;