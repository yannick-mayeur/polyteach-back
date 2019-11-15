module.exports = class Course {
  constructor(idCourse, nameCourse, descriptionCourse, pictureCourse) {
    this.idCourse = idCourse;
    this.nameCourse = nameCourse;
    this.descriptionCourse = descriptionCourse;
    this.pictureCourse = pictureCourse;
  }

  static dbToCourse(obj) {
    const course = new Course(obj.idCourse, obj.nameCourse, obj.descriptionCourse, obj.pictureCourse);
    return course;
  }

  static dbToCourses(objs) {
    return objs.map(obj => this.dbToCourse(obj));
  }

};
