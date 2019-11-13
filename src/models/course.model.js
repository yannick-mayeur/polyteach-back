const db = require('../db');
const P = require('../prototypes');
const logger = require('../helpers/logger');
const Video = require('./video.model');

const Course = {
  async getAll() {
    logger.info('Course.getAll called');
    const query = 'SELECT * FROM course;';
    return db.query(query, [])
      .then(({ rows }) => P.Course.dbToCourses(rows))
      .catch((e) => {
        logger.error('Course.getAll: ' + e.stack);
        throw new Error('error course getAll');
      });
  },

  async create(obj) {
    const text = 'INSERT INTO course("idCourse", "nameCourse", "descriptionCourse", "pictureCourse") \
                  VALUES(DEFAULT, $1, $2, $3) RETURNING *;';
    const values = [obj.name, obj.description, obj.picture];
    try {
      const resCourse = await db.query(text,values);
      obj.videos.forEach(async video => {
        await Video.create({ title: video.title, fk_course: resCourse.rows[0].idcourse });
      });
      return resCourse.rows[0];
    } catch(e) {
      logger.error('Course.create(' + obj + '): ' + e.stack);
      throw new Error('error in course.model.create');
    }
  }
};

module.exports = Course;
