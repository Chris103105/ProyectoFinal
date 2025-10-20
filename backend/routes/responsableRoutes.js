const express = require('express');
const router = express.Router();
const responsableController = require('../controllers/responsableController');

router.get('/', responsableController.obtenerResponsables);
router.get('/:id', responsableController.obtenerResponsablePorId);
router.post('/', responsableController.crearResponsable);
router.put('/:id', responsableController.actualizarResponsable);
router.delete('/:id', responsableController.eliminarResponsable);

module.exports = router;