import express from 'express';
import { createPost,  getAllPosts, deletePost, updatePost, } from '../controllers/postController';

const router = express.Router();

router.post('/create/post', createPost);
router.get('/posts', getAllPosts);
router.delete('/delete/post/:postID', deletePost);
router.put('/update/post/:postID', updatePost);

export default router;