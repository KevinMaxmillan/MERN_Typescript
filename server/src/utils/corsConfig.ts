import { CorsOptions } from 'cors';
import allowedOrigins from './allowedOrigins';

const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('❌ Not allowed by CORS'));
        }
    },
    credentials: true, 
    optionsSuccessStatus: 200, 
};

export default corsOptions;
