const db = require('../db');

const RatingVideo = {
  async create(obj) {
    const text = 'INSERT INTO RatingVideo("idUser-RatingVideo", "idVideo-RatingVideo", "value-RatingVideo") \
                  VALUES($1, $2, $3) RETURNING *;';
    const values = [obj.idUserRatingVideo, obj.idVideoRatingVideo, obj.valueRatingVideo];
    try {
      const resRatingVideo = await db.query(text,values);
      return resRatingVideo.rows[0];
    } catch(e) {
      console.log(e.stack);
      throw new Error('error in ratingvideo.model.create');
    }
  }
};

module.exports = RatingVideo;
