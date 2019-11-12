const db = require('../db');
const P = require('../prototypes');

const Course = {
  async getAll() {
    const query = 'SELECT * FROM course;';
    return db.query(query, [])
      .then(({ rows }) => P.Course.dbToCourses(rows))
      .catch((err) => {
        console.log(err);
        throw new Error('error course getAll');
      });
  },

  async create(obj) {
    const text = 'INSERT INTO course VALUES(DEFAULT, $1, $2, $3)';
    const values = [obj.name, obj.description, obj.picture];
    return db.query(text, values)
      .then(res => res)
      .catch(e => {
        console.log(e.stack);
        throw new Error('error course create');
      });
  }
};

module.exports = Course;
