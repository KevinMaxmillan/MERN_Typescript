import winston from 'winston';
import 'colors';

// Configure winston logger
const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'grey'
  }
};

winston.addColors(logLevels.colors);

// Logger configuration
const logger = winston.createLogger({
  levels: logLevels.levels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(), 
        winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`) 
      ),
      level: 'debug',
    }),

    new winston.transports.File({
      filename: 'logs/application.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() 
      ),
    })
  ]
});


class Logger {
  private static loggerInstance: winston.Logger;

  private constructor() {}

  public static get logger(): winston.Logger {
    if (!Logger.loggerInstance) {
      Logger.loggerInstance = logger;
    }
    return Logger.loggerInstance;
  }
}


export default Logger.logger;