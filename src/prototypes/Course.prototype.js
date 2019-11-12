module.exports = class Course {
  constructor(idcourse, namecourse, descriptioncourse, picturecourse) {
    this.id = idcourse;
    this.name = namecourse;
    this.description = descriptioncourse;
    this.picture = picturecourse;
  }

  static dbToCourse(obj) {
    const course = new Course(obj.idcourse, obj.namecourse, obj.descriptioncourse, obj.picturecourse);
    return course;
  }

  static dbToCourses(objs) {
    return objs.map(obj => this.dbToCourse(obj));
  }

};
