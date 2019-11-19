const db = require('../db');

const Live = {
    async create(obj) {
      const text = 'INSERT INTO live VALUES($1, $2, $3, $4,, $5, $6,$7)';
      const values = [obj.idSession,obj.nameSession,obj.nameteacher,obj.descriptionlive,obj.timestartlive,/*obj.timestoplive*/];
      return db.query(text, values)
        .then(res => res)
        .catch(e => {
          console.log(e.stack);
          throw new Error('error live create');
        });
    }
  };
  
  module.exports = Live;