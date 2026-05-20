# QueueEase V2 — AI-Powered Smart Queue Management System

<p align="center">
  <strong>Intelligent healthcare queue management for private doctor clinics and small dispensaries in Sri Lanka</strong>
</p>

---

## Overview

QueueEase V2 is a full-stack, production-ready healthcare queue management system designed specifically for the Sri Lankan healthcare context. It combines real-time queue monitoring, AI-powered wait-time prediction, emergency priority handling, and multi-language support into a beautiful glassmorphism interface with neon-glow aesthetics.

The system serves three distinct user roles — **patients**, **doctors**, and **receptionists** — each with tailored dashboards, workflows, and permissions. A Random Forest Regressor ML microservice predicts patient wait times based on queue composition, time of day, appointment type, and historical patterns.

---

## Architecture

┌──────────────────────────────────────────────────────────────────┐
│                        QueueEase V2 Architecture                 │
├──────────────┬──────────────────┬────────────────────────────────┤
│   Frontend   │     Backend      │        AI / ML Service         │
│   (React +   │   (Express.js +  │     (FastAPI + scikit-learn)   │
│   Vite +     │    MongoDB +     │                                │
│   TypeScript)│    Socket.IO)    │   Random Forest Regressor      │
│              │                  │   Feature Engineering Pipeline │
│  13 Screens  │   REST API       │   Batch Prediction API         │
│  3 Dashboards│   WebSocket RT   │   Model Training & Persistence │
│  Zustand     │   JWT + Firebase │   Synthetic Data Generation    │
│  TanStack Q  │   Role-Based ACL │                                │
└──────────────┴──────────────────┴────────────────────────────────┘


---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework with type safety |
| Vite 5 | Build tool with HMR and code splitting |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion | Page transitions and micro-animations |
| Zustand | State management with persist middleware |
| TanStack Query | Server state management and caching |
| Chart.js + react-chartjs-2 | Analytics visualizations |
| React Router v6 | Client-side routing with lazy loading |
| Socket.IO Client | Real-time WebSocket updates |
| Firebase Auth | Google/Phone authentication |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Express.js 4 | REST API server |
| MongoDB Atlas + Mongoose 8 | Database and ODM |
| Socket.IO 4 | Real-time bidirectional communication |
| JWT + Firebase Admin | Dual authentication strategy |
| bcryptjs | Password hashing |
| Helmet + CORS + Rate Limiting | Security middleware |
| Winston | Structured logging |
| FCM (Firebase Cloud Messaging) | Push notifications |

### AI / ML Service
| Technology | Purpose |
|---|---|
| FastAPI | High-performance Python API |
| scikit-learn 1.8 | Random Forest Regressor model |
| Pandas + NumPy | Data processing |
| Pydantic | Request/response validation |
| Uvicorn | ASGI server |
| Joblib | Model serialization |
| Docker + Docker Compose | Containerized deployment |

---

## Features

### Patient Experience
- **Real-time queue tracking** with token display and estimated wait times
- **Appointment booking wizard** — 4-step flow: Clinic → Doctor → Date/Time → Confirm
- **Push notifications** when your turn is approaching
- **Emergency queue join** for urgent medical needs
- **Multi-language support** — English, Sinhala (සිංහල), Tamil (தமிழ்)
- **Accessibility** — 48px minimum touch targets, high contrast mode, large text option

### Doctor Dashboard
- **Live queue management** with call-next, pause, and close controls
- **Currently consulting view** with patient details and completion notes
- **Emergency case management** with severity levels (critical, urgent, moderate)
- **Analytics dashboard** with patient flow, wait times, and appointment type breakdown
- **Real-time Socket.IO updates** — no manual refresh needed

### Receptionist Dashboard
- **Walk-in patient registration** with quick-add forms
- **Emergency patient intake** with severity and vitals recording
- **Queue search and filter** by name or token number
- **Patient management** — cancel entries, call next, mark no-show
- **Queue statistics** at a glance

### AI / ML Wait-Time Prediction
- **Random Forest Regressor** trained on synthetic Sri Lankan clinic data
- **Feature engineering** — peak hour encoding, appointment type encoding, rolling wait imputation
- **Confidence intervals** — predicted wait with upper/lower bounds
- **Batch prediction** for entire queue
- **Feature importance** reporting for model explainability

### System Features
- **Role-Based Access Control** — patient, doctor, receptionist with granular permissions
- **Firebase Auth + JWT** dual authentication
- **Real-time WebSocket** updates for queue changes, turn notifications, and emergency alerts
- **Responsive design** — mobile-first with desktop enhancements
- **Glassmorphism UI** with deep navy/teal color palette and neon glow effects
- **ECG-to-stethoscope HTML5 Canvas animation** on the splash screen

