
import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {sendFriendRequest,acceptFriendRequest} from '../controllers/FriendsController.js'

const router = express.Router();

router.post('/friend/request', protect, sendFriendRequest);
router.put('/friend/accept/:requestId', protect, acceptFriendRequest);

export default router;