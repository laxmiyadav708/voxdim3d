const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const { files, readJson, writeJson, createId, nowIso } = require('../lib/store');
const { protect } = require('../middleware/auth');

const JWT_SECRET  = process.env.JWT_SECRET  || 'voxdim_secret_key';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

// ── POST /api/auth/register ──────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const users = await readJson(files.users);

    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = {
      id:        createId(),
      name:      name.trim(),
      email:     email.toLowerCase().trim(),
      password:  hashed,
      createdAt: nowIso(),
    };

    users.push(newUser);
    await writeJson(files.users, users);

    const token = signToken(newUser);

    return res.status(201).json({
      message: 'Account created successfully',
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Server error during registration' });
  }
});

// ── POST /api/auth/login ─────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = await readJson(files.users);
    const user  = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = signToken(user);

    return res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login' });
  }
});

// ── GET /api/auth/me (verify token + return current user) ───────────────────
router.get('/me', protect, (req, res) => {
  return res.json({ user: req.user });
});

module.exports = router;
