const M = require('../models');
const logger = require('../helpers/logger');

// MIDDLEWARE
const login = require('../middleware/login.middleware');

module.exports = (router) => {
  router.get('/courses', login, async (req, res) => {
    logger.log('info', 'GET /courses', req);
    //Check if it's a teacher
    if (req.infos_token.role === 'student') {
      M.Course.getUserCourses(req.user.id)
        .then((courses) => res.status(200).send(courses))
        .catch((e) => {
          res.statusMessage = e;
          logger.log('error', 'GET /courses failed', e);
          res.status(500).send();
        });
    } else {
      M.Course.getTeacherCourses(req.user.id)
        .then((courses) => res.status(200).send(courses))
        .catch((e) => {
          res.statusMessage = e;
          logger.log('error', 'GET /courses failed', e);
          res.status(500).send();
        });
    }
  });

  router.post('/courses', login, async (req, res) => {
    logger.log('info', 'received request: POST /courses\nbody:', req.body);
    // Check if teacher
    if (req.infos_token.role === 'teacher') {
      M.Course.create(req.body, req.user.id)
        .then((course) => res.status(200).send(course))
        .catch((err) => {
          logger.log('error', 'POST /courses failed', err);
          res.sendStatus(500);
        });
    }else{
      logger.log('warning', 'Not a teacher trying to POST /courses');
      res.statusMessage = 'You have to be a teacher to create a course.';
      res.sendStatus(403);
    }
  });

  router.get('/courses/getAllByClass', login, async (req, res) => {
    logger.log('info', 'received request: GET /courses/getAllByClass\nparams:', req.params);
    M.Course.getAllByClass(req.user.id).then((coursesByClass) => {
      res.status(200).send(coursesByClass);
    })
      .catch(err => {
        logger.log('error', 'GET /courses/getAllByClass failed', err);
        res.statusMessage = err;
        res.status(500).send();
      });
  });

  router.get('/courses/:idCourse', async (req, res) => {
    logger.log('info', 'received request: GET /courses/:idCourse/videos\nparams:', req.params);
    M.Course.getCourse(req.params.idCourse).then((course) => {
      res.status(200).send(course);
    })
      .catch(err => {
        logger.log('error', 'GET /courses/:idCourse failed', err);
        res.statusMessage = 'Could not fetch course';
        res.status(500).send();
      });
  });

  router.get('/courses/:idCourse/videos', login, async (req, res) => {
    logger.log('info', 'received request: GET /courses/:idCourse/videos\nparams:', req.params);
    M.Video.getAllVideosByCourse(req.params.idCourse).then((videosByCourse) => {
      res.status(200).send(videosByCourse);
    })
      .catch(err => {
        logger.log('error', 'GET /courses/:idCourse/videos failed', err);
        res.statusMessage = err;
        res.status(500).send();
      });
  });

  router.get('/courses/:idCourse/ratingcourse', login, async (req, res) => {
    M.RatingCourse.getAvgRating(req.params.idCourse)
      .then((result) => res.status(200).send(result))
      .catch((err) => {
        logger.log('GET /courses/ratingcourse failed with : ' + err.stack);
        res.sendStatus(500);
      });
  });

  router.delete('/courses/:idCourse', login, async (req, res) => {
    logger.log('info', 'received request: DELETE /courses/:idCourse\nparams:', req.params);
    //Check if it's a teacher
    if (req.infos_token.role === 'teacher') {
      M.Course.deleteCourse(req.params.idCourse, req.user.id).then((courseDeleted) => {
        if ('success' in courseDeleted && !courseDeleted.success)
          res.status(courseDeleted.code).send(courseDeleted.message);
        else
          res.status(200).send(courseDeleted);
      })
        .catch(err => {
          logger.log('error', 'DELETE /courses/:idCourse failed', err);
          res.statusMessage = err;
          res.status(500).send();
        });
    } else {
      res.status(403).send({ message: 'You are not a teacher.' });
    }
  });

  /**
   * returning {isBookmarked: true} if ok, else throw error.
   */
  router.put('/course/bookmark', login, async (req, res) => {
    M.Course.bookmark(req.user.id, req.body.course).then((course) => {
      res.status(200).send({ course });
    })
      .catch(err => {
        res.statusMessage = err;
        res.status(500).send();
      });
  });

  /**
   * returning {isBookmarked: false} if ok, else throw error.
   */
  router.put('/course/unbookmark', login, async (req, res) => {
    M.Course.unbookmark(req.user.id, req.body.course).then((course) => {
      res.status(200).send({ course });
    })
      .catch(err => {
        res.statusMessage = err;
        res.status(500).send();
      });
  });

  router.put('/course/rateCourse', login, async (req, res) => {
    M.Course.rate(req.user.id, req.body.course, req.body.rate).then((course) => {
      res.status(200).send(course);
    })
      .catch(err => {
        res.statusMessage = err;
        res.status(500).send();
      });
  });

  router.post('/course/rateCourse', login, async (req, res) => {
    M.Course.updateRate(req.user.id, req.body.course, req.body.rate).then((course) => {
      res.status(200).send(course);
    })
      .catch(err => {
        res.statusMessage = err;
        res.status(500).send();
      });
  });

  router.get('/course/allInfosById/:idCourse', async (req, res) => {
    
    M.Course.getAllInfosById(req.params.idCourse).then( (course) => {
      res.status(200).send(course);
    })
    .catch( err => {
      res.statusMessage = err;
      res.status(500).send();
    });
  })

  router.put('/course/updateCourse', async (req, res) => {
    M.Course.updateCourse(req.body).then( () => {
      res.status(200).send();
    })
    .catch( err => {
      res.statusMessage = err;
      res.status(500).send();
    });
  })
};
