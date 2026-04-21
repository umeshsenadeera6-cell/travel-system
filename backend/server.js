const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const dns = require('dns');

// Fix for DNS lookup issues on some environments
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = require('./db');
const app = require('./src/app');

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5001;
// In dev, bind IPv4 only so Vite's proxy (127.0.0.1) cannot hit a different stack on ::1 (common on Windows).
// In production, default to all interfaces unless HOST is set (e.g. HOST=127.0.0.1 behind a reverse proxy).
const HOST =
  process.env.HOST ||
  (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1');

const server = app.listen(PORT, HOST, () => {
  console.log(
    `Serendib Travel API (MySQL) listening on http://${HOST}:${PORT} (${process.env.NODE_ENV || 'development'})`
  );
  if (process.env.NODE_ENV !== 'production') {
    console.log('[api] Admin cover upload: POST /api/packages/upload-cover');
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
