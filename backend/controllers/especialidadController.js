// controllers/especialidadController.js
const Especialidad = require('../models/Especialidad');

exports.obtenerEspecialidades = async (req, res) => {
  try {
    const data = await Especialidad.getAll();
    res.json({ success: true, data });
  } catch (err) {
    console.error('Error obtenerEspecialidades:', err);
    res.status(500).json({ success: false, message: 'Error al obtener especialidades', error: err.message });
  }
};

exports.obtenerEspecialidadPorId = async (req, res) => {
  try {
    const item = await Especialidad.getById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'No encontrado' });
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Error obtenerEspecialidadPorId:', err);
    res.status(500).json({ success: false, message: 'Error', error: err.message });
  }
};

exports.crearEspecialidad = async (req, res) => {
  try {
    const { nombre, id_bachillerato } = req.body;
    if (!nombre) return res.status(400).json({ success: false, message: 'nombre requerido' });
    const id = await Especialidad.create({ nombre, id_bachillerato });
    const created = await Especialidad.getById(id);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('Error crearEspecialidad:', err);
    res.status(500).json({ success: false, message: 'Error al crear', error: err.message });
  }
};

exports.actualizarEspecialidad = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, id_bachillerato } = req.body;
    const existing = await Especialidad.getById(id);
    if (!existing) return res.status(404).json({ success: false, message: 'No encontrado' });
    await Especialidad.update(id, { nombre, id_bachillerato });
    const updated = await Especialidad.getById(id);
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Error actualizarEspecialidad:', err);
    res.status(500).json({ success: false, message: 'Error al actualizar', error: err.message });
  }
};

exports.eliminarEspecialidad = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Especialidad.getById(id);
    if (!existing) return res.status(404).json({ success: false, message: 'No encontrado' });
    await Especialidad.delete(id);
    res.json({ success: true, message: 'Eliminado' });
  } catch (err) {
    console.error('Error eliminarEspecialidad:', err);
    res.status(500).json({ success: false, message: 'Error al eliminar', error: err.message });
  }
};
