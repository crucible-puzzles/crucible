#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Pull latest changes
echo "📥 Pulling latest code..."
git pull origin main

# Rebuild and restart containers
echo "🔨 Rebuilding containers..."
docker-compose -f docker-compose.prod.yml build

echo "♻️  Restarting services..."
docker-compose -f docker-compose.prod.yml up -d

# Clean up old images
echo "🧹 Cleaning up old images..."
docker image prune -f

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Service status:"
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "📝 View logs with: docker-compose -f docker-compose.prod.yml logs -f"