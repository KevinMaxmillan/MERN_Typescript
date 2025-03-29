import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/winstonLogger';

// Generate Access Token
export const generateAccessToken = (user: IUser): string => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '15s' }
    );
};

// Generate Refresh Token
export const generateRefreshToken = (user: IUser): string => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '10m' }
    );
};

// Refresh Token Handler
export const refreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        throw new Error('Refresh token missing');
    }

   
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;

        if (!decoded.id) {
            throw new Error('Invalid token payload');
        }

     
        const user: IUser | null = await User.findById(decoded.id);
        if (!user) {
            throw new Error('user not found');
        }

        const newAccessToken = generateAccessToken(user);


        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            partitioned: true,

        });

        logger.info('New access token generated');

        res.status(200).json({
            success: true,
            message: 'Token refreshed',
            accessToken: newAccessToken,
        });
    
});
