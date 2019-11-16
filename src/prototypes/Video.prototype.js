module.exports = class Video {
  constructor(idvideo, titlevideo, fk_course) {
    this.id = idvideo;
    this.title = titlevideo;
    this.fk_course = fk_course;
  }

  static dbToVideo(obj) {
    const video = new Video(obj.idvideo, obj.titlevideo);
    return video;
  }

  static dbToVideos(objs) {
    return objs.map(obj => this.dbToVideo(obj));
  }

};
