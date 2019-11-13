module.exports = class Course {
  constructor(idCourse, nameCourse, descriptionCourse, pictureCourse) {
    this.id = idCourse;
    this.name = nameCourse;
    this.description = descriptionCourse;
    this.picture = pictureCourse;
  }

  static dbToCourse(obj) {
    const course = new Course(obj.idCourse, obj.nameCourse, obj.descriptionCourse, obj.pictureCourse);
    return course;
  }

  static dbToCourses(objs) {
    return objs.map(obj => this.dbToCourse(obj));
  }

};
