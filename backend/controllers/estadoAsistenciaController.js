const EstadoAsistencia = require('../models/EstadoAsistencia');

exports.obtenerEstados = async (req, res) => {
  try {
    const estados = await EstadoAsistencia.getAll();
    res.json({ success: true, data: estados });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener estados', error: error.message });
  }
};
