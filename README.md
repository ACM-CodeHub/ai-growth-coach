# 🚀 AI Growth Coach

AI Growth Coach is a full-stack AI-powered personal development platform designed to help users evaluate their growth, receive personalized improvement recommendations, and track their progress over time.

The platform combines AI-driven analysis, user submissions, peer feedback, and growth reports to provide actionable insights for continuous personal and professional improvement.

**Developed by:**

* **Member 1:** Faiqa Umer
* **Member 2:** Wajiha Batool

## ✨ Features

### 🔐 User Authentication

* Secure user registration and login.
* User session management.
* Protected application routes.

### 📊 Growth Dashboard

* Personalized dashboard showing user progress.
* Overview of submitted activities and improvement areas.
* Growth insights based on user interactions.

### 📝 AI-Based Growth Analysis

* Users can submit their responses, experiences, and goals.
* AI analyzes submitted information.
* Generates personalized feedback and recommendations.

### 🤝 Peer Review System

* Users can receive feedback from peers.
* Peer reviews help identify strengths and improvement opportunities.

### 📈 Growth Reports

* Generates structured growth reports.
* Tracks development areas over time.
* Provides actionable suggestions for improvement.

### 📚 History Tracking

* Maintains previous submissions and reports.
* Allows users to review their progress journey.

### 🌐 Fully Deployed Application

* Frontend deployed for public access.
* Backend API deployed separately.
* Cloud database integration.

# 🛠️ Tech Stack

## Frontend

### React + Vite

Used for building a fast, responsive, and component-based user interface.

### JavaScript

Handles frontend logic, interactions, and API communication.

### CSS / Modern UI Components

Provides responsive layouts and user-friendly design.

## Backend

### FastAPI

Python-based backend framework used for building high-performance REST APIs.

Responsibilities:

* API routing
* Request validation
* Business logic
* Database communication

### Python

Used for backend development and AI-related processing.

## Database

### Supabase (PostgreSQL)

Used for:

* User data storage
* Authentication support
* Application records
* Growth submissions
* Peer reviews
* Reports

## AI Integration

AI services are used to analyze user inputs and generate personalized growth recommendations.

## Deployment

Frontend:

* Vercel deployment

Backend:

* Render deployment

Database:

* Supabase Cloud Database

# 🏗️ System Architecture

```
                     User
                       |
                       |
                React + Vite
                 Frontend
                       |
                       |
              REST API Requests
                       |
                       |
                 FastAPI Backend
                       |
        --------------------------------
        |              |               |
        |              |               |
 Authentication   Business Logic   AI Processing
        |
        |
   Supabase PostgreSQL
        |
        |
 Users | Submissions | Peer_Reviews | AI_Reviews | AI_Issues

```

## Architecture Flow

1. User interacts with the React frontend.
2. Frontend sends API requests to FastAPI backend.
3. Backend validates requests and processes application logic.
4. Data is stored/retrieved from Supabase PostgreSQL.
5. AI services analyze user information and generate insights.
6. Results are displayed on the dashboard.

# 📂 Project Structure

```
AI-GROWTH-COACH/
│
├── ai-growth-coach-frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── charts/
│   │   │   └── ProgressChart.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── context/
│   │   │
│   │   ├── pages/
│   │   │   ├── AIReview.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── GrowthReport.jsx
│   │   │   ├── History.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PeerReview.jsx
│   │   │   ├── Register.jsx
│   │   │   └── SubmitCode.jsx
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── vite.config.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── eslint.config.js
│
│
├── backend/
│   │
│   ├── app/
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── dashboard_router.py
│   │   │   ├── growth_report.py
│   │   │   ├── history_router.py
│   │   │   ├── peer_reviews.py
│   │   │   └── submission.py
│   │   │
│   │   ├── schemas/
│   │   │   └── user.py
│   │   │
│   │   ├── services/
│   │   │   └── ai_coach.py
│   │   │
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   ├── .env
│   └── __pycache__/
│
├── .gitignore
└── README.md

```

# ⚙️ Installation & Setup

## Prerequisites

Install the following:

* Node.js (v18 or above)
* Python 3.10+
* Git
* Supabase account

## Clone Repository

```bash
git clone https://github.com/ACM-CodeHub/ai-growth-coach.git

cd ai-growth-coach
```

# Frontend Setup

Navigate to frontend:

```bash
cd ai-growth-coach-frontend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```
.env
```

Add frontend environment variables:

```
VITE_API_URL=https://your-backend-name.onrender.com
```

Run frontend:

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

# Backend Setup

Navigate to backend:

```bash
cd ai-growth-coach-backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env` file:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

# 📖 Usage

1. Create an account and log in.
2. Access the personalized dashboard.
3. Submit personal growth information.
4. Receive AI-generated analysis and recommendations.
5. Review peer feedback.
6. Track previous reports and monitor improvement over time.

# Live Demo

Frontend:

```
https://ai-growth-coach-ten.vercel.app/
```

Backend API:

```
https://ai-growth-coach-6fpm.onrender.com/
```

# 🔌 API Documentation

## Authentication

### Register User

**POST**

```
/auth/register
```

Request:

```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password"
}
```

Response:

```json
{  
  "message": "User registered successfully"
}
```

---

## Login User

**POST**

```
/auth/login
```

Response:

```json
{
  "access_token": "token"
}
```

---

## Submit Growth Entry

**POST**

```
/submissions/
```

Purpose:

Creates a new growth submission for AI analysis.

---

## Get Dashboard Data

**GET**

```
/dashboard/
```

Returns:

* User statistics
* Growth information
* Recent activities

---

## Get Growth History

**GET**

```
/history/
```

Returns previous user submissions and reports.

---

## Peer Reviews

**POST**

```
/peer-reviews/
```

Creates a peer review entry.

---

# 🧠 Engineering Decisions

## React + FastAPI Separation

The frontend and backend are separated to improve:

* Scalability
* Maintainability
* Independent deployment

## FastAPI Backend

FastAPI was selected because:

* High performance
* Automatic API documentation
* Strong Python ecosystem support

## Supabase Database

Supabase was chosen because:

* PostgreSQL reliability
* Cloud-based database management
* Authentication support
* Easy API integration

## REST API Architecture

REST APIs provide:

* Clear communication between frontend and backend
* Easier debugging
* Future mobile application support

## Cloud Deployment

Separate deployment allows:

* Independent scaling
* Easier updates
* Better production management

# 🧪 Testing

Testing performed includes:

## Backend Testing

* API endpoint testing
* Database connectivity testing
* Authentication flow testing

## Frontend Testing

* UI functionality testing
* Form validation testing
* API integration testing

Run backend:

```bash
pytest
```

Build frontend:

```bash
npm run build
```

# ⚠️ Limitations

Current limitations:

* AI recommendations depend on the quality of user input.
* Advanced analytics and visualization can be improved.
* More automated testing coverage can be added.
* Role-based permissions can be expanded.

# 🚀 Future Improvements

Planned improvements:

* Mobile application version.
* Advanced AI coaching model.
* Real-time notifications.
* More detailed progress analytics.
* Gamification system for user motivation.
* Improved recommendation personalization.

# 👩‍💻 Contributors

## Faiqa Umer

Member 1

Responsibilities:

* Backend development
* API implementation
* Database integration

## Wajiha Batool

Member 2

Responsibilities:

* Frontend development
* UI implementation
* System integration

# 📄 License

This project is developed for educational and research purposes.
