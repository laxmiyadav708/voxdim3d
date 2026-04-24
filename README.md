# VoxDim3D — Full-Stack 3D Request Platform

A web application for submitting and managing 3D model requests.  
Users can sign up, log in, submit detailed prompts, and track their requests on a dashboard.

---

## 🗂 Project Structure

```
voxdim3d/
├── backend/
│   ├── data/
│   │   ├── users.json        ← user accounts (auto-created)
│   │   └── requests.json     ← submitted requests (auto-created)
│   ├── lib/
│   │   └── store.js          ← JSON read/write helpers
│   ├── middleware/
│   │   └── auth.js           ← JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js           ← /register, /login, /me
│   │   └── requests.js       ← GET, POST, DELETE /requests
│   ├── server.js
│   ├── package.json
│   ├── .env                  ← local secrets (do not commit)
│   ├── .env.example
│   └── render.yaml           ← Render deployment config
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── Shared.js
    │   ├── context/
    │   │   └── AuthContext.js ← JWT auth + axios setup
    │   ├── pages/
    │   │   ├── HomePage.js
    │   │   ├── AuthPage.js    ← Login / Signup
    │   │   ├── SubmitPage.js  ← Submit to Forge
    │   │   ├── DashboardPage.js
    │   │   └── GalleryPage.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── package.json
    ├── .env
    ├── .env.production
    └── vercel.json
```

---

## 🚀 Running Locally

### 1. Backend

```bash
cd backend
npm install
# Edit .env if needed (defaults work for local dev)
npm run dev        # nodemon — auto-restarts on save
# OR
npm start          # plain node
```

Backend runs on **http://localhost:5000**

### 2. Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on **http://localhost:3000** and proxies API calls to port 5000.

---

## 🔑 API Endpoints

| Method | Endpoint                  | Auth? | Description                     |
|--------|---------------------------|-------|---------------------------------|
| POST   | /api/auth/register        | No    | Create account, returns JWT     |
| POST   | /api/auth/login           | No    | Login, returns JWT              |
| GET    | /api/auth/me              | Yes   | Get current user from token     |
| GET    | /api/requests/mine        | Yes   | Get logged-in user's requests   |
| GET    | /api/requests             | No    | Get all public requests         |
| POST   | /api/requests             | Yes   | Submit new request              |
| DELETE | /api/requests/:id         | Yes   | Delete own request              |

**Auth header format:** `Authorization: Bearer <token>`

---

## ☁️ Deployment

### Backend → Render

1. Push the `backend/` folder to a GitHub repo
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo
4. Set these environment variables in Render dashboard:
   - `JWT_SECRET` — a long random string (click "Generate")
   - `JWT_EXPIRES` — `7d`
   - `FRONTEND_URL` — your Vercel URL (e.g. `https://voxdim3d.vercel.app`)
5. Build command: `npm install`
6. Start command: `npm start`
7. Copy your Render URL (e.g. `https://voxdim3d-backend.onrender.com`)

> **Note:** Render's free tier spins down after inactivity. The first request after sleep takes ~30s.

### Frontend → Vercel

1. Push the `frontend/` folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Framework: **Create React App**
4. Add environment variable in Vercel dashboard:
   - `REACT_APP_API_URL` = `https://your-backend.onrender.com/api`
5. Deploy

---

## 🐛 Bugs Fixed

| # | Bug | Fix |
|---|-----|-----|
| 1 | `requests.js` used `readData`/`writeData` (undefined) | Changed to `readJson`/`writeJson` from `store.js` |
| 2 | Login didn't issue a JWT token | Backend now signs and returns `token` on login & register |
| 3 | No `/auth/me` endpoint — session lost on page refresh | Added `GET /api/auth/me` protected route |
| 4 | No `/requests/mine` endpoint — dashboard fetched wrong URL | Added `GET /api/requests/mine` filtered by `userId` |
| 5 | Auth middleware referenced `../models/User` (didn't exist) | Rewrote to look up user from `users.json` via JWT `id` |
| 6 | Submit form name/email fields used `defaultValue` — not wired to state | Changed to controlled `value` + `onChange` |
| 7 | Dashboard used `r._id` (MongoDB style) — data uses `r.id` | Changed all references to `r.id` |
| 8 | `bcrypt` imported but `bcryptjs` installed (different package) | Standardised to `bcryptjs` throughout |
| 9 | Only `id` and `timestamp` saved to `requests.json` | Now saves all fields: prompt, category, style, name, email, notes, etc. |
| 10 | Signup → auto-login flow did second network call to login separately | Register route now also returns a token — one round-trip |
