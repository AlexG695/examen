const CreateLibroDTO = require('../Dtos/CreateLibroDto');
const connection = require('../config/connection');



module.exports = {



    async CrearLibro(req, res) {
        try {

            const CreateLibroDTO = req.body;

            connection.query('CALL CrearLibro(?, ?, ?, ?, ?, ?)', [
                CreateLibroDTO.idAutor,
                CreateLibroDTO.nombre,
                CreateLibroDTO.numeroPaginas,
                CreateLibroDTO.categoria,
                CreateLibroDTO.calificacion,
                CreateLibroDTO.fechaPublicacion
            ], function(err, result) {
                if ( !err ) {
                    return res.status(201).json({
                        success: true,
                        message: 'Libro creado exitosamente.'
                    });
                } else {
                    return res.status(501).json({
                        success: false,
                        message: `Se presentó el siguiente error ${err}`
                    });
                }

            });
            
        } catch (error) {
            return res.status(501).json({
                success: false,
                message: `Se presentó un error interno ${error}`
            })
        }
    },


    async ObtenerLibroPorId(req, res) {
        try {

            const id = req.params.id;

            connection.query('CALL ObtenerLibroPorId(?)', [
                id
            ], function(err, result) {
                if ( !err ) {
                    var rows = JSON.parse(JSON.stringify(result[0]));
                    data = {
                        nombreLibro: rows[0].sNombreLibro,
                        numeroPaginas: rows[0].iNumeroPaginas,
                        categoria: rows[0].sCategoria,
                        calificacion: rows[0].iCalificacion
                    };

                    return res.status(201).json({
                        success: true,
                        data: data
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


    async EliminarLibroPorId(req, res) {
        try {

            const id = req.body.id;

            connection.query('CALL EliminarLibroPorId(?)', [
                id
            ], function(err, result) {
                if ( !err ) {
                    return res.status(201).json({
                        success: true,
                        message: `Se eliminó el libro con id ${id} correctamente`
                    });
                } else {
                    return res.status(404).json({
                        success: false,
                        message: 'No se encontró el id'
                    });
                }
            });
            
        } catch (error) {
            return res.status(501).json({
                success: false,
                message: `Se presentó un error interno ${error}`
            });
        }
    }
}