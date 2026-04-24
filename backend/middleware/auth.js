const jwt = require('jsonwebtoken');
const { files, readJson } = require('../lib/store');

async function protect(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authenticated — no token provided' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'voxdim_secret_key');
    const users   = await readJson(files.users);
    const user    = users.find(u => u.id === decoded.id);

    if (!user) return res.status(401).json({ error: 'User not found' });

    // Attach safe user object (no password)
    req.user = { id: user.id, name: user.name, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { protect };
