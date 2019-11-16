module.exports = class Teacher {
  constructor(idTeacher, emailTeacher, roleTeacher, firstNameTeacher, lastNameTeacher) {
    this.id = idTeacher;
    this.email = emailTeacher;
    this.role = roleTeacher;
    this.firstName = firstNameTeacher;
    this.lastName = lastNameTeacher;
  }

  static dbToTeacher(obj) {
    const course = new Teacher(obj.idTeacher, obj.emailTeacher, obj.roleTeacher, obj.firstNameTeacher, obj.lastNameTeacher);
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

