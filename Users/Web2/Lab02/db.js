const mysql = require('mysql');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lab02'
});

conexion.connect(err => {
  if (err) throw err;
  console.log('Conexión establecida con MySQL');
});

module.exports = conexion;
