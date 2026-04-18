const asyncHandler = require('express-async-handler');
const SiteSettings = require('../models/SiteSettings');

// @desc    Get site settings (singleton)
// @route   GET /api/settings
// @access  Public
const getSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne({ siteId: 'main' });
  if (!settings) {
    // Create with defaults on first access
    settings = await SiteSettings.create({ siteId: 'main' });
  }
  res.json(settings);
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Admin
const updateSettings = asyncHandler(async (req, res) => {
  // Always upsert the single 'main' document
  const updated = await SiteSettings.findOneAndUpdate(
    { siteId: 'main' },
    { ...req.body, siteId: 'main' },
    { new: true, upsert: true, runValidators: true }
  );
  res.json(updated);
});

module.exports = { getSettings, updateSettings };
