const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  connectionLimit: 5,
});

module.exports = pool