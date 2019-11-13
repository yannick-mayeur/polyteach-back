module.exports = class Teacher {
  constructor(idteacher, emailteacher, passwordteacher, roleteacher, firstNameTeacher, lastNameTeacher) {
    this.id = idteacher;
    this.firstName = firstNameTeacher;
    this.lastName = lastNameTeacher;
    this.email = emailteacher;
    this.role = roleteacher;
    this.password = passwordteacher;
  }

  static dbToTeacher(obj) {
    const teacher = new Teacher(
      obj.idteacher, obj.emailteacher, obj.passwordteacher, obj.roleteacher,
      obj.firstNameTeacher, obj.lastNameTeacher
    );
    return teacher;
  }

  static dbToTeachers(objs) {
    return objs.map(obj => this.dbToTeacher(obj));
  }

};
