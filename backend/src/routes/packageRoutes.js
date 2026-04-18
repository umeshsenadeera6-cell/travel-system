const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
} = require('../controllers/packageController');

// Public
router.get('/', getPackages);
router.get('/:id', getPackageById);

// Admin only
router.post('/', adminAuth, createPackage);
router.put('/:id', adminAuth, updatePackage);
router.delete('/:id', adminAuth, deletePackage);

module.exports = router;
