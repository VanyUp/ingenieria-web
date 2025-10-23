const mysql = require('mysql');
const express = require('express');
const app = express();

const conexion = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libreria'
})

conexion.connect((error) => {
    if (error) throw error
    console.log('Conectado a la base de datos MySQL');

});

app.get('/', function (req, resp) {
    conexion.query('SELECT * FROM registro', function (error, rows) {
        if (!!error) {
            console.log('Error en la consulta');
        }
        else {
            console.log('Consulta exitosa');
            console.log(rows);
            resp.json(rows);
            conexion.end();
        }
    });

}) 

app.listen(1337)




