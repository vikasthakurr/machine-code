# DevPractice

> A full-stack machine coding practice platform with real-time code evaluation, sandboxed execution, and Google OAuth — built with microservices architecture.

DevPractice is an open-source platform for developers to sharpen their full-stack skills through hands-on machine coding challenges. Unlike algorithm-only platforms, it focuses on real-world problem solving — building features, designing APIs, and writing production-quality code.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway (port 3000)                    │
│              Routing, CORS, Rate Limiting                     │
└────┬──────────┬──────────────┬──────────────┬───────────────┘
     │          │              │              │
     ▼          ▼              ▼              ▼
┌────────┐ ┌──────────┐ ┌────────────┐ ┌──────────────────┐
│  Auth  │ │ Problems │ │Submissions │ │  Notifications   │
│ :3001  │ │  :3002   │ │   :3003    │ │     :3005        │
└────────┘ └──────────┘ └─────┬──────┘ └──────────────────┘
                               │ BullMQ          ┌──────────┐
                               │                 │Execution │
                               ▼                 │  :3004   │
                        ┌─────────────┐          └──────────┘
                        │   Worker    │
                        └──────┬──────┘
                               │ HTTP
                        ┌──────▼──────┐
                        │ Evaluation  │
                        │   :8000     │
                        └──────┬──────┘
                               │
                        ┌──────▼──────┐
                        │Docker Runner│
                        │ (sandboxed) │
                        └─────────────┘
```

---

## Tech Stack

| Layer              | Technology                                |
| ------------------ | ----------------------------------------- |
| API Gateway        | Node.js + Express + http-proxy-middleware |
| Microservices      | Node.js + Express (ESM)                   |
| Evaluation Service | FastAPI (Python)                          |
| Database           | MongoDB (Mongoose)                        |
| Queue              | Redis + BullMQ                            |
| Auth               | JWT + Google OAuth 2.0                    |
| Code Execution     | Docker sandboxes (isolated containers)    |
| Orchestration      | Docker Compose                            |

---

## Project Structure

```
devpractice/
├── services/
│   ├── gateway/           # API Gateway — routes to downstream services
│   ├── auth/              # Auth service (register, login, OAuth, profile)
│   ├── problems/          # Problems CRUD service
│   ├── submissions/       # Submissions + BullMQ queue producer
│   ├── execution/         # Execution results service
│   ├── notifications/     # Notifications service
│   ├── worker/            # BullMQ consumer — bridges queue → evaluation
│   └── evaluation/        # FastAPI — runs code in Docker sandboxes
├── packages/
│   └── shared/            # Shared utilities (auth middleware, response, logger)
├── infra/
│   └── docker/runners/    # Language-specific Docker images (Node, Python, Java)
├── docker-compose.yml     # Full orchestration
└── package.json           # Root scripts
```

Each Node.js service follows:

```
service/
├── src/
│   ├── config/            # env.js, db.js
│   ├── controllers/       # Request handlers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routes
│   ├── services/          # Business logic
│   ├── app.js             # Express app setup
│   └── server.js          # Bootstrap + listen
├── .env.example
├── Dockerfile
└── package.json
```

---

## Services & Ports

| Service       | Port | Description                                |
| ------------- | ---- | ------------------------------------------ |
| Gateway       | 3000 | API Gateway — single entry point           |
| Auth          | 3001 | Registration, login, Google OAuth, profile |
| Problems      | 3002 | Problem CRUD                               |
| Submissions   | 3003 | Code submission + queue producer           |
| Execution     | 3004 | Execution result retrieval                 |
| Notifications | 3005 | User notifications                         |
| Evaluation    | 8000 | FastAPI — sandboxed code evaluation        |
| Worker        | —    | BullMQ consumer (no HTTP port)             |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- Docker & Docker Compose
- MongoDB (or use Docker)
- Redis (or use Docker)
- Python >= 3.11 _(for evaluation service, or use Docker)_

### Quick Start with Docker Compose

```bash
# Clone the repo
git clone https://github.com/<your-username>/dev-practice.git
cd dev-practice

# Build runner images
npm run docker:build-runners

# Start everything
docker compose up --build
```

All services start automatically. The gateway is accessible at `http://localhost:3000`.

### Local Development (without Docker)

