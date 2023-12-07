const UsuariosController = require('../controllers/usuarioController');


module.exports = (app) => {
    

    app.post('/v1/api/usuario', UsuariosController.crearUsuario);

    app.post('/v1/api/usuario/auth', UsuariosController.LogIn);
}