const fs     = require('fs').promises;
const path   = require('path');
const crypto = require('crypto');

const dataDir = path.join(__dirname, '..', 'data');

const files = {
  users:    path.join(dataDir, 'users.json'),
  requests: path.join(dataDir, 'requests.json'),
};

// ── Ensure data directory and file exist ────────────────────────────────────
async function ensureFile(filePath, fallback = '[]') {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, fallback, 'utf8');
  }
}

// ── Read JSON from file ──────────────────────────────────────────────────────
async function readJson(filePath, fallback = []) {
  try {
    await ensureFile(filePath);
    const raw = await fs.readFile(filePath, 'utf8');
    return raw.trim() ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error('ReadJson error:', err.message);
    return fallback;
  }
}

// ── Write JSON to file (atomic via temp file) ────────────────────────────────
async function writeJson(filePath, data) {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    const tmp = `${filePath}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
    await fs.rename(tmp, filePath);
  } catch (err) {
    console.error('WriteJson error:', err.message);
    throw err;
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function createId()  { return crypto.randomUUID(); }
function nowIso()    { return new Date().toISOString(); }

module.exports = { files, readJson, writeJson, createId, nowIso };
