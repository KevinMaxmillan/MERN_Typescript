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



connectDB();


const app = express();


//middlewares
app.use(morganLogger);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));


app.use('/', authRoutes);


app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, (): void => {
    Logger.info(`Server is running on port ${PORT}`);
});
