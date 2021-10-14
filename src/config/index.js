// se requiere dotenv para darle un valor a las variables de entorno mediante el .env
require('dotenv').config()

class Config{

  service(){
      return{
        local_port: process.env.LOCAL_PORT,
        local_host: process.env.LOCAL_HOST,
        port: process.env.PORT,
        host: process.env.HOST,
      }
  }

  mongo(){
      return {
        db_host: process.env.DB_HOST,
        db_port: process.env.DB_PORT,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        db: process.env.DB_NAME,
      }
  }

  jwtExpiration() {
    return {
        USER: process.env.JWT_EXPIRATION_USER,
    };
  }

  key(){
        return process.env.KEY;
  }

  mCryptKey() {
    return process.env.KEY
  }
}

module.exports = Config