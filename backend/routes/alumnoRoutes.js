const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');

// 🔑 CLAVE: La ruta DELETE debe usar el parámetro :id para coincidir con el frontend
// DELETE /api/alumnos/:id
router.delete('/:id', alumnoController.eliminarAlumno);

// PUT /api/alumnos/:id
router.put('/:id', alumnoController.actualizarAlumno);

// GET /api/alumnos/:id
router.get('/:id', alumnoController.obtenerAlumnoPorId);

// POST /api/alumnos
router.post('/', alumnoController.crearAlumno);

// GET /api/alumnos
router.get('/', alumnoController.obtenerAlumnos);

module.exports = router;