const mysql = require('mysql');

pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node-test'
  });

  module.exports = pool;