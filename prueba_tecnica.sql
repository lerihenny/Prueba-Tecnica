-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-09-2023 a las 18:57:44
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba_tecnica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos`
--

CREATE TABLE `tipos` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos`
--

INSERT INTO `tipos` (`id`, `descripcion`) VALUES
(1, 'Tinto'),
(2, 'Blanco'),
(3, 'Rosado (Rosé)'),
(4, 'Champán o Espumante'),
(5, 'Fortificado'),
(6, 'de Postre'),
(7, 'de Hielo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `contrasena` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contrasena`) VALUES
(1, 'Lerihenny', 'leri@gmail.com', '1234'),
(5, 'Lerihenny', 'lerih@gmail.com', '1234'),
(25, 'Lerihenny', 'lerihe@gmail.com', '1234'),
(33, 'Lerihenny', 'lerihen@gmail.com', '1234'),
(41, 'Lerihenny', 'lerihenn@gmail.com', '1234'),
(63, 'Lerihenny ', 'leri24_03_97@hotmail.com', 'U2FsdGVkX19prmgbgNPwB/sBiW1TOx9vL4i487Fnqto='),
(65, 'header.php', 'leri24_03@hotmail.com', 'U2FsdGVkX19npu+DW4SAiXVTfY4rZvAjeN4cdYGpKL0=');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variedad`
--

CREATE TABLE `variedad` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `variedad`
--

INSERT INTO `variedad` (`id`, `descripcion`) VALUES
(1, 'Cabernet Sauvignon'),
(2, 'Merlot'),
(3, 'Pinot Noir'),
(4, 'Chardonnay'),
(5, 'Sauvignon Blanc'),
(6, 'Riesling'),
(7, 'Syrah (Shiraz)'),
(8, 'Zinfandel'),
(9, 'Malbec'),
(10, 'Gewürztraminer');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vinos`
--

CREATE TABLE `vinos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `tipo` int(11) NOT NULL,
  `variedad` int(11) NOT NULL,
  `year` int(4) NOT NULL,
  `color` varchar(20) NOT NULL,
  `temperatura` varchar(7) DEFAULT NULL,
  `graduacion` float DEFAULT NULL,
  `ph` float DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vinos`
--

INSERT INTO `vinos` (`id`, `nombre`, `tipo`, `variedad`, `year`, `color`, `temperatura`, `graduacion`, `ph`, `observaciones`) VALUES
(9, 'Cabernet Sauvignon', 1, 1, 2018, 'Rojo', '10-12', 13.5, 3.7, '--'),
(10, 'Chardonnay Reserve', 2, 4, 2020, 'Amarillo palido', '12-13', 13, 3.2, '--'),
(11, ' Malbec Reserva', 1, 9, 2017, 'Rojo intenso', '14-16', 14, 3.6, '--'),
(12, 'Sauvignon Blanc', 2, 5, 2019, 'Amarillo claro', '8-10', 12.5, 3.4, '--'),
(13, 'Merlot', 1, 2, 2016, 'Rojo rubí', '16-18', 13.2, 3.8, '--');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tipos`
--
ALTER TABLE `tipos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `variedad`
--
ALTER TABLE `variedad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vinos`
--
ALTER TABLE `vinos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo` (`tipo`),
  ADD KEY `variedad` (`variedad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tipos`
--
ALTER TABLE `tipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `variedad`
--
ALTER TABLE `variedad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `vinos`
--
ALTER TABLE `vinos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `vinos`
--
ALTER TABLE `vinos`
  ADD CONSTRAINT `vinos_ibfk_1` FOREIGN KEY (`tipo`) REFERENCES `tipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vinos_ibfk_2` FOREIGN KEY (`variedad`) REFERENCES `variedad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
