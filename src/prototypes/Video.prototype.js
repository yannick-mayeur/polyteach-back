module.exports = class Video {
  constructor(idvideo, titlevideo, hashserver, hashvtt, fk_course) {
    this.id = idvideo;
    this.title = titlevideo;
    this.videoUrl = hashserver;
    this.vttUrl = hashvtt;
    this.fk_course = fk_course;
  }

  static dbToVideo(obj) {
    return new Video(obj.idvideo, obj.titlevideo, obj.hashserver, obj.hashvtt, obj['idchapter-video']);
  }

  static dbToVideos(objs) {
    return objs.map(obj => this.dbToVideo(obj));
  }
};
