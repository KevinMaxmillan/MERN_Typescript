
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { hashPassword, comparePassword } from '../middleware/hashedPasswordHandler';
import User, { IUser } from '../models/user';
import logger from '../utils/winstonLogger';
import { CustomError } from '../hooks/customError';
import { generateAccessToken, generateRefreshToken } from './tokenController';
import jwt from 'jsonwebtoken';


//register user
export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(new CustomError('All fields are required.', 400)); 
    }

    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
        return next(new CustomError('User already exists.', 400)); 
    }

    const hashedPassword: string = await hashPassword(password);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    await newUser.save();

    logger.info(`User registered`);

    res.status(201).json({
        message: 'User registered successfully!',
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        },
    });
});

//login user
export const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new CustomError('Email and password are required.', 400));
    }

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
        return next(new CustomError('Invalid email or password.', 401));
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
        return next(new CustomError('Invalid email or password.', 401));
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        partitioned: true,

    });

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        partitioned: true,

    });

    logger.info(`User logged in`);

    res.status(200).json({
        success: true,
        message: 'Login successful!',
        accessToken,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    });
});


// Logout user
export const logoutUser = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        
        if (!req.cookies?.refreshToken) {
            return next(new CustomError('No active session found.', 400));
        }


        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
        });

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
        });

        logger.info('User logged out successfully.');

        res.status(200).json({
            success: true,
            message: 'Logged out successfully!',
        });
   
});


//get profile
export const getProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { accessToken } = req.cookies;

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as { id: string };

        const user = await User.findById(decoded.id).select('-password -refreshToken');
        
        if (!user) {
            return next(new CustomError('User not found', 404));
        }

        res.status(200).json({
            success: true,
            user,
        });

    
});