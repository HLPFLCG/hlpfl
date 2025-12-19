# Cloudflare Deployment Guide for HLPFL Platform

## Overview

This guide covers deploying both the backend (Cloudflare Workers) and frontend (Cloudflare Pages) for the HLPFL platform.

---

## Prerequisites

1. **Cloudflare Account** - Sign up at https://dash.cloudflare.com
2. **Domain** - You'll need a domain (e.g., hlpfl.org)
3. **Wrangler CLI** - Install globally: `npm install -g wrangler`
4. **GitHub Account** - For CI/CD automation

---

## Part 1: Backend Deployment (Cloudflare Workers)

### Step 1: Authenticate with Cloudflare

```bash
wrangler login
```

This will open a browser window to authenticate.

### Step 2: Create D1 Database

```bash
# Create the database
wrangler d1 create hlpfl-db

# Copy the database ID from the output
# Update wrangler.toml with the database ID
```

Update `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "hlpfl-db"
database_id = "YOUR_DATABASE_ID_HERE"  # Replace with actual ID
```

### Step 3: Run Database Migrations

```bash
# Run migrations
wrangler d1 execute hlpfl-db --file=./migrations/0001_initial_schema.sql
wrangler d1 execute hlpfl-db --file=./migrations/0002_password_resets.sql
```

### Step 4: Create R2 Bucket

```bash
# Create R2 bucket for media storage
wrangler r2 bucket create hlpfl-media
```

Update `wrangler.toml`:
```toml
[[r2_buckets]]
binding = "R2"
bucket_name = "hlpfl-media"
```

### Step 5: Set Secrets

```bash
# Generate a secure JWT secret
openssl rand -base64 32

# Set the JWT secret
wrangler secret put JWT_SECRET
# Paste your generated secret when prompted

# Set AI API key (optional)
wrangler secret put AI_API_KEY
# Paste your OpenAI API key when prompted
```

### Step 6: Deploy Backend

```bash
# Deploy to production
wrangler deploy

# Your API will be available at:
# https://hlpfl.<your-subdomain>.workers.dev
```

### Step 7: Configure Custom Domain

1. Go to Cloudflare Dashboard → Workers & Pages
2. Select your worker (`hlpfl`)
3. Go to Settings → Triggers
4. Add custom domain: `api.hlpfl.org`

---

## Part 2: Frontend Deployment (Cloudflare Pages)

### Step 1: Build Frontend

```bash
cd frontend
npm install
npm run build
```

### Step 2: Deploy to Cloudflare Pages

#### Option A: Using Wrangler CLI

```bash
# From the frontend directory
npx wrangler pages deploy .next --project-name=hlpfl-frontend
```

#### Option B: Using Cloudflare Dashboard

1. Go to Cloudflare Dashboard → Pages
2. Click "Create a project"
3. Connect to your GitHub repository
4. Configure build settings:
   - **Build command**: `cd frontend && npm install && npm run build`
   - **Build output directory**: `frontend/.next`
   - **Root directory**: `/`

### Step 3: Set Environment Variables

In Cloudflare Pages dashboard:

1. Go to Settings → Environment variables
2. Add production variables:
   ```
   NEXT_PUBLIC_API_URL = https://api.hlpfl.org
   NEXT_PUBLIC_APP_NAME = HLPFL
   NEXT_PUBLIC_APP_URL = https://portal.hlpfl.org
   ```

### Step 4: Configure Custom Domain

1. In Cloudflare Pages, go to Custom domains
2. Add domain: `portal.hlpfl.org`
3. Cloudflare will automatically configure DNS

---

## Part 3: GitHub Actions CI/CD

### Step 1: Set GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

```
CLOUDFLARE_API_TOKEN - Your Cloudflare API token
CLOUDFLARE_ACCOUNT_ID - Your Cloudflare account ID
NEXT_PUBLIC_API_URL - https://api.hlpfl.org
```

### Step 2: Get Cloudflare API Token

