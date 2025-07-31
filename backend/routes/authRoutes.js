import express from 'express';
import { registerUser, loginUser, getCurrentUser, updateProfile } from '../controllers/AuthController.js';
import {protect}from '../middlewares/authMiddleware.js'
import upload from '../middlewares/cloudinaryStorage.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login',    loginUser);
router.get("/me", protect, getCurrentUser);
router.put('/profile', upload.single("profilePic"),protect, updateProfile); 

export default router;
