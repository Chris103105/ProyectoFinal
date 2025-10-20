// models/Especialidad.js
const db = require('../config/database');

class Especialidad {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT e.id_especialidad AS id, e.id_especialidad AS id_especialidad, e.nombre, e.id_bachillerato
      FROM especialidad e
      ORDER BY e.nombre
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT id_especialidad AS id, id_especialidad AS id_especialidad, nombre, id_bachillerato FROM especialidad WHERE id_especialidad = ?', [id]);
    return rows[0];
  }

  static async create({ nombre, id_bachillerato }) {
    if (!nombre || !nombre.trim()) throw new Error('Nombre requerido');
    const [result] = await db.query('INSERT INTO especialidad (nombre, id_bachillerato) VALUES (?, ?)', [nombre, id_bachillerato || null]);
    return result.insertId;
  }

  static async update(id, { nombre, id_bachillerato }) {
    if (!nombre || !nombre.trim()) throw new Error('Nombre requerido');
    const [result] = await db.query('UPDATE especialidad SET nombre = ?, id_bachillerato = ? WHERE id_especialidad = ?', [nombre, id_bachillerato || null, id]);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM especialidad WHERE id_especialidad = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Especialidad;
