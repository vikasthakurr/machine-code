# DevPractice

> A full-stack machine coding practice platform with real-time code evaluation, sandboxed execution, and Google OAuth.

DevPractice is an open-source platform for developers to sharpen their full-stack skills through hands-on machine coding challenges. Unlike algorithm-only platforms, it focuses on real-world problem solving — building features, designing APIs, and writing production-quality code.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Response Format](#response-format)
- [Development Status](#development-status)
- [Contributing](#contributing)
- [License](#license)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Main API | Node.js + Express (ESM) |
| Evaluation Service | FastAPI (Python) |
| Database | MongoDB (Mongoose) |
| Queue | Redis + BullMQ |
| Auth | JWT + Google OAuth 2.0 |
| Code Execution | Docker sandboxes |

---

## Project Structure

```
dev-practice/
├── apps/
│   ├── api/                        # Node.js main backend
│   │   ├── src/
│   │   │   ├── config/             # DB, Redis, Passport, env
│   │   │   ├── middlewares/        # Auth, error handling
│   │   │   ├── modules/
│   │   │   │   ├── auth/           # Register, login, Google OAuth, profile
│   │   │   │   ├── problems/       # Problem CRUD
│   │   │   │   ├── submissions/    # Code submission + BullMQ queue
│   │   │   │   ├── execution/      # Execution results
│   │   │   │   └── notifications/  # User notifications
│   │   │   ├── utils/              # Logger, response helpers
│   │   │   ├── app.js
│   │   │   └── server.js
│   │   ├── .env.example
│   │   └── package.json
│   │
│   └── evaluation/                 # FastAPI evaluation service (Python)
│       └── app/
│           ├── main.py
│           ├── routes.py
│           ├── schemas.py
│           └── evaluator.py
│
├── infra/
│   ├── docker/runners/             # Base Dockerfiles per language
│   └── env/                        # Environment configs
├── .github/                        # Issue templates, PR template
├── CONTRIBUTING.md
├── LICENSE
├── docker-compose.yml
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))
- Redis (local or [Upstash](https://upstash.com))
- Python >= 3.10 _(for evaluation service)_

### 1. Fork and clone

```bash
git clone https://github.com/<your-username>/dev-practice.git
cd dev-practice
```

### 2. Set up environment variables

```bash
cp apps/api/.env.example apps/api/.env
```

Edit `apps/api/.env` with your values:

```env
NODE_ENV=development
PORT=3000
MONGO_URI=your-mongodb-uri
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLIENT_URL=http://localhost:5173
EVALUATION_SERVICE_URL=http://localhost:8000
```

### 3. Install and run

```bash
cd apps/api
npm install
npm run dev
```

Or from the root:

```bash
npm run dev
```

Server runs at `http://localhost:3000`

Verify with:
```bash
curl http://localhost:3000/health
# {"status":"ok"}
```

---

## API Reference

### Health

```
GET /health
```

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/v1/auth/register` | No | Register with email/password |
| POST | `/api/v1/auth/login` | No | Login, returns JWT |
| PATCH | `/api/v1/auth/profile` | Yes | Update profile |
| GET | `/api/v1/auth/google` | No | Start Google OAuth flow |
| GET | `/api/v1/auth/google/callback` | No | Google OAuth callback |

**Register**
```json
POST /api/v1/auth/register
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "Secret@123",
  "collegeName": "MIT",
  "passingYear": 2025,
  "gender": "male",
  "userType": "student",
  "bio": "Full-stack dev",
  "github": "https://github.com/johndoe"
}
```

**Login**
```json
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "Secret@123"
}
```

### Problems

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/problems` | No | List all published problems |
| GET | `/api/v1/problems/:slug` | No | Get problem by slug |
| POST | `/api/v1/problems` | Yes | Create problem (admin) |

### Submissions

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/v1/submissions` | Yes | Submit code |
| GET | `/api/v1/submissions/me` | Yes | My submissions |
| GET | `/api/v1/submissions/:id` | Yes | Get submission by ID |

**Submit Code**
```json
POST /api/v1/submissions
Authorization: Bearer <token>
{
  "problemId": "64f...",
  "language": "javascript",
  "code": "function solve(input) { ... }"
}
```

### Execution

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/execution/:submissionId` | Yes | Get execution result |

### Notifications

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/notifications` | Yes | Get my notifications |
| PATCH | `/api/v1/notifications/:id/read` | Yes | Mark as read |

---

## Authentication

Protected routes require a Bearer token:

```
Authorization: Bearer <your-jwt-token>
```

**Google OAuth Flow**

```
1. GET /api/v1/auth/google           → redirects to Google consent screen
2. User approves
3. GET /api/v1/auth/google/callback  → issues JWT
4. Redirects to CLIENT_URL/auth/callback?token=<jwt>
```

To enable Google OAuth, create credentials at [Google Cloud Console](https://console.cloud.google.com) and set the redirect URI to:
```
http://localhost:3000/api/v1/auth/google/callback
```

---

## Response Format

All responses follow a consistent shape:

```json
{ "success": true, "data": { ... } }

{ "success": false, "message": "..." }
```

---

## Development Status

| Module | Status |
|---|---|
| Auth — local (register/login) | ✅ Complete |
| Auth — Google OAuth | ✅ Complete |
| User profile | ✅ Complete |
| Problems CRUD | ✅ Complete |
| Submissions + BullMQ queue | ✅ Complete |
| Notifications | ✅ Complete |
| Execution results (read) | ✅ Complete |
| Evaluation Service (FastAPI) | 🚧 In Progress |
| BullMQ worker | 🚧 In Progress |
| Docker code runners | 🚧 In Progress |
| Input validation (Zod) | 📋 Planned |
| Profile picture upload | 📋 Planned |
| Admin role enforcement | 📋 Planned |
| Frontend | 📋 Planned |

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | Yes |
| `REDIS_URL` | Redis connection URL | Yes |
| `JWT_SECRET` | Secret for signing JWTs | Yes |
| `JWT_EXPIRES_IN` | Token expiry e.g. `7d` | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | OAuth only |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | OAuth only |
| `CLIENT_URL` | Frontend URL for OAuth redirect | OAuth only |
| `EVALUATION_SERVICE_URL` | FastAPI service base URL | Execution only |

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

- Look for issues tagged `good first issue` to get started
- Follow the branch naming and commit style in the contributing guide
- One feature or fix per PR

---

## License

[MIT](./LICENSE) — free to use, modify, and distribute.
