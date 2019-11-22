module.exports = class Teacher {
  constructor(idteacher, emailteacher, roleteacher, firstnameteacher, lastnameteacher) {
    this.id = idteacher;
    this.email = emailteacher;
    this.role = roleteacher;
    this.firstname = firstnameteacher;
    this.lastname = lastnameteacher;
  }

  static dbToTeacher(obj) {
    return new Teacher(obj.idteacher, obj.emailteacher, obj.roleteacher, obj.firstnameteacher, obj.lastnameteacher);
  }

  static dbToTeachers(tabObjs) {
    return tabObjs.map(_ => this.dbToTeacher(_));
  }
};

