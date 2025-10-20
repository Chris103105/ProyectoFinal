const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/seccionController');

router.get('/', ctrl.obtenerSecciones);
router.get('/:id', ctrl.obtenerSeccionPorId);
router.post('/', ctrl.crearSeccion);
router.put('/:id', ctrl.actualizarSeccion);
router.delete('/:id', ctrl.eliminarSeccion);

module.exports = router;
