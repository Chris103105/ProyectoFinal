// controllers/seccionController.js
const Seccion = require('../models/Seccion');

exports.obtenerSecciones = async (req, res) => {
  try {
    const data = await Seccion.getAll();
    res.json({ success: true, data });
  } catch (err) {
    console.error('Error obtenerSecciones:', err);
    res.status(500).json({ success: false, message: 'Error al obtener secciones', error: err.message });
  }
};

exports.obtenerSeccionPorId = async (req, res) => {
  try {
    const item = await Seccion.getById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'No encontrado' });
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Error obtenerSeccionPorId:', err);
    res.status(500).json({ success: false, message: 'Error', error: err.message });
  }
};

exports.crearSeccion = async (req, res) => {
  try {
    const { nombre, id_bachillerato } = req.body;
    if (!nombre) return res.status(400).json({ success: false, message: 'nombre requerido' });
    const id = await Seccion.create({ nombre, id_bachillerato });
    const created = await Seccion.getById(id);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('Error crearSeccion:', err);
    res.status(500).json({ success: false, message: 'Error al crear', error: err.message });
  }
};

exports.actualizarSeccion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, id_bachillerato } = req.body;
    const existing = await Seccion.getById(id);
    if (!existing) return res.status(404).json({ success: false, message: 'No encontrado' });
    await Seccion.update(id, { nombre, id_bachillerato });
    const updated = await Seccion.getById(id);
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Error actualizarSeccion:', err);
    res.status(500).json({ success: false, message: 'Error al actualizar', error: err.message });
  }
};

exports.eliminarSeccion = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Seccion.getById(id);
    if (!existing) return res.status(404).json({ success: false, message: 'No encontrado' });
    await Seccion.delete(id);
    res.json({ success: true, message: 'Eliminado' });
  } catch (err) {
    console.error('Error eliminarSeccion:', err);
    res.status(500).json({ success: false, message: 'Error al eliminar', error: err.message });
  }
};
