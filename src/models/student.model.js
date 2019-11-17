const db = require('../db');
const P = require('../prototypes');

const Student = {
  /**
   * Return the student prototype if name match, undefined instead.
   * @param {String} firsname of the student
   * @param {String} lastname  of the student
   */
  async getByName(firsname, lastname) {
    const q = 'SELECT * FROM student where firstnamestudent = $1 AND lastnamestudent = $2;';
    return db.query(q, [firsname, lastname])
      .then(({ rows }) => {
        if (rows.length > 0)
          return P.Student.dbToStudent(rows[0]);
        else
          return undefined;
      })
      .catch(err => {
        console.log(err);
        throw new Error('Error student.model getByName');
      });
  },
};

module.exports = Student;   