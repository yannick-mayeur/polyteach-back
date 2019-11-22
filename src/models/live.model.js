const db = require('../db');

const Live = {
  async create(obj) {
    const now= ''+Date.now();
    const text = 'INSERT INTO live VALUES($1, $2, $3, $4, $5, $6,$7) RETURNING *';
    const values = [obj.idsession,obj.namesession,obj.nameteacher,obj.descriptionlive,now,null,obj.idcourselive];
    return db.query(text, values)
      .then(res => res)
      .catch(e => {
        console.log(e.stack);
        throw new Error('error live create');
      });
  },

  async getInfos(sessionId) {
    const query = 'SELECT * FROM live where idsession = $1;';
    return db.query(query, [sessionId])
      .then(({ rows }) => {
        if(rows.length > 0) {return rows[0];}
        else {return rows;}
      })
      .catch((err) => {
        console.log(err);
        throw new Error('error getInfos session');
      });
  },
  async getAllSessions() {
    const query = 'SELECT * FROM live where timestoplive IS NULL;';
    return db.query(query)
      .then(({ rows }) => {
        return rows;
      })
      .catch((err) => {
        console.log(err);
        throw new Error('error course getAll');
      });
  },

  async updateLiveStatus(sessionId) {

    let time_end = ''+Date.now();
    const text = 'UPDATE live SET "timestoplive" = $1 WHERE "idsession" = $2 RETURNING *;';
    const values = [time_end, sessionId];
    try {
      const res = await db.query(text,values);
      return res.rows[0];
    }
    catch (e) {
      throw new Error('error in updating end of live value');
    }
  },

};
  
module.exports = Live;