module.exports = class Student {
  constructor(idstudent, emailstudent, rolestudent, firstnamestudent, lastnamestudent, classstudent) {
    this.id = idstudent;
    this.email = emailstudent;
    this.role = rolestudent;
    this.firstName = firstnamestudent;
    this.lastName = lastnamestudent;
    this.class = classstudent;
  }

  static dbToStudent(obj) {
    const course = new Student(obj.idstudent, obj.emailstudent, obj.rolestudent, obj.firstnamestudent, obj.lastnamestudent, obj.classstudent);
    return course;
  }

  static dbToStudents(tabObjs) {
    let tabStudents = [];
    tabObjs.forEach(obj => {
      tabStudents.push(this.dbToStudent(obj));
    });
    return tabStudents;
  }

};

