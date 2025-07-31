import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Optional profile fields
    bio: { type: String, default: '' },
    profilePic: { type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP1kYOtcmiYvasfXPPOYgbn7Z5nx2EOPDMJg&s' }, // URL or Cloudinary link
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
    dob: { type: Date },  // date of birth
    location: { type: String, default: '' },

    // Social features
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    qrCodeId: { type: String, unique: true },
    post :[{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Taste',
        
      
    }] ,// used for profile discovery

    // Taste preferences
    tastes: {
        music: { type: [String], default: [] },   // Genres, artists
        movies: { type: [String], default: [] },   // Genres, directors
        food: { type: [String], default: [] },   // Sushi, spicy, veg, etc.
        travel: { type: [String], default: [] },   // Japan, beaches, mountains
        hobbies: { type: [String], default: [] },   // Reading, gaming, painting
        books: { type: [String], default: [] },   // Fiction, sci-fi, etc.
        moodHistory: { type: [String], default: [] },   // Mood-based logging
        disliked: { type: [String], default: [] },   // Optional dislikes
    },

    // Admin and status
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Pre-save: hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare entered password with hash
userSchema.methods.matchPassword = async function (entered) {
    return bcrypt.compare(entered, this.password);
};

export default mongoose.model('User', userSchema);
