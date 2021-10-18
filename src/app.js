const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');

const config = require('./config');
const router = require('./routes/router');
const logger = require('./lib/winston/logger');

module.exports = () => {
  const app = express();

  app
    .use(cors())
    .use(express.json())
    .use(compression())
    .use(morgan('dev'))
    .use(helmet())
    .use(router())
    .use((err, req, res, next) => {
      logger.log({ level: err.status ? 'info' : 'error', message: err.message });

      if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res
          .status(400)
          .send({ message: 'El JSON tiene un formato incorrecto', error: 'Bad request' });
      }

      if (!err.fatal) {
        return res.status(err.status || 500).send({
          message: err.message,
          error: err.name !== 'Error' ? err.name : 'Error interno del servidor',
          data: err.errors,
        });
      }

      process.exit(5);
    });

  return new Promise((resolve) => {
    app.listen(config.SERVICE.PORT, () => {
      logger.log({
        level: 'info',
        message: `Servicio corriendo en: ${config.SERVICE.URL}:${config.SERVICE.PORT}`,
      });

      resolve();
    });
  });
};
