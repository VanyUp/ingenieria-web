const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const clientes = require('./cliente.model');
//const path = require('path');
const app = express();


app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Servidor activo. Usa /clientes para ver los datos.');
});


// Rutas CRUD
app.get('/clientes', clientes.obtenerClientes);
app.post('/clientes', clientes.crearCliente);
app.put('/clientes/:id', clientes.actualizarCliente);
app.delete('/clientes/:id', clientes.eliminarCliente);

app.listen(3000, () => console.log('Servidor ejecutándose en http://localhost:3000'));  


