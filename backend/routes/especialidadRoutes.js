const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/especialidadController');

router.get('/', ctrl.obtenerEspecialidades);
router.get('/:id', ctrl.obtenerEspecialidadPorId);
router.post('/', ctrl.crearEspecialidad);
router.put('/:id', ctrl.actualizarEspecialidad);
router.delete('/:id', ctrl.eliminarEspecialidad);

module.exports = router;
