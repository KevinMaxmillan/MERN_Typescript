import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import { CustomError } from '../hooks/customError';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/winstonLogger';

// Generate Access Token
export const generateAccessToken = (user: IUser): string => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '1m' }
    );
};

// Generate Refresh Token
export const generateRefreshToken = (user: IUser): string => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '1d' }
    );
};

// Refresh Token Handler
export const refreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return next(new CustomError('Refresh token missing', 401));
    }

   
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;

        if (!decoded.id) {
            return next(new CustomError('Invalid token payload', 403));
        }

     
        const user: IUser | null = await User.findById(decoded.id);
        if (!user) {
            return next(new CustomError('User not found', 404));
        }

        const newAccessToken = generateAccessToken(user);


        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        logger.info('New access token generated');

        res.status(200).json({
            success: true,
            message: 'Token refreshed',
            accessToken: newAccessToken,
        });
    
});
