# HLPFL Platform Deployment Guide

## Prerequisites

1. **Cloudflare Account**: Sign up at https://dash.cloudflare.com
2. **Wrangler CLI**: Install globally
   ```bash
   npm install -g wrangler
   ```
3. **Node.js**: Version 18 or higher
4. **Git**: For version control

## Initial Setup

### 1. Clone and Install Dependencies

```bash
cd hlpfl
npm install
```

### 2. Authenticate with Cloudflare

```bash
wrangler login
```

### 3. Create D1 Database

```bash
wrangler d1 create hlpfl-db
```

Copy the database ID from the output and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "hlpfl-db"
database_id = "your-database-id-here"
```

### 4. Create R2 Bucket

```bash
wrangler r2 bucket create hlpfl-media
```

Update `wrangler.toml`:

```toml
[[r2_buckets]]
binding = "R2"
bucket_name = "hlpfl-media"
```

### 5. Set Environment Variables

```bash
# Generate a secure JWT secret
openssl rand -base64 32

# Set secrets in Cloudflare
wrangler secret put JWT_SECRET
# Paste your generated secret

wrangler secret put AI_API_KEY
# Paste your OpenAI or other AI service API key (optional)
```

### 6. Run Database Migrations

```bash
# Local development
npm run db:migrate:local

# Production
npm run db:migrate
```

## Development

### Run Local Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:8787`

### Test Endpoints

```bash
# Health check
curl http://localhost:8787/health

# Register a user
curl -X POST http://localhost:8787/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "role": "artist"
  }'
```

## Deployment

### Deploy to Production

```bash
npm run deploy
```

### Deploy to Staging

```bash
npm run deploy:staging
```

### Verify Deployment

```bash
curl https://api.hlpfl.org/health
```

## Post-Deployment

### 1. Configure Custom Domain

In Cloudflare Dashboard:
1. Go to Workers & Pages
2. Select your worker
3. Go to Settings > Triggers
4. Add custom domain: `api.hlpfl.org`

### 2. Set Up CORS

Update `src/index.ts` with your production domains:

```typescript
app.use('*', corsMiddleware({
  origin: [
    'https://portal.hlpfl.org',
    'https://biobetter.hlpfl.com',
    'https://hlpfl.org'
  ],
  credentials: true,
}));
```

### 3. Monitor Logs

```bash
wrangler tail
```

### 4. View Analytics

Visit Cloudflare Dashboard > Workers & Pages > Your Worker > Analytics

## Database Management

### View Database

```bash
wrangler d1 execute hlpfl-db --command="SELECT * FROM users LIMIT 10"
```

### Backup Database

```bash
wrangler d1 export hlpfl-db --output=backup.sql
```

### Reset Database (CAUTION)

```bash
npm run db:reset
npm run db:migrate
```

## Troubleshooting

### Issue: "Database not found"

**Solution**: Ensure database ID in `wrangler.toml` matches your created database:
```bash
wrangler d1 list
```

### Issue: "JWT_SECRET not set"

**Solution**: Set the secret:
```bash
wrangler secret put JWT_SECRET
```

### Issue: "CORS errors"

**Solution**: Add your domain to the CORS whitelist in `src/index.ts`

### Issue: "Rate limit exceeded"

**Solution**: Adjust rate limits in `src/middleware/rateLimit.ts`

## Monitoring & Maintenance

### Health Checks

Set up monitoring for:
- `https://api.hlpfl.org/health`
- Response time < 200ms
- Uptime > 99.9%

### Log Monitoring

Use Cloudflare Logpush or Workers Analytics to monitor:
- Error rates
- Response times
- Request volumes
- Geographic distribution

### Database Maintenance

- Regular backups (daily recommended)
- Monitor database size
- Optimize queries as needed
- Clean up old data periodically

## Scaling Considerations

### Performance Optimization

1. **Enable Caching**: Use Cloudflare Cache API for frequently accessed data
2. **Optimize Queries**: Add indexes for common query patterns
3. **Rate Limiting**: Adjust based on usage patterns
4. **Connection Pooling**: D1 handles this automatically

### Cost Management

- Monitor D1 read/write operations
- Monitor R2 storage and bandwidth
- Set up billing alerts in Cloudflare Dashboard
- Optimize media storage (compress images, use appropriate formats)

## Security Best Practices

1. **Rotate Secrets Regularly**: Update JWT_SECRET periodically
2. **Monitor Failed Login Attempts**: Implement account lockout
3. **Use HTTPS Only**: Enforce in production
4. **Validate All Input**: Already implemented with Zod
5. **Rate Limiting**: Already configured
6. **Regular Updates**: Keep dependencies updated

## Rollback Procedure

If deployment fails:

```bash
# View deployment history
wrangler deployments list

# Rollback to previous version
wrangler rollback [deployment-id]
```

## Support

For deployment issues:
- Email: dev@hlpfl.org
- Documentation: https://developers.cloudflare.com/workers/
- Community: Cloudflare Discord

## Checklist

Before going live:

- [ ] Database created and migrated
- [ ] R2 bucket created
- [ ] Secrets configured (JWT_SECRET, AI_API_KEY)
- [ ] Custom domain configured
- [ ] CORS configured for production domains
- [ ] Health check endpoint responding
- [ ] Test user registration and login
- [ ] Monitor logs for errors
- [ ] Set up monitoring alerts
- [ ] Document API endpoints
- [ ] Configure backup strategy
- [ ] Test all critical endpoints
- [ ] Load testing completed
- [ ] Security audit completed