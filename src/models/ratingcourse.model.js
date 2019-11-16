const db = require('../db');
const logger = require('../helpers/logger');

const RatingCourse = {
  async create(resultArray) {
    const text = 'INSERT INTO ratingcourse("iduser-ratingcourse", "idcourse-ratingcourse", "value-ratingcourse") VALUES($1, $2, $3) RETURNING *;';
    try {
      const resultRatingCourse = await db.query(text,resultArray);
      return resultRatingCourse.rows[0];
    }
    catch (e) {
      logger.log('RatingCourse.create: ' + e.stack);
      throw new Error('error in creating a ratingcourse');
    }
  },

  async update(resultArray) {
    const text = 'UPDATE ratingcourse SET "value-ratingcourse" = $3 WHERE "iduser-ratingcourse" = $1 AND "idcourse-ratingcourse" = $2 RETURNING *;';
    try {
      const resultRatingCourse = await db.query(text,resultArray);
      return resultRatingCourse.rows[0];
    }
    catch (e) {
      logger.log('RatingCourse.update: ' + e.stack);
      throw new Error('error in updating a ratingcourse');
    }
  },

  async getRating(resultArray) {
    const text = 'SELECT * FROM ratingcourse WHERE "iduser-ratingcourse" = $1 AND "idcourse-ratingcourse" = $2;';
    const values = [resultArray[0], resultArray[1]];
    try {
      const resultRatingCourse = await db.query(text,values);
      return resultRatingCourse.rows;
    }
    catch (e) {
      logger.log('RatingCourse.getRating : ' + e.stack);
      throw new Error('error in getting a ratingcourse');
    }
  },

  async checkPossessionCourse(resultArray) {
    const text = 'SELECT * FROM possescourse WHERE "iduser-possescourse" = $1 AND "idcourse-possescourse" = $2;';
    const values = [resultArray[0], resultArray[1]];
    try {
      const resultCheckCourse = await db.query(text,values);
      return resultCheckCourse.rows;
    }
    catch (e) {
      logger.log('RatingCourse.checkPossessionCoure : ' + e.stack);
      throw new Error('error in checking rights to rate a course');
    }
  }
};

module.exports = RatingCourse;
