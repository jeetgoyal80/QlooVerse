import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected'.bgMagenta);
  } catch (error) {
    console.error('❌ MongoDB connection failed:'.bgRed, error.message);
    process.exit(1);
  }
};

export default connectDB;
