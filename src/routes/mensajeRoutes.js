const MensajeController = require('../controllers/mensajeController');


module.exports = (app) => {


    app.get('/', MensajeController.hello);

    app.get('/contact', MensajeController.contact);

    app.get('/about', MensajeController.about);
}