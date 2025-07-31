import express from 'express';
import { handleRecommendation, updateDescription } from '../controllers/recommendationController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/recommend/query
// Body: { query: "I'm craving something spicy and veg near Indore." }
router.post('/query', protect, handleRecommendation);
router.post("/improve", updateDescription);

export default router;
