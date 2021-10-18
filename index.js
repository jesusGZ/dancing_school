const server = require('./src/app');
const logger = require('./src/lib/winston/logger');

server().catch((err) => {
  logger.log({
    level: 'error',
    message: err.message,
  });

  process.exit();
});
