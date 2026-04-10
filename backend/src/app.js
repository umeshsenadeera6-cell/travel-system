const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development to allow React/Vite connections if serving as static
}));
app.use(cors({
  origin: [
    /\.vercel\.app$/,          // Allow all Vercel preview/production URLs
    'http://localhost:5173',    // Vite dev server
    'http://localhost:3000',
  ],
  credentials: true,
}));

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body Parsing
app.use(express.json());

// Main API Status Route
app.get('/api/status', (req, res) => {
  res.json({ message: 'Welcome to Serendib Travel API', status: 'available' });
});

// Modular Routes
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Serve frontend static files
const frontendPath = path.join(__dirname, '../../public');
app.use(express.static(frontendPath));

// Catch-all route to serve the React app for non-API requests
app.get('(.*)', (req, res, next) => {
  if (req.url.startsWith('/api')) return next();
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
