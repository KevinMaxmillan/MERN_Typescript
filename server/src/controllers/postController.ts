import { Request, Response, NextFunction } from 'express';
import Post from '../models/post';
import asyncHandler from 'express-async-handler';
import { getUserFromToken } from '../middleware/findUser'; 


//create post
export const createPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = await getUserFromToken(req, res, next); 

    const { title, description } = req.body;

    if (!title || !description) {
        throw new Error('All fields are required.');
    }

    const post = await Post.create({
        title,
        description,
        user: userId, 
    });

    res.status(201).json({
        success: true,
        message: 'Post created successfully',
        post,
    });
});


//get all posts
export const getAllPosts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = await getUserFromToken(req, res, next); 

    const posts = await Post.find({ user: userId });

    if (!posts || posts.length === 0) {
        throw new Error('No posts found.');
    }

    res.status(200).json({
        success: true,
        posts,
    });
});

//Delete post
export const deletePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = await getUserFromToken(req, res, next); 
    const { postID } = req.params;

    const post = await Post.findOneAndDelete({ postID: postID, user: userId });

    if (!post) {
        throw new Error('Post not found');
    }

    res.status(200).json({
        success: true,
        message: 'Post deleted successfully!',
    });
});

//Update post
export const updatePost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = await getUserFromToken(req, res, next); 
    const { postID } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        throw new Error('All fields are required.');
    }

    const updatedPost = await Post.findOneAndUpdate(
        { postID: postID, user: userId },
        { title, description },
        { new: true, runValidators: true }
    );

    if (!updatedPost) {
        throw new Error('Post not found or not authorized.');
    }

    res.status(200).json({
        success: true,
        message: 'Post updated successfully!',
        post: updatedPost,
    });
});
