const Responsable = require('../models/Responsable');

exports.obtenerResponsables = async (req, res) => {
  try {
    const responsables = await Responsable.getAll();
    res.json({
      success: true,
      data: responsables
    });
  } catch (error) {
    console.error('Error al obtener responsables:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener responsables',
      error: error.message
    });
  }
};

exports.obtenerResponsablePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const responsable = await Responsable.getById(id);
    
    if (!responsable) {
      return res.status(404).json({
        success: false,
        message: 'Responsable no encontrado'
      });
    }

    res.json({
      success: true,
      data: responsable
    });
  } catch (error) {
    console.error('Error al obtener responsable:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener responsable',
      error: error.message
    });
  }
};

exports.crearResponsable = async (req, res) => {
  try {
    const { nombre, apellido, correo, telefono } = req.body;

    if (!nombre || !apellido || !correo) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, apellido y correo son requeridos'
      });
    }

    const responsableExistente = await Responsable.getByCorreo(correo);
    if (responsableExistente) {
      return res.status(400).json({
        success: false,
        message: 'El correo ya está registrado'
      });
    }

    const nuevoId = await Responsable.create(req.body);
    const nuevoResponsable = await Responsable.getById(nuevoId);

    res.status(201).json({
      success: true,
      message: 'Responsable creado exitosamente',
      data: nuevoResponsable
    });
  } catch (error) {
    console.error('Error al crear responsable:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear responsable',
      error: error.message
    });
  }
};

exports.actualizarResponsable = async (req, res) => {
  try {
    const { id } = req.params;

    const responsableExistente = await Responsable.getById(id);
    if (!responsableExistente) {
      return res.status(404).json({
        success: false,
        message: 'Responsable no encontrado'
      });
    }

    await Responsable.update(id, req.body);
    const responsableActualizado = await Responsable.getById(id);

    res.json({
      success: true,
      message: 'Responsable actualizado exitosamente',
      data: responsableActualizado
    });
  } catch (error) {
    console.error('Error al actualizar responsable:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar responsable',
      error: error.message
    });
  }
};

exports.eliminarResponsable = async (req, res) => {
  try {
    const { id } = req.params;

    const responsableExistente = await Responsable.getById(id);
    if (!responsableExistente) {
      return res.status(404).json({
        success: false,
        message: 'Responsable no encontrado'
      });
    }

    await Responsable.delete(id);

    res.json({
      success: true,
      message: 'Responsable eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar responsable:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar responsable',
      error: error.message
    });
  }
};