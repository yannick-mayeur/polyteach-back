const db = require('../db');
const P = require('../prototypes');
const logger = require('../helpers/logger');
const Video = require('./video.model');
const Possescourse = require('./possescourse.model');

const Course = {
  async getAll() {
    logger.info('Course.getAll called');
    const query = 'SELECT * FROM course;';
    return db.query(query, [])
      .then(({ rows }) => { return P.Course.dbToCourses(rows); })
      .catch((e) => {
        logger.log('error', 'Course.getAll', e);
        throw new Error('error course getAll');
      });
  },

  async getCourse(courseId) {
    logger.info('Course.getCourse called', courseId);
    const query = 'SELECT C.idcourse, C.namecourse, T.firstnameteacher, T.lastnameteacher FROM Course C, Teacher T WHERE C."idteacher-course" = T.idteacher AND C.idcourse = $1;';
    const values = [courseId];
    let course = undefined;
    let videos = undefined;
    try {
      const res = await db.query(query, values);
      if (res.rows && res.rows.length == 1) {
        course = res.rows[0];
      }
    } catch(e) {
      logger.log('error', 'error course.getCourse: could not fetch course', e);
      throw new Error('Could not fetch course');
    }
    try {
      videos = await Video.getAllVideosByCourse(course.idcourse);
    } catch(e) {
      logger.log('error', 'error course.getCourse: could not fetch videos', e);
      throw new Error('Could not fetch course videos');
    }
    return {
      name: course.namecourse,
      teacherName: `${course.firstnameteacher} ${course.lastnameteacher}`,
      videos: videos
    };
  },

  async getUserCourses(userId) {
    logger.info('Course.getUserCourses called', userId);
    const query = 'SELECT * FROM course C, possescourse P WHERE C.idcourse = P."idcourse-possescourse" AND P."iduser-possescourse" = $1;';
    const values = [userId];
    return db.query(query, values)
      .then(({ rows }) => { return P.Course.dbToCourses(rows); })
      .catch((e) => {
        logger.log('error', 'Course.getUserCourses', e);
        throw new Error('error course getUserCourses');
      });
  },

  async create(obj) {
    logger.info('Course.create called');
    const text = 'INSERT INTO course(idcourse, namecourse, descriptioncourse, picturecourse) \
                  VALUES(DEFAULT, $1, $2, $3) RETURNING *;';
    const values = [obj.name, obj.description, obj.picture];
    try {
      const resCourse = await db.query(text, values);
      let res = resCourse.rows[0];

      // Creation of videos
      if (Array.isArray(obj.videos)) {
        res.videos = await Promise.all(obj.videos.map(video => {
          return Video.create({
            title: video.titleVideo,
            videoURL: video.videoURL,
            vttURL: video.vttURL,
            fk_course: resCourse.rows[0].idcourse

          });
        }));
      }

      // Creation of Possescourse
      if (Array.isArray(obj.students)) {
        res.possescourse = await Promise.all(obj.students.map(student => {
          return Possescourse.create({
            user: student.id,
            course: resCourse.rows[0].idcourse,
            bookmarked: false,
          });
        }));
      }

      logger.log('info', 'course.model.create returning:', res);
      return res;
    } catch (e) {
      logger.log('error', 'Course.create(' + obj + '): ' + e);
      throw new Error('error in course.model.create');
    }
  },
  async getAllByClass(idStudent) {
    logger.info('Course.getAllByClass called');
    const q = `SELECT * FROM student s, possescourse pc, course c WHERE
    s.idstudent = $1 AND
    s.idstudent = pc."iduser-possescourse" AND
    pc."idcourse-possescourse" = c.idcourse;`;

    return db.query(q, [idStudent])
      .then(async ({ rows }) => {
        if (rows.length > 0) {
          const classes = [];
          const classOfCourse = await this.getClassEnum();
          classOfCourse.forEach(actClassName => {

            // Create a new class to store courses related to this class
            const newClass = { 'name': actClassName, 'courses': [] };
            rows.map(row => {
              if (row.classcourse === actClassName) {
                // extract the course of the class
                newClass.courses.push(P.Course.dbToCourse(row));
              }
            });

            // Add to result if the student possedes course in this class
            if(newClass.courses.length > 0) 
              classes.push(newClass);
          });

          return classes;
        }
        return rows;
      })
      .catch(err => {
        console.log(err);
        logger.log('error', 'Course.getAllByClass(' + idStudent + '): ' + err);
        throw new Error('Error course.model getAllByClass');
      });
  },

  async getClassEnum() {
    logger.info('Course.getClassEnum called');
    const q = 'SELECT unnest(enum_range(NULL::class));';
    return db.query(q, [])
      .then(({ rows }) => {
        return rows.map(row => row.unnest);
      })
      .catch(err => {
        console.log(err);
        logger.log('error', 'Course.getClassEnum(): ' + err);
        throw new Error('Error course.model getClassEnum');
      });
  },

  async deleteCourse(idCourse) {
    logger.info('Course.deleteCourse called');
    const q = 'DELETE FROM course c WHERE c.idcourse = $1 RETURNING *;';
    return db.query(q, [idCourse])
      .then(({ rows }) => {return P.Course.dbToCourses(rows);})
      .catch((err) => {
        console.log(err);
        logger.log('error', 'Course.deleteCourse(' +idCourse+'): ' + err);
        throw new Error('Error course.model deleteCourse');
      });
  },
};

module.exports = Course;
