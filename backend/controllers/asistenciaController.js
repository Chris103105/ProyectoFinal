// backend/controllers/asistenciaController.js
const Asistencia = require('../models/Asistencia');

exports.obtenerPorFiltros = async (req, res) => {
  try {
    const filtros = {
      id_bachillerato: req.query.id_bachillerato,
      id_especialidad: req.query.id_especialidad,
      id_seccion: req.query.id_seccion,
      fecha: req.query.fecha
    };
    const rows = await Asistencia.getByFilters(filtros);
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Error obtener asistencias:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.obtenerPorFecha = async (req, res) => {
  try {
    const { fecha } = req.params;
    const rows = await Asistencia.getByFecha(fecha);
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Error obtener por fecha:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.registrar = async (req, res) => {
  try {
    const { id_alumno, id_estado, registro, fecha } = req.body;
    if (!id_alumno || !id_estado || !fecha) {
      return res.status(400).json({ success: false, message: 'id_alumno, id_estado y fecha son requeridos' });
    }
    const id = await Asistencia.create({ id_alumno, id_estado, registro, fecha });
    return res.status(201).json({ success: true, id });
  } catch (err) {
    console.error('Error registrar asistencia:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// registrar masiva: recibe { asistencias: [ {id_alumno, id_estado, registro, fecha}, ... ] }
exports.registrarMasiva = async (req, res) => {
  try {
    const { asistencias } = req.body;
    if (!Array.isArray(asistencias) || asistencias.length === 0) {
      return res.status(400).json({ success: false, message: 'Array de asistencias requerido' });
    }
    await Asistencia.createMany(asistencias);
    return res.json({ success: true, message: `${asistencias.length} asistencias registradas` });
  } catch (err) {
    console.error('Error registrar masiva:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_estado } = req.body;
    if (!id_estado) return res.status(400).json({ success: false, message: 'id_estado requerido' });
    await Asistencia.updateEstado(id, id_estado);
    return res.json({ success: true, message: 'Estado actualizado' });
  } catch (err) {
    console.error('Error actualizar estado:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    await Asistencia.delete(id);
    return res.json({ success: true, message: 'Asistencia eliminada' });
  } catch (err) {
    console.error('Error eliminar asistencia:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
