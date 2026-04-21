const express = require('express');
const router = express.Router();
const { requireDb } = require('../middleware/requireDb');
const adminAuth = require('../middleware/adminAuth');

router.use(requireDb);
const { getSettings, updateSettings } = require('../controllers/settingsController');

router.get('/', getSettings);
router.put('/', adminAuth, updateSettings);

module.exports = router;
