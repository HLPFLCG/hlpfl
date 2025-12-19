# ✅ Quick Start Checklist - Cloudflare Deployment

Use this checklist to track your deployment progress.

---

## 🔐 Authentication
- [ ] Install Wrangler CLI: `npm install -g wrangler`
- [ ] Login to Cloudflare: `wrangler login`
- [ ] Get Account ID: `wrangler whoami`
- [ ] Copy Account ID: `________________`

---

## 🗄️ Database Setup
- [ ] Create production DB: `wrangler d1 create hlpfl-space-db`
  - Database ID: `________________`
- [ ] Create dev DB: `wrangler d1 create hlpfl-space-db-dev`
  - Database ID: `________________`
- [ ] Create staging DB: `wrangler d1 create hlpfl-space-db-staging`
  - Database ID: `________________`

---

## 📦 R2 Buckets
- [ ] Create production bucket: `wrangler r2 bucket create hlpfl-space-media`
- [ ] Create dev bucket: `wrangler r2 bucket create hlpfl-space-media-dev`
- [ ] Create staging bucket: `wrangler r2 bucket create hlpfl-space-media-staging`

---

## 🔑 KV Namespaces

### Rate Limiting
- [ ] Production: `wrangler kv:namespace create RATE_LIMIT`
  - ID: `________________`
- [ ] Dev: `wrangler kv:namespace create RATE_LIMIT --preview`
  - ID: `________________`
- [ ] Staging: `wrangler kv:namespace create RATE_LIMIT --env staging`
  - ID: `________________`

### Sessions
- [ ] Production: `wrangler kv:namespace create SESSIONS`
  - ID: `________________`
- [ ] Dev: `wrangler kv:namespace create SESSIONS --preview`
  - ID: `________________`
- [ ] Staging: `wrangler kv:namespace create SESSIONS --env staging`
  - ID: `________________`

---

## ⚙️ Configuration Files
- [ ] Update `wrangler.toml` with Account ID
- [ ] Update `wrangler.toml` with Database IDs
- [ ] Update `wrangler.toml` with KV IDs
- [ ] Verify domains in `wrangler.toml` (api.hlpfl.org)
- [ ] Verify domains in `wrangler-frontend.toml` (portal.hlpfl.org)

---

## 🔒 Secrets
- [ ] JWT_SECRET: `wrangler secret put JWT_SECRET`
- [ ] TWITTER_CLIENT_ID: `wrangler secret put TWITTER_CLIENT_ID`
- [ ] TWITTER_CLIENT_SECRET: `wrangler secret put TWITTER_CLIENT_SECRET`
- [ ] LINKEDIN_CLIENT_ID: `wrangler secret put LINKEDIN_CLIENT_ID`
- [ ] LINKEDIN_CLIENT_SECRET: `wrangler secret put LINKEDIN_CLIENT_SECRET`
- [ ] FACEBOOK_APP_ID: `wrangler secret put FACEBOOK_APP_ID`
- [ ] FACEBOOK_APP_SECRET: `wrangler secret put FACEBOOK_APP_SECRET`
- [ ] INSTAGRAM_CLIENT_ID: `wrangler secret put INSTAGRAM_CLIENT_ID`
- [ ] INSTAGRAM_CLIENT_SECRET: `wrangler secret put INSTAGRAM_CLIENT_SECRET`
- [ ] OPENAI_API_KEY: `wrangler secret put OPENAI_API_KEY`

---

## 🗃️ Database Migrations
- [ ] Run production migration: `wrangler d1 execute hlpfl-space-db --file=./migrations/0001_initial_schema.sql`
- [ ] Run dev migration: `wrangler d1 execute hlpfl-space-db-dev --file=./migrations/0001_initial_schema.sql --env development`
- [ ] Run staging migration: `wrangler d1 execute hlpfl-space-db-staging --file=./migrations/0001_initial_schema.sql --env staging`
- [ ] Verify tables: `wrangler d1 execute hlpfl-space-db --command="SELECT name FROM sqlite_master WHERE type='table';"`

---

## 🚀 Backend Deployment
- [ ] Install dependencies: `npm install`
- [ ] Deploy to production: `wrangler deploy`
- [ ] Deploy to staging: `wrangler deploy --env staging`
- [ ] Test API: `curl https://api.hlpfl.org/health`

---

## 🌐 Backend Custom Domain
- [ ] Go to Cloudflare Dashboard → Workers & Pages
- [ ] Click on `hlpfl-space` worker
- [ ] Settings → Triggers → Custom Domains
- [ ] Add domain: `api.hlpfl.org`
- [ ] Wait for SSL certificate (usually 1-2 minutes)
- [ ] Test: `curl https://api.hlpfl.org/health`

---

## 🎨 Frontend Deployment
- [ ] Navigate to frontend: `cd frontend`
- [ ] Install dependencies: `npm install`
- [ ] Build: `npm run build`
- [ ] Deploy: `npx wrangler pages deploy .next --project-name hlpfl-frontend --branch main`
- [ ] Note temporary URL: `________________`

---

## 🌐 Frontend Custom Domain
- [ ] Go to Cloudflare Dashboard → Workers & Pages
- [ ] Click on `hlpfl-frontend`
- [ ] Custom domains → Set up a custom domain
- [ ] Add domain: `portal.hlpfl.org`
- [ ] Wait for SSL certificate (usually 1-2 minutes)
- [ ] Test: Open `https://portal.hlpfl.org` in browser

---

## 🔄 GitHub Actions Setup
- [ ] Go to GitHub → Repository → Settings → Secrets
- [ ] Add `CLOUDFLARE_API_TOKEN`
- [ ] Add `CLOUDFLARE_ACCOUNT_ID`
- [ ] Add `NEXT_PUBLIC_API_URL` = `https://api.hlpfl.org`
- [ ] Push to main branch to trigger auto-deploy
- [ ] Check Actions tab for deployment status

---

## ✅ Final Verification
- [ ] Frontend loads: `https://portal.hlpfl.org`
- [ ] Backend responds: `https://api.hlpfl.org/health`
- [ ] Can register a new account
- [ ] Can login successfully
- [ ] Dashboard loads correctly
- [ ] GitHub Actions deploys automatically

---

## 📊 Monitoring Setup
- [ ] Check Workers Analytics in Cloudflare Dashboard
- [ ] Check Pages Analytics in Cloudflare Dashboard
- [ ] Set up error alerts in Cloudflare Notifications
- [ ] Set up uptime monitoring (optional: UptimeRobot, Pingdom)

---

## 🎉 Deployment Complete!

**Your URLs:**
- Frontend: https://portal.hlpfl.org
- Backend API: https://api.hlpfl.org
- Staging Frontend: https://staging-portal.hlpfl.org
- Staging API: https://staging-api.hlpfl.org

**Next Steps:**
1. Test all functionality
2. Invite team members
3. Monitor performance
4. Gather user feedback
5. Iterate and improve

---

## 📝 Notes

Use this space to write down any important information:

```
Account ID: ________________

Production Database ID: ________________
Dev Database ID: ________________
Staging Database ID: ________________

Rate Limit KV ID (prod): ________________
Rate Limit KV ID (dev): ________________
Rate Limit KV ID (staging): ________________

Sessions KV ID (prod): ________________
Sessions KV ID (dev): ________________
Sessions KV ID (staging): ________________

Cloudflare API Token: ________________ (keep secure!)

Deployment Date: ________________
Deployed By: ________________

Issues Encountered:
- 
- 
- 

Solutions:
- 
- 
- 
```

---

**Good luck with your deployment! 🚀**