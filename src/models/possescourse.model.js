const db = require('../db');
const logger = require('../helpers/logger');

const Possescourse = {
  async create(obj) {
    logger.log('info', 'possescourse.model.create called with:', obj);
    const text = 'INSERT INTO possescourse("userid-possescourse", "courseid-possescourse", bookmarked) \
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
};

module.exports = Possescourse;