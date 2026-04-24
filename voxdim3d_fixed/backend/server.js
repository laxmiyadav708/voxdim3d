const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/requests', require('./routes/requests'));

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/', (_req, res) =>
  res.json({ status: 'ok', message: '🚀 VoxDim3D API running' })
);

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
