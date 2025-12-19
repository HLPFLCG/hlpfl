# 🚀 Complete Cloudflare Deployment Guide

This guide will walk you through setting up and deploying the HLPFL platform to Cloudflare.

---

## 📋 Prerequisites

1. **Cloudflare Account**: Sign up at https://dash.cloudflare.com
2. **Wrangler CLI**: Install globally
   ```bash
   npm install -g wrangler
   ```
3. **Node.js**: Version 20+ installed
4. **Domain**: You'll need `hlpfl.org` configured in Cloudflare

---

## 🔐 Step 1: Authenticate with Cloudflare

```bash
# Login to Cloudflare
wrangler login

# This will open a browser window to authenticate
# Click "Allow" to grant access
```

After authentication, get your Account ID:
```bash
wrangler whoami
# Copy your Account ID - you'll need it
```

---

## 🗄️ Step 2: Create D1 Database

### Create Production Database
```bash
wrangler d1 create hlpfl-space-db
```

**Output will look like:**
```
✅ Successfully created DB 'hlpfl-space-db'
[[d1_databases]]
binding = "DB"
database_name = "hlpfl-space-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Copy the `database_id`** - you'll need it!

### Create Development Database
```bash
wrangler d1 create hlpfl-space-db-dev
```

Copy this `database_id` too!

### Create Staging Database
```bash
wrangler d1 create hlpfl-space-db-staging
```

Copy this `database_id` as well!

---

## 📦 Step 3: Create R2 Bucket (File Storage)

```bash
# Create production bucket
wrangler r2 bucket create hlpfl-space-media

# Create development bucket
wrangler r2 bucket create hlpfl-space-media-dev

# Create staging bucket
wrangler r2 bucket create hlpfl-space-media-staging
```

---

## 🔑 Step 4: Create KV Namespaces (Key-Value Storage)

### Rate Limiting KV
```bash
# Production
wrangler kv:namespace create RATE_LIMIT

# Development
wrangler kv:namespace create RATE_LIMIT --preview

# Staging
wrangler kv:namespace create RATE_LIMIT --env staging
```

**Copy all the IDs from the output!**

### Sessions KV
```bash
# Production
wrangler kv:namespace create SESSIONS

# Development
wrangler kv:namespace create SESSIONS --preview

# Staging
wrangler kv:namespace create SESSIONS --env staging
```

**Copy all the IDs from the output!**

---

## ⚙️ Step 5: Update Configuration Files

### Update `wrangler.toml`

Open `wrangler.toml` and replace the placeholder values:

```toml
name = "hlpfl-space"
main = "src/index.ts"
compatibility_date = "2024-01-01"
node_compat = true

# Replace with YOUR Account ID from Step 1
account_id = "YOUR_ACCOUNT_ID_HERE"

# Workers AI
[ai]
binding = "AI"

# D1 Database - Replace with YOUR database_id from Step 2
[[d1_databases]]
binding = "DB"
database_name = "hlpfl-space-db"
database_id = "YOUR_PRODUCTION_DATABASE_ID_HERE"

# R2 Storage
[[r2_buckets]]
binding = "MEDIA_BUCKET"
bucket_name = "hlpfl-space-media"

# KV Namespaces - Replace with YOUR KV IDs from Step 4
[[kv_namespaces]]
binding = "RATE_LIMIT"
id = "YOUR_RATE_LIMIT_KV_ID_HERE"

[[kv_namespaces]]
binding = "SESSIONS"
id = "YOUR_SESSIONS_KV_ID_HERE"

# Environment Variables
[vars]
ENVIRONMENT = "production"
API_VERSION = "v1"

# Routes - Update to use hlpfl.org
[routes]
pattern = "api.hlpfl.org/*"
zone_name = "hlpfl.org"

# Development Environment
[env.development]
name = "hlpfl-space-dev"
vars = { ENVIRONMENT = "development" }

[[env.development.d1_databases]]
binding = "DB"
database_name = "hlpfl-space-db-dev"
database_id = "YOUR_DEV_DATABASE_ID_HERE"

[[env.development.r2_buckets]]
binding = "MEDIA_BUCKET"
bucket_name = "hlpfl-space-media-dev"

[[env.development.kv_namespaces]]
binding = "RATE_LIMIT"
id = "YOUR_DEV_RATE_LIMIT_KV_ID_HERE"

[[env.development.kv_namespaces]]
binding = "SESSIONS"
id = "YOUR_DEV_SESSIONS_KV_ID_HERE"

# Staging Environment
[env.staging]
name = "hlpfl-space-staging"
vars = { ENVIRONMENT = "staging" }

[[env.staging.d1_databases]]
binding = "DB"
database_name = "hlpfl-space-db-staging"
database_id = "YOUR_STAGING_DATABASE_ID_HERE"

[[env.staging.r2_buckets]]
binding = "MEDIA_BUCKET"
bucket_name = "hlpfl-space-media-staging"

