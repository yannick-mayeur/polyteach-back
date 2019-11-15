module.exports = class Student {
    constructor(idStudent, emailStudent, passwordStudent, roleStudent, firstNameStudent, lastNameStudent, classStudent) {
      this.id = idStudent;
      this.email = emailStudent;
      this.password = passwordStudent;
      this.role = roleStudent;
      this.firstName = firstNameStudent;
      this.lastName = lastNameStudent;
      this.class = classStudent;
    }
  
    static dbToStudent(obj) {
      const course = new Student(obj.idStudent, obj.emailStudent, obj.passwordStudent, obj.roleStudent, obj.firstNameStudent, obj.lastNameStudent, obj.classStudent);
      return course;
    }
  
    static dbToStudents (tabObjs) {
        let tabStudents = []
        tabObjs.forEach(obj => {
            tabStudents.push(this.dbToStudent(obj));
        });
        return tabStudents
    }
  
  };

  