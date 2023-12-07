const AutorDTO = require('../Dtos/CreateAutorDto');
const connection = require('../config/connection');



module.exports = {


    async CrearAutor(req, res) {
        try {

            const AutorDTO = req.body;

            connection.query('CALL CrearAutor(?,?,?,?)', [
                AutorDTO.nombre,
                AutorDTO.pais,
                AutorDTO.lengua,
                AutorDTO.fechaNacimiento
            ], function(err, result) {
                if( !err ) {
                    console.log(result);
                    return res.status(201).json({
                        success: true,
                        message: 'Autor dado de alta correctamente.'
                    });
                } else {
                    return res.status(501).json({
                        success: false,
                        message: `Se presentó el siguiente error: ${err.message}`
                    })
                }
            });
            
            
        } catch (error) {
            return res.status(501).json({
                success: false,
                message: 'Se presentó un error interno'
            });
        }
    },


    async ObtenerAutorPorId(req, res) {
        try {
            
            const id = req.body.id;

            connection.query('CALL ObtenerAutorPorId(?)', [
                id
            ], function(err, result) {
                if ( !err ) {
                    console.log(result);
                }
            });

        } catch (error) {
            return res.status(501).json({
                success: false,
                message: `Error interno, intente nuevamente ${error}`
            });
        }
    },


    async EliminarAutorPorId(req, res) {
        try {
            
            const id = req.body.id;


            connection.query('CALL EliminarAutorPorId(?)', [
                id
            ], function(err, result) {
                if( !err ) {
                    console.log(result);
                }
            });



        } catch (error) {
            return res.status(501).json({
                success: false,
                message: `Se presentó un error interno ${error}`
            });
        }
    },


    async ObtenerLibrosDeAutorPorId(req, res) {
        try {
            
            const id = req.body.id;

            connection.query('CALL ObtenerLibrosPorIdAutor(?)', [
                id
            ], function(err, result) {

                console.log(result);

            });

        } catch (error) {
            return res.status(501).json({
                success: false,
                message: `Se presentó error interno ${error}`
            });
        }
    },


    async ObtenerAutoresConCantidadDeLibros(req, res) {
        try {
            
        } catch (error) {
            
        }
    }


}