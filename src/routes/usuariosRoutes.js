const UsuariosController = require('../controllers/usuarioController');
const passport = require('passport');


module.exports = (app) => {
    

    app.post('/v1/api/usuario', UsuariosController.crearUsuario);

    app.post('/v1/api/usuario/auth', UsuariosController.LogIn);

    app.get('/v1/api/usuario/:id', passport.authenticate('jwt', {session: false}), UsuariosController.EncontrarUsuarioPorId);


    app.delete('/v1/api/usuario/delete', passport.authenticate('jwt', {session: false}), UsuariosController.EliminarUsuario);
}