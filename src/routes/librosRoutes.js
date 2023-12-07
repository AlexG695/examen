const LibrosController = require('../controllers/librosController');
const passport = require('passport');


module.exports = (app) => {
    
    app.post('/v1/api/libros/save', passport.authenticate('jwt', {session: false}), LibrosController.CrearLibro);


    app.get('/v1/api/libros/:id', passport.authenticate('jwt', {session: false}), LibrosController.ObtenerLibroPorId);


    app.delete('/v1/api/libros/delete/:id', passport.authenticate('jwt', {session: false}), LibrosController.EliminarLibroPorId);
}