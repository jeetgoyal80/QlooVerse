// authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import Taste from '../models/Taste.js'
// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  const { username, email, password, tastes, age, gender, occupation, location, interests } = req.body;

  try {
    // Check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password, // hashed via pre-save hook
      tastes: tastes || {},
      age,
      gender,
      occupation,
      location,
      interests,
    });

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        tastes: user.tastes,
        age: user.age,
        gender: user.gender,
        occupation: user.occupation,
        location: user.location,
        interests: user.interests,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) {
      res.json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          tastes: user.tastes,
          age: user.age,
          gender: user.gender,
          occupation: user.occupation,
          location: user.location,
          interests: user.interests,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
; // your post model

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Fetch all posts made by this user and populate comments and likes if needed
    const posts = await Taste.find({ user: userId })
      .populate('user', 'name username avatar tastes') // Only selected fields from user
      .populate('comments.user', 'name username avatar') // Populate comment users
      .sort({ createdAt: -1 }); // optional: latest first

    res.json({ user, posts });

  } catch (error) {
    console.error("Error in /me:", error);
    res.status(500).json({ message: "Server error." });
  }
};



// @desc    Update user profile (excluding email and password)
// @route   PUT /api/users/profile
// @access  Private (requires authentication middleware)


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      username,
      bio,
      gender,
      dob,
      location,
      tastes,
    } = req.body;

    const updatedFields = {
      username,
      bio,
      gender,
      dob,
      location,
      tastes,
    };

    // If a file was uploaded, get the Cloudinary URL
    if (req.file && req.file.path) {
      updatedFields.profilePic = req.file.path; // Cloudinary gives direct URL in `.path`
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true }
    ).select('-password');

    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    console.error('Profile update failed:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
