import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js'; // adjust path if needed
import bcrypt from 'bcryptjs';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  await connectDB();

  try {
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);

    const users = [
      {
        username: 'AaravSharma',
        email: 'aarav.sharma@example.com',
        password: await bcrypt.hash('Aarav@123', salt),
        gender: 'Male',
        dob: new Date('1999-04-12'),
        location: 'Mumbai, India',
        tastes: {
          music: ['Bollywood', 'Pop'],
          movies: ['Thriller', 'Drama'],
          food: ['North Indian', 'Paneer'],
          travel: ['Mountains', 'Ladakh'],
          hobbies: ['Photography', 'Cycling'],
          books: ['Mystery', 'Biography'],
          moodHistory: ['Curious', 'Motivated'],
          disliked: ['Fast food'],
        },
        isVerified: true,
        qrCodeId: 'aarav001',
      },
      {
        username: 'IshitaVerma',
        email: 'ishita.verma@example.com',
        password: await bcrypt.hash('Ishita@123', salt),
        gender: 'Female',
        dob: new Date('2001-08-19'),
        location: 'Delhi, India',
        tastes: {
          music: ['Indie', 'Classical'],
          movies: ['Romantic', 'Comedy'],
          food: ['South Indian', 'Sushi'],
          travel: ['Beaches', 'Thailand'],
          hobbies: ['Painting', 'Yoga'],
          books: ['Fiction', 'Romance'],
          moodHistory: ['Peaceful', 'Creative'],
        },
        isVerified: true,
        qrCodeId: 'ishita001',
      },
      {
        username: 'RohitPatel',
        email: 'rohit.patel@example.com',
        password: await bcrypt.hash('Rohit@123', salt),
        gender: 'Male',
        dob: new Date('1998-11-05'),
        location: 'Ahmedabad, India',
        tastes: {
          music: ['Rock', 'EDM'],
          movies: ['Action', 'Sci-fi'],
          food: ['Gujarati', 'Pizza'],
          travel: ['Europe', 'Mountains'],
          hobbies: ['Gaming', 'Tech Blogging'],
          books: ['Tech', 'Thrillers'],
          moodHistory: ['Adventurous'],
        },
        isVerified: false,
        qrCodeId: 'rohit001',
      },
      {
        username: 'NehaSingh',
        email: 'neha.singh@example.com',
        password: await bcrypt.hash('Neha@123', salt),
        gender: 'Female',
        dob: new Date('2002-03-27'),
        location: 'Bangalore, India',
        tastes: {
          music: ['Jazz', 'Lo-fi'],
          movies: ['Drama', 'Art'],
          food: ['Continental', 'Vegan'],
          travel: ['Himalayas', 'Spiti Valley'],
          hobbies: ['Reading', 'Writing Poetry'],
          books: ['Poetry', 'Non-fiction'],
          moodHistory: ['Calm', 'Thoughtful'],
        },
        isVerified: true,
        qrCodeId: 'neha001',
      },
      {
        username: 'SameerKhan',
        email: 'sameer.khan@example.com',
        password: await bcrypt.hash('Sameer@123', salt),
        gender: 'Male',
        dob: new Date('1997-01-14'),
        location: 'Hyderabad, India',
        tastes: {
          music: ['Hip Hop', 'Rap'],
          movies: ['Action', 'Crime'],
          food: ['Biryani', 'Kebabs'],
          travel: ['Dubai', 'Mountains'],
          hobbies: ['Fitness', 'Vlogging'],
          books: ['Self-help', 'Crime'],
          moodHistory: ['Focused', 'Energetic'],
        },
        isVerified: false,
        qrCodeId: 'sameer001',
      },
    ];

    await User.insertMany(users);
    console.log('✅ User seed data inserted successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Error inserting user seed data:', err);
    process.exit(1);
  }
};

seedUsers();
