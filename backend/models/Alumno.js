const db = require('../config/database');

class Alumno {
  // Obtener todos los alumnos
  static async getAll() {
    const [rows] = await db.query(`
      SELECT 
        a.id_alumno,
        a.nombre,
        a.apellido,
        b.nombre AS bachillerato,
        s.nombre AS seccion,
        e.nombre AS especialidad,
        r.nombre AS responsable_nombre,
        r.apellido AS responsable_apellido,
        r.correo AS responsable_correo,
        r.telefono AS responsable_telefono
      FROM alumno a
      LEFT JOIN bachillerato b ON a.id_bachillerato = b.id_bachillerato
      LEFT JOIN seccion s ON a.id_seccion = s.id_seccion
      LEFT JOIN especialidad e ON a.id_especialidad = e.id_especialidad
      LEFT JOIN responsable r ON a.id_responsable = r.id_responsable
      ORDER BY a.apellido, a.nombre
    `);
    return rows;
  }

  // Obtener alumno por ID
  static async getById(id) {
    const [rows] = await db.query(`
      SELECT 
        a.*,
        b.nombre AS bachillerato,
        s.nombre AS seccion,
        e.nombre AS especialidad,
        r.nombre AS responsable_nombre,
        r.apellido AS responsable_apellido,
        r.correo AS responsable_correo,
        r.telefono AS responsable_telefono
      FROM alumno a
      LEFT JOIN bachillerato b ON a.id_bachillerato = b.id_bachillerato
      LEFT JOIN seccion s ON a.id_seccion = s.id_seccion
      LEFT JOIN especialidad e ON a.id_especialidad = e.id_especialidad
      LEFT JOIN responsable r ON a.id_responsable = r.id_responsable
      WHERE a.id_alumno = ?
    `, [id]);
    return rows[0];
  }

  // Crear alumno
  static async create(alumnoData) {
    const { nombre, apellido, id_bachillerato, id_seccion, id_especialidad, id_responsable } = alumnoData;
    const [result] = await db.query(
      `INSERT INTO alumno (nombre, apellido, id_bachillerato, id_seccion, id_especialidad, id_responsable)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, apellido, id_bachillerato, id_seccion, id_especialidad, id_responsable]
    );
    return result.insertId;
  }

  // Actualizar alumno
  static async update(id, alumnoData) {
    const { nombre, apellido, id_bachillerato, id_seccion, id_especialidad, id_responsable } = alumnoData;
    await db.query(
      `UPDATE alumno 
       SET nombre = ?, apellido = ?, id_bachillerato = ?, id_seccion = ?, id_especialidad = ?, id_responsable = ?
       WHERE id_alumno = ?`,
      [nombre, apellido, id_bachillerato, id_seccion, id_especialidad, id_responsable, id]
    );
    return true;
  }

  // Eliminar alumno
  static async delete(id) {
    await db.query('DELETE FROM alumno WHERE id_alumno = ?', [id]);
    return true;
  }
}

module.exports = Alumno;
