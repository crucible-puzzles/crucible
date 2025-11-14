#!/bin/bash
set -e

# Check if backup file is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide a backup file"
    echo "Usage: ./restore.sh backups/backup_YYYYMMDD_HHMMSS.sql"
    echo ""
    echo "Available backups:"
    ls -lh backups/backup_*.sql 2>/dev/null || echo "No backups found"
    exit 1
fi

BACKUP_FILE=$1

# Check if file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Error: Backup file not found: $BACKUP_FILE"
    exit 1
fi

echo "⚠️  WARNING: This will replace the current database with the backup!"
echo "Backup file: $BACKUP_FILE"
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Restore cancelled"
    exit 0
fi

echo "🔄 Restoring database from backup..."
docker exec -i crucible-postgres psql -U crucible_user crucible < "$BACKUP_FILE"

echo "✅ Database restored successfully!"
echo "🔄 Restarting backend service..."
docker-compose -f docker-compose.prod.yml restart backend

echo "✅ Restore complete!"