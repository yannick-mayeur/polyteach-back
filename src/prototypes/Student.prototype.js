module.exports = class Student {
  constructor(idstudent, emailstudent, rolestudent, firstnamestudent, lastnamestudent, classstudent) {
    this.id = idstudent;
    this.email = emailstudent;
    this.role = rolestudent;
    this.firstname = firstnamestudent;
    this.lastname = lastnamestudent;
    this.class = classstudent;
  }

  static dbToStudent(obj) {
    return new Student(obj.idstudent, obj.emailstudent, obj.rolestudent, obj.firstnamestudent, obj.lastnamestudent, obj['class-student']);
  }

  static dbToStudents(tabObjs) {
    return tabObjs.map(_ => this.dbToStudent(_));
  }
};

