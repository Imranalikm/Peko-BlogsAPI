import express from 'express';
import {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articleController.js';
import auth from '../middleware/auth.js';
import verifyClientIdentifier from '../middleware/verifyClientIdentifier.js';

const router = express.Router();

router.post('/', auth, createArticle);
router.get('/', verifyClientIdentifier,getArticles);
router.get('/:id',verifyClientIdentifier, getArticle);
router.put('/:id', auth, updateArticle);
router.delete('/:id', auth, deleteArticle);

export default router;