[[env.staging.kv_namespaces]]
binding = "RATE_LIMIT"
id = "YOUR_STAGING_RATE_LIMIT_KV_ID_HERE"

[[env.staging.kv_namespaces]]
binding = "SESSIONS"
id = "YOUR_STAGING_SESSIONS_KV_ID_HERE"
```

### Update `wrangler-frontend.toml`

```toml
name = "hlpfl-frontend"
compatibility_date = "2024-01-01"
pages_build_output_dir = "frontend/.next"

[env.production]
name = "hlpfl-frontend"
route = "portal.hlpfl.org/*"

[env.staging]
name = "hlpfl-frontend-staging"
route = "staging-portal.hlpfl.org/*"

[[env.production.vars]]
NEXT_PUBLIC_API_URL = "https://api.hlpfl.org"

[[env.staging.vars]]
NEXT_PUBLIC_API_URL = "https://staging-api.hlpfl.org"
```

---

## 🔒 Step 6: Set Environment Secrets

These are sensitive values that should NOT be in your config files:

```bash
# JWT Secret (generate a random 64-character string)
wrangler secret put JWT_SECRET
# When prompted, enter a secure random string

# Twitter/X API Keys
wrangler secret put TWITTER_CLIENT_ID
wrangler secret put TWITTER_CLIENT_SECRET

# LinkedIn API Keys
wrangler secret put LINKEDIN_CLIENT_ID
wrangler secret put LINKEDIN_CLIENT_SECRET

# Facebook API Keys
wrangler secret put FACEBOOK_APP_ID
wrangler secret put FACEBOOK_APP_SECRET

# Instagram API Keys
wrangler secret put INSTAGRAM_CLIENT_ID
wrangler secret put INSTAGRAM_CLIENT_SECRET

# OpenAI API Key (for AI features)
wrangler secret put OPENAI_API_KEY
```

**To generate a secure JWT secret:**
```bash
# On Linux/Mac
openssl rand -hex 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🗃️ Step 7: Initialize Database Schema

Run the database migrations:

```bash
# Production
wrangler d1 execute hlpfl-space-db --file=./migrations/0001_initial_schema.sql

# Development
wrangler d1 execute hlpfl-space-db-dev --file=./migrations/0001_initial_schema.sql --env development

# Staging
wrangler d1 execute hlpfl-space-db-staging --file=./migrations/0001_initial_schema.sql --env staging
```

**Verify the tables were created:**
```bash
wrangler d1 execute hlpfl-space-db --command="SELECT name FROM sqlite_master WHERE type='table';"
```

You should see all 16 tables listed.

---

## 🚀 Step 8: Deploy Backend Worker

```bash
# Make sure you're in the root directory
cd /path/to/hlpfl-repo

# Install dependencies
npm install

# Deploy to production
wrangler deploy

# Deploy to staging
wrangler deploy --env staging

# Deploy to development
wrangler deploy --env development
```

**Expected output:**
```
✨ Built successfully!
✨ Successfully published your script to
   https://hlpfl-space.YOUR_SUBDOMAIN.workers.dev
```

---

## 🌐 Step 9: Configure Custom Domains

### Backend API Domain (api.hlpfl.org)

1. Go to Cloudflare Dashboard → Workers & Pages
2. Click on your `hlpfl-space` worker
3. Go to "Settings" → "Triggers"
4. Under "Custom Domains", click "Add Custom Domain"
5. Enter: `api.hlpfl.org`
6. Click "Add Custom Domain"

Cloudflare will automatically:
- Create the DNS record
- Issue an SSL certificate
- Route traffic to your worker

### Frontend Domain (portal.hlpfl.org)

This will be configured when we deploy the frontend in the next step.

---

## 🎨 Step 10: Deploy Frontend to Cloudflare Pages

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Build the application
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy .next --project-name hlpfl-frontend --branch main
```

**First time deployment:**
- Wrangler will ask if you want to create a new project
- Answer "Yes"
- It will create the project and deploy

**Expected output:**
```
✨ Success! Uploaded 150 files (5.2 sec)
✨ Deployment complete! Take a peek over at
   https://hlpfl-frontend.pages.dev
```

---

## 🌐 Step 11: Configure Frontend Custom Domain

1. Go to Cloudflare Dashboard → Workers & Pages
2. Click on `hlpfl-frontend`
3. Go to "Custom domains"
4. Click "Set up a custom domain"
5. Enter: `portal.hlpfl.org`
6. Click "Continue"
7. Cloudflare will automatically configure DNS and SSL

---

## ✅ Step 12: Verify Deployment

### Test Backend API
```bash
# Test health endpoint
curl https://api.hlpfl.org/health

