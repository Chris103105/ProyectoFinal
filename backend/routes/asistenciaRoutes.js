// backend/routes/asistencias.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/asistenciaController');

// GET /api/asistencias  -> listar por filtros (query params)
router.get('/', controller.obtenerPorFiltros);

// GET /api/asistencias/fecha/:fecha
router.get('/fecha/:fecha', controller.obtenerPorFecha);

// POST /api/asistencias  -> crear individual
router.post('/', controller.registrar);

// POST /api/asistencias/masiva  -> crear many
router.post('/masiva', controller.registrarMasiva);

// PUT /api/asistencias/:id -> actualizar estado
router.put('/:id', controller.actualizarEstado);

// DELETE /api/asistencias/:id
router.delete('/:id', controller.eliminar);

module.exports = router;
