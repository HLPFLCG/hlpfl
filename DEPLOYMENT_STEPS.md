# 🚀 HLPFL Deployment Steps

## Prerequisites
✅ Cloudflare account configured
✅ All resources created (D1, R2, KV)
✅ wrangler.toml updated with resource IDs
✅ Repository cloned locally

## Step 1: Run Database Migrations

Navigate to the hlpfl directory and run migrations for all environments:

```bash
cd hlpfl

# Production database
wrangler d1 execute hlpfl-space-db --remote --file=./migrations/0001_initial_schema.sql

# Development database
wrangler d1 execute hlpfl-space-db-dev --remote --file=./migrations/0001_initial_schema.sql --env development

# Staging database
wrangler d1 execute hlpfl-space-db-staging --remote --file=./migrations/0001_initial_schema.sql --env staging
```

**Or use the migration script:**
```bash
./run-migrations.sh
```

### Expected Output
You should see output like:
```
🌀 Executing on remote database hlpfl-space-db (0d9630c8-9a7f-4511-88e7-10146f64d9ba):
🌀 To execute on your local development database, remove the --remote flag from your wrangler command.
🚣 Executed 16 commands in 0.5s
```

## Step 2: Set JWT Secret

Generate a secure JWT secret:
```bash
openssl rand -base64 32
```

Set the secret in Cloudflare:
```bash
wrangler secret put JWT_SECRET
```

When prompted, paste the generated secret.

### Optional: Set Social Media API Keys
If you want to enable social media integrations immediately:

```bash
# Twitter/X
wrangler secret put TWITTER_CLIENT_ID
wrangler secret put TWITTER_CLIENT_SECRET

# LinkedIn
wrangler secret put LINKEDIN_CLIENT_ID
wrangler secret put LINKEDIN_CLIENT_SECRET

# Facebook
wrangler secret put FACEBOOK_APP_ID
wrangler secret put FACEBOOK_APP_SECRET

# Instagram
wrangler secret put INSTAGRAM_CLIENT_ID
wrangler secret put INSTAGRAM_CLIENT_SECRET

# OpenAI (for AI features)
wrangler secret put OPENAI_API_KEY
```

## Step 3: Deploy Backend to Cloudflare Workers

```bash
wrangler deploy
```

### Expected Output
```
⛅️ wrangler 4.55.0
------------------
Total Upload: XX.XX KiB / gzip: XX.XX KiB
Uploaded hlpfl-space (X.XX sec)
Published hlpfl-space (X.XX sec)
  https://hlpfl-space.YOUR-SUBDOMAIN.workers.dev
Current Deployment ID: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```

### Test the Backend
```bash
curl https://hlpfl-space.YOUR-SUBDOMAIN.workers.dev/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-12-20T00:00:00.000Z",
  "environment": "production"
}
```

## Step 4: Deploy Frontend to Cloudflare Pages

```bash
cd frontend

# Install dependencies (if not already done)
npm install

# Build the frontend
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy .next --project-name hlpfl-frontend
```

### Expected Output
```
✨ Success! Uploaded X files (X.XX sec)

✨ Deployment complete! Take a peek over at
   https://XXXXXXXX.hlpfl-frontend.pages.dev
```

## Step 5: Configure Custom Domains

### Backend Domain (api.hlpfl.org)

1. Go to Cloudflare Dashboard → Workers & Pages
2. Click on "hlpfl-space" worker
3. Go to "Settings" → "Triggers" → "Custom Domains"
4. Click "Add Custom Domain"
5. Enter: `api.hlpfl.org`
6. Click "Add Custom Domain"

### Frontend Domain (portal.hlpfl.org)

1. Go to Cloudflare Dashboard → Workers & Pages
2. Click on "hlpfl-frontend" pages project
3. Go to "Custom domains"
4. Click "Set up a custom domain"
5. Enter: `portal.hlpfl.org`
6. Click "Continue" and follow DNS setup instructions

## Step 6: Update Frontend Environment Variables

Update `frontend/.env.local` with your production API URL:

```bash
NEXT_PUBLIC_API_URL=https://api.hlpfl.org
```

Rebuild and redeploy the frontend:
```bash
cd frontend
npm run build
npx wrangler pages deploy .next --project-name hlpfl-frontend
```

## Step 7: Verify Deployment

### Test Backend Endpoints
```bash
# Health check
curl https://api.hlpfl.org/health

# API version
curl https://api.hlpfl.org/api/v1/health
```

### Test Frontend
1. Visit https://portal.hlpfl.org
2. You should see the HLPFL landing page
3. Try registering a new account
4. Try logging in

## Step 8: Monitor Deployment

### View Logs
```bash
# Backend logs
wrangler tail

# Frontend logs
wrangler pages deployment tail
```

### Check Analytics
1. Go to Cloudflare Dashboard
2. Navigate to Workers & Pages
3. Click on your worker/pages project
4. View analytics and metrics

## Troubleshooting

### Migration Fails
- Ensure you're using `--remote` flag
- Check database IDs in wrangler.toml
- Verify you're authenticated: `wrangler whoami`

### Deployment Fails
- Check for syntax errors: `npm run build`
- Verify wrangler.toml configuration
- Check account ID and resource IDs

### Custom Domain Not Working
- Wait 5-10 minutes for DNS propagation
- Verify DNS records in Cloudflare Dashboard
- Check SSL/TLS settings (should be "Full" or "Full (strict)")

### API Calls Failing
- Verify JWT_SECRET is set
- Check CORS configuration
- Verify API URL in frontend .env.local

## Success Checklist

- [ ] All 3 databases migrated successfully
- [ ] JWT_SECRET set in Cloudflare
- [ ] Backend deployed to Workers
- [ ] Frontend deployed to Pages
- [ ] Custom domains configured (api.hlpfl.org, portal.hlpfl.org)
- [ ] Health check endpoints responding
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Dashboard loads correctly

## Next Steps After Deployment

1. **Test all features thoroughly**
   - User registration and login
   - Post creation and scheduling
   - Social media account connections
   - Analytics dashboard

2. **Set up monitoring**
   - Configure Cloudflare alerts
   - Set up uptime monitoring
   - Enable error tracking

3. **Configure social media apps**
   - Create Twitter/X developer app
   - Create LinkedIn developer app
   - Create Facebook developer app
   - Create Instagram developer app

4. **Invite first users**
   - Start with beta testers
   - Gather feedback
   - Iterate on features

## Support

If you encounter any issues:
1. Check the logs: `wrangler tail`
2. Review the troubleshooting section above
3. Check Cloudflare Dashboard for errors
4. Review the GitHub repository issues

---

**Estimated Total Time:** 30-45 minutes
**Difficulty:** Intermediate

Good luck with your deployment! 🚀