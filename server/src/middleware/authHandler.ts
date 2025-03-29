import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';



interface AuthRequest extends Request {
    user?: JwtPayload | string;
}

export const authMiddleware = asyncHandler((req: AuthRequest, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
        const error = new Error('Unauthorized');
        (error as any).statusCode = 401; 
        return next(error); 
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, (err: jwt.VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err || !decoded) {
            const error = new Error('Invalid or expired token');
            (error as any).statusCode = 403; 
            return next(error); 
        }

        req.user = decoded;
        next(); 
    });
});
