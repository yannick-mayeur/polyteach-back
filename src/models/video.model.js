const db = require('../db');
const logger = require('../helpers/logger');
// const P = require('../prototypes');

const Video = {
  async create(obj) {
    logger.log('info', 'video.model.create called with:', obj);
    const text = 'INSERT INTO video(idvideo, titlevideo, hashserver, hashvtt, "idchapter-video") \
      VALUES(DEFAULT, $1, $2, $3, $4) RETURNING *;';
    const values = [obj.title, obj.videoURL, obj.vttURL, obj.fk_course];
    try {
      const resVideo = await db.query(text, values);
      const res = resVideo.rows[0];
      logger.log('info', 'video.model.create returning:', res);
      return res;
    } catch(e) {
      logger.error(e.stack);
      throw new Error('error video create');
    }
  }
};

module.exports = Video;