1. Go to Cloudflare Dashboard → My Profile → API Tokens
2. Click "Create Token"
3. Use template "Edit Cloudflare Workers"
4. Add permissions:
   - Account → Cloudflare Pages → Edit
   - Account → D1 → Edit
   - Zone → Workers Routes → Edit
5. Copy the token

### Step 3: Get Account ID

1. Go to Cloudflare Dashboard
2. Select any domain
3. Scroll down on the Overview page
4. Copy your Account ID from the right sidebar

### Step 4: Verify Workflows

The repository includes two workflows:

1. **Backend Deployment** (`.github/workflows/deploy-backend.yml`)
   - Triggers on changes to `src/`, `migrations/`, `wrangler.toml`
   - Runs type checking
   - Deploys to Cloudflare Workers

2. **Frontend Deployment** (`.github/workflows/deploy-frontend.yml`)
   - Triggers on changes to `frontend/`
   - Builds Next.js app
   - Deploys to Cloudflare Pages

---

## Part 4: DNS Configuration

### For Backend API (api.hlpfl.org)

This is automatically configured when you add a custom domain to your Worker.

### For Frontend (portal.hlpfl.org)

This is automatically configured when you add a custom domain to Cloudflare Pages.

### Verify DNS Records

Your DNS should have these records:

```
Type    Name        Content
CNAME   api         hlpfl.workers.dev
CNAME   portal      hlpfl-frontend.pages.dev
```

---

## Part 5: Testing Deployment

### Test Backend API

```bash
# Health check
curl https://api.hlpfl.org/health

# Should return:
# {"status":"healthy","timestamp":"..."}
```

### Test Frontend

1. Visit https://portal.hlpfl.org
2. You should see the landing page
3. Try registering an account
4. Login and access the dashboard

---

## Part 6: Monitoring & Logs

### Backend Logs

```bash
# View real-time logs
wrangler tail

# View logs in dashboard
# Go to Workers & Pages → Your Worker → Logs
```

### Frontend Logs

1. Go to Cloudflare Pages dashboard
2. Select your project
3. Click on "Deployments"
4. View deployment logs

### Analytics

Both Workers and Pages have built-in analytics:

1. **Workers Analytics**: Dashboard → Workers & Pages → Your Worker → Analytics
2. **Pages Analytics**: Dashboard → Pages → Your Project → Analytics

---

## Part 7: Database Management

### View Database

```bash
# List all databases
wrangler d1 list

# Query database
wrangler d1 execute hlpfl-db --command="SELECT * FROM users LIMIT 10"
```

### Backup Database

```bash
# Export database
wrangler d1 export hlpfl-db --output=backup.sql
```

### Run Additional Migrations

```bash
# Create new migration file
# migrations/0003_new_feature.sql

# Run migration
wrangler d1 execute hlpfl-db --file=./migrations/0003_new_feature.sql
```

---

## Part 8: Scaling & Performance

### Backend Scaling

Cloudflare Workers automatically scale:
- No configuration needed
- Handles millions of requests
- Global edge network (300+ locations)

### Frontend Scaling

Cloudflare Pages automatically scale:
- Global CDN
- Automatic caching
- DDoS protection

### Performance Optimization

1. **Enable Caching**
   - Workers: Use Cache API
   - Pages: Automatic caching

2. **Optimize Images**
   - Use Cloudflare Images
   - Automatic optimization

3. **Monitor Performance**
   - Use Cloudflare Analytics
   - Set up alerts

---

## Part 9: Cost Estimation

### Free Tier Limits

**Workers:**
- 100,000 requests/day
- 10ms CPU time per request

**Pages:**
- 500 builds/month
- Unlimited requests
- Unlimited bandwidth

**D1:**
- 5GB storage
- 5 million reads/day
- 100,000 writes/day

**R2:**
- 10GB storage
- Class A operations: 1 million/month
- Class B operations: 10 million/month

### Paid Tier (if needed)

**Workers Paid ($5/month):**
- 10 million requests/month included
- $0.50 per additional million

**D1 Paid:**
- $0.75 per GB storage/month
- $0.001 per 1,000 reads
- $1.00 per million writes

