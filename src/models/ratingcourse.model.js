const db = require('../db');
const logger = require('../helpers/logger');

const RatingCourse = {
  async create(idUser,idCourse,valueRating) {
    const text = 'INSERT INTO ratingcourse("iduser-ratingcourse", "idcourse-ratingcourse", "value-ratingcourse") VALUES($1, $2, $3) RETURNING *;';
    const values = [idUser,idCourse,valueRating];
    try {
      const resultRatingCourse = await db.query(text,values);
      return resultRatingCourse.rows[0];
    }
    catch (e) {
      logger.log('RatingCourse.create: ' + e.stack);
      throw new Error('error in creating a ratingcourse');
    }
  },

  async update(idUser,idCourse,valueRating) {
    const text = 'UPDATE ratingcourse SET "value-ratingcourse" = $3 WHERE "iduser-ratingcourse" = $1 AND "idcourse-ratingcourse" = $2 RETURNING *;';
    const values = [idUser,idCourse,valueRating];
    try {
      const resultRatingCourse = await db.query(text,values);
      return resultRatingCourse.rows[0];
    }
    catch (e) {
      logger.log('RatingCourse.update: ' + e.stack);
      throw new Error('error in updating a ratingcourse');
    }
  },

  async getRating(idUser,idCourse) {
    const text = 'SELECT * FROM ratingcourse WHERE "iduser-ratingcourse" = $1 AND "idcourse-ratingcourse" = $2;';
    const values = [idUser, idCourse];
    try {
      const resultRatingCourse = await db.query(text,values);
      return resultRatingCourse.rows;
    }
    catch (e) {
      logger.log('RatingCourse.getRating : ' + e.stack);
      throw new Error('error in getting a ratingcourse');
    }
  },

  async getAvgRating(idCourse) {
    const text = 'SELECT AVG("value-ratingcourse") FROM ratingcourse WHERE "idcourse-ratingcourse" = $1;';
    const values = [idCourse];
    try {
      const resultAvgRatingCourse = await db.query(text,values);
      return resultAvgRatingCourse.rows[0];
    }
    catch (e) {
      logger.log('RatingCourse.getAvgRating : ' + e.stack);
      throw new Error('error in getting the avg rating of a course');
    }
  }
};

module.exports = RatingCourse;
