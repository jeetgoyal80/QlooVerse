import express from 'express';
import { updateTastes,
  createTaste,
  getAllTastes,
  getTasteById,
  deleteTaste, likeTaste,commentOnTaste,getPostsByUser,getPostById,
  getFriendPosts} from '../controllers/tasteController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/cloudinaryStorage.js';

const router = express.Router();

router.put('/update', protect, updateTastes);
router.get('/', getAllTastes);
router.get('/friends-posts', protect, getFriendPosts);
router.get('/:id', getTasteById);

// Protected Routes

router.post('/', protect, upload.single('image'), createTaste);
router.delete('/:id', protect, deleteTaste);


router.post('/taste/:id/like', protect, likeTaste);
router.post('/taste/:id/comment', protect, commentOnTaste);


router.get("/user/:userId", getPostsByUser);      // All posts by user
               


export default router;
