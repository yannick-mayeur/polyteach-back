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
  }
};

module.exports = Course;
