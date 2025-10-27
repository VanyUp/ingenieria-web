const db = require('../db');

// Crear cliente
exports.crearCliente = (req, res) => {
    const { nombre, correo, telefono } = req.body;

    if (!nombre || !correo || !telefono) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    db.query('INSERT INTO clientes SET ?', { nombre, correo, telefono }, (err, result) => {
        if (err) {
            console.error('Error al insertar cliente:', err);
            return res.status(500).json({ error: 'Error al crear cliente' });
        }
        res.status(201).json({ message: 'Cliente agregado exitosamente', id: result.insertId });
    });
};

// Obtener todos los clientes
exports.obtenerClientes = (req, res) => {
    db.query('SELECT * FROM clientes', (err, rows) => {
        if (err) {
            console.error('Error al obtener clientes:', err);
            return res.status(500).json({ error: 'Error al obtener clientes' });
        }
        res.json(rows);
    });
};

// Actualizar cliente
exports.actualizarCliente = (req, res) => {
    const { id } = req.params;
    const { nombre, correo, telefono } = req.body;

    db.query('UPDATE clientes SET ? WHERE id = ?', [{ nombre, correo, telefono }, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar cliente:', err);
            return res.status(500).json({ error: 'Error al actualizar cliente' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.json({ message: 'Cliente actualizado correctamente' });
    });
};

// Eliminar cliente
exports.eliminarCliente = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM clientes WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar cliente:', err);
            return res.status(500).json({ error: 'Error al eliminar cliente' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.json({ message: 'Cliente eliminado correctamente' });
    });
};