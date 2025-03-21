import { CorsOptions } from "cors";
import allowedOrigins from "./allowedOrigins";

const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin || true); 
        } else {
            callback(new Error("❌ Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
