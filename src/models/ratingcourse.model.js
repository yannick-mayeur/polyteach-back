const db = require('../db');

const RatingCourse = {
  async create(obj) {
    const text = 'INSERT INTO ratingcourse VALUES($1, $2, $3)';
    const values = [obj.idUserRatingCourse, obj.idCourseRatingCourse, obj.valueRatingCourse];
    return db.query(text, values)
      .then(res => res)
      .catch(e => {
        console.log(e.stack);
        throw new Error('error creating a ratingcourse');
      });
  }
};

module.exports = RatingCourse;
