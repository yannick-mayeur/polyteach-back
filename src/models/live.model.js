const db = require('../db');

const Live = {
    async create(obj, nameteacher) {
      console.log("----------------------------");
      console.log("create object******");
      const now= ""+Date.now();
      console.log("date"+now);
      console.log("value id"+obj.idsession);
      console.log("----------------------------")
      const text = 'INSERT INTO live VALUES($1, $2, $3, $4, $5, $6,$7) RETURNING *';
      const values = [obj.idsession,obj.namesession,nameteacher,obj.descriptionlive,now,null,obj.idcourselive];
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
          console.log("sssss  "+rows.length );
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

    async updateLiveStatus(sessionId) {

      let time_end = ""+Date.now();
      console.log("log time"+time_end);
      const text = 'UPDATE live SET "timestoplive" = $1 WHERE "idsession" = $2 RETURNING *;';
      const values = [time_end, sessionId];
      try {
        const res = await db.query(text,values);
        return res.rows[0];
      }
      catch (e) {
        logger.log('live_endtime.update: ' + e.stack);
        throw new Error('error in updating end of live value');
      }
    },

  };
  
  module.exports = Live;