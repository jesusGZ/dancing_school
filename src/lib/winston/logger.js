const winston = require('winston');
require('winston-daily-rotate-file');
const config = require('../../config');

const logger = winston.createLogger({
  level: 'warn',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%/errors.log',
      datePattern: 'DD-MM-YYYY',
      zippedArchive: true,
      maxFiles: '14d',
      level: 'error',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%/combined.log',
      datePattern: 'DD-MM-YYYY',
      zippedArchive: true,
      maxFiles: '14d',
    }),
  ],
  exceptionHandlers: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%/exceptions.log',
      datePattern: 'DD-MM-YYYY',
      zippedArchive: true,
      maxFiles: '14d',
    }),
  ],
});

if (config.SERVICE.ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'DD/MM/YYYY hh:mm:ss a' }),
        winston.format.json({ space: 2 })
      ),
      level: 'info',
      handleExceptions: true,
    })
  );
}

module.exports = logger;
