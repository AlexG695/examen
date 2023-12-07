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
const Mensajes = require('./src/routes/mensajeRoutes');


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
Mensajes(app);



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


module.exports = {
    app: app,
    server: server
}