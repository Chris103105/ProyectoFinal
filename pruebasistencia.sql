-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 20-10-2025 a las 06:30:51
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pruebasistencia`
--
CREATE DATABASE IF NOT EXISTS `pruebasistencia` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `pruebasistencia`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

DROP TABLE IF EXISTS `alumno`;
CREATE TABLE IF NOT EXISTS `alumno` (
  `id_alumno` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_bachillerato` int NOT NULL,
  `id_seccion` int NOT NULL,
  `id_especialidad` int NOT NULL,
  `id_responsable` int NOT NULL,
  PRIMARY KEY (`id_alumno`),
  KEY `id_seccion` (`id_seccion`),
  KEY `id_especialidad` (`id_especialidad`),
  KEY `id_responsable` (`id_responsable`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`id_alumno`, `nombre`, `apellido`, `id_bachillerato`, `id_seccion`, `id_especialidad`, `id_responsable`) VALUES
(1, 'Rodrigo Leandro', 'Hernandez', 1, 2, 2, 1),
(2, 'Christopher', 'De Cruz', 1, 2, 2, 1),
(17, 'Ana', 'Gómez', 1, 2, 2, 1),
(18, 'Carlos', 'Pérez', 1, 2, 2, 2),
(19, 'Lucía', 'Ramírez', 1, 2, 2, 3),
(20, 'José', 'Martínez', 1, 2, 2, 4),
(21, 'María', 'López', 1, 2, 2, 5),
(22, 'Pedro', 'Santos', 1, 2, 2, 6),
(23, 'Sofía', 'Hernández', 1, 2, 2, 7),
(24, 'Miguel', 'Vargas', 1, 2, 2, 8),
(25, 'Valentina', 'Rojas', 1, 2, 2, 9),
(26, 'Camila', 'Molina', 1, 2, 2, 10),
(27, 'Andrés', 'Castillo', 1, 2, 2, 11),
(28, 'Isabela', 'Cruz', 1, 2, 2, 3),
(29, 'Manuel', 'Alvarado', 1, 2, 2, 2),
(30, 'Paola', 'Gutiérrez', 1, 2, 2, 5),
(31, 'Rodrigo Leandro', 'Hernandez', 4, 3, 4, 2),
(32, 'Rodrigo Leandro', 'Hernandez', 3, 3, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

DROP TABLE IF EXISTS `asistencia`;
CREATE TABLE IF NOT EXISTS `asistencia` (
  `id_asistencia` int NOT NULL AUTO_INCREMENT,
  `id_alumno` int NOT NULL,
  `id_estado` int NOT NULL,
  `registro` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id_asistencia`),
  UNIQUE KEY `unique_asistencia` (`id_alumno`,`fecha`),
  KEY `id_estado` (`id_estado`),
  KEY `idx_asistencia_fecha` (`fecha`),
  KEY `idx_asistencia_alumno` (`id_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asistencia`
--

INSERT INTO `asistencia` (`id_asistencia`, `id_alumno`, `id_estado`, `registro`, `fecha`) VALUES
(1, 1, 1, NULL, '2025-10-19'),
(2, 2, 1, NULL, '2025-10-19'),
(3, 17, 1, NULL, '2025-10-19'),
(4, 18, 1, NULL, '2025-10-19'),
(5, 19, 2, NULL, '2025-10-19'),
(6, 20, 1, NULL, '2025-10-19'),
(7, 21, 1, NULL, '2025-10-19'),
(8, 22, 4, NULL, '2025-10-19'),
(9, 23, 1, NULL, '2025-10-19'),
(10, 24, 1, NULL, '2025-10-19'),
(11, 25, 1, NULL, '2025-10-19'),
(12, 26, 1, NULL, '2025-10-19'),
(13, 27, 3, NULL, '2025-10-19'),
(14, 28, 1, NULL, '2025-10-19'),
(15, 29, 3, NULL, '2025-10-19'),
(16, 30, 1, NULL, '2025-10-19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bachillerato`
--

DROP TABLE IF EXISTS `bachillerato`;
CREATE TABLE IF NOT EXISTS `bachillerato` (
  `id_bachillerato` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_bachillerato`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bachillerato`
--

INSERT INTO `bachillerato` (`id_bachillerato`, `nombre`) VALUES
(1, 'Primer Año'),
(3, 'Segundo Año'),
(4, 'Tercer Año');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
CREATE TABLE IF NOT EXISTS `especialidad` (
  `id_especialidad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_bachillerato` int NOT NULL,
  PRIMARY KEY (`id_especialidad`),
  UNIQUE KEY `nombre` (`nombre`,`id_bachillerato`),
  KEY `id_bachillerato` (`id_bachillerato`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id_especialidad`, `nombre`, `id_bachillerato`) VALUES
(3, 'Contaduria', 1),
(4, 'Electronica', 1),
(2, 'General', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_asistencia`
--

DROP TABLE IF EXISTS `estado_asistencia`;
CREATE TABLE IF NOT EXISTS `estado_asistencia` (
  `id_estado` int NOT NULL AUTO_INCREMENT,
  `estado` enum('Presente','Ausente','Tarde','Justificado') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Ausente',
  PRIMARY KEY (`id_estado`),
  UNIQUE KEY `estado` (`estado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_asistencia`
--

INSERT INTO `estado_asistencia` (`id_estado`, `estado`) VALUES
(1, 'Presente'),
(2, 'Ausente'),
(3, 'Tarde'),
(4, 'Justificado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `responsable`
--

DROP TABLE IF EXISTS `responsable`;
CREATE TABLE IF NOT EXISTS `responsable` (
  `id_responsable` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `correo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_responsable`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `responsable`
--

INSERT INTO `responsable` (`id_responsable`, `nombre`, `apellido`, `correo`, `telefono`) VALUES
(1, 'Rodrigo Leandro', 'Hernandez', 'r639903@gmail.com', '63170231'),
(2, 'Ana', 'Gómez', 'ana.gomez@gmail.com', '5551234567'),
(3, 'Carlos', 'Pérez', 'carlos.perez@gmail.com', '5552345678'),
(4, 'Lucía', 'Ramírez', 'lucia.ramirez@gmail.com', '5553456789'),
(5, 'José', 'Martínez', 'jose.martinez@gmail.com', '5554567890'),
(6, 'María', 'López', 'maria.lopez@gmail.com', '5555678901'),
(7, 'Pedro', 'Santos', 'pedro.santos@gmail.com', '5556789012'),
(8, 'Sofía', 'Hernández', 'sofia.hernandez@gmail.com', '5557890123'),
(9, 'Miguel', 'Vargas', 'miguel.vargas@gmail.com', '5558901234'),
(10, 'Valentina', 'Rojas', 'valentina.rojas@gmail.com', '5559012345'),
(11, 'Diego', 'Torres', 'diego.torres@gmail.com', '5550123456');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seccion`
--

DROP TABLE IF EXISTS `seccion`;
CREATE TABLE IF NOT EXISTS `seccion` (
  `id_seccion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_bachillerato` int NOT NULL,
  PRIMARY KEY (`id_seccion`),
  UNIQUE KEY `nombre` (`nombre`,`id_bachillerato`),
  KEY `id_bachillerato` (`id_bachillerato`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `seccion`
--

INSERT INTO `seccion` (`id_seccion`, `nombre`, `id_bachillerato`) VALUES
(3, 'A', 1),
(4, 'B', 1),
(2, 'C', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firebase_uid` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  `rol` enum('Administrador','Profesor') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Profesor',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `firebase_uid` (`firebase_uid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `firebase_uid`, `nombre`, `email`, `fecha_registro`, `rol`) VALUES
(1, 'abc123xyz', 'Odaly Cruz', 'cruzodaly25@gmail.com', '2025-10-11 12:11:00', 'Administrador'),
(2, 'yElcYmPbPgP88ERs0zW8HWfwnGl2', 'Christopher Jovel', 'christopherjovel7@gmail.com', '2025-10-11 12:12:46', 'Profesor'),
(3, 'mo2BbTQm7mbPiOhUDb5XHBzUvql2', 'Christopher steven Jovel', 'rebornlive503@gmail.com', '2025-10-11 12:21:28', 'Profesor'),
(4, NULL, 'Juan juan', 'njknaskjna@', '2025-10-12 18:58:25', 'Profesor'),
(5, NULL, 'sjdj', 'lalalalala@', '2025-10-12 19:02:36', 'Profesor'),
(7, '3Q2xiW1yy9avGC30nhzmJX01quo2', 'Ola Mundo', 'mundoola314@gmail.com', '2025-10-17 22:00:49', 'Profesor'),
(12, 'JnkIfSMq6aMsdT7rR3pkwEytYFx2', 'Rodrigo', 'unirod639@gmail.com', '2025-10-17 23:25:19', 'Administrador'),
(16, NULL, 'tukola', 'r639903@gmail.com', '2025-10-19 21:33:38', 'Profesor');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`id_seccion`) REFERENCES `seccion` (`id_seccion`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `alumno_ibfk_2` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id_especialidad`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `alumno_ibfk_3` FOREIGN KEY (`id_responsable`) REFERENCES `responsable` (`id_responsable`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `asistencia_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `asistencia_ibfk_3` FOREIGN KEY (`id_estado`) REFERENCES `estado_asistencia` (`id_estado`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Filtros para la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD CONSTRAINT `especialidad_ibfk_1` FOREIGN KEY (`id_bachillerato`) REFERENCES `bachillerato` (`id_bachillerato`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Filtros para la tabla `seccion`
--
ALTER TABLE `seccion`
  ADD CONSTRAINT `seccion_ibfk_1` FOREIGN KEY (`id_bachillerato`) REFERENCES `bachillerato` (`id_bachillerato`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
