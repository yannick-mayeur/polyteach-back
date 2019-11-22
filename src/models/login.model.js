const db = require('../db');
const P = require('../prototypes');

// Token
const bcrypt = require('bcrypt');
const SToken = require('../services/token.service');

const login = {
  /**
   * Return the student or teacher with rigth credentials
   * @param {String} email of student or teacher
   * @param {String} password of student or teacher
   */
  async login(email, password) {
    if (email.endsWith('etu.umontpellier.fr')) {
      return this.loginStudent(email, password);
    } else if (email.endsWith('umontpellier.fr')) {
      return this.loginTeacher(email, password);
    } else {
      throw new Error('Your are not allowed to connect with this email.');
    }
  },

  /**
   * If student provide rigth credentials, throw an error instead
   * @param {String} email of the student who want to connect
   * @param {String} password of the student 
   */
  async loginTeacher(email, password) {
    const query = 'SELECT * FROM TEACHER where emailteacher=$1';
    return db.query(query, [email])
      .then(({ rows }) => {
        if (rows.length > 0) {
          const teacher = P.Teacher.dbToTeacher(rows[0]);
          if (bcrypt.compareSync(password, rows[0].passwordteacher)) {
            const token = SToken.generateToken(teacher.firstname, teacher.lastName, 'teacher', 'IG');
            return { user: teacher, token: token };
          }

        }
        throw new Error('Login or password are wrong.');
      });
  },

  /**
   * If student provide rigth credentials, throw an error instead
   * @param {String} email of the student who want to connect
   * @param {String} password of the student 
   */
  async loginStudent(email, password) {
    const query = 'SELECT * FROM STUDENT where emailstudent=$1';
    return db.query(query, [email])
      .then(({ rows }) => {
        if (rows.length > 0) {
          if (email.endsWith('@etu.umontpellier.fr')) {
            const student = P.Student.dbToStudent(rows[0]);
            if (bcrypt.compareSync(password, rows[0].passwordstudent)) {
              const token = SToken.generateToken(student.firstname, student.lastName, 'student', student.class);
              return { user: student, token: token };
            }
          }
        }
        throw new Error('Login or password are wrong.');
      });
  },

  async isEmailAlreadyUsed(email) {
    const q = `(SELECT emailteacher FROM public.teacher where emailteacher=$1) union 
       (SELECT emailstudent FROM public.student where emailstudent=$1);`;
    return db.query(q, [email])
      .then(({ rows }) => {
        return rows.length > 0;
      })
      .catch(err => {
        console.log(err);
        throw new Error('Error login.model email already user');
      });
  },

  async signupStudent(email, firstname, lastName, classStudent) {

    const query = 'INSERT INTO student values(DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING *';

    return db.query(query, [email, 'password', 0, firstname, lastName, classStudent])
      .then(({ rows }) => {
        return P.Student.dbToStudent(rows[0]);
      })
      .catch((err) => {
        console.log(err);
        throw new Error('error login.model signupStudent');
      });
  },

  async signupTeacher(email, firstname, lastName) {
    const query = 'INSERT INTO teacher values(DEFAULT, $1, $2, $3, $4, $5) RETURNING *';

    return db.query(query, [email, 'password', 1, firstname, lastName])
      .then(({ rows }) => {
        return P.Teacher.dbToTeacher(rows[0]);
      })
      .catch((err) => {
        console.log(err);
        throw new Error('error login.model signupTeacher');
      });
  },
};

module.exports = login;
