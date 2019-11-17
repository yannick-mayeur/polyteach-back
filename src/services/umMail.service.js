/**
 * return a tab of this form {firstname: 'Joe', lastname: 'Dupont'} for email with this form :
 * firstname.lastname@foo.foo
 * @param {String} email to extract
 */
const extractNameFromEmail = function(email) {
    const fandl = email.split("@")[0];
    const [firstname, lastname] = fandl.split('.');
    return {firstname, lastname}
}

module.exports = { extractNameFromEmail }