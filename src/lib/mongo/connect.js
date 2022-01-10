require('events').EventEmitter.defaultMaxListeners = 38;
const mongoose = require('mongoose');
const config = require('../../config');

mongoose.connect(
  `mongodb://${config.DB.HOST}:${config.DB.PORT}/${config.DB.DATABASE_NAME}?authSource=admin`,
  {
    user: `${config.DB.USER}`,
    pass: `${config.DB.PASSWORD}`,
    maxPoolSize: 10,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, '[Error de conexion a mongo] : '));
db.once('open', () => {
  // console.log('[db] Conectada con éxito');
});

// Catch disconnection event
/* mongoose.connection.on('disconnected', function () {
  console.log('Mongoose desconectado');
}); */

// Evento para cuando node deje de funcionar.
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Conexión finalizada.');
    process.exit(0);
  });
});

module.exports = db;
