// backend/models/Asistencia.js
const db = require('../config/database');

class Asistencia {
  // Obtener asistencias con joins y filtros (bachillerato, especialidad, seccion, fecha)
  static async getByFilters({ id_bachillerato, id_especialidad, id_seccion, fecha }) {
    let query = `
      SELECT 
        a.id_asistencia,
        a.id_alumno,
        al.nombre AS alumno_nombre,
        al.apellido AS alumno_apellido,
        al.id_bachillerato,
        al.id_especialidad,
        al.id_seccion,
        b.nombre AS bachillerato,
        e.nombre AS especialidad,
        s.nombre AS seccion,
        ea.id_estado,
        ea.estado,
        a.registro,
        a.fecha
      FROM asistencia a
      INNER JOIN alumno al ON a.id_alumno = al.id_alumno
      LEFT JOIN bachillerato b ON al.id_bachillerato = b.id_bachillerato
      LEFT JOIN especialidad e ON al.id_especialidad = e.id_especialidad
      LEFT JOIN seccion s ON al.id_seccion = s.id_seccion
      LEFT JOIN estado_asistencia ea ON a.id_estado = ea.id_estado
      WHERE 1=1
    `;
    const params = [];

    if (id_bachillerato) { query += ' AND al.id_bachillerato = ?'; params.push(id_bachillerato); }
    if (id_especialidad) { query += ' AND al.id_especialidad = ?'; params.push(id_especialidad); }
    if (id_seccion) { query += ' AND al.id_seccion = ?'; params.push(id_seccion); }
    if (fecha) { query += ' AND a.fecha = ?'; params.push(fecha); }

    query += ' ORDER BY al.apellido, al.nombre';
    const [rows] = await db.query(query, params);
    return rows;
  }

  // Obtener asistencias solo por fecha (útil para gestión)
  static async getByFecha(fecha) {
    const [rows] = await db.query(`
      SELECT a.*, al.nombre AS alumno_nombre, al.apellido AS alumno_apellido,
             ea.id_estado, ea.estado
      FROM asistencia a
      INNER JOIN alumno al ON a.id_alumno = al.id_alumno
      LEFT JOIN estado_asistencia ea ON a.id_estado = ea.id_estado
      WHERE a.fecha = ?
      ORDER BY al.apellido, al.nombre
    `, [fecha]);
    return rows;
  }

  // Crear un registro de asistencia (único)
  static async create({ id_alumno, id_estado, registro, fecha }) {
    const [result] = await db.query(
      'INSERT INTO asistencia (id_alumno, id_estado, registro, fecha) VALUES (?, ?, ?, ?)',
      [id_alumno, id_estado, registro || null, fecha]
    );
    return result.insertId;
  }

  // Insertar/actualizar masivo (tomar asistencia de toda la clase)
  // Usamos INSERT ... ON DUPLICATE KEY UPDATE para evitar duplicados
  // Para esto debes tener UNIQUE constraint en (id_alumno, fecha) o (id_alumno, id_asignatura, fecha) — asumimos (id_alumno, fecha)
  static async createMany(asistencias) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      const sql = `
        INSERT INTO asistencia (id_alumno, id_estado, registro, fecha)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE id_estado = VALUES(id_estado), registro = VALUES(registro)
      `;
      for (const a of asistencias) {
        const params = [a.id_alumno, a.id_estado, a.registro || null, a.fecha];
        await connection.query(sql, params);
      }
      await connection.commit();
      return true;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  // Actualizar estado de una asistencia
  static async updateEstado(id_asistencia, id_estado) {
    await db.query('UPDATE asistencia SET id_estado = ? WHERE id_asistencia = ?', [id_estado, id_asistencia]);
    return true;
  }

  // Eliminar asistencia
  static async delete(id_asistencia) {
    await db.query('DELETE FROM asistencia WHERE id_asistencia = ?', [id_asistencia]);
    return true;
  }
}

module.exports = Asistencia;
