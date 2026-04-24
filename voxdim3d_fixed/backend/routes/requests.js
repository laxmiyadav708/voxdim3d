const express  = require('express');
const router   = express.Router();
const { files, readJson, writeJson, createId, nowIso } = require('../lib/store');
const { protect } = require('../middleware/auth');

// ── GET /api/requests/mine  (user's own requests) ────────────────────────────
router.get('/mine', protect, async (req, res) => {
  try {
    const requests = await readJson(files.requests);
    const mine     = requests
      .filter(r => r.userId === req.user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res.json(mine);
  } catch (err) {
    console.error('Get mine error:', err);
    return res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// ── GET /api/requests  (all public requests — for gallery) ───────────────────
router.get('/', async (req, res) => {
  try {
    const requests = await readJson(files.requests);
    const pub      = requests
      .filter(r => r.isPublic)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res.json(pub);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// ── POST /api/requests  (submit new request) ─────────────────────────────────
router.post('/', protect, async (req, res) => {
  try {
    const {
      prompt,
      category,
      style,
      name,
      notes,
      referenceLinks,
      isPublic,
      type,
    } = req.body;

    if (!prompt && !notes) {
      return res.status(400).json({ error: 'A prompt or notes field is required' });
    }

    const requests = await readJson(files.requests);

    const newRequest = {
      id:             createId(),
      userId:         req.user.id,
      userName:       req.user.name,
      userEmail:      req.user.email,
      // Request details
      type:           type     || 'text',
      prompt:         prompt   || '',
      category:       category || '',
      style:          style    || '',
      name:           name     || '',
      notes:          notes    || '',
      referenceLinks: referenceLinks || '',
      isPublic:       Boolean(isPublic),
      // Status
      status:         'pending',
      createdAt:      nowIso(),
      updatedAt:      nowIso(),
    };

    requests.push(newRequest);
    await writeJson(files.requests, requests);

    return res.status(201).json({
      message: 'Request submitted successfully',
      data: newRequest,
    });
  } catch (err) {
    console.error('Post request error:', err);
    return res.status(500).json({ error: 'Failed to save request' });
  }
});

// ── DELETE /api/requests/:id ──────────────────────────────────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    const requests = await readJson(files.requests);
    const idx      = requests.findIndex(
      r => r.id === req.params.id && r.userId === req.user.id
    );

    if (idx === -1) {
      return res.status(404).json({ error: 'Request not found or not yours' });
    }

    requests.splice(idx, 1);
    await writeJson(files.requests, requests);

    return res.json({ message: 'Request deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ error: 'Failed to delete request' });
  }
});

module.exports = router;
