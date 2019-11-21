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
      if (res.rows && res.rows.length === 1) {
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
    const getAverageRating = this.getAverageRating;
    logger.info('Course.getUserCourses called', userId);
    const query = `SELECT * FROM course C
    INNER JOIN possescourse P ON C.idcourse = P."idcourse-possescourse"
    INNER JOIN student S ON S.idstudent = P."iduser-possescourse"
    LEFT JOIN ratingcourse R ON C.idcourse = R."idcourse-ratingcourse"
    INNER JOIN teacher T ON T.idteacher = C."idteacher-course"
    where S.idstudent = $1;`;
    const values = [userId];
    return db.query(query, values)
      .then(async ({ rows }) => {
        const courses = await Promise.all(rows.map(row => {
          return new Promise(function (resolve) {

            const course = P.Course.dbToCourse(row);
            course.teacher = P.Teacher.dbToTeacher(row);
            course.bookmarked = row.bookmarked;
            course.rating = row['value-ratingcourse'];

            // calcul rating
            return getAverageRating(course.id).then(rate => {
              course.averageRating = rate;

              resolve(course);
            });
          });
        }));

        return courses;
      })
      .catch((e) => {
        logger.log('error', 'Course.getUserCourses \n', e);
        throw new Error('error course getUserCourses');
      });
  },

  async getTeacherCourses(teacherId) {
    logger.info('Course.getTeacherCourses called', teacherId);
    const query = 'SELECT * FROM course C WHERE C."idteacher-course" = $1;';
    const values = [teacherId];
    return db.query(query, values)
      .then(({ rows }) => { return P.Course.dbToCourses(rows); })
      .catch((e) => {
        logger.log('error', 'Course.getTeacherCourses', e);
        throw new Error('error course getTeacherCourses');
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
            if (newClass.courses.length > 0)
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

  async deleteCourse(idCourse, idTeacher) {
    logger.info('Course.deleteCourse called');

    const q = 'SELECT * FROM course c WHERE c.idcourse = $1';
    const result = await db.query(q, [idCourse]);

    // We check if the course existsnpm
    if(result.rows[0] !== undefined){
      // If it's the good teacher we delete the course
      if(result.rows[0]['idteacher-course'] === idTeacher) {
        const q = 'DELETE FROM course c WHERE c.idcourse = $1 RETURNING *;';
        return db.query(q, [idCourse])
          .then(({ rows }) => {return P.Course.dbToCourses(rows);})
          .catch((err) => {
            console.log(err);
            logger.log('error', 'Course.deleteCourse(' +idCourse+'): ' + err);
            throw new Error('Error course.model deleteCourse');
          });
      }else{
        return {message: 'This course is not your\'s.', code: 403, success: false};
      }
    }else{
      return {message: 'This course doesn\'t exist.', code: 404, success: false};
    }
  },
  async getAverageRating(idCourse) {
    const q = 'SELECT * FROM ratingcourse WHERE "idcourse-ratingcourse" = $1';
    return db.query(q, [idCourse])
      .then(({ rows }) => {
        if (rows.length > 0) {
          let totalScore = 0;
          rows.map(row => {
            totalScore += row['value-ratingcourse'];
          });

          return totalScore / rows.length;
        }
        return undefined;
      })
      .catch(err => {
        console.log(err);
        throw new Error('Error course.model getAverageRating');
      });
  },

  async getById(idCourse) {
    const q = 'SELECT * FROM course WHERE idCourse=$1';
    return db.query(q, [idCourse])
      .then(({ rows }) => {
        if (rows.length > 0) {
          return P.Course.dbToCourse(rows[0]);
        }
        return undefined;
      })
      .catch(err => {
        console.log(err);
        throw new Error('Error course.model getByID');
      });
  },

  /**
   * Return true if ok, else throw error.
   * @param {number} idUser 
   * @param {number} idCourse 
   */
  async bookmark(idUser, course) {
    const q = `UPDATE public.possescourse
    SET bookmarked=true
    WHERE "iduser-possescourse"=$1 and "idcourse-possescourse"=$2 returning *;`;
    return db.query(q, [idUser, course.id])
      .then(async ({ rows }) => {
        if (rows.length > 0) {
          course.bookmarked = true;
          return course;
        }

        throw new Error('Course.model bookmark, no course or not authorize to bookmark.');
      })
      .catch(err => {
        console.log(err);
        throw new Error('Error course.model bookmark.');
      });
  },

  async unbookmark(idUser, course) {
    const q = `UPDATE public.possescourse
    SET bookmarked=false
    WHERE "iduser-possescourse"=$1 and "idcourse-possescourse"=$2 returning *;`;
    return db.query(q, [idUser, course.id])
      .then(({ rows }) => {
        if (rows.length > 0) {
          course.bookmarked = false;
          return course;
        }

        throw new Error('Course.model bookmark, no course or not authorize to bookmark.');
      })
      .catch(err => {
        console.log(err);
        throw new Error('Eroor course.model unbookmark');
      });
  },

  async rate(idUser, course, rate) {
    const q = `INSERT INTO ratingcourse(
      "iduser-ratingcourse", "idcourse-ratingcourse", "value-ratingcourse")
      VALUES ($1, $2, $3) returning *;`;
    return db.query(q, [idUser, course.id, rate])
      .then(({ rows }) => {
        if (rows.length > 0) {
          course.rating = rate;
          return course;
        }

        throw new Error('Course.model rate, no course or not authorize to rate.');
      })
      .catch(err => {
        console.log(err);
        throw new Error('');
      });
  },

  async updateRate(idUser, course, rate) {
    const q = `UPDATE ratingcourse
    SET  "value-ratingcourse"=$3
    WHERE "iduser-ratingcourse"=$1 and "idcourse-ratingcourse"=$2 returning *;`;
    return db.query(q, [idUser, course.id, rate])
      .then(({ rows }) => {
        if (rows.length > 0) {
          course.rating = rate;
          return course;
        }

        throw new Error('Course.model rate, no course or not authorize to rate.');
      })
      .catch(err => {
        console.log(err);
        throw new Error('');
      });
  },
};

module.exports = Course;
