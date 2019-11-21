const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const isTokenValid = async function (token) {
  return jwt.verify(token, process.env.SESSION_SECRET, (err) => {
    return err == undefined;
  });
};

const generateToken = function (firstname, lastname, role, section) {
  return jwt.sign({ firstname, lastname, role, section }, process.env.SESSION_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
};

const decryptToken = function (token) {
  return jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
    if (err) {
      throw new Error("Token invalid.")
    }
    return decoded;
  });
};

const encryptPassword = function (password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = { isTokenValid, generateToken, encryptPassword, decryptToken };