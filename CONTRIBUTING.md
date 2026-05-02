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

```bash
cp apps/api/.env.example apps/api/.env
# fill in your local values

cd apps/api
npm install
npm run dev
```

### 3. Create a branch

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/your-bug-name
```

---

## Branch Naming

| Type | Pattern | Example |
|---|---|---|
| Feature | `feat/<name>` | `feat/problem-tags-filter` |
| Bug fix | `fix/<name>` | `fix/login-token-expiry` |
| Docs | `docs/<name>` | `docs/api-reference` |
| Refactor | `refactor/<name>` | `refactor/auth-service` |

---

## Commit Style

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add problem difficulty filter
fix: handle duplicate email on register
docs: update API reference for submissions
refactor: split auth controller into separate files
```

---

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR
- Write a clear description of what changed and why
- Reference any related issue: `Closes #42`
- Make sure the server starts without errors before submitting
- Don't commit `.env` files or secrets

---

## Project Structure

```
dev-practice/
├── apps/
│   ├── api/          # Node.js Express backend (start here)
│   └── evaluation/   # FastAPI evaluation service (Python)
├── infra/            # Docker, environment configs
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

Each module inside `apps/api/src/modules/` follows this pattern:

```
<module>/
├── <module>.model.js       # Mongoose schema
├── <module>.service.js     # Business logic + DB access
├── <module>.routes.js      # Express routes
└── <module>.controller.js  # Request/response handlers
```

---

## Good First Issues

Look for issues tagged `good first issue` on GitHub. These are well-scoped tasks that don't require deep knowledge of the codebase.

Current open areas:
- Input validation with Zod on all routes
- Admin role check on problem creation
- BullMQ worker for evaluation service
- FastAPI evaluation service implementation
- Docker runner Dockerfiles

---

## Code Style

- Use ES modules (`import`/`export`) — no `require()`
- Keep functions small and focused
- No TypeScript — plain JavaScript only
- Follow existing naming conventions (camelCase for variables, kebab-case for files)
- Always use the response helpers from `utils/response.js`

---

## Questions?

Open a GitHub Discussion or file an issue with the `question` label.
