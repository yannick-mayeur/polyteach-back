const db = require('../db');
const logger = require('../helpers/logger');

const Possescourse = {
  async create(obj) {
    logger.log('info', 'possescourse.model.create called with:', obj);
    const text = 'INSERT INTO possescourse("iduser-possescourse", "idcourse-possescourse", bookmarked) \
      VALUES($1, $2, $3) RETURNING *;';
    const values = [obj.user, obj.course, obj.bookmarked];
    try {
      const resPossescourse = await db.query(text, values);
      const res = resPossescourse.rows[0];
      logger.log('info', 'possescourse.model.create returning:', res);
      return res;
    } catch (e) {
      logger.error(e.stack);
      throw new Error('error possescourse create');
    }
  },

  async update(idUser, idCourse, obj) {
    logger.log('info', 'possescourse.model.update called with:', obj);
    const text = 'UPDATE possescourse SET "iduser-possescourse" = $1 "idcourse-possescourse" = $2 bookmarked = $3 WHERE "iduser-possescourse" = $4 AND "idcourse-possescourse" = $5 RETURNING *';
    const values = [obj.user, obj.course, obj.bookmarked, idUser, idCourse];
    try {
      const resPossescourse = await db.query(text, values);
      const res = resPossescourse.rows;
      logger.log('info', 'possescourse.model.update returning:', res);
      return res;
    } catch (e) {
      logger.error(e.stack);
      throw new Error('error possescourse update');
    }
  },

  async delete(idUser, idCourse) {
    logger.log('info', 'possescourse.model.update called with:', idUser, idCourse);
    const text = 'DELETE * FROM possescourse WHERE "iduser-possescourse" = $1 AND "idcourse-possescourse" = $2 RETURNING *';
    const values = [idUser, idCourse];
    try {
      const resPossescourse = await db.query(text, values);
      const res = resPossescourse.rows[0];
      logger.log('info', 'possescourse.model.update returning:', res);
      return res;
    } catch (e) {
      logger.error(e.stack);
      throw new Error('error possescourse update');
    }
  },
};

module.exports = Possescourse;
