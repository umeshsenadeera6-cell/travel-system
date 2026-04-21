const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { getPool } = require('../db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    try {
      const { hostname } = new URL(origin);
      if (hostname.endsWith('.vercel.app')) return callback(null, true);
      // Allow custom production domains via env (comma-separated full origins).
      // Example: CORS_ORIGINS=https://travel.example.com,https://www.travel.example.com
      const envList = (process.env.CORS_ORIGINS || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      if (envList.includes(origin)) return callback(null, true);
      if (
        process.env.NODE_ENV !== 'production' &&
        (hostname === 'localhost' || hostname === '127.0.0.1')
      ) {
        return callback(null, true);
      }
    } catch {
      return callback(null, false);
    }
    const allow = ['http://localhost:5173', 'http://localhost:3000'];
    if (allow.includes(origin)) return callback(null, true);
    callback(null, false);
  },
  credentials: true,
}));

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body Parsing
app.use(express.json({ limit: '10mb' }));

// Main API status — clients use `api` to confirm they reached this MySQL backend (not another app on the same port).
app.get('/api/status', (req, res) => {
  res.json({
    message: 'Welcome to Serendib Travel API',
    status: 'available',
    api: 'serendib-travel-mysql',
    mysqlDatabase: process.env.MYSQL_DATABASE || null,
    mysqlPoolReady: Boolean(getPool()),
  });
});

// Uploaded images (admin); ensure folder exists at runtime
const uploadsDir = path.join(__dirname, '../uploads');
try {
  fs.mkdirSync(uploadsDir, { recursive: true });
} catch {
  /* ignore */
}
app.use('/uploads', express.static(uploadsDir));

// Modular Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Package cover upload — registered on the app (not only inside the packages router) so
// POST /api/packages/upload-cover always resolves even if nested router matching differs by Express version.
const adminAuth = require('./middleware/adminAuth');
const { runUpload: packageCoverRunUpload, finish: packageCoverFinish } = require('./middleware/packageCoverUpload');
app.post('/api/packages/upload-cover', adminAuth, packageCoverRunUpload, packageCoverFinish);

app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// Serve frontend static files
const frontendPath = path.join(__dirname, '../../public');
app.use(express.static(frontendPath));

// Catch-all route to serve the React app for non-API requests
app.get('*splat', (req, res, next) => {
  if (req.url.startsWith('/api') || req.url.startsWith('/uploads')) return next();
  res.sendFile(path.join(frontendPath, 'index.html'));
});


// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