---

## Project Structure

```
QueueEase-V2/
├── frontend/                    # React + Vite + TypeScript
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── animations/
│   │   │   │   └── ECGStethoscopeAnimation.tsx
│   │   │   ├── layout/
│   │   │   │   └── AppLayout.tsx
│   │   │   ├── screens/
│   │   │   │   ├── SplashScreen.tsx          # ECG animation + login CTA
│   │   │   │   ├── LoginScreen.tsx           # Firebase Auth + email/password
│   │   │   │   ├── PatientDashboard.tsx      # Queue status, clinics, appointments
│   │   │   │   ├── DoctorDashboard.tsx       # Queue management, current patient
│   │   │   │   ├── ReceptionistDashboard.tsx # Walk-in registration, emergency intake
│   │   │   │   ├── QueueStatusScreen.tsx     # Real-time queue monitoring
│   │   │   │   ├── QueueDetailsScreen.tsx    # Expandable entries, complete/cancel
│   │   │   │   ├── AppointmentBookingScreen.tsx # 4-step booking wizard
│   │   │   │   ├── ProfileScreen.tsx         # Role-specific profile with edit modal
│   │   │   │   ├── NotificationsScreen.tsx   # Real-time notification feed
│   │   │   │   ├── AnalyticsScreen.tsx       # Chart.js dashboards
│   │   │   │   ├── EmergencyPriorityScreen.tsx # Emergency case management
│   │   │   │   └── SettingsScreen.tsx        # Language, accessibility, security
│   │   │   └── ui/
│   │   │       ├── Badge.tsx
│   │   │       ├── Button.tsx
│   │   │       ├── EmptyState.tsx
│   │   │       ├── GlassCard.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── LoadingSpinner.tsx
│   │   │       ├── Modal.tsx
│   │   │       ├── StatCard.tsx
│   │   │       ├── TokenDisplay.tsx
│   │   │       └── index.ts
│   │   ├── hooks/
│   │   │   └── index.ts                       # useSocket, useDebounce, etc.
│   │   ├── services/
│   │   │   ├── api.ts                         # Axios client with interceptors
│   │   │   ├── firebase.ts                    # Firebase initialization
│   │   │   ├── notifications.ts              # Push notification service
│   │   │   └── socket.ts                      # Socket.IO client wrapper
│   │   ├── stores/
│   │   │   ├── authStore.ts                   # Zustand: auth state + Firebase
│   │   │   ├── queueStore.ts                  # Zustand: queue state + API
│   │   │   └── uiStore.ts                     # Zustand: sidebar, theme, etc.
│   │   ├── types/
│   │   │   └── index.ts                       # TypeScript interfaces
│   │   ├── utils/
│   │   │   ├── dateUtils.ts                   # Date formatting & manipulation
│   │   │   ├── helpers.ts                     # General utility functions
│   │   │   └── index.ts                       # Barrel exports
│   │   ├── App.tsx                            # Router with lazy loading
│   │   ├── main.tsx                           # React entry point
│   │   ├── index.css                          # Tailwind + custom styles
│   │   └── vite-env.d.ts                      # Vite type declarations
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                     # Express.js + MongoDB + Socket.IO
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js                   # MongoDB connection
│   │   │   └── index.js                      # Environment config
│   │   ├── controllers/
│   │   │   ├── analyticsController.js
│   │   │   ├── appointmentController.js
│   │   │   ├── authController.js
│   │   │   ├── availabilityController.js
│   │   │   ├── clinicController.js
│   │   │   ├── notificationController.js
│   │   │   └── queueController.js
│   │   ├── middleware/
│   │   │   ├── auth.js                       # JWT + Firebase verification
│   │   │   ├── errorHandler.js               # Global error handler
│   │   │   └── validators.js                 # Express-validator rules
│   │   ├── models/
│   │   │   ├── Analytics.js                  # Mongoose: analytics schema
│   │   │   ├── Appointment.js                # Mongoose: appointment schema
│   │   │   ├── Clinic.js                     # Mongoose: clinic schema
│   │   │   ├── DoctorAvailability.js          # Mongoose: availability schema
│   │   │   ├── Notification.js               # Mongoose: notification schema
│   │   │   ├── Queue.js                      # Mongoose: queue + entries schema
│   │   │   └── User.js                       # Mongoose: user schema
│   │   ├── routes/
│   │   │   ├── analyticsRoutes.js
│   │   │   ├── appointmentRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── availabilityRoutes.js
│   │   │   ├── clinicRoutes.js
│   │   │   ├── notificationRoutes.js
│   │   │   └── queueRoutes.js
│   │   ├── services/
│   │   │   ├── fcmService.js                 # Firebase Cloud Messaging
│   │   │   └── mlService.js                  # AI/ML API client
│   │   ├── sockets/
│   │   │   └── index.js                      # Socket.IO event handlers
│   │   ├── utils/
│   │   │   ├── AppError.js                   # Custom error class
│   │   │   └── apiResponse.js                # Standardized response format
│   │   └── server.js                         # Express entry point
│   ├── .env.example
│   └── package.json
│
├── ai/                          # FastAPI + scikit-learn ML service
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py                          # ML service configuration
│   │   ├── data_generator.py                  # Synthetic Sri Lankan clinic data
│   │   ├── features.py                        # Feature engineering pipeline
│   │   ├── logger.py                          # Structured logging setup
│   │   ├── ml_api.py                          # FastAPI endpoints
│   │   ├── models.py                          # Random Forest model wrapper
│   │   ├── schemas.py                         # Pydantic request/response schemas
│   │   └── train_model.py                     # CLI training script
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_api.py                        # API endpoint tests
│   │   ├── test_features.py                   # Feature engineering tests
│   │   └── test_models.py                     # Model training & prediction tests
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── Makefile
│   ├── requirements.txt
│   └── run.py                                 # Uvicorn runner
│
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm 9+
- **Python** 3.11+
- **MongoDB Atlas** account (or local MongoDB instance)
- **Firebase** project with Authentication enabled

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/QueueEase-V2.git
cd QueueEase-V2
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Firebase and API configuration

# Start development server
npm run dev

# Production build
npm run build
```

