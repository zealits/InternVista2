# Ubuntu Server Setup Guide

## System Requirements

Since you're running the Node.js app directly on Ubuntu (not in Docker), here are the required system dependencies:

### 1. Node.js and pnpm

```bash
# Install Node.js 18+ (using NodeSource repository)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Verify installations
node --version  # Should be 18.x or higher
pnpm --version
```

### 2. Build Tools (for native module compilation)

```bash
# Install build essentials (needed for some npm packages)
sudo apt-get update
sudo apt-get install -y build-essential python3
```

### 3. Docker and Docker Compose (for browserless/chrome)

Since you're using `browserless/chrome` for PDF generation, you need Docker to run it:

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt-get install -y docker-compose-plugin

# Add your user to docker group (to run without sudo)
sudo usermod -aG docker $USER

# Verify Docker installation
docker --version
docker compose version
```

### 4. Start browserless/chrome Container

You need to run the browserless/chrome container for PDF generation:

```bash
# Create a docker-compose file for chrome service
cat > docker-compose.chrome.yml << 'EOF'
version: "3.8"
services:
  chrome:
    image: browserless/chrome:1.61.0-puppeteer-21.4.1
    restart: unless-stopped
    ports:
      - "8080:3000"
    environment:
      TOKEN: your_chrome_token_here
      EXIT_ON_HEALTH_FAILURE: true
      PRE_REQUEST_HEALTH_CHECK: true
      KEEP_ALIVE: true
      CONNECTION_TIMEOUT: 10000
EOF

# Start the chrome service
docker compose -f docker-compose.chrome.yml up -d

# Verify it's running
docker ps | grep chrome
```

### 5. Environment Variables

Make sure your `.env` file has the correct Chrome connection URL:

```bash
# If chrome is running on the same server
CHROME_URL=ws://localhost:8080
CHROME_TOKEN=your_chrome_token_here

# Or if chrome is running on a different server
CHROME_URL=ws://your-chrome-server-ip:8080
CHROME_TOKEN=your_chrome_token_here
```

### 6. PM2 Setup (if not already installed)

```bash
# Install PM2 globally
npm install -g pm2

# Start your app with PM2
pm2 start dist/apps/server/main.js --name InternVista

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

## Verification Steps

1. **Check Chrome container is running:**

   ```bash
   docker ps | grep chrome
   curl http://localhost:8080/health
   ```

2. **Test Chrome connection from your app:**

   ```bash
   # Check if your app can connect to chrome
   # Visit: http://your-server:3000/api/health
   # Should show browser status
   ```

3. **Check PM2 logs:**
   ```bash
   pm2 logs InternVista
   ```

## Troubleshooting

### If Chrome container fails to start:

```bash
# Check Docker logs
docker logs <chrome-container-id>

# Check if port 8080 is available
sudo netstat -tulpn | grep 8080
```

### If connection to Chrome fails:

- Verify `CHROME_URL` in your `.env` matches the container port
- Check firewall rules allow connection to port 8080
- Verify `CHROME_TOKEN` matches the container's `TOKEN` environment variable

### If you get "Target closed" errors:

- Check Chrome container logs: `docker logs <chrome-container-id>`
- Verify Chrome container has enough resources (memory/CPU)
- Check the fixes we made in `printer.service.ts` are deployed

## Optional: Additional System Libraries

If you encounter any issues with native modules, you might need:

```bash
sudo apt-get install -y \
  libnss3 \
  libatk-bridge2.0-0 \
  libdrm2 \
  libxkbcommon0 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrandr2 \
  libgbm1 \
  libasound2
```

However, since you're using `puppeteer.connect()` (not launching Chrome directly), these shouldn't be necessary.
