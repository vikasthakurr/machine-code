# Contributing to DevPractice

Thanks for your interest in contributing. This document covers everything you need to get started.

---

## Ways to Contribute

- Fix bugs
- Implement features from the roadmap
- Improve documentation
- Add problems to the problem bank
- Write tests
- Report issues

---

## Getting Started

### 1. Fork and clone

```bash
git clone https://github.com/<your-username>/dev-practice.git
cd dev-practice
```

### 2. Set up the project

**With Docker (recommended):**

```bash
npm run docker:build-runners
docker compose up --build
```

**Without Docker:**

```bash
# Install all services
npm run install:all

# Copy env files for each service
cp services/auth/.env.example services/auth/.env
cp services/problems/.env.example services/problems/.env
cp services/submissions/.env.example services/submissions/.env
cp services/execution/.env.example services/execution/.env
cp services/notifications/.env.example services/notifications/.env
cp services/worker/.env.example services/worker/.env
cp services/gateway/.env.example services/gateway/.env

# Fill in your values, then start services (each in a separate terminal)
npm run dev:gateway
npm run dev:auth
npm run dev:problems
npm run dev:submissions
npm run dev:execution
npm run dev:notifications
npm run dev:worker
```

### 3. Create a branch

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/your-bug-name
```

---

## Architecture Overview

This is a microservices monorepo. Each service runs independently with its own database connection.

```
services/
├── gateway/         → API Gateway (port 3000) — routes requests
├── auth/            → Auth service (port 3001)
├── problems/        → Problems service (port 3002)
├── submissions/     → Submissions service (port 3003)
├── execution/       → Execution results service (port 3004)
├── notifications/   → Notifications service (port 3005)
├── worker/          → BullMQ consumer (no HTTP port)
└── evaluation/      → FastAPI evaluator (port 8000)
```

**Shared code** lives in `packages/shared/` and is referenced by services as a file dependency.

---

## Branch Naming

| Type     | Pattern           | Example                    |
| -------- | ----------------- | -------------------------- |
| Feature  | `feat/<name>`     | `feat/problem-tags-filter` |
| Bug fix  | `fix/<name>`      | `fix/login-token-expiry`   |
| Docs     | `docs/<name>`     | `docs/api-reference`       |
| Refactor | `refactor/<name>` | `refactor/auth-service`    |

---

## Commit Style

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(auth): add password reset flow
fix(submissions): handle duplicate submission race condition
docs: update architecture diagram
refactor(worker): improve error retry logic
```

---

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR
- Write a clear description of what changed and why
- Reference any related issue: `Closes #42`
- Make sure the affected service starts without errors before submitting
- Don't commit `.env` files or secrets

---

## Service Structure

Each Node.js service follows this pattern:

```
service/
├── src/
│   ├── config/         # env.js, db.js
│   ├── controllers/    # Request/response handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   ├── services/       # Business logic + DB access
│   ├── app.js          # Express app setup
│   └── server.js       # Bootstrap + listen
├── .env.example
├── Dockerfile
└── package.json
```

---

## Working on a Specific Service

If you're working on a single service, you only need to run that service plus its dependencies:

```bash
# Example: working on the auth service
# You need: MongoDB running + auth service
cd services/auth
npm install
cp .env.example .env
npm run dev
```

To test through the gateway, also run:

```bash
cd services/gateway
npm install
npm run dev
```

---

## Code Style

- Use ES modules (`import`/`export`) — no `require()`
- Keep functions small and focused
- No TypeScript — plain JavaScript only
- Follow existing naming conventions (camelCase for variables, kebab-case for files)
- Always use the response helpers from `@devpractice/shared`
- The `JWT_SECRET` must be the same across all services for auth to work

---

## Good First Issues

Look for issues tagged `good first issue` on GitHub. Current open areas:

- Input validation with Zod on all routes
- Admin role check on problem creation
- Rate limiting on the gateway
- Test cases comparison in evaluation service
- Health check aggregation in the gateway

---

## Questions?

Open a GitHub Discussion or file an issue with the `question` label.
