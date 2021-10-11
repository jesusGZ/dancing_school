require('events').EventEmitter.defaultMaxListeners = 28

const express = require('express');
const app = express();

const methods = require('./src/middleware/http')
const http = require('http');
const https = require('https');
const fs = require('fs');

//variables de entorno
const CONFIG = require("./src/config/index");
let config = new CONFIG();
app.use(methods)

/* const options = {
   cert: fs.readFileSync('ssl/'),
   key: fs.readFileSync('ssl/'),
   ca: fs.readFileSync('ssl/')
} */

const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./document/swagger.json')
app.use('/DS-dc4P1$-vl', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Incorporacion e inicializacion de morgan.
const morgan = require('morgan');
app.use(morgan('dev'));

// Incorporacion e inicializacion de body-parcer.
app.use(express.json({limit: '500kb', extended: true}));
app.use(express.urlencoded({limit: '500kb', extended: true}));

const token = express.Router();
require('./src/routes/auth/auth.index')(token);
require('./src/routes/route.index')(app, token);
require('./src/routes/default/index')(app);

// inicializacion del servidor
http.createServer(options, app).listen( config.service().local_port, () =>{
   console.log('[HTTP] El servidor esta escuchando en el puerto:' + config.service().local_port); 
}); 

https.createServer(options, app).listen( config.service().port, () =>{
   console.log('[HTTPS] El servidor esta escuchando en el puerto:' + config.service().port); 
});