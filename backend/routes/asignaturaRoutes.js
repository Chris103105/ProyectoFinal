const express = require('express');
const router = express.Router();
const asignaturaController = require('../controllers/asignaturaController');

router.get('/', asignaturaController.obtenerAsignaturas);
router.get('/:id', asignaturaController.obtenerAsignaturaPorId);
router.get('/profesor/:id_usuario', asignaturaController.obtenerAsignaturasPorProfesor);
router.get('/:id/secciones', asignaturaController.obtenerSeccionesDeAsignatura);
router.post('/', asignaturaController.crearAsignatura);
router.put('/:id', asignaturaController.actualizarAsignatura);
router.delete('/:id', asignaturaController.eliminarAsignatura);
router.post('/:id/secciones', asignaturaController.asignarSecciones);

module.exports = router;