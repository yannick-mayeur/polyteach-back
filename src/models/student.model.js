const db = require('../db');
const P = require('../prototypes');
const logger = require('../helpers/logger');

const Student = {
  async getAll() {
    logger.info('Student.getAll called');
    const query = 'SELECT * FROM student;';
    return db.query(query, [])
      .then(({ rows }) => {return P.Student.dbToStudents(rows);})
      .catch((e) => {
        logger.log('error', 'Student.getAll', e);
        throw new Error('error student getAll');
      });
  }
}

module.exports = Student;
