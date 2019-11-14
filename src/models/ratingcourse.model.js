const db = require('../db');
const logger = require('../helpers/logger');

const RatingCourse = {
  async create(obj) {
    const text = 'INSERT INTO ratingcourse("iduser-ratingcourse", "idcourse-ratingcourse", "value-ratingcourse") VALUES($1, $2, $3) RETURNING *;';
    const values = [obj.idUserRatingCourse, obj.idCourseRatingCourse, obj.valueRatingCourse];
    try {
      const resultRatingCourse = await db.query(text,values);
      return resultRatingCourse.rows[0];
    }
    catch (e) {
      logger.log('RatingCourse.create: ' + e.stack);
      throw new Error('error in creating a ratingcourse');
    }
  }
};

module.exports = RatingCourse;
