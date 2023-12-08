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
            
            const id = req.params.id;

            connection.query('CALL ObtenerAutorPorId(?)', [
                id
            ], function(err, result) {
                if ( !err ) {
                    var rows = JSON.parse(JSON.stringify(result[0]));
                    data = {
                        id: rows[0].iIdAutor,
                        nombre: rows[0].sNombreAutor,
                        pais: rows[0].sPaisOrigen,
                        fechaNacimiento: rows[0].tFechaNacimiento

                    };
                    return res.status(201).json({
                        success: true,
                        data: data
                    });
                } else {
                    console.log(err);
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
                    return res.status(201).json({
                        success: true,
                        message: `Se eliminó el id ${id} correctamente.`
                    });
                } else {
                   return res.status(404).json({
                        success: false,
                        message: `No se encontró el id ${id}`
                   });
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
            
            const id = req.params.id;

            connection.query('CALL ObtenerLibrosPorIdAutor(?)', [
                id
            ], function(err, result) {

                if ( !err ) {
                    var rows = JSON.parse(JSON.stringify(result[0]));
                    
                    return res.status(201).json({
                        data: rows
                    });
                }

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

            connection.query('CALL ObtenerAutoresConConteoPorLibros()', 
            [],
            function(err, result) {
                if ( !err ) {
                    var rows = JSON.parse(JSON.stringify(result[0]));


                    return res.status(201).json({
                        success: true,
                        data: rows
                    });
                } else {
                    return res.status(404).json({
                        success: false,
                        message: 'No se encontrarón datos.'
                    });
                }
            });
            
        } catch (error) {
            return res.status(501).json({
                success: false,
                message: `Se presentó el siguiente error ${error}`
            });
        }
    }


}