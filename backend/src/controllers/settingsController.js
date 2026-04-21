const asyncHandler = require('express-async-handler');
const SiteSettings = require('../models/siteSettingsModel');

// @desc    Get site settings (singleton)
// @route   GET /api/settings
// @access  Public
const getSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.ensureMainRow();
  res.json(settings);
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Admin
const updateSettings = asyncHandler(async (req, res) => {
  const updated = await SiteSettings.updateMain({ ...req.body, siteId: 'main' });
  res.json(updated);
});

module.exports = { getSettings, updateSettings };
