
module.exports = class PossessCourse {
  constructor(idStudent, idCourse, bookmarked) {
    this.idStudent = idStudent;
    this.idCourse = idCourse;
    this.bookmarked = bookmarked;
  }

  static dbToPossessCourse(obj) {
    const course = new PossessCourse(obj.idStudent, obj.idCourse, obj.bookmarked);
    return course;
  }

  static dbToPossessCourses(objs) {
    return objs.map(obj => this.dbToPossessCourse(obj));
  }

};
