# VoxDim3D — Full-Stack 3D Request Platform 🚀

VoxDim3D is a full-stack web application that allows users to submit and manage 3D model generation requests.
Users can securely sign up, log in, submit detailed prompts, and track their requests through an interactive dashboard.

---

## 🔥 Features

* User Authentication (Signup & Login)
* Secure JWT-based session handling
* Submit 3D model requests ("Submit to Forge")
* Dashboard to track user requests
* RESTful API integration
* JSON-based database for lightweight storage
* Fully deployed (Frontend + Backend)

---

## 🛠 Tech Stack

* **Frontend:** React (Create React App)
* **Backend:** Node.js, Express
* **Database:** JSON (file-based storage)
* **Authentication:** JWT (JSON Web Tokens)
* **Deployment:** Vercel (Frontend), Render (Backend)

---

## 🌐 Live Demo

* **Frontend:** https://voxdim3d.vercel.app
* **Backend:** https://voxdim3d-backend.onrender.com

> ⚠️ Note: Backend may take ~30 seconds to wake up (Render free tier).

---

## 📂 Project Structure

```
voxdim3d/
├── backend/
│   ├── data/              # JSON database
│   ├── lib/               # Helper functions
│   ├── middleware/        # Auth middleware
│   ├── routes/            # API routes
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── App.js
```

---

## 🚀 Running Locally

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---
## ☁️ Deployment

### Backend (Render)

* Root: `backend`
* Build: `npm install`
* Start: `npm start`

### Frontend (Vercel)

* Root: `frontend`
* Env:

  ```
  REACT_APP_API_URL=https://voxdim3d-backend.onrender.com/api
  ```

---

## 💡 Key Learnings

* Full-stack integration (React + Express)
* JWT authentication flow
* API debugging and route alignment
* Handling deployment issues (CORS, env variables)
* Structuring scalable web applications

---

## 👩‍💻 Author

**Laxmi**
