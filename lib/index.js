const winston = require('winston')
require('winston-daily-rotate-file')

const winstonLogger = function(workdir) {
    const logFormat = winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(
            info => `${info.timestamp} ${info.level}: ${info.message}`,
       ),
    )

    const dailyRotation = new winston.transports.DailyRotateFile({
        filename: `${workdir}/logs/application-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxFiles: '10d'
    })

    const consoleTransport = new winston.transports.Console({
        level: 'debug',
        timestamp: true,
        format: winston.format.combine(
            winston.format.cli()
        )
    })

    const logger = winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: logFormat,
        transports: [
            dailyRotation,
            consoleTransport
        ],
    })
    return logger
}

module.exports = winstonLogger
