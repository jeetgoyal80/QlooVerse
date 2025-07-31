import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import colors from 'colors'
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`.bgCyan);
});
