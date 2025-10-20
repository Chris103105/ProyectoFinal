// models/Bachillerato.js
const db = require('../config/database');

class Bachillerato {
  static async getAll() {
    const [rows] = await db.query('SELECT id_bachillerato AS id, id_bachillerato AS id_bachillerato, nombre FROM bachillerato ORDER BY nombre');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT id_bachillerato AS id, id_bachillerato AS id_bachillerato, nombre FROM bachillerato WHERE id_bachillerato = ?', [id]);
    return rows[0];
  }

  static async create({ nombre }) {
    if (!nombre || !nombre.trim()) throw new Error('Nombre requerido');
    const [result] = await db.query('INSERT INTO bachillerato (nombre) VALUES (?)', [nombre]);
    return result.insertId;
  }

  static async update(id, { nombre }) {
    if (!nombre || !nombre.trim()) throw new Error('Nombre requerido');
    const [result] = await db.query('UPDATE bachillerato SET nombre = ? WHERE id_bachillerato = ?', [nombre, id]);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM bachillerato WHERE id_bachillerato = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Bachillerato;
