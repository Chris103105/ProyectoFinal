/* useroutes.js */
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// La jerarquía de rutas es importante para evitar que :id capture rutas fijas.

// 1. RUTAS FIJAS CON PREFIJO (Deben ir primero)

// OBTENER POR FIREBASE UID (Ruta para el login/AuthContext)
// URL: /api/usuarios/uid/{firebase_uid}
router.get('/uid/:firebase_uid', usuarioController.obtenerUsuarioPorUid); 

// OTRAS RUTAS DE VINCULACIÓN
// URL: /api/usuarios/actualizar-uid
router.patch('/actualizar-uid', usuarioController.vincularUidPorCorreo);


// ----------------------------------------------------
// 2. RUTAS CRUD BÁSICAS (GET Listado debe ir antes de GET por ID)

// OBTENER TODOS LOS USUARIOS (Listado para la tabla de Admin)
// URL: /api/usuarios/
router.get('/', usuarioController.obtenerUsuarios);

// CREAR NUEVO USUARIO (Formulario de Admin)
// URL: /api/usuarios/
router.post('/', usuarioController.crearUsuario);


// ----------------------------------------------------
// 3. RUTAS CRUD POR ID (Deben ir al final para no capturar las rutas anteriores)

// OBTENER USUARIO POR ID (Ruta para detalles)
// URL: /api/usuarios/{id}
router.get('/:id', usuarioController.obtenerUsuarioPorId); 

// ACTUALIZAR USUARIO (Requiere el ID en la URL)
// URL: /api/usuarios/{id}
router.put('/:id', usuarioController.actualizarUsuario);

// ELIMINAR USUARIO (Requiere el ID en la URL)
// URL: /api/usuarios/{id}
router.delete('/:id', usuarioController.eliminarUsuario);


module.exports = router;