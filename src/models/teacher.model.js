const db = require('../db');
const P = require('../prototypes');

const Teacher = {
  /**
   * Return the teacher prototype if name match, undefined instead.
   * @param {String} firsname of the teacher
   * @param {String} lastname  of the teacher
   */
  async getByName(firsname, lastname) {
    const q = 'SELECT * FROM teacher where firstnameteacher = $1 AND lastnameteacher = $2;';
    return db.query(q, [firsname, lastname])
      .then(({ rows }) => {
        if (rows.length > 0)
          return P.Teacher.dbToTeacher(rows[0]);
        else
          return undefined;
      })
      .catch(err => {
        console.log(err);
        throw new Error('Error teacher.model getByName');
      });
  },
};

module.exports = Teacher;   