**Environment Variables** (`.env`):

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |
| `VITE_SOCKET_URL` | Socket.IO server URL | `http://localhost:5000` |
| `VITE_FIREBASE_API_KEY` | Firebase API key | — |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | — |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | — |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | — |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | — |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | — |
| `VITE_ML_SERVICE_URL` | ML prediction service URL | `http://localhost:8000` |

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, Firebase credentials

# Start development server
npm run dev

# Production start
npm start
```

**Environment Variables** (`.env`):

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/queueease` |
| `JWT_SECRET` | JWT signing secret | — |
| `JWT_EXPIRES_IN` | Token expiry | `7d` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | — |
| `FIREBASE_PRIVATE_KEY` | Firebase service account key | — |
| `FIREBASE_CLIENT_EMAIL` | Firebase client email | — |
| `ML_SERVICE_URL` | AI/ML service URL | `http://localhost:8000` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |

### 4. AI / ML Service Setup

```bash
cd ai

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Train the model (generates synthetic data + trains Random Forest)
python -m app.train_model

# Start the API server
python run.py
# Or: uvicorn app.ml_api:app --host 0.0.0.0 --port 8000 --reload

---

## Full local run from the beginning

1. Start MongoDB
   - If you have MongoDB installed as a service, run:
     ```powershell
     Get-Service MongoDB
     Start-Service MongoDB
     ```
   - Confirm it is running on `localhost:27017`.

2. Start the backend
   ```powershell
   cd "c:\Users\ASUS\OneDrive - sci.sjp.ac.lk\Desktop\New folder\mc 1am\backend"
   npm install
   # Copy env example to .env and edit if needed
   copy .env.example .env
   npm run dev
   ```
   - Backend will run at `http://localhost:5000`
   - Health check: `http://localhost:5000/api/health`

3. Start the frontend
   ```powershell
   cd "c:\Users\ASUS\OneDrive - sci.sjp.ac.lk\Desktop\New folder\mc 1am\frontend"
   npm install
   # Copy example env and update Firebase values if you want auth
   copy .env.example .env
   npm run dev -- --host 0.0.0.0
   ```
   - Frontend will run at `http://localhost:5173/`

4. Optional: Start the AI / ML service
   ```powershell
   cd "c:\Users\ASUS\OneDrive - sci.sjp.ac.lk\Desktop\New folder\mc 1am\ai"
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   python train_model.py
   uvicorn app.ml_api:app --reload --host 127.0.0.1 --port 8001
   ```
   - AI service will run at `http://localhost:8001`

5. Open the app
   - `http://localhost:5173/`
   - Confirm backend is healthy: `http://localhost:5000/api/health`

### Important notes
- `frontend/.env` and `backend/.env` must both exist for local development.
- If you use Firebase auth, fill in the Firebase values in `frontend/.env`.
- The backend currently serves API routes under `/api`, so the frontend must use `http://localhost:5000/api` as the base URL.

