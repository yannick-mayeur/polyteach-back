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


  async addPosses(iduser, idCourse, bookmarked) {
    const q = `insert into possescourse values($1, $2, $3);`;
    return db.query(q, [iduser, idCourse, bookmarked])
    .then(({ rows }) => {
      return rows;
    })
    .catch(err => {
      console.log(err);
      throw new Error('possescourse addPosses');
    });
  },

  async deleteFromCourse(idCourse) {
    const q = `delete from possescourse where "idcourse-possescourse" = $1`;
    return db.query(q, [idCourse])
    .then(({ rows }) => {
      return rows;
    })
    .catch(err => {
      console.log(err);
      throw new Error('possescourse.model deleteFromCourse');
    });
  },
};

module.exports = Possescourse;
