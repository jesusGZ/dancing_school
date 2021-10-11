require('events').EventEmitter.defaultMaxListeners = 28

const methods = require('./src/middleware/http')
const CONFIG = require("./src/config/index")
const swaggerDoc = require('./document/swagger.json')

const express = require('express')
const swaggerUi = require('swagger-ui-express')
const http = require('http')
const https = require('https')
const fs = require('fs')
const morgan = require('morgan')

const app = express()
const token = express.Router()
let config = new CONFIG()

app.use(methods)
app.use('/DS-dc4P1$-vl', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
app.use(morgan('dev'))
app.use(express.json({limit: '500kb', extended: true}))
app.use(express.urlencoded({limit: '500kb', extended: true}))

/* const options = {
   cert: fs.readFileSync('ssl/'),
   key: fs.readFileSync('ssl/'),
   ca: fs.readFileSync('ssl/')
} */

require('./src/auth/index')(token)
require('./src/routes/route.index')(app, token)
require('./src/routes/default/index')(app)

http.createServer(/* options, */ app).listen( config.service().local_port, () =>{
   console.log('[HTTP] El servicio corre en el puerto:' + config.service().local_port)
}); 

/* https.createServer(options, app).listen( config.service().port, () =>{
   console.log('[HTTPS] El servicio corre en el puerto:' + config.service().port)
}); */