const pg = require('../src/db');
const Video = require('../src/models/video.model');

jest.mock('../src/db');

test('should create video', () => {
  const obj = {title: 'some video', videoUrl: "url", vttURL: "vttURL", fk_course: 1};
  pg.query.mockImplementation(() => Promise.resolve({rows: [obj]}));
  Video.create(obj).then(data => expect(data).toEqual(obj));
});
