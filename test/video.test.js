const pg = require('../src/db');
const Video = require('../src/models/video.model');
const VideoPrototype = require('../src/prototypes/Video.prototype');

jest.mock('../src/db');

test('should create video', () => {
  const obj = {title: 'some video', videoUrl: 'url', vttURL: 'vttURL', fk_course: 1};
  pg.query.mockImplementation(() => Promise.resolve({rows: [obj]}));
  Video.create(obj).then(data => expect(data).toEqual(obj));
});

test('should get video', () => {
  const videos = {idvideo: 2, titlevideo: 'some video', hashserver: 'url', hashvtt: 'vttURL', 'idchapter-video': 1};
  const result = new VideoPrototype(2, 'some video', 'url', 'vttURL', 1);
  pg.query.mockImplementation(() => Promise.resolve({rows: [videos]}));
  Video.getVideoById(2).then(data => expect(data).toEqual(result));
});
