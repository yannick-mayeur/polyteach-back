jest.mock('../src/db');
jest.mock('../src/models/video.model');
jest.mock('../src/models/possescourse.model');

const pg = require('../src/db');
const Course = require('../src/models/course.model');
const Video = require('../src/models/video.model');
const Possescourse = require('../src/models/possescourse.model');
const VideoPrototype = require('../src/prototypes/Video.prototype');
const CoursePrototype = require('../src/prototypes/Course.prototype');
const {getAllVideosByCourseTeacher} = jest.requireActual('../src/models/video.model');

test('should fetch courses', () => {
  const courses = {
    rows: [
      {
        'idcourse': 1,
        'descriptioncourse': 'Web Applications & Interoperability',
        'namecourse': 'AWI',
        'picturecourse': 'https://icon-library.net/images/placeholder-image-icon/placeholder-image-icon-7.jpg'
      },
      {
        'descriptioncourse': 'description 3',
        'idcourse': 3,
        'namecourse': 'DevOps',
        'picturecourse': 'https://static1.squarespace.com/static/559dc415e4b0fcb781ceca92/55b6c5f7e4b08c3f4b9f3f83/5c51551e4ae23755fa90f088/1548890390219/jason-leung-479251-unsplash.jpg?format=2500w'
      }
    ]
  };
  const res = [
    {
      'description': 'Web Applications & Interoperability',
      'id': 1,
      'name': 'AWI',
      'picture': 'https://icon-library.net/images/placeholder-image-icon/placeholder-image-icon-7.jpg',
    },
    {
      'description': 'description 3',
      'id': 3,
      'name': 'DevOps',
      'picture': 'https://static1.squarespace.com/static/559dc415e4b0fcb781ceca92/55b6c5f7e4b08c3f4b9f3f83/5c51551e4ae23755fa90f088/1548890390219/jason-leung-479251-unsplash.jpg?format=2500w',
    },
  ];
  pg.query.mockImplementation(() => Promise.resolve(courses));
  return Course.getAll().then(data => expect(data).toEqual(res));
});

test('should create courses', () => {
  const obj = {name: 'AWI', description: 'pas facile', picture: 'None'};
  pg.query.mockImplementation(() => Promise.resolve({rows: [obj]}));
  Course.create(obj).then(data => expect(data).toEqual(obj));
});

test('should create associated videos', async () => {
  const obj = {
    name: 'AWI',
    description: 'pas facile',
    picture: 'None',
    videos: [{titleVideo: 'hoho'}, {titleVideo: 'hihi'}],
    students: {
      selectedStudents: [],
      isIG3Added: false,
      isIG4Added: false,
      isIG5Added: false,
    }
  };
  await Course.create(obj);
  return expect(Video.create).toBeCalled();
});

test('should get video for a specific course', () => {
  const videos = {idvideo: 2, titlevideo: 'some video', hashserver: 'url', hashvtt: 'vttURL', 'idchapter-video': 1};
  const result = new VideoPrototype(2, 'some video', 'url', 'vttURL', 1);
  pg.query.mockImplementation(() => Promise.resolve({rows: [videos]}));
  getAllVideosByCourseTeacher(1).then(data => expect(data).toEqual([result]));
});

test('should add students to possescourse', async () => {
  const obj = {
    name: 'AWI', description: 'pas facile', picture: 'None', students: {
      selectedStudents: [{
        'id': 2,
        'email': 'bazor@etu.umontpellier.fr',
        'role': null,
        'firstName': 'foo',
        'lastName': 'baz',
        'class': 'IG4'
      },
        {
          'id': 1,
          'email': 'foobar@etu.umontpellier.fr',
          'role': null,
          'firstName': 'foo',
          'lastName': 'bar',
          'class': 'IG3'
        }],
      isIG3Added: false,
      isIG4Added: false,
      isIG5Added: false,
    }
  };
  await Course.create(obj);
  return expect(Possescourse.create).toBeCalled();
});

test('should delete the course', async () => {
  const obj = {idcourse: 3, namecourse: 'AWI', descriptioncourse: 'pas facile', picturecourse: 'url picture'};
  const course = new CoursePrototype(3, 'AWI', 'pas facile', 'url picture');
  pg.query.mockImplementation(() => Promise.resolve({rows: [obj]}));
  Course.deleteCourse(3).then(data => expect(data).toEqual([course]));
});
