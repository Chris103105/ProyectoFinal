const db = require('../config/database');

class Asignatura {
  // Obtener todas las asignaturas
  static async getAll() {
    const [rows] = await db.query(`
      SELECT 
        a.id_asignatura,
        a.nombre,
        u.nombre as profesor_nombre,
        u.apellido as profesor_apellido,
        u.id_usuario
      FROM asignatura a
      INNER JOIN usuario u ON a.id_usuario = u.id_usuario
      ORDER BY a.nombre
    `);
    return rows;
  }

  // Obtener asignatura por ID
  static async getById(id) {
    const [rows] = await db.query(`
      SELECT 
        a.*,
        u.nombre as profesor_nombre,
        u.apellido as profesor_apellido
      FROM asignatura a
      INNER JOIN usuario u ON a.id_usuario = u.id_usuario
      WHERE a.id_asignatura = ?
    `, [id]);
    return rows[0];
  }

  // Obtener asignaturas por profesor
  static async getByProfesor(id_usuario) {
    const [rows] = await db.query(`
      SELECT * FROM asignatura WHERE id_usuario = ? ORDER BY nombre
    `, [id_usuario]);
    return rows;
  }

  // Obtener asignaturas con sus secciones
  static async getConSecciones(id_asignatura) {
    const [rows] = await db.query(`
      SELECT 
        s.id_seccion,
        s.nombre as seccion_nombre,
        b.nombre as bachillerato_nombre
      FROM asignatura_seccion ase
      INNER JOIN seccion s ON ase.id_seccion = s.id_seccion
      INNER JOIN bachillerato b ON s.id_bachillerato = b.id_bachillerato
      WHERE ase.id_asignatura = ?
      ORDER BY s.nombre
    `, [id_asignatura]);
    return rows;
  }

  // Crear nueva asignatura
  static async create(asignaturaData) {
    const { nombre, id_usuario } = asignaturaData;
    const [result] = await db.query(
      'INSERT INTO asignatura (nombre, id_usuario) VALUES (?, ?)',
      [nombre, id_usuario]
    );
    return result.insertId;
  }

  // Actualizar asignatura
  static async update(id, asignaturaData) {
    const { nombre, id_usuario } = asignaturaData;
    await db.query(
      'UPDATE asignatura SET nombre = ?, id_usuario = ? WHERE id_asignatura = ?',
      [nombre, id_usuario, id]
    );
    return true;
  }

  // Eliminar asignatura
  static async delete(id) {
    await db.query('DELETE FROM asignatura WHERE id_asignatura = ?', [id]);
    return true;
  }

  // Asignar secciones a una asignatura
  static async asignarSecciones(id_asignatura, secciones) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      
      // Eliminar asignaciones previas
      await connection.query('DELETE FROM asignatura_seccion WHERE id_asignatura = ?', [id_asignatura]);
      
      // Insertar nuevas asignaciones
      for (const id_seccion of secciones) {
        await connection.query(
          'INSERT INTO asignatura_seccion (id_asignatura, id_seccion) VALUES (?, ?)',
          [id_asignatura, id_seccion]
        );
      }
      
      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = Asignatura;