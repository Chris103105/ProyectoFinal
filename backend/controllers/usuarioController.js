/* backend/controllers/usuarioController.js */
const Usuario = require('../models/Usuario');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.getAll();
        res.json({ success: true, data: usuarios });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: error.message });
    }
};

// Obtener usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        // NOTA: Asumo que Usuario.getById usa la columna 'id' o 'id_usuario' de la BD.
        const usuario = await Usuario.getById(id); 
        if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        res.json({ success: true, data: usuario });
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ success: false, message: 'Error al obtener usuario', error: error.message });
    }
};

// 🔑 CAMBIO CLAVE: Crear nuevo usuario (desde el Formulario de Administración)
exports.crearUsuario = async (req, res) => {
    try {
        // NO se espera firebase_uid en el req.body, solo nombre, email, y rol.
        const { nombre, email, rol } = req.body; 
        
        if (!nombre || !email) return res.status(400).json({ success: false, message: 'Nombre y email son requeridos' });

        const usuarioExistente = await Usuario.getByEmail(email);
        if (usuarioExistente) return res.status(400).json({ success: false, message: 'El email ya está registrado' });

        // El modelo de Usuario ahora inserta NULL en firebase_uid
        const nuevoId = await Usuario.create({ nombre, email, rol }); 
        
        // Asumiendo que getById usa el ID primario, que en este caso es nuevoId
        const nuevoUsuario = await Usuario.getById(nuevoId); 

        // 201 Created
        res.status(201).json({ success: true, message: 'Usuario creado exitosamente. Pendiente vinculación con Firebase.', data: nuevoUsuario });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        // Error de BD (por ejemplo, si el email tiene restricción UNIQUE)
        res.status(500).json({ success: false, message: 'Error al crear usuario', error: error.message });
    }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, rol } = req.body;
        const usuarioExistente = await Usuario.getById(id);
        if (!usuarioExistente) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

        await Usuario.update(id, { nombre, email, rol });
        const usuarioActualizado = await Usuario.getById(id);
        res.json({ success: true, message: 'Usuario actualizado exitosamente', data: usuarioActualizado });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ success: false, message: 'Error al actualizar usuario', error: error.message });
    }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioExistente = await Usuario.getById(id);
        if (!usuarioExistente) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

        await Usuario.delete(id);
        res.json({ success: true, message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ success: false, message: 'Error al eliminar usuario', error: error.message });
    }
};

// Obtener usuario por Firebase UID
exports.obtenerUsuarioPorUid = async (req, res) => {
    try {
        const { firebase_uid } = req.params;
        const usuario = await Usuario.getByFirebaseUid(firebase_uid);
        if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        res.json({ success: true, data: usuario });
    } catch (error) {
        console.error('Error al obtener usuario por UID:', error);
        res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
};

// Vincular UID por correo
exports.vincularUidPorCorreo = async (req, res) => {
    try {
        const { email, firebase_uid } = req.body;
        if (!email || !firebase_uid) return res.status(400).json({ success: false, message: 'Email y UID son requeridos' });

        const vinculado = await Usuario.vincularUid(email, firebase_uid);
        if (!vinculado) return res.status(404).json({ success: false, message: 'No se pudo vincular el UID. El correo no existe o ya está vinculado.' });

        res.json({ success: true, message: 'UID vinculado con éxito' });
    } catch (error) {
        console.error('Error al vincular UID:', error);
        res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
};