const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path'); // Import path module for file paths
const sessionMiddleware = require('./api/v1/middlewares/session'); // Import session middleware

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Define the path to your frontend folder
const frontendPath = path.join(__dirname, '../frontend/views');

// Serve static files from the frontend folder
app.use(express.static(frontendPath));

// Database connection
mongoose.connect(process.env.MONGO_CONN)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Session middleware
app.use(sessionMiddleware); // Use session middleware

// Routes
const bookRoutes = require('./api/v1/routes/bookRoutes');
const userRoutes = require('./api/v1/routes/userRoutes');
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/users', userRoutes);

module.exports = app;