# Run tests
pytest tests/ -v
```

**ML API Endpoints**:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check + model status |
| `GET` | `/info` | Model metadata, features, metrics |
| `POST` | `/predict` | Single patient wait-time prediction |
| `POST` | `/predict/batch` | Batch prediction for multiple patients |
| `GET` | `/feature-importances` | Feature importance ranking |

**Prediction Request Example**:

```json
{
  "queue_length": 8,
  "hour_of_day": 10,
  "day_of_week": 2,
  "appointment_type": "consultation",
  "is_peak_hour": true,
  "avg_consultation_time": 15,
  "emergency_count": 1,
  "rolling_avg_wait": 45.5
}
```

**Prediction Response Example**:

```json
{
  "predicted_wait_minutes": 38.2,
  "confidence": 0.85,
  "lower_bound": 25.1,
  "upper_bound": 51.3,
  "model_version": "1.0.0"
}
```

### 5. Docker Deployment (AI Service)

```bash
cd ai

# Build and run with Docker Compose
docker-compose up --build

# Or build manually
docker build -t queueease-ml .
docker run -p 8000:8000 queueease-ml
```

---

## Color Palette

| Name | Hex | Usage |
|---|---|---|
| Deep Navy | `#071B34` | Primary background |
| Midnight Blue | `#0B2447` | Card backgrounds, sidebar |
| Medical Teal | `#00B7A8` | Primary accent, CTAs, links |
| Soft Cyan | `#4FD1C5` | Secondary accent, hover states |
| Emergency Red | `#FF4757` | Emergency alerts, critical states |
| Urgent Orange | `#FFA502` | Urgent warnings |
| Success Green | `#2ED573` | Completed states, confirmations |

---

## Role-Based Access

| Feature | Patient | Doctor | Receptionist |
|---|:---:|:---:|:---:|
| View queue status | ✅ | ✅ | ✅ |
| Book appointment | ✅ | ❌ | ❌ |
| Join queue | ✅ | ❌ | ✅ |
| Call next patient | ❌ | ✅ | ✅ |
| Complete consultation | ❌ | ✅ | ❌ |
| Add walk-in patient | ❌ | ❌ | ✅ |
| Emergency intake | ❌ | ✅ | ✅ |
| View analytics | ❌ | ✅ | ✅ |
| Manage queue (pause/close) | ❌ | ✅ | ❌ |
| Profile management | ✅ | ✅ | ✅ |

---

## Real-Time Events (Socket.IO)

| Event | Direction | Description |
|---|---|---|
| `queue-updated` | Server → Client | Queue state changed (new entry, position update) |
| `queue-status-changed` | Server → Client | Queue paused, resumed, or closed |
| `your-turn` | Server → Patient | It is the patient's turn to see the doctor |
| `turn-approaching` | Server → Patient | Patient is 2-3 positions away |
| `emergency-alert` | Server → All | New emergency case added |
| `notification` | Server → Client | General notification (appointment reminder, etc.) |

---

## Accessibility

QueueEase V2 is designed with elderly patients and users with disabilities in mind:

- **Minimum 48px touch targets** on all interactive elements
- **High contrast mode** with WCAG AA compliance
- **Large text option** (1.25x and 1.5x scaling)
- **Reduced motion** support for vestibular disorders
- **Haptic feedback** option on supported devices
- **Sri Lankan localization** — English, Sinhala, and Tamil interfaces
- **Screen reader compatible** with semantic HTML and ARIA labels

---

## Testing

### Frontend
```bash
cd frontend
npm run build          # TypeScript compilation + Vite build
```

### Backend
```bash
cd backend
npm test               # Jest test suite
```

### AI / ML Service
```bash
cd ai
pytest tests/ -v       # 81 tests covering features, models, and API
```

---

## API Rate Limits

| Endpoint Category | Rate Limit |
|---|---|
| Authentication | 5 requests / minute |
| Queue operations | 30 requests / minute |
| General API | 100 requests / minute |
| ML Predictions | 60 requests / minute |

---

## Security

- **JWT tokens** with 7-day expiry and refresh rotation
- **Firebase Auth** for social login (Google, Phone)
- **bcryptjs** password hashing with salt rounds of 12
- **Helmet.js** for HTTP security headers
- **CORS** whitelisting for frontend origins
- **Express Rate Limiting** to prevent brute force attacks
- **Input validation** with express-validator on all endpoints
- **MongoDB injection prevention** via Mongoose schema validation

---

## Sri Lankan Localization

The system is specifically designed for Sri Lankan healthcare:

- **Phone numbers** validated in `+94 XX XXX XXXX` format
- **District-based clinic search** across all 25 districts
- **Three official languages** — English, Sinhala (සිංහල), Tamil (தமிழ்)
- **Peak hour detection** for Sri Lankan clinic hours (8-10 AM, 4-6 PM)
- **Appointment types** matching local clinic workflows — consultation, follow-up, emergency, walk-in
- **Synthetic training data** generated to reflect Sri Lankan clinic patterns

---


