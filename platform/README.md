# DevPractice Platform

A full-stack machine coding practice platform — think LeetCode, but focused on real-world full-stack problem solving. Users can register, browse problems, submit code, and get evaluated results in a sandboxed environment.

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
platform/
├── apps/
│   ├── api/                  # Node.js main backend
│   │   ├── src/
│   │   │   ├── config/       # DB, Redis, Passport, env
│   │   │   ├── middlewares/  # Auth, error handling
│   │   │   ├── modules/
│   │   │   │   ├── auth/         # Register, login, Google OAuth, profile
│   │   │   │   ├── problems/     # Problem CRUD
│   │   │   │   ├── submissions/  # Code submission + queue
│   │   │   │   ├── execution/    # Execution results
│   │   │   │   └── notifications/
│   │   │   ├── utils/        # Logger, response helpers
│   │   │   ├── app.js
│   │   │   └── server.js
│   │   ├── .env.example
│   │   └── package.json
│   │
│   └── evaluation/           # FastAPI evaluation service
│       └── app/
│           ├── main.py
│           ├── routes.py
│           ├── schemas.py
│           └── evaluator.py
│
├── infra/
│   ├── docker/runners/       # Base Dockerfiles per language
│   └── env/                  # Environment configs
├── docker-compose.yml
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)
- Redis (local or cloud)
- Python >= 3.10 (for evaluation service)

### 1. Clone the repo

```bash
git clone <repo-url>
cd platform
```

### 2. Set up environment variables

```bash
cp apps/api/.env.example apps/api/.env
```

Fill in the values in `apps/api/.env`:

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

### 3. Install dependencies

```bash
cd apps/api
npm install
```

### 4. Start the API

```bash
# from platform/
npm run dev

# or from apps/api/
npm run dev
```

Server runs at `http://localhost:3000`

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

#### Register

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

#### Login

```json
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "Secret@123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "<jwt>",
    "user": { ... }
  }
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

#### Submit Code

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

All protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

### Google OAuth Flow

```
1. GET  /api/v1/auth/google              → redirects to Google
2. User approves on Google
3. GET  /api/v1/auth/google/callback     → issues JWT
4. Redirects to CLIENT_URL/auth/callback?token=<jwt>
```

---

## Response Format

All responses follow a consistent shape:

```json
// success
{ "success": true, "data": { ... } }

// error
{ "success": false, "message": "..." }
```

---

## Development Status

| Module | Status |
|---|---|
| Auth (local + Google OAuth) | ✅ Complete |
| Problems | ✅ Complete |
| Submissions + Queue | ✅ Complete |
| Notifications | ✅ Complete |
| Execution (read) | ✅ Complete |
| Evaluation Service (FastAPI) | 🚧 In Progress |
| BullMQ Worker | 🚧 In Progress |
| Docker Code Runners | 🚧 In Progress |
| Input Validation (Zod) | 📋 Planned |
| Profile Picture Upload | 📋 Planned |
| Frontend | 📋 Planned |

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | Yes |
| `REDIS_URL` | Redis connection URL | Yes |
| `JWT_SECRET` | Secret for signing JWTs | Yes |
| `JWT_EXPIRES_IN` | Token expiry (e.g. `7d`) | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | For OAuth |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | For OAuth |
| `CLIENT_URL` | Frontend URL for OAuth redirect | For OAuth |
| `EVALUATION_SERVICE_URL` | FastAPI service URL | For execution |

---

## License

MIT
