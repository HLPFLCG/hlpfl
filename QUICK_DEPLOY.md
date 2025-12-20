# ⚡ Quick Deploy Reference Card

## 🎯 One-Command Deployment (Copy & Paste)

### Step 1: Run Migrations (from hlpfl directory)
```bash
./run-migrations.sh
```

### Step 2: Set JWT Secret
```bash
openssl rand -base64 32 | wrangler secret put JWT_SECRET
```

### Step 3: Deploy Backend
```bash
wrangler deploy
```

### Step 4: Deploy Frontend
```bash
cd frontend && npm install && npm run build && npx wrangler pages deploy .next --project-name hlpfl-frontend
```

---

## 📋 Manual Step-by-Step (if script fails)

### Migrations
```bash
# Production
wrangler d1 execute hlpfl-space-db --remote --file=./migrations/0001_initial_schema.sql

# Development
wrangler d1 execute hlpfl-space-db-dev --remote --file=./migrations/0001_initial_schema.sql --env development

# Staging
wrangler d1 execute hlpfl-space-db-staging --remote --file=./migrations/0001_initial_schema.sql --env staging
```

### JWT Secret
```bash
# Generate secret
openssl rand -base64 32

# Set in Cloudflare (paste the generated secret when prompted)
wrangler secret put JWT_SECRET
```

### Deploy
```bash
# Backend
wrangler deploy

# Frontend
cd frontend
npm install
npm run build
npx wrangler pages deploy .next --project-name hlpfl-frontend
```

---

## 🔍 Quick Verification

### Test Backend
```bash
curl https://hlpfl-space.YOUR-SUBDOMAIN.workers.dev/health
```

### Test Frontend
Open browser: `https://XXXXXXXX.hlpfl-frontend.pages.dev`

---

## 🌐 Custom Domains Setup

### Backend (api.hlpfl.org)
1. Dashboard → Workers & Pages → hlpfl-space
2. Settings → Triggers → Custom Domains
3. Add: `api.hlpfl.org`

### Frontend (portal.hlpfl.org)
1. Dashboard → Workers & Pages → hlpfl-frontend
2. Custom domains → Set up custom domain
3. Add: `portal.hlpfl.org`

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Migration fails | Add `--remote` flag |
| Deploy fails | Run `npm run build` first |
| 404 errors | Wait 2-3 minutes for propagation |
| CORS errors | Check API URL in frontend/.env.local |
| Auth fails | Verify JWT_SECRET is set |

---

## 📞 Support Commands

```bash
# Check authentication
wrangler whoami

# View logs
wrangler tail

# List deployments
wrangler deployments list

# Check D1 databases
wrangler d1 list
```

---

**Total Time:** ~15 minutes
**Prerequisites:** Wrangler CLI installed, authenticated to Cloudflare