# Should return: {"status":"ok","timestamp":"..."}
```

### Test Frontend
Open your browser and visit:
- **Production**: https://portal.hlpfl.org
- **Staging**: https://staging-portal.hlpfl.org

You should see the HLPFL landing page!

---

## 🔄 Step 13: Set Up GitHub Actions for Auto-Deploy

The GitHub Actions workflow is already configured in `.github/workflows/ci.yml`.

You just need to add these secrets to your GitHub repository:

1. Go to GitHub → Your Repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:

| Secret Name | Value | Where to Get It |
|-------------|-------|-----------------|
| `CLOUDFLARE_API_TOKEN` | Your API token | Cloudflare Dashboard → My Profile → API Tokens → Create Token |
| `CLOUDFLARE_ACCOUNT_ID` | Your account ID | From `wrangler whoami` |
| `NEXT_PUBLIC_API_URL` | `https://api.hlpfl.org` | Your API domain |

**To create a Cloudflare API Token:**
1. Go to Cloudflare Dashboard → My Profile → API Tokens
2. Click "Create Token"
3. Use the "Edit Cloudflare Workers" template
4. Add permissions:
   - Account → Workers Scripts → Edit
   - Account → Workers KV Storage → Edit
   - Account → D1 → Edit
   - Account → Cloudflare Pages → Edit
5. Click "Continue to summary" → "Create Token"
6. Copy the token and add it to GitHub secrets

Now, every push to `main` will automatically:
- Run tests
- Run linting
- Run security checks
- Deploy backend to Cloudflare Workers
- Deploy frontend to Cloudflare Pages

---

## 🎉 You're Done!

Your HLPFL platform is now live on Cloudflare!

### URLs:
- **Frontend**: https://portal.hlpfl.org
- **Backend API**: https://api.hlpfl.org
- **Staging Frontend**: https://staging-portal.hlpfl.org
- **Staging API**: https://staging-api.hlpfl.org

---

## 🐛 Troubleshooting

### Issue: "Database not found"
```bash
# Check if database exists
wrangler d1 list

# Re-run migrations
wrangler d1 execute hlpfl-space-db --file=./migrations/0001_initial_schema.sql
```

### Issue: "KV namespace not found"
```bash
# List all KV namespaces
wrangler kv:namespace list

# Verify IDs in wrangler.toml match
```

### Issue: "R2 bucket not found"
```bash
# List all R2 buckets
wrangler r2 bucket list

# Create if missing
wrangler r2 bucket create hlpfl-space-media
```

### Issue: "Worker deployment failed"
```bash
# Check for syntax errors
npm run type-check

# Try deploying with verbose logging
wrangler deploy --verbose
```

### Issue: "Frontend build failed"
```bash
# Clear Next.js cache
cd frontend
rm -rf .next
npm run build
```

### View Worker Logs
```bash
# Tail production logs
wrangler tail

# Tail staging logs
wrangler tail --env staging
```

### View Pages Logs
```bash
# View deployment logs
wrangler pages deployment list --project-name hlpfl-frontend

# View specific deployment logs
wrangler pages deployment tail --project-name hlpfl-frontend
```

---

## 📊 Monitoring

### Cloudflare Dashboard
- **Workers Analytics**: Dashboard → Workers & Pages → hlpfl-space → Analytics
- **Pages Analytics**: Dashboard → Workers & Pages → hlpfl-frontend → Analytics
- **D1 Analytics**: Dashboard → D1 → hlpfl-space-db → Metrics

### Set Up Alerts
1. Go to Cloudflare Dashboard → Notifications
2. Click "Add"
3. Set up alerts for:
   - Worker errors
   - High response times
   - Database errors
   - R2 storage limits

---

## 💰 Cost Estimation

### Free Tier Includes:
- **Workers**: 100,000 requests/day
- **Pages**: Unlimited requests
- **D1**: 5 GB storage, 5 million reads/day
- **R2**: 10 GB storage, 1 million reads/month
- **KV**: 100,000 reads/day, 1,000 writes/day

### Paid Plans (if you exceed free tier):
- **Workers**: $5/month for 10 million requests
- **D1**: $5/month for 25 GB storage
- **R2**: $0.015/GB/month storage

For most startups, the free tier is sufficient for months!

---

## 🔄 Updating Your Deployment

### Backend Updates
```bash
# Make your changes
# Commit to git
git add .
git commit -m "Update backend"
git push origin main

# Or deploy manually
wrangler deploy
```

### Frontend Updates
```bash
cd frontend
# Make your changes
npm run build
npx wrangler pages deploy .next --project-name hlpfl-frontend --branch main

# Or push to GitHub for auto-deploy
```

### Database Migrations
```bash
# Create new migration file
# migrations/0002_add_new_table.sql

# Run migration
wrangler d1 execute hlpfl-space-db --file=./migrations/0002_add_new_table.sql
```

---

## 📞 Support

- **Cloudflare Docs**: https://developers.cloudflare.com
- **Wrangler Docs**: https://developers.cloudflare.com/workers/wrangler
- **Community Discord**: https://discord.gg/cloudflaredev
- **GitHub Issues**: https://github.com/HLPFLCG/hlpfl/issues

---

**Happy Deploying! 🚀**