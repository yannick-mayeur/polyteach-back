const db = require('../db');
const logger = require('../helpers/logger');

const PossesCourse = {
  async checkPossessionCourse(idUser,idCourse) {
    const text = 'SELECT * FROM possescourse WHERE "iduser-possescourse" = $1 AND "idcourse-possescourse" = $2;';
    const values = [idUser, idCourse];
    try {
      const resultCheckCourse = await db.query(text,values);
      return resultCheckCourse.rows;
    }
    catch (e) {
      logger.log('RatingCourse.checkPossessionCourse : ' + e.stack);
      throw new Error('error in checking rights to rate a course');
    }
  }
};

module.exports = PossesCourse;