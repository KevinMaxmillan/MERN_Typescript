import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { CustomError } from '../hooks/customError';


interface AuthRequest extends Request {
    user?: JwtPayload | string;
}

export const authMiddleware = asyncHandler((req: AuthRequest, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
        return next(new CustomError('Unauthorized', 401)); 
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, (err: jwt.VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err || !decoded) {
            return next(new CustomError('Invalid or expired token', 403)); 
        }

        req.user = decoded;
        next(); 
    });
});
