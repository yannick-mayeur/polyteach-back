const db = require('../db');
const logger = require('../helpers/logger');

const RatingVideo = {
  async create(idUser, idVideo, valueRating) {
    const text = 'INSERT INTO ratingvideo("iduser-ratingvideo", "idvideo-ratingvideo", "value-ratingvideo") \
                  VALUES($1, $2, $3) RETURNING *;';
    const values = [idUser, idVideo, valueRating];
    try {
      const resRatingVideo = await db.query(text,values);
      return resRatingVideo.rows[0];
    } catch(e) {
      logger.log('RatingVideo.create : ' + e.stack);
      throw new Error('error in ratingvideo.model.create');
    }
  },

  async update(idUser, idVideo, ratingValue) {
    const text = 'UPDATE ratingvideo SET "value-ratingvideo" = $3 WHERE "iduser-ratingvideo" = $1 AND "idvideo-ratingvideo" = $2 RETURNING *;';
    const values = [idUser, idVideo, ratingValue];
    try {
      const resultRatingVideo = await db.query(text,values);
      return resultRatingVideo.rows[0];
    }
    catch (e) {
      logger.log('RatingVideo.update: ' + e.stack);
      throw new Error('error in updating a ratingvideo');
    }
  },

  async getRating(idUser,idVideo) {
    const text = 'SELECT * FROM ratingvideo WHERE "iduser-ratingvideo" = $1 AND "idvideo-ratingvideo" = $2;';
    const values = [idUser, idVideo];
    try {
      const resultRatingCourse = await db.query(text,values);
      return resultRatingCourse.rows;
    }
    catch (e) {
      logger.log('RatingVideo.getRating : ' + e.stack);
      throw new Error('error in getting a ratingVideo');
    }
  },

  async getAvgRating(idVideo) {
    const text = 'SELECT AVG("value-ratingvideo") FROM ratingvideo WHERE "idvideo-ratingvideo" = $1;';
    const values = [idVideo];
    try {
      const resultAvgRatingVideo = await db.query(text,values);
      return resultAvgRatingVideo.rows[0];
    }
    catch (e) {
      logger.log('RatingVideo.getAvgRating : ' + e.stack);
      throw new Error('error in getting the avg rating of a video');
    }
  }
};

module.exports = RatingVideo;
