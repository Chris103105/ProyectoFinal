const Asignatura = require('../models/Asignatura');

// Obtener todas las asignaturas
exports.obtenerAsignaturas = async (req, res) => {
  try {
    const asignaturas = await Asignatura.getAll();
    res.json({
      success: true,
      data: asignaturas
    });
  } catch (error) {
    console.error('Error al obtener asignaturas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener asignaturas',
      error: error.message
    });
  }
};

// Obtener asignatura por ID
exports.obtenerAsignaturaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const asignatura = await Asignatura.getById(id);
    
    if (!asignatura) {
      return res.status(404).json({
        success: false,
        message: 'Asignatura no encontrada'
      });
    }

    res.json({
      success: true,
      data: asignatura
    });
  } catch (error) {
    console.error('Error al obtener asignatura:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener asignatura',
      error: error.message
    });
  }
};

// Obtener asignaturas por profesor
exports.obtenerAsignaturasPorProfesor = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const asignaturas = await Asignatura.getByProfesor(id_usuario);
    res.json({
      success: true,
      data: asignaturas
    });
  } catch (error) {
    console.error('Error al obtener asignaturas del profesor:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener asignaturas del profesor',
      error: error.message
    });
  }
};

// Obtener secciones de una asignatura
exports.obtenerSeccionesDeAsignatura = async (req, res) => {
  try {
    const { id } = req.params;
    const secciones = await Asignatura.getConSecciones(id);
    res.json({
      success: true,
      data: secciones
    });
  } catch (error) {
    console.error('Error al obtener secciones de la asignatura:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener secciones de la asignatura',
      error: error.message
    });
  }
};

// Crear nueva asignatura
exports.crearAsignatura = async (req, res) => {
  try {
    const { nombre, id_usuario } = req.body;

    if (!nombre || !id_usuario) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y profesor son requeridos'
      });
    }

    const nuevoId = await Asignatura.create(req.body);
    const nuevaAsignatura = await Asignatura.getById(nuevoId);

    res.status(201).json({
      success: true,
      message: 'Asignatura creada exitosamente',
      data: nuevaAsignatura
    });
  } catch (error) {
    console.error('Error al crear asignatura:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear asignatura',
      error: error.message
    });
  }
};

// Actualizar asignatura
exports.actualizarAsignatura = async (req, res) => {
  try {
    const { id } = req.params;

    const asignaturaExistente = await Asignatura.getById(id);
    if (!asignaturaExistente) {
      return res.status(404).json({
        success: false,
        message: 'Asignatura no encontrada'
      });
    }

    await Asignatura.update(id, req.body);
    const asignaturaActualizada = await Asignatura.getById(id);

    res.json({
      success: true,
      message: 'Asignatura actualizada exitosamente',
      data: asignaturaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar asignatura:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar asignatura',
      error: error.message
    });
  }
};

// Eliminar asignatura
exports.eliminarAsignatura = async (req, res) => {
  try {
    const { id } = req.params;

    const asignaturaExistente = await Asignatura.getById(id);
    if (!asignaturaExistente) {
      return res.status(404).json({
        success: false,
        message: 'Asignatura no encontrada'
      });
    }

    await Asignatura.delete(id);

    res.json({
      success: true,
      message: 'Asignatura eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar asignatura:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar asignatura',
      error: error.message
    });
  }
};

// Asignar secciones a una asignatura
exports.asignarSecciones = async (req, res) => {
  try {
    const { id } = req.params;
    const { secciones } = req.body;

    if (!secciones || !Array.isArray(secciones)) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere un array de IDs de secciones'
      });
    }

    await Asignatura.asignarSecciones(id, secciones);

    res.json({
      success: true,
      message: 'Secciones asignadas exitosamente'
    });
  } catch (error) {
    console.error('Error al asignar secciones:', error);
    res.status(500).json({
      success: false,
      message: 'Error al asignar secciones',
      error: error.message
    });
  }
};