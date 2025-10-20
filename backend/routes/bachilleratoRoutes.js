const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bachilleratoController');

router.get('/', ctrl.obtenerBachilleratos);
router.get('/:id', ctrl.obtenerBachilleratoPorId);
router.post('/', ctrl.crearBachillerato);
router.put('/:id', ctrl.actualizarBachillerato);
router.delete('/:id', ctrl.eliminarBachillerato);

module.exports = router;
