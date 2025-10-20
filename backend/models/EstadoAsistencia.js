// backend/models/EstadoAsistencia.js
const db = require('../config/database');

class EstadoAsistencia {
  static async getAll() {
    const [rows] = await db.query('SELECT id_estado, estado FROM estado_asistencia ORDER BY id_estado');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT id_estado, estado FROM estado_asistencia WHERE id_estado = ?', [id]);
    return rows[0];
  }
}

module.exports = EstadoAsistencia;
