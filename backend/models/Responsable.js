const db = require('../config/database');

class Responsable {
  // Obtener todos los responsables
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM responsable ORDER BY apellido, nombre');
    return rows;
  }

  // Obtener responsable por ID
  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM responsable WHERE id_responsable = ?', [id]);
    return rows[0];
  }

  // Obtener responsable por correo
  static async getByCorreo(correo) {
    const [rows] = await db.query('SELECT * FROM responsable WHERE correo = ?', [correo]);
    return rows[0];
  }

  // Crear nuevo responsable
  static async create(responsableData) {
    const { nombre, apellido, correo, telefono } = responsableData;
    const [result] = await db.query(
      'INSERT INTO responsable (nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?)',
      [nombre, apellido, correo, telefono]
    );
    return result.insertId;
  }

  // Actualizar responsable
  static async update(id, responsableData) {
    const { nombre, apellido, correo, telefono } = responsableData;
    await db.query(
      'UPDATE responsable SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id_responsable = ?',
      [nombre, apellido, correo, telefono, id]
    );
    return true;
  }

  // Eliminar responsable
  static async delete(id) {
    await db.query('DELETE FROM responsable WHERE id_responsable = ?', [id]);
    return true;
  }
}

module.exports = Responsable;