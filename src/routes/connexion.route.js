const M = require('../models');
const T = require('../services/token.service');

module.exports = (router) => {
  router.post('/login', async (req, res) => {
    M.Login.login(req.body.email, req.body.password).then((data) => {
      res.status(200).send(data);
    }).catch(err => {
      console.log(err);
      res.statusMessage = err;
      res.status(401).send();
    });
  });

  router.post('/signup', async (req, res) => {
    const token = req.body.token;
    if (T.isTokenValid(token)) {
      const decodedToken = T.decryptToken(token);
      const user = {
        email: decodedToken.email,
        firstname: decodedToken.firstname,
        lastname: decodedToken.lastname,
        role: decodedToken.role,
        section: decodedToken.section
      };
      const isEmailAlreadyUsed = await M.Login.isEmailAlreadyUsed(decodedToken.email);
      if (isEmailAlreadyUsed) {
        res.statusMessage = 'This email is already used.';
        res.status(200).send(user);
      } else {
        if (decodedToken.role == 'student') {
          M.Login.signupStudent(user.email, user.firstname, user.lastname, user.section.toUpperCase()).then(() => {
            res.status(200).send(user);
          }).catch(err => {
            console.log(err);
            res.statusMessage = err;
            res.status(500).send();
          });
        } else if (decodedToken.role == 'teacher') {
          M.Login.signupTeacher(user.email, user.firstname, user.lastname).then(() => {
            res.status(200).send(user);
          }).catch(err => {
            console.log(err);
            res.statusMessage = err;
            res.status(500).send();
          });
        } else {
          res.status(401).send();
        }
      }
    } else {
      res.status(401).send();
    }
  });

  router.post('/login/isTokenValid', async (req, res) => {
    M.Login.isTokenValid(req.body.token).then((bool) => {
      res.status(200).send({ isValid: bool });
    })
      .catch(err => {
        res.statusMessage = err;
        res.status(500).send();
      });
  });
};

