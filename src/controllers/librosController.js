const CreateLibroDTO = require('../Dtos/CreateLibroDto');
const connection = require('../config/connection');



module.exports = {



    async CrearLibro(req, res) {
        try {

            CreateLibroDTO = req.body;

            connection.query('CALL CrearLibro(?, ?, ?, ?, ?)', [
                CreateLibroDTO.idAutor,
                CreateLibroDTO.nombre,
                CreateLibroDTO.numeroPaginas,
                CreateLibroDTO.categoria,
                CreateLibroDTO.fechaPublicacion
            ], function(err, result) {
                if ( !err ) {
                    console.log(result);
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

            const id = req.body.id;

            connection.query('CALL ObtenerLibroPorId(?)', [
                id
            ], function(err, result) {
                if ( !err ) {
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


    async EliminarLibroPorId(req, res) {
        try {

            const id = req.body.id;

            connection.query('CALL EliminarLibroPorId(?)', [
                id
            ], function(err, result) {
                if ( !err ) {
                    console.log(result);
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