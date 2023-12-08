const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
require('dotenv').config({path: 'values.env'})







/**
 * LLAMANDO A LAS RUTAS
 */


const Usuario = require('./src/routes/usuariosRoutes');
const Autor = require('./src/routes/autoresRoutes');
const Libro = require('./src/routes/librosRoutes');


/**
 * CONFIGURACIÓN DEL SERVIDOR
 */


const port = process.env.PORT;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./src/config/passport')(passport);
app.use(helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false
}));


app.disable('x-powered-by');

app.set('port', port);



/**
 * LLAMANDO A LAS RUTAS CON SU PROPIEDAD DE APP
 * 
 */


Usuario(app);
Autor(app);
Libro(app)



/**
 * ESUCHA DEL SERVIDOR
 */

server.listen(port, function() {
    console.log('Escuchando en puerto: '+port)
});



//ERROR HANDLER

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack)
});

app.get('/',  (req, res) => {
    res.send('¡Hola¡ Esta es la página de inicio.');
});

app.get('/about',  (req, res) => {
    res.send("Bienvenido a la página 'Acerca de nosotros'");
});

app.get('/contact',  (req, res) => {
    res.send('Ponte en contacto con nosotros en contact@example.com');
});


module.exports = {
    app: app,
    server: server
}