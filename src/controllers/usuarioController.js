const connection = require('../config/connection');
const UsuarioDTO = require('../Dtos/CreateUserDto');
const Encription = require('../utils/encryption_data');
const LoginDTO = require('../Dtos/LogInDto');
const JWT = require('../utils/JWT');
const ComparePass = require('../utils/ComparePass');

module.exports = {


    async EncontrarUsuarioPorId(req, res) {
        try {
            
            const id = req.params.id;

            connection.query('CALL ObtenerUsuarioPorId(?)', [
                id
            ], function(err, result) {
                if ( !err ) {
                    var rows = JSON.parse(JSON.stringify(result[0]));

                    return res.status(201).json({
                        success: true,
                        message: `El usuario obtenido es: ${rows[0].sNombre}`
                    });
                    
                } else {
                    return res.status(404).json({
                        success: false,
                        message: `No se encontró un usuario con el id ${id}`
                    })
                }
            });

        } catch (error) {
            
        }
    },


    async crearUsuario(req, res) {
        try {
            
            const UsuarioDTO = req.body;

            UsuarioDTO.correo = Encription.encryptString( UsuarioDTO.correo );

            UsuarioDTO.contrasenia = Encription.encryptString( UsuarioDTO.contrasenia );

            connection.query('CALL CrearUsuario(?, ?, ?, ?)', [
                UsuarioDTO.nombre,
                UsuarioDTO.apellido,
                UsuarioDTO.correo,
                UsuarioDTO.contrasenia
            ], function(err, result) {
                if ( !err ) {
                    console.log(result);
                    return res.status(201).json({
                        success: true,
                        message: 'Usuario creado correctamente, por favor inicie sesión.',
                        id: result.insertId
                    });
                }
                if ( err.code === 'ER_DUP_ENTRY' ) {
                    return res.status(501).json({
                        success: false,
                        message: 'Este correo ya está en uso.'
                    });
                } 

            });

            
        } catch (error) {
            return res.status(501).json({
                success: false,
                message: `Se presentó un error, intentelo nuevamente ${error}` 
            });
        }
    },


    async LogIn(req, res) {
        try {
            
            const LoginDTO = req.body;

            var mail = Encription.encryptString( LoginDTO.correo );

            connection.query('CALL LogIn(?)', [
                mail
            ], function(err, result) {
                if ( result ) {
                    var rows = JSON.parse(JSON.stringify(result[0]));

                    if( ComparePass.PasswordMatch( LoginDTO.contrasenia, rows[0].sContrasenia )){

                        const token = JWT.generateToken( rows[0].iId, rows[0].sNombre );


                        return res.status(201).json({
                            success: true,
                            message: `Bienvenido ${rows[0].sNombre}`,
                            token: `JWT ${token}`
                        });
                    }

                } else {
                    return res.status(401).json({
                        success: false,
                        message: 'Correo no dado de alta.'
                    });
                }


            });


        } catch (error) {
            
        }
    },

    async EliminarUsuario(req, res) {
        try {
            
            const idUser = req.body.id;

            connection.query('CALL EliminarUsuarioPorId(?)', [
                idUser
            ], function(err, result) {
                if ( !err ) {
                    return res.status(201).json({
                        success: true,
                        message: `Se eliminó corectamente el usuario con id ${idUser}`
                    })
                }
            });

        } catch (error) {
            
        }
    }


}