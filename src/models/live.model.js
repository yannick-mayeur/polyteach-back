const Live = {
  
    async create(obj) {
      const text = 'INSERT INTO live VALUES(DEFAULT, $1)';
      const values = [obj.createdAt];
      return db.query(text, values)
        .then(res => res)
        .catch(e => {
          console.log(e.stack);
          throw new Error('error live create');
        });
    }
  };
  
  module.exports = Live;