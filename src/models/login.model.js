const db = require('../db');
const P = require('../prototypes');

// Token
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const myPlaintextPassword = 'c';
const someOtherPlaintextPassword = 'not_bacon';

const login = {
    /**
     * If student provide rigth credentials, throw an error instead
     * @param {String} email of the student who want to connect
     * @param {String} password of the student 
     */
    async login(email, password) {
        const query = 'SELECT * FROM TEACHER where "emailTeacher"=$1';
        return db.query(query, [email])
            .then(({ rows }) => {
                if (rows.length > 0) {
                    const teacher = P.Teacher.dbToTeacher(rows[0])
                    if (bcrypt.compareSync(password, teacher.password)) {
                        const token = generateToken(teacher.id);
                        return { user: teacher, token: token }
                    }
                }
                throw new Error('Login or password are wrong.')
            })
    },

    async signupStudent(email, password, firstName, lastName, classStudent) {
        const query = 'INSERT INTO student values(DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING *';

        // hash password
        const passwordEncrypted = encryptPassword(password)
        return db.query(query, [email, passwordEncrypted, 0, firstName, lastName, classStudent])
            .then(({ rows }) => {
                return P.Student.dbToStudent(rows[0])
            })
            .catch((err) => {
                console.log(err);
                throw new Error('error login.model signupStudent');
            });
    },

    async signupTeacher(email, password, firstName, lastName) {
        const query = 'INSERT INTO teacher values(DEFAULT, $1, $2, $3, $4, $5) RETURNING *';

        // hash password
        const passwordEncrypted = encryptPassword(password)
        return db.query(query, [email, passwordEncrypted, 1, firstName, lastName])
            .then(({ rows }) => {
                return P.Teacher.dbToTeacher(rows[0])
            })
            .catch((err) => {
                console.log(err);
                throw new Error('error login.model signupTeacher');
            });
    },
};

generateToken = (id) => {
    // TODO secret in session
    // jwt.sign({ id, role }, process.env.SESSION_SECRET, {
    //     expiresIn: 86400, // expires in 24 hours
    // });

    return jwt.sign({ id }, 'secret', {
        expiresIn: 86400, // expires in 24 hours
    });
};

encryptPassword = (password) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
};



module.exports = login;