**R2 Paid:**
- $0.015 per GB storage/month
- Operations: Very low cost

### Estimated Monthly Cost

**For 10,000 active users:**
- Workers: $5-15
- D1: $5-10
- R2: $5-20
- **Total: $15-45/month**

---

## Part 10: Troubleshooting

### Common Issues

**1. Database not found**
```bash
# Verify database exists
wrangler d1 list

# Check wrangler.toml has correct database_id
```

**2. Secrets not set**
```bash
# List secrets
wrangler secret list

# Set missing secrets
wrangler secret put JWT_SECRET
```

**3. Build fails**
```bash
# Check Node version
node --version  # Should be 18+

# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

**4. CORS errors**
```bash
# Verify CORS settings in src/index.ts
# Add your frontend domain to allowed origins
```

**5. 404 errors**
```bash
# Verify routes are configured
# Check wrangler.toml routes
```

---

## Part 11: Security Best Practices

### 1. Rotate Secrets Regularly

```bash
# Generate new JWT secret
openssl rand -base64 32

# Update secret
wrangler secret put JWT_SECRET
```

### 2. Enable Rate Limiting

Already implemented in the backend middleware.

### 3. Use Environment Variables

Never commit secrets to Git. Always use:
- Wrangler secrets for backend
- Cloudflare Pages environment variables for frontend

### 4. Monitor Access Logs

Regularly check logs for suspicious activity.

### 5. Keep Dependencies Updated

```bash
# Check for updates
npm outdated

# Update dependencies
npm update
```

---

## Part 12: Rollback Procedure

### Rollback Backend

```bash
# List deployments
wrangler deployments list

# Rollback to previous version
wrangler rollback [deployment-id]
```

### Rollback Frontend

1. Go to Cloudflare Pages dashboard
2. Select your project
3. Go to Deployments
4. Find previous successful deployment
5. Click "Rollback to this deployment"

---

## Part 13: Custom Domain Setup

### Add Domain to Cloudflare

1. Go to Cloudflare Dashboard
2. Click "Add a site"
3. Enter your domain (e.g., hlpfl.org)
4. Choose a plan (Free is fine)
5. Update nameservers at your domain registrar

### Configure Subdomains

Once domain is active:

1. **API (api.hlpfl.org)**
   - Automatically configured via Workers custom domain

2. **Portal (portal.hlpfl.org)**
   - Automatically configured via Pages custom domain

3. **Main Site (hlpfl.org)**
   - Point to Pages or Workers as needed

---

## Part 14: Monitoring & Alerts

### Set Up Alerts

1. Go to Cloudflare Dashboard → Notifications
2. Create alerts for:
   - High error rates
   - Unusual traffic patterns
   - Quota limits approaching

### Health Checks

Set up external monitoring:
- UptimeRobot
- Pingdom
- StatusCake

Monitor these endpoints:
- https://api.hlpfl.org/health
- https://portal.hlpfl.org

---

## Quick Reference Commands

```bash
# Backend
wrangler login
wrangler d1 create hlpfl-db
wrangler d1 execute hlpfl-db --file=./migrations/0001_initial_schema.sql
wrangler r2 bucket create hlpfl-media
wrangler secret put JWT_SECRET
wrangler deploy
wrangler tail  # View logs

# Frontend
cd frontend
npm install
npm run build
npx wrangler pages deploy .next --project-name=hlpfl-frontend

# Database
wrangler d1 list
wrangler d1 execute hlpfl-db --command="SELECT * FROM users"
wrangler d1 export hlpfl-db --output=backup.sql

# Monitoring
wrangler tail  # Real-time logs
wrangler deployments list  # List deployments
```

---

## Support

- **Cloudflare Docs**: https://developers.cloudflare.com
- **Wrangler Docs**: https://developers.cloudflare.com/workers/wrangler/
- **Community**: https://community.cloudflare.com
- **HLPFL Support**: dev@hlpfl.org

---

**Status**: Ready for Deployment  
**Estimated Setup Time**: 30-60 minutes  
**Difficulty**: Intermediate  

---

*Deploy with confidence!* 🚀