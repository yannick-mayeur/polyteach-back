const db = require('../db');
const P = require('../prototypes');
const logger = require('../helpers/logger');
const Video = require('./video.model');

const Course = {
  async getAll() {
    logger.info('Course.getAll called');
    const query = 'SELECT * FROM course;';
    return db.query(query, [])
      .then(({ rows }) => {return P.Course.dbToCourses(rows);})
      .catch((e) => {
        logger.log('error', 'Course.getAll', e);
        throw new Error('error course getAll');
      });
  },

  async create(obj) {
    const text = 'INSERT INTO course(idcourse, namecourse, descriptioncourse, picturecourse) \
                  VALUES(DEFAULT, $1, $2, $3) RETURNING *;';
    const values = [obj.name, obj.description, obj.picture];
    try {
      const resCourse = await db.query(text,values);
      let res = resCourse.rows[0];
      if (Array.isArray(obj.videos)) {
        const resVideo = await Promise.all(obj.videos.map(video => {
          return Video.create({
            title: video.titleVideo,
            videoURL: video.videoURL,
            vttURL: video.vttURL,
            fk_course: resCourse.rows[0].idcourse

          });
        }));
        res.videos = resVideo;
      }
      logger.log('info', 'course.model.create returning:', res);
      return res;
    } catch(e) {
      logger.log('error', 'Course.create(' + obj + '): ' + e);
      throw new Error('error in course.model.create');
    }
  }
};

module.exports = Course;
