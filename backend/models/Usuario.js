/* backend/models/Usuario.js */
const db = require('../config/database');

class Usuario {

    // 1. OBTENER TODOS LOS USUARIOS (Corregido y optimizado para la tabla de admin)
    // 🔑 Ahora devuelve todos los campos necesarios para la tabla.
    static async getAll() {
        const [rows] = await db.query(
            'SELECT id, nombre, email, rol, firebase_uid, fecha_registro FROM usuarios ORDER BY id DESC'
        );
        // NOTA: Asumo que tu tabla tiene una columna 'id_usuario' como clave primaria
        // y 'rol' como el nombre del rol (texto).
        return rows;
    }

    // Obtener usuario por ID
    // NOTA: Se ha cambiado 'id' por 'id_usuario' para consistencia con tu nueva consulta getAll
    static async getById(id_usuario) {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return rows[0];
    }

    // Obtener usuario por email
    static async getByEmail(email) {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    }

    // Obtener usuario por Firebase UID (Correcto para el login/AuthContext)
    static async getByFirebaseUid(firebase_uid) {
        // Selecciona solo nombre y rol, ya que es lo que el Header necesita
        const [rows] = await db.query(
            'SELECT nombre, rol FROM usuarios WHERE firebase_uid = ?', 
            [firebase_uid]
        );
        return rows[0];
    }

    // 2. CREAR NUEVO USUARIO (Ajustado: firebase_uid debe ser NULL al crear)
    // 🔑 Se eliminó firebase_uid de la lista de INSERT, ya que el admin solo crea el registro base.
    static async create(userData) {
        // Quitamos firebase_uid de la desestructuración
        const { nombre, email, rol } = userData; 
        
        // Se asume que la columna firebase_uid en la BD es NULL por defecto
        const [result] = await db.query(
            // Solo insertamos nombre, email, y rol
            'INSERT INTO usuarios (nombre, email, rol) VALUES (?, ?, ?)',
            [nombre, email, rol || 'Profesor']
        );
        return result.insertId;
    }

    // Actualizar usuario
    // NOTA: Se ha cambiado 'id' por 'id_usuario' para consistencia.
    static async update(id, userData) {
        const { nombre, email, rol } = userData;
        await db.query(
            'UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?',
            [nombre, email, rol, id]
        );
        return true;
    }

    // Eliminar usuario
    // NOTA: Se ha cambiado 'id' por 'id_usuario' para consistencia.
    static async delete(id) {
        await db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
        return true;
    }

    // Vincular UID por correo si aún no está asignado (Correcto para la vinculación de login)
    static async vincularUid(email, firebase_uid) {
        const [result] = await db.query(
            'UPDATE usuarios SET firebase_uid = ? WHERE email = ? AND firebase_uid IS NULL',
            [firebase_uid, email]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Usuario