const express = require('express');
const bodyParser = require('body-parser');
const clientesRoutes = require('./routes/clientes.routes');

const app = express();

app.use(bodyParser.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor activo. Usa /api/clientes para ver los datos.');
});

// Prefijo para las rutas de clientes
app.use('/api/clientes', clientesRoutes);

app.listen(3000, () => {
  console.log('🚀 Servidor ejecutándose en http://localhost:3000');
});