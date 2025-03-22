import { Router } from 'express';
import { registerUser, loginUser,logoutUser, getProfile } from '../controllers/authController';
import { refreshToken } from '../controllers/tokenController';
import { authMiddleware } from '../middleware/authHandler';
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get("/profile", authMiddleware, getProfile);
router.get('/refresh', refreshToken);

export default router;
