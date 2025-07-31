import User from '../models/User.js';
import Taste from '../models/Taste.js';

export const updateTastes = async (req, res) => {
  try {
    const { music, movies, food, travel, hobbies, books, disliked } = req.body;
    const user = await User.findById(req.user.id);

    user.tastes.music = music || user.tastes.music;
    user.tastes.movies = movies || user.tastes.movies;
    user.tastes.food = food || user.tastes.food;
    user.tastes.travel = travel || user.tastes.travel;
    user.tastes.hobbies = hobbies || user.tastes.hobbies;
    user.tastes.books = books || user.tastes.books;
    user.tastes.disliked = disliked || user.tastes.disliked;

    await user.save();

    res.status(200).json({ message: 'Tastes updated successfully', tastes: user.tastes });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
// controllers/tasteController.js
export const createTaste = async (req, res) => {
  try {
    const { title, description, location, category } = req.body;
    const imageUrl = req.file?.path || ''; // <-- get the Cloudinary URL
    
    const newTaste = new Taste({
      title,
      description,
      location,
      category,
      imageUrl,
      user: req.user._id,
    });

    const savedTaste = await newTaste.save();
    res.status(201).json(savedTaste);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create taste', error: error.message });
  }
};

// Get all tastes
export const getAllTastes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;      // Default to page 1
    const limit = parseInt(req.query.limit) || 10;   // Default to 10 items per page

    const total = await Taste.countDocuments();      // Total number of tastes

    const tastes = await Taste.find()
      .populate('user', 'name email profilePic')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalTastes: total,
      tastes,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tastes', error });
  }
};


// Get single taste by ID
export const getTasteById = async (req, res) => {
  try {
    const taste = await Taste.findById(req.params.id).populate('user', 'name email');
    if (!taste) return res.status(404).json({ message: 'Taste not found' });
    res.status(200).json(taste);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch taste', error });
  }
};

// Delete a taste
export const deleteTaste = async (req, res) => {
  try {
    const taste = await Taste.findById(req.params.id);
    if (!taste) return res.status(404).json({ message: 'Taste not found' });

    if (taste.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await taste.remove();
    res.status(200).json({ message: 'Taste deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete taste', error });
  }
};

export const likeTaste = async (req, res) => {
  try {
    const taste = await Taste.findById(req.params.id);
    if (!taste) return res.status(404).json({ message: "Taste not found" });

    const userId = req.user._id;

    const alreadyLiked = taste.likes.includes(userId);
    if (alreadyLiked) {
      taste.likes.pull(userId); // remove like
    } else {
      taste.likes.push(userId); // add like
    }

    await taste.save();
    res.json({ success: true, likes: taste.likes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// POST /api/taste/:id/comment
export const commentOnTaste = async (req, res) => {
  try {
    const taste = await Taste.findById(req.params.id);
    if (!taste) return res.status(404).json({ message: "Taste not found" });

    const comment = {
      user: req.user._id,
      text: req.body.text,
    };

    taste.comments.push(comment);
    await taste.save();

    res.status(201).json({ success: true, comments: taste.comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all posts by a specific user
export const getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const posts = await Taste.find({ user: userId })
      .populate("user", "name email") // adjust fields as needed
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: posts.length, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
// Get a single post by post ID (e.g., for viewing detailed info)
export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Taste.findById(postId)
      .populate("user", "name email")
      .populate("comments.user", "name");

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Get all posts for main page (with pagination and optional category filter)
export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;      // Current page (default 1)
    const limit = parseInt(req.query.limit) || 10;   // Posts per page (default 10)
    const category = req.query.category;             // Optional category filter

    const query = category ? { category } : {};      // If category exists, filter by it

    const total = await Taste.countDocuments(query);
    const posts = await Taste.find(query)
      .populate("user", "name email")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 })                       // Newest first
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      totalPosts: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};


export const getFriendPosts = async (req, res) => {
  try {
    // 1. Get logged-in user's ID
    const userId = req.user._id;

    // 2. Find the user and get the list of friend IDs
    const user = await User.findById(userId).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friendIds = user.friends.map(friend => friend._id);

    // 3. Fetch all posts by friends
    const friendPosts = await Taste.find({ user: { $in: friendIds } })
      .populate('user', 'username profilePicture') // optional: populate post owner's info
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(friendPosts);
  } catch (error) {
    console.error('Error fetching friends’ posts:', error);
    res.status(500).json({ message: 'Failed to fetch friends’ posts', error });
  }
};
