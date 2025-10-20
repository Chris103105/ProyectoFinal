const express = require('express');
const router = express.Router();
const estadoAsistenciaController = require('../controllers/estadoAsistenciaController');

router.get('/', estadoAsistenciaController.obtenerEstados);

module.exports = router;
