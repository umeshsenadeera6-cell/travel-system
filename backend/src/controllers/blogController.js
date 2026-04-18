const asyncHandler = require('express-async-handler');
const Blog = require('../models/Blog');

// @desc    Get all published blogs (public) or all blogs (admin with ?all=true)
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { status: 'published' };
  const blogs = await Blog.find(filter).sort({ publishedAt: -1, createdAt: -1 });
  res.json(blogs);
});

// @desc    Get a single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Get a single blog by ID (for admin editing)
// @route   GET /api/blogs/id/:id
// @access  Admin
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Admin
const createBlog = asyncHandler(async (req, res) => {
  const blog = new Blog(req.body);
  const saved = await blog.save();
  res.status(201).json(saved);
});

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Admin
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  // If status is changing to published and no publishedAt, set it now
  if (req.body.status === 'published' && !blog.publishedAt) {
    req.body.publishedAt = new Date();
  }

  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.json(updated);
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (blog) {
    res.json({ message: 'Blog post removed' });
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

module.exports = {
  getBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
