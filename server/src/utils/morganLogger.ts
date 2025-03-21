import morgan from 'morgan';
import Logger from './winstonLogger';

morgan.token('custom', (req) => {
  return `${req.method} ${req.url}`;
});


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
