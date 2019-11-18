const SToken = require('../services/token.service');
const M = require('../models');

/**
 * Add to the req.infos, the prototype of the student or teacher who make the request.
 */
const login = async function (req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  
  if (token) {
    const infos = SToken.decryptToken(req.headers.authorization);
    let user = null;
    if (infos.role === 'student') {
      user = await M.Student.getByName(infos.firstname, infos.lastname); 
    } else if (infos.role === 'teacher') {
      user = await M.Teacher.getByName(infos.firstname, infos.lastname);
    }
    
    req.user = user;// eslint-disable-line require-atomic-updates
    req.infos_token = infos;// eslint-disable-line require-atomic-updates
    next();
  } else {
    res.statusMessage = 'Your are not allowed to access this ressource.';
    res.status(401).send();
  }
};

module.exports = login;