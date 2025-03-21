import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { CustomError } from '../hooks/customError';
import asyncHandler from 'express-async-handler';

export const getUserFromToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as { id: string };
    
    const user = await User.findById(decoded.id);
    if (!user) {
        throw new CustomError('User not found', 404);
    }

    return user.id;
});
