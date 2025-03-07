const winston = require('winston')
const winstonDaily = require('winston-daily-rotate-file')
const process = require('process')

const { combine, timestamp, label, printf } = winston.format

const logDir = `${process.cwd()}/logs`

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${label}] ${level.toUpperCase()}: ${message}`
})

const logger = winston.createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    label({ label: 'y-websocket' }),
    logFormat,
  ),
  transports: [
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 7,
      zippedArchive: true,
    }),
  ],
  exceptionHandlers: [
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.exception.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  )
}

module.exports = logger
