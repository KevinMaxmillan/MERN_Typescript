import express, { Request, Response } from 'express';
import 'dotenv/config';
import morganLogger from './utils/morganLogger';
import Logger from './utils/winstonLogger';
import connectDB from './utils/db';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import corsOptions from './utils/corsConfig';
import errorHandler from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import { authMiddleware } from './middleware/authHandler';


connectDB();


const app = express();


//middlewares
app.use(cors(corsOptions));
app.use(morganLogger);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/', authRoutes);
app.use('/',authMiddleware, postRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 8000;
app.listen(PORT, (): void => {
    Logger.info(`Server is running on port ${PORT}`);
});
