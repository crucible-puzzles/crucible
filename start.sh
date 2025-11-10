#!/bin/bash

# Crucible Quick Start Script

echo "🔥 Starting Crucible..."
echo ""

# Setup backend environment
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend .env file..."
    cp backend/.env.example backend/.env
    echo "   Please update backend/.env with your database credentials"
fi

# Setup frontend environment
if [ ! -f "frontend/.env.local" ]; then
    echo "📝 Creating frontend .env.local file..."
    cp frontend/.env.example frontend/.env.local
fi

# Check if Poetry is installed
if ! command -v poetry &> /dev/null; then
    echo "❌ Poetry is not installed. Please install it first:"
    echo "   curl -sSL https://install.python-poetry.org | python3 -"
    exit 1
fi

# Install backend dependencies with Poetry
if [ ! -d "backend/.venv" ]; then
    echo "📦 Installing backend dependencies with Poetry..."
    cd backend && poetry install && cd ..
fi

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

# Start backend in background
echo "🚀 Starting backend server on port 8000..."
cd backend
poetry run uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🚀 Starting frontend server on port 4000..."
cd frontend
npm run dev -- -p 4000 &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Crucible is running!"
echo ""
echo "Frontend: http://localhost:4000"
echo "Backend API: http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait