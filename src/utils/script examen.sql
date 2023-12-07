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
    iCalificacionPromedio INT DEFAULT 0,
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

SELECT * FROM usuarios


