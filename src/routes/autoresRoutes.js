const AutoresController = require('../controllers/autoresController');
const passport = require('passport');

module.exports = (app) => {


    app.post('/v1/api/autores/save', passport.authenticate('jwt', {session: false}), AutoresController.CrearAutor);

    
    app.get('v1/api/autores/:id', passport.authenticate('jwt', {session: false}), AutoresController.ObtenerAutorPorId);

    app.get('v1/api/autores/contarLibros', passport.authenticate('jwt', {session: false}), AutoresController.ObtenerAutoresConCantidadDeLibros);

    app.get('/v1/api/autores/libros/:id', passport.authenticate('jwt', {session: false}), AutoresController.ObtenerLibrosDeAutorPorId);


    app.delete('v1/api/autores/delete', passport.authenticate('jwt', {session: false}), AutoresController.EliminarAutorPorId);
}