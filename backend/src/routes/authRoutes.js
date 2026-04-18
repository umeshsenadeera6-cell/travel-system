const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// @desc   Admin login — validates ADMIN_SECRET, returns JWT
// @route  POST /api/auth/login
// @access Public
router.post('/login', (req, res) => {
  const { password } = req.body;

  if (!password || password !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token, message: 'Login successful' });
});

module.exports = router;
