const db = require('../db');

const Live = {
    async create(obj) {
      const text = 'INSERT INTO live VALUES($1, $2, $3, $4, $5, $6,$7) RETURNING *';
      const values = [obj.idsession,obj.namesession,obj.nameteacher,obj.descriptionlive,obj.timestartlive,obj.timestoplive,obj.idcourselive];
      return db.query(text, values)
        .then(res => res)
        .catch(e => {
          console.log(e.stack);
          throw new Error('error live create');
        });
    },

    async getInfos(sessionId) {
      const query = 'SELECT * FROM live where idsession=$1;';
      return db.query(query, [sessionId])
        .then(({ rows }) => {
          return rows[0];
        })
        .catch((err) => {
          console.log(err);
          throw new Error('error course getAll');
        });
    },
    async getAllSessions() {
      const query = 'SELECT * FROM live where timestoplive IS NULL;';
      return db.query(query)
        .then(({ rows }) => {
          console.log("rows"+rows.length);
          return rows;
        })
        .catch((err) => {
          console.log(err);
          throw new Error('error course getAll');
        });
    },

  };
  
  module.exports = Live;