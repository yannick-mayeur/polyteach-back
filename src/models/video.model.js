const db = require('../db');
// const P = require('../prototypes');

const Video = {
  async create(obj) {
    const text = 'INSERT INTO video VALUES(DEFAULT, $1, $2) RETURNING *;';
    const values = [obj.title, obj.fk_course];
    return db.query(text, values)
      .then(res => res.rows[0])
      .catch(e => {
        console.log(e.stack);
        throw new Error('error video create');
      });
  }
};

module.exports = Video;
