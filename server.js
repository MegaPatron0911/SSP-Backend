// Servidor Express para exponer la API de Usuario
const express = require('express');
const usuarioRoutes = require('./routes/usuario.routes');
const vehiculoRoutes = require('./routes/vehiculo.routes');
const perfilUsuarioRoutes = require('./routes/perfil_usuario.routes');
const picoPlacaRoutes = require('./routes/pico_placa.routes');
const incidenciaRoutes = require('./routes/incidencia.routes');
const reporteIncidenciaRoutes = require('./routes/reporte_incidencia.routes');
const historialParqueoRoutes = require('./routes/historial_parqueo.routes');
const accesoSalidaRoutes = require('./routes/acceso_salida.routes');
const celdaRoutes = require('./routes/celda.routes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/perfil_usuario', perfilUsuarioRoutes);
app.use('/api/pico_placa', picoPlacaRoutes);
app.use('/api/incidencia', incidenciaRoutes);
app.use('/api/reporte_incidencia', reporteIncidenciaRoutes);
app.use('/api/historial_parqueo', historialParqueoRoutes);
app.use('/api/acceso_salida', accesoSalidaRoutes);
app.use('/api/celda', celdaRoutes);

app.get('/', (req, res) => {
  res.send('API de Usuarios funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Middleware global para el manejo de errores
// Este middleware capturará cualquier error lanzado por las rutas asíncronas
// y enviará una respuesta de error JSON.
app.use((err, req, res, next) => {
  console.error('ERROR 💥', err); // Loguear el error para depuración
  res.status(err.statusCode || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});
