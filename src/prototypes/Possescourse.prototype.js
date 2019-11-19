module.exports = class Possescourse {

  constructor(userId, courseId, bookmarked) {
    this.user = userId;
    this.course = courseId;
    this.bookmarked = bookmarked;
  }

  static dbToPossecourse(obj) {
    return new Possescourse(obj['userid-possescourse'], obj['courseid-possescourse'], obj.bookmarked);
  }

  static dbToPossecourses(objs) {
    return objs.map(obj => this.dbToPossecourse(obj));
  }
};