const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/database');

const app = express();

// =======================
//  MIDDLEWARES
// =======================
app.use(cors({
  origin: 'http://localhost:3000', // Asegura que el frontend React pueda acceder
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
//  IMPORTAR RUTAS
// =======================
const usuarioRoutes = require('./routes/usuarioRoutes');
const alumnoRoutes = require('./routes/alumnoRoutes');
const asistenciaRoutes = require('./routes/asistenciaRoutes');
const asignaturaRoutes = require('./routes/asignaturaRoutes');
const responsableRoutes = require('./routes/responsableRoutes');
const bachilleratoRoutes = require('./routes/bachilleratoRoutes');
const seccionRoutes = require('./routes/seccionRoutes');
const especialidadRoutes = require('./routes/especialidadRoutes');
const estadoAsistenciaRoutes = require('./routes/estadoAsistenciaRoutes');

// =======================
//  USAR RUTAS
// =======================
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/asistencias', asistenciaRoutes);
app.use('/api/asignaturas', asignaturaRoutes);
app.use('/api/responsables', responsableRoutes);
app.use('/api/bachilleratos', bachilleratoRoutes);
app.use('/api/secciones', seccionRoutes);
app.use('/api/especialidades', especialidadRoutes);
app.use('/api/estados-asistencia', estadoAsistenciaRoutes);

// =======================
//  RUTA DE PRUEBA
// =======================
app.get('/', (req, res) => {
  res.json({ 
    message: ' API Sistema de Asistencia funcionando correctamente',
    version: '1.0.0'
  });
});

// =======================
// 🩺 TEST DE CONEXIÓN
// =======================
app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ success: true, message: 'Base de datos conectada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al conectar a la base de datos', error: error.message });
  }
});

// =======================
//  PUERTO
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en el puerto ${PORT}`);
  console.log(` http://localhost:${PORT}`);
});
