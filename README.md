# 🔗 ClipNex – URL Shortener SaaS

ClipNex is a full-stack URL shortener platform that allows users to create short links, manage them through a dashboard, and track click analytics.  
It is built using **React, FastAPI, and MongoDB**, with authentication and custom short links support.

🌐 Live Demo: https://clipnex.vercel.app

---

# 🚀 Features

- 🔐 User Authentication (JWT)
- ✂️ Shorten long URLs instantly
- 🎯 Custom short links (e.g. clipnex.vercel.app/my-link)
- 📊 Click analytics for each URL
- 📋 User dashboard to manage links
- 📎 Copy short link to clipboard
- 🗑 Delete shortened URLs
- 📱 Responsive UI with TailwindCSS
- ⚡ Fast API built with FastAPI
- ☁️ Cloud deployment (Vercel + Render + MongoDB Atlas)

---

# 🏗 Tech Stack

## Frontend
- React (Vite)
- TailwindCSS
- React Router
- Axios
- React Hot Toast

## Backend
- FastAPI
- JWT Authentication
- Passlib (bcrypt password hashing)
- Python-JOSE

## Database
- MongoDB Atlas

## Deployment
- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas

---

# 🧠 Architecture

User Browser  
↓  
React Frontend (Vercel)  
↓  
FastAPI Backend (Render)  
↓  
MongoDB Atlas  

---

# ⚙️ Installation (Local Development)

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/clipnex.git
cd clipnex
```
## 1️⃣ Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
```
Install Dependencies
```bash
pip install -r requirements.txt
```
Create ```.env```
```bash
APP_NAME=ClipNex
DEBUG=True
MONGODB_URL=your_mongodb_connection
DATABASE_NAME=url_shortener
SECRET_KEY=your_secret_key
BASE_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
```
Run Server
```bash
uvicorn app.main:app --reload
```
Backend runs on:
```bash
http://localhost:8000
```
## 1️⃣ Frontend Setup
```bash
cd frontend
npm install
```
Create ```.env```
```bash
VITE_API_URL=http://localhost:8000
```
Run development server
```bash
npm run dev
```
Frontend runs on:
```bash
http://localhost:5173
```

## 📂 Project Structure
```bash
clipnex/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── utils/
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── api/
│   │
│   └── package.json
│
└── README.md
```
## 🛡 Security

The application follows basic security best practices:

- **Password Hashing:** User passwords are securely hashed using **bcrypt** before storing in the database.
- **JWT Authentication:** Protected APIs use **JSON Web Tokens (JWT)** to authenticate and authorize users.
- **CORS Configuration:** Backend is configured with **CORS middleware** to safely allow requests only from the frontend domain.
- **Environment Variables:** Sensitive configuration such as database URLs and secret keys are stored using **environment variables** instead of hardcoding them in the codebase.
