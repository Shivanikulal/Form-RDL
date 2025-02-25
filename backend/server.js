const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
