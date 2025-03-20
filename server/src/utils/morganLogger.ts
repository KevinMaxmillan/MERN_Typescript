import morgan from 'morgan';
import Logger from './winstonLogger';

// Create a custom token for morgan
morgan.token('custom', (req) => {
  return `${req.method} ${req.url}`;
});

// Setup the HTTP logger with morgan
const morganLogger = morgan(
  ':custom :status :response-time ms - :res[content-length]', {
    stream: {
      write: (message) => {
        Logger.http(message.trim());
      },
    },
  }
);

export default morganLogger;
