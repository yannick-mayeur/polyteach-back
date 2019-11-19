module.exports = class Course {
  constructor(idCourse, nameCourse, descriptionCourse, pictureCourse, class_course, idteacher_course, isig3, isig4, isig5) {
    this.id = idCourse;
    this.name = nameCourse;
    this.description = descriptionCourse;
    this.picture = pictureCourse;
    this.class = class_course;
    this.idteacher = idteacher_course;
    this.creationdate = idteacher_course;
    this.isig3 = isig3;
    this.isig4 = isig4;
    this.isig5 = isig5;
  }

  static dbToCourse(obj) {
    return new Course(obj.idcourse, obj.namecourse, obj.descriptioncourse, obj.picturecourse, obj['class-course'], obj['idteacher-course'], obj.creationdate, obj.isig3selected, obj.isig4selected, obj.isig5selected);
  }

  static dbToCourses(objs) {
    return objs.map(obj => this.dbToCourse(obj));
  }
};
