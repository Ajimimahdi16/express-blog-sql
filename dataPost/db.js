const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123qwasZX?',
  database: 'blog'
});
connection.connect((err) => { 
       if (err) throw err ; 
        console.log('connected to MySQL database');     
});

module.exports = connection;
