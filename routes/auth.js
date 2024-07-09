import express from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import auth from '../middleware/auth.js';
import verifyClientIdentifier from '../middleware/verifyClientIdentifier.js';

const router = express.Router();

router.post('/register',verifyClientIdentifier, register);
router.post('/login', verifyClientIdentifier,login); 
router.get('/get-profile', auth, getProfile);

export default router;
