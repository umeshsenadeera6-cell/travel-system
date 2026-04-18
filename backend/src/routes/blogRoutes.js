const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  getBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

// Public routes
router.get('/', getBlogs);
router.get('/id/:id', adminAuth, getBlogById); // Admin: get by ID for editing
router.get('/:slug', getBlogBySlug);

// Admin-protected routes
router.post('/', adminAuth, createBlog);
router.put('/:id', adminAuth, updateBlog);
router.delete('/:id', adminAuth, deleteBlog);

module.exports = router;
