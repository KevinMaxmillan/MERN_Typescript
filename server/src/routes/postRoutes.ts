import express from 'express';
import { createPost,  getAllPosts, deletePost, updatePost, } from '../controllers/postController';
import { authMiddleware } from '../middleware/authHandler';
const router = express.Router();

router.post('/create/post', authMiddleware, createPost);
router.get('/posts', authMiddleware, getAllPosts);
router.delete('/delete/post/:postID', authMiddleware, deletePost);
router.put('/update/post/:postID', authMiddleware, updatePost);

export default router;