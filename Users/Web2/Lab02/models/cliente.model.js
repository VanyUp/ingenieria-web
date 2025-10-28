const db = require('../db');

// Crear cliente
exports.crearCliente = (req, res) => {
  const { nombre, correo, telefono } = req.body;
  db.query('INSERT INTO clientes SET ?', { nombre, correo, telefono }, (err, result) => {
    if (err) throw err;
    res.send('Cliente agregado');
  });
};

// Leer clientes
exports.obtenerClientes = (req, res) => {
  db.query('SELECT * FROM clientes', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

// Actualizar cliente
exports.actualizarCliente = (req, res) => {
  const { id } = req.params;
  const { nombre, correo, telefono } = req.body;
  db.query('UPDATE clientes SET ? WHERE id = ?', [{ nombre, correo, telefono }, id], (err) => {
    if (err) throw err;
    res.send('Cliente actualizado');
  });
};

// Eliminar cliente
exports.eliminarCliente = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM clientes WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.send('Cliente eliminado');
  });
};
