const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const Package = require('./models/Package');
const Booking = require('./models/Booking');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// API Routes
app.get('/api/status', (req, res) => {
  res.json({ message: 'Welcome to Serendib Travel API', status: 'available' });
});

// Serve frontend static files
const frontendPath = path.join(__dirname, '../public');
app.use(express.static(frontendPath));

// GET all packages
app.get('/api/packages', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single package
app.get('/api/packages/:id', async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new package
app.post('/api/packages', async (req, res) => {
  const pkg = new Package(req.body);
  try {
    const savedPkg = await pkg.save();
    res.status(201).json(savedPkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update package
app.put('/api/packages/:id', async (req, res) => {
  try {
    const updatedPkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPkg) return res.status(404).json({ message: 'Package not found' });
    res.json(updatedPkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE package
app.delete('/api/packages/:id', async (req, res) => {
  try {
    const deletedPkg = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPkg) return res.status(404).json({ message: 'Package not found' });
    res.json({ message: 'Package deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// BOOKING ROUTES

// GET all bookings (Admin)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ submittedAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new booking
app.post('/api/bookings', async (req, res) => {
  const booking = new Booking(req.body);
  try {
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE booking
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH update booking status
app.patch('/api/bookings/:id', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Catch-all route to serve the React app for non-API requests
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
