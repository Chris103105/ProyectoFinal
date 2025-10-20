const Alumno = require('../models/Alumno');

// Obtener todos los alumnos
exports.obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.getAll();
    res.json({ success: true, data: alumnos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener alumnos', error: error.message });
  }
};

// Obtener por ID
exports.obtenerAlumnoPorId = async (req, res) => {
  try {
    const alumno = await Alumno.getById(req.params.id);
    if (!alumno) return res.status(404).json({ success: false, message: 'Alumno no encontrado' });
    res.json({ success: true, data: alumno });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener alumno', error: error.message });
  }
};

// Crear
exports.crearAlumno = async (req, res) => {
  try {
    const { nombre, apellido, id_bachillerato, id_seccion, id_especialidad, id_responsable } = req.body;
    if (!nombre || !apellido || !id_bachillerato || !id_seccion || !id_especialidad || !id_responsable)
      return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });

    const nuevoId = await Alumno.create(req.body);
    const nuevoAlumno = await Alumno.getById(nuevoId);
    res.status(201).json({ success: true, message: 'Alumno creado exitosamente', data: nuevoAlumno });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear alumno', error: error.message });
  }
};

// Actualizar
exports.actualizarAlumno = async (req, res) => {
  try {
    const alumnoExistente = await Alumno.getById(req.params.id);
    if (!alumnoExistente)
      return res.status(404).json({ success: false, message: 'Alumno no encontrado' });

    await Alumno.update(req.params.id, req.body);
    const alumnoActualizado = await Alumno.getById(req.params.id);
    res.json({ success: true, message: 'Alumno actualizado', data: alumnoActualizado });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar alumno', error: error.message });
  }
};

// Eliminar
exports.eliminarAlumno = async (req, res) => {
  try {
    const alumnoExistente = await Alumno.getById(req.params.id);
    if (!alumnoExistente)
      return res.status(404).json({ success: false, message: 'Alumno no encontrado' });

    await Alumno.delete(req.params.id);
    res.json({ success: true, message: 'Alumno eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar alumno', error: error.message });
  }
};
