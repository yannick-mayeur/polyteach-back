const { Pool } = require('pg');
const pool = new Pool(
  {
    user: 'anissalahm',
    host: 'localhost',
    database: 'polyteach',
    port:'5432,'

  }
);

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};
