const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true }, // HTML / rich text
  coverImage: { type: String, default: '' },
  tags: [{ type: String }],
  category: { type: String, default: 'Travel Tips' },
  author: { type: String, default: 'Serendib Travel' },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  publishedAt: { type: Date },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  readTime: { type: String, default: '' }
}, { timestamps: true });

// Auto-generate slug from title if not provided
blogSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
