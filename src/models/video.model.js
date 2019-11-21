const db = require('../db');
const logger = require('../helpers/logger');
const P = require('../prototypes');

const Video = {
  async create(obj) {
    logger.log('info', 'video.model.create called with:', obj);
    const text = 'INSERT INTO video(idvideo, titlevideo, hashserver, hashvtt, "idcourse-video") \
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
  },
  async getVideoById(idVideo) {
    const q = 'SELECT * FROM video v WHERE v.idvideo = $1;';
    return db.query(q, [idVideo])
      .then(({ rows }) => {return P.Video.dbToVideo(rows[0]);})
      .catch((e) => {
        logger.log('error', 'Video.getVideoById', e);
        throw new Error('error video getVideoById');
      });
  },
  async getCourseById(idVideo) {
    const text = 'SELECT "idcourse-video" FROM video WHERE idvideo = $1;';
    try
    {
      const result = await db.query(text,[idVideo]);
      return result.rows[0];
    }
    catch (e) {
      logger.log('Video.getCourseById : ' + e.stack);
      throw new Error('error in getting a course from a video');
    }


  },
  async getAllVideosByCourse(idCourse) {
    const q = `SELECT * FROM video v WHERE v."idcourse-video" = $1
    LEFT JOIN ratingvideo;`;
    return db.query(q, [idCourse])
      .then(({ rows }) => {return P.Video.dbToVideos(rows);})
      .catch((e) => {
        logger.log('error', 'Video.getAllVideosByCourse', e);
        throw new Error('error video getAllVideosByCourse');
      });
  },

  async rate(idUser, video, rate) {
    const q = 'INSERT INTO ratingvideo values($1, $2, $3);';
    return db.query(q, [idUser, video.id, rate])
    .then(() => {
      video.rating = rate
      return video;
    })
    .catch(err => {
      console.log(err);
      throw new Error('');
    });
  },

  async updateRate(idUser, video, rate) {
    const q = 'UPDATE ratingvideo set "value-ratingvideo"=$3 where "iduser-ratingvideo"=$1 and "idvideo-ratingvideo"=$2;';
    return db.query(q, [idUser, video.id, rate])
    .then(() => {
      video.rating = rate
      return video;
    })
    .catch(err => {
      console.log(err);
      throw new Error('');
    });
  },
};

module.exports = Video;
