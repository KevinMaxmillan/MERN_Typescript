import { Request, Response, NextFunction } from 'express';
import logger from '../utils/winstonLogger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = (err as any).statusCode || 500;
    const message = err.message || 'Internal Server Error';

    if (statusCode >= 500) {
        logger.error(`Internal Server Error: ${message}`);
    } else if (statusCode >= 400) {
        logger.warn(`Client Error: ${statusCode} - ${message}`);
    } else if (statusCode >= 300) {
        logger.info(`Redirection Error: ${statusCode} - ${message}`);
    } else {
        logger.debug(`Unhandled Error: ${statusCode} - ${message}`);
    }

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
    });
};

export default errorHandler;
