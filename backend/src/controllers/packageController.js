const asyncHandler = require('express-async-handler');
const Package = require('../models/Package');

// @desc    Fetch all packages
// @route   GET /api/packages
// @access  Public
const getPackages = asyncHandler(async (req, res) => {
  const packages = await Package.find();
  res.json(packages);
});

// @desc    Fetch single package
// @route   GET /api/packages/:id
// @access  Public
const getPackageById = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (pkg) {
    res.json(pkg);
  } else {
    res.status(404);
    throw new Error('Package not found');
  }
});

// @desc    Create a package
// @route   POST /api/packages
// @access  Private/Admin
const createPackage = asyncHandler(async (req, res) => {
  const pkg = new Package(req.body);
  const savedPkg = await pkg.save();
  res.status(201).json(savedPkg);
});

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private/Admin
const updatePackage = asyncHandler(async (req, res) => {
  const updatedPkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (updatedPkg) {
    res.json(updatedPkg);
  } else {
    res.status(404);
    throw new Error('Package not found');
  }
});

// @desc    Delete a package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
const deletePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findByIdAndDelete(req.params.id);
  if (pkg) {
    res.json({ message: 'Package removed' });
  } else {
    res.status(404);
    throw new Error('Package not found');
  }
});

module.exports = {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
};
