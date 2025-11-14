#!/bin/bash
set -e

# Create backup directory if it doesn't exist
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

# Generate timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Backup database
echo "📦 Creating database backup..."
docker exec crucible-postgres pg_dump -U crucible_user crucible > "$BACKUP_DIR/backup_$TIMESTAMP.sql"

echo "✅ Backup created: $BACKUP_DIR/backup_$TIMESTAMP.sql"

# Keep only last 10 backups
echo "🧹 Cleaning old backups (keeping last 10)..."
cd $BACKUP_DIR
ls -t backup_*.sql | tail -n +11 | xargs -r rm --

echo "✅ Backup complete!"