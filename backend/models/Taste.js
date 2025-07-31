import mongoose from 'mongoose';

const tasteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  imageUrl: {
    type: String, // store public image URL or path
    default: '',
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],

  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, {
  timestamps: true
});

const Taste = mongoose.model('Taste', tasteSchema);

export default Taste;
