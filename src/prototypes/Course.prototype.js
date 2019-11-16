module.exports = class Course {
  constructor(idCourse, nameCourse, descriptionCourse, pictureCourse) {
    this.id = idCourse;
    this.name = nameCourse;
    this.description = descriptionCourse;
    this.picture = pictureCourse;
  }

  static dbToCourse(obj) {
    const course = new Course(obj.idcourse, obj.namecourse, obj.descriptioncourse, obj.picturecourse);
    return course;
  }

  static dbToCourses(objs) {
    return objs.map(obj => this.dbToCourse(obj));
  }

};
