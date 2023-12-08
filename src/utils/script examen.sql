CREATE DATABASE examen;

USE examen;


CREATE TABLE usuarios(
	iId INT PRIMARY KEY AUTO_INCREMENT,
    sNombre TEXT NOT NULL,
    sApellido TEXT NOT NULL,
    sCorreo VARCHAR(150) NOT NULL UNIQUE,
    sContrasenia VARCHAR(150) NOT NULL,
    tCreado TIMESTAMP(0) NOT NULL,
    tModificado TIMESTAMP(0) NOT NULL
);


CREATE TABLE autores(
	iIdAutor INT PRIMARY KEY AUTO_INCREMENT,
    sNombreAutor TEXT NOT NULL,
    sPaisOrigen VARCHAR(35) NOT NULL,
    sLenguaNativa TEXT NOT NULL,
    tFechaNacimiento VARCHAR(10) NOT NULL
);


CREATE TABLE libros(
	iIdLibro BIGINT PRIMARY KEY AUTO_INCREMENT,
    fk_iIdAutor INT NOT NULL,
    sNombreLibro VARCHAR(80) NOT NULL UNIQUE,
    iNumeroPaginas INT NOT NULL,
    sCategoria TEXT NOT NULL,
    iCalificacion INT NULL,
    tFechaPublicacion VARCHAR(10) NOT NULL,
    FOREIGN KEY( fk_iIdAutor ) REFERENCES autores( iIdAutor ) ON UPDATE CASCADE ON DELETE CASCADE
);


DELIMITER //
CREATE PROCEDURE CrearUsuario(nombre TEXT, apellido TEXT, correo VARCHAR(150), contrasenia VARCHAR(150))
BEGIN
	INSERT INTO usuarios(sNombre, sApellido, sCorreo, sContrasenia, tCreado, tModificado)
    VALUES( nombre, apellido, correo, contrasenia, Now(), Now());
END //

DELIMITER ;


DELIMITER //
CREATE PROCEDURE LogIn(correo VARCHAR(150))
BEGIN
	SELECT iId, sNombre, sCorreo, sContrasenia
    FROM usuarios
    WHERE sCorreo = correo;
END //

DELIMITER ;


DELIMITER //
CREATE PROCEDURE ObtenerUsuarioPorId(id INT)
BEGIN
	SELECT (sNombre)
    FROM usuarios
    WHERE iId = id;
END //

DELIMITER ;



DELIMITER //
CREATE PROCEDURE EliminarUsuarioPorId(id INT)
BEGIN
	DELETE FROM usuarios
    WHERE iId = id;
END //

DELIMITER ;


DELIMITER //
CREATE PROCEDURE CrearAutor(nombre TEXT, pais Text, lengua TEXT, fecha VARCHAR(10))
BEGIN
	INSERT INTO autores(sNombreAutor, sPaisOrigen, sLenguaNativa, tFechaNacimiento)
    VALUES( nombre, pais, lengua, fecha);
END //

DELIMITER ;



DELIMITER //
CREATE PROCEDURE ObtenerAutorPorId(id INT)
BEGIN
	SELECT iIdAutor, sNombreAutor, sPaisOrigen, sLenguaNativa, tFechaNacimiento
    FROM autores
    WHERE iIdAutor = id;
END //

DELIMITER ;


DELIMITER //
CREATE PROCEDURE EliminarAutorPorId(id INT)
BEGIN
	DELETE FROM autores
    WHERE iIdAutor = id;
END //

DELIMITER ;



DELIMITER //
CREATE PROCEDURE CrearLibro( idAutor INT, nombreLibro TEXT, numeroPaginas INT, categoria TEXT, calificacion INT ,fecha VARCHAR(10))
BEGIN
    INSERT INTO libros( fk_iIdAutor, sNombreLibro, iNumeroPaginas, sCategoria, iCalificacion ,tFechaPublicacion )
    VALUES( idAutor, nombreLibro, numeroPaginas, categoria, calificacion ,fecha );
END //

DELIMITER ;


DELIMITER //
CREATE PROCEDURE ObtenerLibroPorId(id INT)
BEGIN
	SELECT fk_iIdAutor, sNombreLibro, iNumeroPaginas, sCategoria, iCalificacion
    FROM libros
    WHERE iIdLibro = id;
END //

DELIMITER ;



DELIMITER //
CREATE PROCEDURE EliminarLibroPorId(id INT)
BEGIN
	DELETE FROM libros
    WHERE iIdLibro = id;
END //

DELIMITER ;



DELIMITER //
CREATE PROCEDURE ObtenerLibroPorIdAutor(id INT)
BEGIN
	SELECT (fk_iIdAutor, sNombreLibro, iNumeroPaginas, sCategoria, iCalificacionPromedio)
    FROM libros
    WHERE fk_iIdAutor = id;
END //

DELIMITER ;




DELIMITER //
CREATE PROCEDURE ObtenerLibrosPorIdAutor(id INT)
BEGIN
	SELECT fk_iIdAutor, sNombreLibro, iNumeroPaginas, sCategoria, iCalificacion, tFechaPublicacion
    FROM libros
    WHERE fk_iIdAutor = id;
END //

DELIMITER ;



DELIMITER //
CREATE PROCEDURE ObtenerAutoresConConteoPorLibros()
BEGIN
	SELECT A.sNombreAutor, COUNT(L.fk_iIdAutor)
    FROM autores as A
    INNER JOIN
		libros as L
	ON
		A.iIdAutor = fk_iIdAutor;
END //

DELIMITER ;