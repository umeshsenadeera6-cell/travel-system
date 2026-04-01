require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Package = require('./models/Package');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
