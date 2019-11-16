module.exports = class Teacher {
  constructor(idteacher, emailteacher, roleteacher, firstnameteacher, lastnameteacher) {
    this.id = idteacher;
    this.email = emailteacher;
    this.role = roleteacher;
    this.firstName = firstnameteacher;
    this.lastName = lastnameteacher;
  }

  static dbToTeacher(obj) {
    const course = new Teacher(obj.idteacher, obj.emailteacher, obj.roleteacher, obj.firstnameteacher, obj.lastnameteacher);
    return course;
  }

  static dbToTeachers(tabObjs) {
    let tabTeachers = [];
    tabObjs.forEach(obj => {
      tabTeachers.push(this.dbToTeacher(obj));
    });
    return tabTeachers;
  }

};

