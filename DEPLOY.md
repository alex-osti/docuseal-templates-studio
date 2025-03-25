# DocuSeal Template Builder Deployment Guide

## Prerequisites
- Docker installed on server
- Coolify account
- DocuSeal API key from https://docuseal.makertoo.win/settings/api

## Step 1: Prepare Coolify
1. Create new project in Coolify
2. Select "Import from Git Repository" 
3. Connect your Git repository containing this project

## Step 2: Configure Environment Variables
Set these in Coolify's environment variables section:
```
DOCUSEAL_API_KEY=your_api_key_here
NODE_ENV=production
PORT=3000
MCP_PORT=3001
```

## Step 3: Docker Deployment
1. Coolify will automatically detect the docker-compose.yml
2. Configure these settings:
   - Resource limits: Minimum 1GB RAM
   - Enable auto-update
   - Set health check path: /api/health

## Step 4: Networking
1. Expose ports 3000 (frontend) and 3001 (MCP)
2. Set up HTTPS with Let's Encrypt
3. Configure domain:
   - Frontend: template-builder.yourdomain.com
   - MCP: mcp.yourdomain.com

## Step 5: Deployment
1. Click "Deploy" in Coolify
2. Monitor logs for initialization
3. Verify at https://template-builder.yourdomain.com

## Post-Deployment
1. Set up backups for the database (if added later)
2. Configure monitoring alerts
3. Enable logging to external service