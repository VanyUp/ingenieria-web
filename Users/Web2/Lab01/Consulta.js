const mysql = require('mysql');
const express = require('express');
const path = require('path');
const app = express();

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libreria'
})

conexion.connect((error) => {
    if (error) {
        console.log('El error de conexión es: ' + error);
        return;
    }
    console.log('¡Conexión exitosa a la base de datos!');
});

// Servir archivos estáticos (CSS, JS, imágenes)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Ruta principal: enviar la interfaz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint para obtener los libros
app.get('/api/libros', (req, res) => {
    conexion.query('SELECT * FROM libros', (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            res.status(500).json({ error: 'Error en la consulta a la base de datos' });
            return;
        }
        console.log('📚 Libros obtenidos correctamente');
        res.json(results);
    });
});

// Iniciar servidor
const PORT = 1337;
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});