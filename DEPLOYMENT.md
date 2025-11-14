# 🚀 Crucible Deployment Guide

Complete guide for deploying Crucible to your Ubuntu server using Docker.

## 📋 Prerequisites

- Ubuntu server with Docker and Docker Compose installed
- Git installed on the server
- Domain name (optional, but recommended for SSL)

## 🔧 Initial Setup

### 1. Install Docker (if not already installed)

```bash
# Update package index
sudo apt-get update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt-get install docker-compose-plugin

# Add your user to docker group (to run without sudo)
sudo usermod -aG docker $USER
newgrp docker
```

### 2. Clone Repository

```bash
git clone <your-repository-url> crucible
cd crucible
```

### 3. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Generate secure credentials
echo "SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_urlsafe(32))')"
echo "DB_PASSWORD=$(openssl rand -base64 32)"

# Edit .env with your values
nano .env
```

Update `.env` with:
- Your generated `SECRET_KEY`
- Your generated `DB_PASSWORD`
- Your server IP or domain for `BACKEND_URL` and `FRONTEND_URL`

Example `.env`:
```env
DB_PASSWORD=xK9mP2nQ5vR8wT1yU4zB7cD0eF3gH6jL
SECRET_KEY=AbCdEfGhIjKlMnOpQrStUvWxYz0123456789
BACKEND_URL=http://192.168.1.100:8000
FRONTEND_URL=http://192.168.1.100
```

### 4. Deploy Application

```bash
# Build and start all services
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for services to start (about 30 seconds)
sleep 30

# Initialize the database
docker exec crucible-backend python setup_db.py

# Check service status
docker-compose -f docker-compose.prod.yml ps
```

### 5. Verify Deployment

```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs -f

# Test backend health
curl http://localhost:8000/health

# Test frontend (should return HTML)
curl http://localhost
```

Your app should now be accessible at:
- **Frontend**: `http://your-server-ip`
- **Backend API**: `http://your-server-ip:8000`
- **API Docs**: `http://your-server-ip:8000/docs`

## 🔄 Updating & Redeploying

### Quick Update

```bash
# Make scripts executable (first time only)
chmod +x deploy.sh backup.sh restore.sh

# Deploy updates
./deploy.sh
```

### Manual Update

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Clean up old images
docker image prune -f
```

## 💾 Backup & Restore

### Create Backup

```bash
./backup.sh
```

Backups are stored in `./backups/` directory.

### Restore from Backup

```bash
# List available backups
ls -lh backups/

# Restore specific backup
./restore.sh backups/backup_20250111_120000.sql
```

## 🔒 Security Setup

### 1. Configure Firewall

```bash
# Allow HTTP, HTTPS, and SSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### 2. Setup SSL with Let's Encrypt (Optional but Recommended)

```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot

# Stop nginx temporarily
docker-compose -f docker-compose.prod.yml stop nginx

# Get certificate (replace with your domain)
sudo certbot certonly --standalone -d yourdomain.com

# Create SSL directory
mkdir -p ssl

# Copy certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./ssl/key.pem
sudo chown $USER:$USER ./ssl/*.pem

# Update nginx.conf to enable HTTPS (uncomment the HTTPS server block)
nano nginx.conf

# Restart nginx
docker-compose -f docker-compose.prod.yml start nginx
```

### 3. Update Environment for HTTPS

Edit `.env`:
```env
BACKEND_URL=https://yourdomain.com/api
FRONTEND_URL=https://yourdomain.com
```

Rebuild frontend:
```bash
docker-compose -f docker-compose.prod.yml build frontend
docker-compose -f docker-compose.prod.yml up -d frontend
```

## 📊 Monitoring & Maintenance

### View Logs

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f postgres
```

### Check Service Status

```bash
docker-compose -f docker-compose.prod.yml ps
```

### Restart Services

```bash
# Restart all services
docker-compose -f docker-compose.prod.yml restart

# Restart specific service
docker-compose -f docker-compose.prod.yml restart backend
```

### Stop Services

```bash
docker-compose -f docker-compose.prod.yml stop
```

### Start Services

```bash
docker-compose -f docker-compose.prod.yml start
```

### Complete Teardown

```bash
# Stop and remove containers (keeps data)
docker-compose -f docker-compose.prod.yml down

# Stop and remove everything including data
docker-compose -f docker-compose.prod.yml down -v
```

## 🐛 Troubleshooting

### Services Won't Start

```bash
# Check logs for errors
docker-compose -f docker-compose.prod.yml logs

# Check if ports are already in use
sudo netstat -tulpn | grep -E ':(80|443|8000|3000|5432)'

# Restart Docker daemon
sudo systemctl restart docker
```

### Database Connection Issues

```bash
# Check if postgres is healthy
docker-compose -f docker-compose.prod.yml ps postgres

# Restart postgres
docker-compose -f docker-compose.prod.yml restart postgres

# Check postgres logs
docker-compose -f docker-compose.prod.yml logs postgres
```

### Frontend Can't Connect to Backend

1. Check `.env` file has correct `NEXT_PUBLIC_API_URL`
2. Rebuild frontend: `docker-compose -f docker-compose.prod.yml build frontend`
3. Restart frontend: `docker-compose -f docker-compose.prod.yml up -d frontend`

### Out of Disk Space

```bash
# Remove unused Docker resources
docker system prune -a

# Remove old backups
rm backups/backup_*.sql
```

## 📝 Useful Commands

```bash
# Access backend shell
docker exec -it crucible-backend bash

# Access frontend shell
docker exec -it crucible-frontend sh

# Access postgres shell
docker exec -it crucible-postgres psql -U crucible_user -d crucible

# View resource usage
docker stats

# Export database
docker exec crucible-postgres pg_dump -U crucible_user crucible > export.sql

# Import database
docker exec -i crucible-postgres psql -U crucible_user crucible < export.sql
```

## 🔄 Automated Backups (Optional)

Set up daily backups with cron:

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * cd /path/to/crucible && ./backup.sh >> /var/log/crucible-backup.log 2>&1
```

## 🌐 Domain Setup

If using a domain name:

1. Point your domain's A record to your server IP
2. Update `.env` with your domain
3. Set up SSL certificates (see Security Setup above)
4. Update `nginx.conf` to use your domain in `server_name`

## 📞 Support

For issues:
1. Check logs: `docker-compose -f docker-compose.prod.yml logs -f`
2. Verify environment variables in `.env`
3. Ensure all services are running: `docker-compose -f docker-compose.prod.yml ps`
4. Check firewall settings: `sudo ufw status`

---

**Happy Deploying! 🎉**