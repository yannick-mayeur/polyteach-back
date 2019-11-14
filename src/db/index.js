const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'polyteach',
  password: 'postgres',
  port: '5432',
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};
