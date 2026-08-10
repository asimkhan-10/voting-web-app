# 🗳️ Secure Voting Web Application

A full-stack, real-time electronic voting system engineered with the **MERN** stack (**M**ongoDB, **E**xpress.js, **R**eact, **N**ode.js), **Vite**, and **Tailwind CSS**. Features CNIC-based authentication, single-admin platform governance, one-voter-one-vote enforcement, dynamic data visualizations, and interactive candidate management.

---

## ✨ Features

- **🔐 CNIC Authentication & Authorization**:
  - Secure registration & login using unique CNIC numbers and password hashing via `bcryptjs`.
  - Stateless authentication powered by JSON Web Tokens (JWT).
  - Single-Admin system rule enforcement to prevent administrative security bypasses.
- **🗳️ Fair & Enforced Voting**:
  - Strict **one-voter-one-vote** validation.
  - Role-based restrictions (Admins are neutral and prohibited from voting).
  - Confirmation modals with instant UI state updates and feedback toasts.
- **📊 Real-Time Analytics & Leaderboard**:
  - Live vote count progression and candidate rankings.
  - Dynamic charts using **Recharts** (Party Distribution Donut Chart, Vote Bar Charts, and Trend Visualizations).
- **🛠️ Admin Dashboard**:
  - Complete candidate CRUD capabilities (Add, Edit, Delete candidates).
  - System metrics and election management capabilities.
- **🎨 Modern UI/UX**:
  - Sleek dark and light theme toggle powered by React Context.
  - Micro-animations and responsive layouts crafted with **Framer Motion** & **Tailwind CSS 4**.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React 19 + Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Animations**: Framer Motion
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express v5
- **Database**: MongoDB & Mongoose v9
- **Authentication**: JWT (jsonwebtoken) & bcryptjs
- **Middleware**: CORS, Body-Parser

---

## 📁 Project Architecture

```
voting-app/
├── backend/
│   ├── models/           # Database Schemas (User, Candidate)
│   ├── routes/           # REST API Route Handlers (userRoutes, candidateRoutes)
│   ├── db.js             # Database connection setup
│   ├── jwt.js            # Authentication middleware & token generator
│   ├── seed.js           # Sample candidate & user seeder
│   ├── server.js         # Express app entry point
│   └── .env.example      # Sample backend environment config
├── frontend/
│   ├── public/           # Static assets & SVG icons
│   ├── src/
│   │   ├── api/          # Axios instance and API service calls
│   │   ├── components/   # Modular React UI components
│   │   ├── context/      # Auth & Theme state contexts
│   │   ├── pages/        # Application views (Dashboard, Analytics, Admin, etc.)
│   │   ├── App.jsx       # Layout, routes, and modal orchestration
│   │   └── main.jsx      # React entry file
│   └── .env.example      # Sample frontend environment config
├── .gitignore            # Root gitignore rules
└── README.md             # Project documentation
```

---

## 🔌 API Reference

### **User & Auth Routes (`/user`)**
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/user/signup` | Register a new voter or admin | No |
| `POST` | `/user/login` | Log in with CNIC & password | No |
| `GET` | `/user/profile` | Retrieve logged-in user details | Yes (JWT) |
| `PUT` | `/user/profile/password` | Update current user's password | Yes (JWT) |

### **Candidate & Voting Routes (`/candidate`)**
| Method | Endpoint | Description | Auth Required | Role |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/candidate` | Get list of all candidates | No | Any |
| `GET` | `/candidate/vote/count` | Get live election results & rankings | No | Any |
| `POST` | `/candidate` | Add a new candidate | Yes (JWT) | Admin Only |
| `PUT` | `/candidate/:id` | Update existing candidate info | Yes (JWT) | Admin Only |
| `DELETE` | `/candidate/:id` | Delete a candidate | Yes (JWT) | Admin Only |
| `POST` | `/candidate/vote/:id` | Cast a vote for a candidate | Yes (JWT) | Voter Only |

---

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** running locally on port `27017` OR a MongoDB Atlas Connection String

---

### **1. Clone the Repository**
```bash
git clone https://github.com/asimkhan-10/voting-web-app.git
cd voting-web-app
```

---

### **2. Backend Setup**
Navigate to the `backend` directory:
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` (or copy `.env.example`):
```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/voting
JWT_SECRET=your_jwt_secret_key_here
```

Start the Backend Server:
```bash
# Development mode with auto-reload
npx nodemon server.js

# Or standard production mode
npm start
```
*Backend will run on `http://localhost:3000`*

---

### **3. Frontend Setup**
Open a new terminal tab/window and navigate to the `frontend` directory:
```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/` (or copy `.env.example`):
```env
VITE_API_URL=http://localhost:3000
```

Start the Vite Development Server:
```bash
npm run dev
```
*Frontend will run on `http://localhost:5173`*

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
