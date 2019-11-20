const { Pool } = require('pg');
const pool = new Pool(
  {
    user: 'anissalamh',
    host: 'localhost',
    database: 'polyteach',
    password: 'Pol8192u',
    port:'5432'

  }
);

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};
