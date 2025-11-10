# 🔥 Crucible

A minimal crossword puzzle creator and sharing platform.

![me every day](https://media.tenor.com/xzjlrhYq_lQAAAAj/cat-nyan-cat.gif)

## Quick Start

### Prerequisites

- Python 3.9+ with [Poetry](https://python-poetry.org/docs/#installation)
- Node.js 18+
- Docker

### 1. Start Database

```bash
docker-compose up -d
```

### 2. Setup Environment

```bash
cd backend && cp .env.example .env
cd ../frontend && cp .env.example .env.local
```

### 3. Install & Initialize

```bash
# Backend
cd backend
poetry install --no-root
poetry run python setup_db.py

# Frontend
cd ../frontend
npm install
```

### 4. Run

```bash
# Use the start script
./start.sh

# Or manually:
# Terminal 1: cd backend && poetry run uvicorn app.main:app --reload --port 8000
# Terminal 2: cd frontend && npm run dev -- -p 4000
```

### 5. Use

- Frontend: `http://localhost:4000`
- Backend API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`

## Environment Configuration

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://crucible_user:crucible_pass@localhost:5432/crucible
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=http://localhost:4000
SECRET_KEY=your-secret-key-here
ENVIRONMENT=development
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment

### Backend

1. Update environment variables for production
2. Set `ENVIRONMENT=production`
3. Deploy: `poetry run uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Frontend

1. Set `NEXT_PUBLIC_API_URL` to production backend URL
2. Build: `npm run build`
3. Deploy `.next` directory

## Tech Stack

- **Backend**: FastAPI, PostgreSQL, SQLAlchemy, Poetry
- **Frontend**: Next.js 14, TypeScript
- **Design**: Minimal CSS, Verdana font, HN-inspired

## Database Schema

See [`backend/DDL/schema.sql`](backend/DDL/schema.sql) for complete schema:
- `users` - User accounts with bcrypt password hashing
- `puzzles` - Crossword puzzles with share tokens
- `hints` - Clues for across and down
- `password_reset_tokens` - Password reset functionality

## API Endpoints

Full documentation at `http://localhost:8000/docs`

**Auth:**
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/password-reset-request`
- `POST /api/v1/auth/password-reset`

**Puzzles:**
- `POST /api/v1/puzzles` - Create
- `GET /api/v1/puzzles/{id}` - Get by ID
- `GET /api/v1/puzzles/share/{token}` - Get by share token
- `PUT /api/v1/puzzles/{id}` - Update
- `DELETE /api/v1/puzzles/{id}` - Delete
- `GET /api/v1/users/{id}/puzzles` - List user's puzzles
- `POST /api/v1/puzzles/{id}/validate` - Validate solution

## Troubleshooting

**Database connection issues:**
```bash
docker ps  # Check if postgres is running
docker-compose up -d  # Start if not running
```

**Port conflicts:**
```bash
# Change backend port
poetry run uvicorn app.main:app --reload --port 8001

# Change frontend port
npm run dev -- -p 4001
```

**Reset database:**
```bash
docker-compose down -v
docker-compose up -d
cd backend && poetry run python setup_db.py
```

---

![me on crucible](https://i.pinimg.com/736x/d9/76/b0/d976b06133a5e078da9c52ffa01777be.jpg)
