module.exports = class Teacher {
    constructor(idTeacher, emailTeacher, passwordTeacher, roleTeacher, firstNameTeacher, lastNameTeacher) {
      this.id = idTeacher;
      this.email = emailTeacher;
      this.password = passwordTeacher;
      this.role = roleTeacher;
      this.firstName = firstNameTeacher;
      this.lastName = lastNameTeacher;
    }
  
    static dbToTeacher(obj) {
      const course = new Teacher(obj.idTeacher, obj.emailTeacher, obj.passwordTeacher, obj.roleTeacher, obj.firstNameTeacher, obj.lastNameTeacher);
      return course;
    }
  
    static dbToTeachers (tabObjs) {
        let tabTeachers = []
        tabObjs.forEach(obj => {
            tabTeachers.push(this.dbToTeacher(obj));
        });
        return tabTeachers
    }
  
  };

  