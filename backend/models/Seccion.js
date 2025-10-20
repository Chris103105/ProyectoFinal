// models/Seccion.js
const db = require('../config/database');

class Seccion {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT s.id_seccion AS id, s.id_seccion AS id_seccion, s.nombre, s.id_bachillerato
      FROM seccion s
      ORDER BY s.nombre
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT id_seccion AS id, id_seccion AS id_seccion, nombre, id_bachillerato FROM seccion WHERE id_seccion = ?', [id]);
    return rows[0];
  }

  static async create({ nombre, id_bachillerato }) {
    if (!nombre || !nombre.trim()) throw new Error('Nombre requerido');
    const [result] = await db.query('INSERT INTO seccion (nombre, id_bachillerato) VALUES (?, ?)', [nombre, id_bachillerato || null]);
    return result.insertId;
  }

  static async update(id, { nombre, id_bachillerato }) {
    if (!nombre || !nombre.trim()) throw new Error('Nombre requerido');
    const [result] = await db.query('UPDATE seccion SET nombre = ?, id_bachillerato = ? WHERE id_seccion = ?', [nombre, id_bachillerato || null, id]);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM seccion WHERE id_seccion = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Seccion;
