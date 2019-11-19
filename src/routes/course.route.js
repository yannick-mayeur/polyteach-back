const M = require('../models');
const logger = require('../helpers/logger');

// MIDDLEWARE
const login = require('../middleware/login.middleware');

module.exports = (router) => {
  router.get('/courses', async (req, res) => {

    logger.log('info', 'GET /courses', req);
    M.Course.getAll()
      .then((courses) => res.status(200).send(courses))
      .catch((e) => {
        res.statusMessage = e;
        logger.log('error', 'GET /courses failed', e);
        res.status(500).send();
      });
  });

  router.post('/courses', async (req, res) => {
    logger.log('info', 'received request: POST /courses\nbody:', req.body);
    M.Course.create(req.body)
      .then((course) => res.status(200).send(course))
      .catch((err) => {
        logger.log('error', 'POST /courses failed', err);
        res.sendStatus(500);
      });
  });

  router.get('/courses/getAllByClass', login, async (req, res) => {
    M.Course.getAllByClass(req.user.id).then((coursesByClass) => {
      res.status(200).send(coursesByClass);
    })
      .catch(err => {
        res.statusMessage = err;
        res.status(500).send();
      });
  });

  router.get('/courses/:idCourse/videos', login, async (req, res) => {
    logger.log('info', 'received request: GET /courses/:idCourse/videos\nbody:', req.params);
    M.Video.getAllVideosByCourse(req.params.idCourse).then((videosByCourse) => {
      res.status(200).send(videosByCourse);
    })
      .catch(err => {
        res.statusMessage = err;
        res.status(500).send();
      });
  });
};