```bash
# Install all service dependencies
npm run install:all

# Copy env files
cp services/auth/.env.example services/auth/.env
cp services/problems/.env.example services/problems/.env
cp services/submissions/.env.example services/submissions/.env
cp services/execution/.env.example services/execution/.env
cp services/notifications/.env.example services/notifications/.env
cp services/worker/.env.example services/worker/.env
cp services/gateway/.env.example services/gateway/.env

# Start services individually (in separate terminals)
npm run dev:auth
npm run dev:problems
npm run dev:submissions
npm run dev:execution
npm run dev:notifications
npm run dev:worker
npm run dev:gateway
```

### Verify

```bash
curl http://localhost:3000/health
# {"status":"ok","service":"gateway"}
```

---

## API Reference

All requests go through the gateway at `http://localhost:3000`.

### Auth

| Method | Endpoint                       | Auth | Description                  |
| ------ | ------------------------------ | ---- | ---------------------------- |
| POST   | `/api/v1/auth/register`        | No   | Register with email/password |
| POST   | `/api/v1/auth/login`           | No   | Login, returns JWT           |
| PATCH  | `/api/v1/auth/profile`         | Yes  | Update profile               |
| GET    | `/api/v1/auth/google`          | No   | Start Google OAuth flow      |
| GET    | `/api/v1/auth/google/callback` | No   | Google OAuth callback        |

### Problems

| Method | Endpoint                 | Auth | Description                 |
| ------ | ------------------------ | ---- | --------------------------- |
| GET    | `/api/v1/problems`       | No   | List all published problems |
| GET    | `/api/v1/problems/:slug` | No   | Get problem by slug         |
| POST   | `/api/v1/problems`       | Yes  | Create problem (admin)      |

### Submissions

| Method | Endpoint                  | Auth | Description          |
| ------ | ------------------------- | ---- | -------------------- |
| POST   | `/api/v1/submissions`     | Yes  | Submit code          |
| GET    | `/api/v1/submissions/me`  | Yes  | My submissions       |
| GET    | `/api/v1/submissions/:id` | Yes  | Get submission by ID |

### Execution

| Method | Endpoint                          | Auth | Description          |
| ------ | --------------------------------- | ---- | -------------------- |
| GET    | `/api/v1/execution/:submissionId` | Yes  | Get execution result |

### Notifications

| Method | Endpoint                         | Auth | Description          |
| ------ | -------------------------------- | ---- | -------------------- |
| GET    | `/api/v1/notifications`          | Yes  | Get my notifications |
| PATCH  | `/api/v1/notifications/:id/read` | Yes  | Mark as read         |

---

## Inter-Service Communication

| From        | To           | Method       | Purpose                                        |
| ----------- | ------------ | ------------ | ---------------------------------------------- |
| Gateway     | All services | HTTP Proxy   | Route external requests                        |
| Submissions | Redis        | BullMQ Queue | Produce evaluation jobs                        |
| Worker      | Redis        | BullMQ Queue | Consume evaluation jobs                        |
| Worker      | Evaluation   | HTTP POST    | Send code for execution                        |
| Worker      | MongoDB      | Direct       | Update submission status, create notifications |

---

## Environment Variables

Each service has its own `.env.example`. Common variables:

| Variable                 | Used By             | Description                                            |
| ------------------------ | ------------------- | ------------------------------------------------------ |
| `JWT_SECRET`             | All services        | Must be **identical** across services for auth to work |
| `MONGO_URI`              | Each service        | Can be same DB or separate per service                 |
| `REDIS_URL`              | Submissions, Worker | Redis connection for BullMQ                            |
| `EVALUATION_SERVICE_URL` | Worker              | FastAPI service URL                                    |
| `GOOGLE_CLIENT_ID`       | Auth                | Google OAuth                                           |
| `GOOGLE_CLIENT_SECRET`   | Auth                | Google OAuth                                           |
| `CLIENT_URL`             | Auth                | Frontend URL for OAuth redirect                        |

---

## Shared Package

`packages/shared` contains utilities shared across all Node.js services:

- **Response helpers** — `ok()`, `created()`, `badRequest()`, `unauthorized()`, `notFound()`, `serverError()`
- **Auth middleware** — `authenticate(jwtSecret)` — JWT verification
- **Error handler** — Express error middleware
- **Logger** — Simple console logger
- **Validate middleware** — Zod schema validation

Services reference it via `"@devpractice/shared": "file:../../packages/shared"` in their package.json.

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

---

## License

[MIT](./LICENSE)
