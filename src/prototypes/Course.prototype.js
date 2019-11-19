module.exports = class Course {
  constructor(idCourse, nameCourse, descriptionCourse, pictureCourse) {
    this.id = idCourse;
    this.name = nameCourse;
    this.description = descriptionCourse;
    this.picture = pictureCourse;
  }

  static dbToCourse(obj) {
    return new Course(obj.idcourse, obj.namecourse, obj.descriptioncourse, obj.picturecourse);
  }

  static dbToCourses(objs) {
    return objs.map(obj => this.dbToCourse(obj));
  }
};
