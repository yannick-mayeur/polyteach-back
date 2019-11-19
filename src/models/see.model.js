const db = require('../db');
const logger = require('../helpers/logger');

const See = {
  async getSee(idUser,idVideo) {
    const text = 'SELECT * FROM see WHERE "iduser-see" = $1 AND "idvideo-see" = $2;';
    const values = [idUser, idVideo];
    try {
      const resultCheckCourse = await db.query(text,values);
      return resultCheckCourse.rows;
    }
    catch (e) {
      logger.log('See.getSee : ' + e.stack);
      throw new Error('error in checking specfic see');
    }
  }
};
module.exports = See;
