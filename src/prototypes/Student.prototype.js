module.exports = class Student {
  constructor(idstudent, emailstudent, passwordstudent, rolestudent, firstNameStudent, lastNameStudent, classStudent) {
    this.id = idstudent;
    this.firstName = firstNameStudent;
    this.lastName = lastNameStudent;
    this.email = emailstudent;
    this.role = rolestudent;
    this.password = passwordstudent;
    this.classStudent = classStudent;
  }

  static dbToStudent(obj) {
    const student = new Student(
      obj.idstudent, obj.emailstudent, obj.passwordstudent, obj.rolestudent,
      obj.firstNameStudent, obj.lastNameStudent, obj.classStudent
    );
    return student;
  }

  static dbToStudents(objs) {
    return objs.map(obj => this.dbToStudent(obj));
  }

};
