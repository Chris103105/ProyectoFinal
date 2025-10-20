// controllers/bachilleratoController.js
const Bachillerato = require('../models/Bachillerato');

exports.obtenerBachilleratos = async (req, res) => {
  try {
    const data = await Bachillerato.getAll();
    res.json({ success: true, data });
  } catch (err) {
    console.error('Error obtenerBachilleratos:', err);
    res.status(500).json({ success: false, message: 'Error al obtener bachilleratos', error: err.message });
  }
};

exports.obtenerBachilleratoPorId = async (req, res) => {
  try {
    const item = await Bachillerato.getById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'No encontrado' });
    res.json({ success: true, data: item });
  } catch (err) {
    console.error('Error obtenerBachilleratoPorId:', err);
    res.status(500).json({ success: false, message: 'Error', error: err.message });
  }
};

exports.crearBachillerato = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ success: false, message: 'nombre requerido' });
    const id = await Bachillerato.create({ nombre });
    const created = await Bachillerato.getById(id);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('Error crearBachillerato:', err);
    res.status(500).json({ success: false, message: 'Error al crear', error: err.message });
  }
};

exports.actualizarBachillerato = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Bachillerato.getById(id);
    if (!existing) return res.status(404).json({ success: false, message: 'No encontrado' });
    await Bachillerato.update(id, req.body);
    const updated = await Bachillerato.getById(id);
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Error actualizarBachillerato:', err);
    res.status(500).json({ success: false, message: 'Error al actualizar', error: err.message });
  }
};

exports.eliminarBachillerato = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Bachillerato.getById(id);
    if (!existing) return res.status(404).json({ success: false, message: 'No encontrado' });
    await Bachillerato.delete(id);
    res.json({ success: true, message: 'Eliminado' });
  } catch (err) {
    console.error('Error eliminarBachillerato:', err);
    res.status(500).json({ success: false, message: 'Error al eliminar', error: err.message });
  }
};
