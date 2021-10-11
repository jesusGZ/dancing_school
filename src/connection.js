// Conexion a mongoDB
require('events').EventEmitter.defaultMaxListeners = 28

const mongoose = require("mongoose");

class conexion{

   connect(config) {

    mongoose.connect(`mongodb://${config.db_host}:${config.db_port}/${config.db}?authSource=admin`, {
      user: `${config.user}`, pass: `${config.pass}`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, '[Error de conexion a mongo]: ')); 
    
    db.once('open', () => {
    //console.log('[db] Conectada con éxito');
    });
  
  /*   mongoose.connection.on('disconnected', function () {
      console.log('Mongoose desconectado');
    });  */
  
    // Evento para cuando node deje de funcionar.
    process.on('SIGINT', function () {
      mongoose.connection.close(function () {
        console.log('Conexión finalizada.');
        process.exit(0);
      });
    });

    return db;
  }
}

module.exports = conexion;