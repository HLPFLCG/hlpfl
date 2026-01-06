# 🚀 HLPFL RECORDS - DEPLOYMENT GUIDE

## 📋 TABLE OF CONTENTS
1. [Overview](#overview)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [Cloudflare Pages Setup](#cloudflare-pages-setup)
4. [GitHub Actions CI/CD](#github-actions-cicd)
5. [Environment Configuration](#environment-configuration)
6. [Domain Setup](#domain-setup)
7. [SSL/TLS Configuration](#ssltls-configuration)
8. [Performance Optimization](#performance-optimization)
9. [Monitoring & Alerts](#monitoring--alerts)
10. [Rollback Procedures](#rollback-procedures)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 OVERVIEW

### Deployment Stack
- **Hosting:** Cloudflare Pages
- **CI/CD:** GitHub Actions
- **Domain:** hlpfl.org
- **SSL:** Cloudflare SSL/TLS
- **CDN:** Cloudflare Global Network

### Deployment Flow
```
Local Development → Git Push → GitHub Actions → Build → Cloudflare Pages → Live Site
```

### Deployment Types
1. **Production:** Main branch → https://hlpfl.org
2. **Preview:** Pull requests → Preview URLs
3. **Development:** Local environment

---

## ✅ PRE-DEPLOYMENT CHECKLIST

### Code Quality
- [ ] All tests passing (`npm run test`)
- [ ] No linting errors (`npm run lint`)
- [ ] TypeScript compilation successful (`npm run type-check`)
- [ ] Build successful (`npm run build`)
- [ ] No console errors or warnings

### Content Review
- [ ] All images optimized (< 500KB)
- [ ] All text proofread
- [ ] All links tested and working
- [ ] All data files validated (JSON syntax)
- [ ] No placeholder content

### Performance
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals passing
- [ ] Bundle size within budget
- [ ] Images lazy loaded
- [ ] Code split appropriately

### Security
- [ ] No sensitive data in code
- [ ] Environment variables configured
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Dependencies updated

### SEO
- [ ] Meta tags configured
- [ ] Open Graph tags set
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Structured data implemented

### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation working
- [ ] Screen reader tested
- [ ] Color contrast passing
- [ ] Alt text on all images

---

## ☁️ CLOUDFLARE PAGES SETUP

### Initial Setup

#### 1. Create Cloudflare Account
1. Go to https://dash.cloudflare.com
2. Sign up or log in
3. Navigate to "Pages"

#### 2. Connect GitHub Repository
1. Click "Create a project"
2. Select "Connect to Git"
3. Authorize Cloudflare with GitHub
4. Select repository: `HLPFLCG/hlpflrecords`

#### 3. Configure Build Settings
```yaml
Build command: npm run build
Build output directory: .next
Root directory: /
Environment variables: (see below)
```

#### 4. Build Configuration
```toml
# wrangler.toml (optional)
name = "hlpflrecords"
compatibility_date = "2024-01-01"

[build]
command = "npm run build"
cwd = "/"

[build.upload]
format = "service-worker"
```

### Build Settings

#### Framework Preset
- **Framework:** Next.js
- **Build command:** `npm run build`
- **Build output:** `.next`
- **Node version:** 18.x

#### Environment Variables
```bash
# Production
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://hlpfl.org
NODE_VERSION=18
```

### Advanced Settings

#### Custom Headers
```toml
# _headers file in public/
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com;
```

#### Redirects
```toml
# _redirects file in public/
/old-path /new-path 301
/releases/* /releases/:splat 200
```

---

## 🔄 GITHUB ACTIONS CI/CD

### Workflow Configuration

#### File: .github/workflows/deploy.yml
```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  # Lint and Test
  quality-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run tests
        run: npm run test

  # Build and Deploy
  deploy:
    needs: quality-check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build
        env:
          NEXT_PUBLIC_GA_ID: ${{ secrets.NEXT_PUBLIC_GA_ID }}
          NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: hlpflrecords
          directory: .next
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}

      - name: Notify deployment success
        if: success()
        run: echo "Deployment successful!"

      - name: Notify deployment failure
        if: failure()
        run: echo "Deployment failed!"
```

### GitHub Secrets Setup

#### Required Secrets
1. Go to GitHub repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add the following secrets:

```bash
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://hlpfl.org
```

#### Getting Cloudflare Credentials

**API Token:**
1. Go to Cloudflare Dashboard
2. Navigate to "My Profile" → "API Tokens"
3. Create token with "Cloudflare Pages" permissions

**Account ID:**
1. Go to Cloudflare Dashboard
2. Select your domain
3. Find Account ID in the right sidebar

---

## ⚙️ ENVIRONMENT CONFIGURATION

### Development Environment
```bash
# .env.local (not committed to git)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production Environment
```bash
# Configured in Cloudflare Pages dashboard
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://hlpfl.org
NODE_VERSION=18
```

### Environment Variables Best Practices
1. **Never commit secrets** to git
2. **Use NEXT_PUBLIC_ prefix** for client-side variables
3. **Keep sensitive data** server-side only
4. **Document all variables** in README
5. **Use different values** for dev/prod

---

## 🌐 DOMAIN SETUP

### DNS Configuration

#### Cloudflare DNS Settings
```
Type    Name    Content                 Proxy   TTL
CNAME   @       hlpflrecords.pages.dev  Yes     Auto
CNAME   www     hlpflrecords.pages.dev  Yes     Auto
```

#### Custom Domain Setup
1. Go to Cloudflare Pages project
2. Navigate to "Custom domains"
3. Click "Set up a custom domain"
4. Enter: `hlpfl.org`
5. Follow DNS configuration instructions

### Domain Verification
```bash
# Check DNS propagation
dig hlpfl.org
nslookup hlpfl.org

# Test HTTPS
curl -I https://hlpfl.org
```

---

## 🔒 SSL/TLS CONFIGURATION

### SSL/TLS Settings

#### Cloudflare SSL/TLS Mode
- **Mode:** Full (strict)
- **Minimum TLS Version:** 1.2
- **TLS 1.3:** Enabled
- **Automatic HTTPS Rewrites:** Enabled
- **Always Use HTTPS:** Enabled

#### HSTS Configuration
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

#### SSL Certificate
- **Type:** Universal SSL (Free)
- **Validity:** Auto-renewed
- **Coverage:** hlpfl.org, www.hlpfl.org

### Security Headers
```toml
# _headers
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

---

## ⚡ PERFORMANCE OPTIMIZATION

### Cloudflare Settings

#### Caching
- **Browser Cache TTL:** 4 hours
- **Edge Cache TTL:** 2 hours
- **Cache Level:** Standard
- **Always Online:** Enabled

#### Speed Optimizations
- **Auto Minify:** HTML, CSS, JS enabled
- **Brotli Compression:** Enabled
- **HTTP/2:** Enabled
- **HTTP/3 (QUIC):** Enabled
- **0-RTT Connection:** Enabled

#### Image Optimization
- **Polish:** Lossless
- **Mirage:** Enabled
- **WebP:** Enabled

### Build Optimizations

#### Next.js Configuration
```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  swcMinify: true,
};
```

---

## 📊 MONITORING & ALERTS

### Cloudflare Analytics
1. Go to Cloudflare Dashboard
2. Navigate to "Analytics & Logs"
3. Monitor:
   - Traffic
   - Performance
   - Security events
   - Errors

### Uptime Monitoring
```yaml
# Setup external monitoring
Service: UptimeRobot or Pingdom
URL: https://hlpfl.org
Interval: 5 minutes
Alert: Email, Slack
```

### Performance Monitoring
```typescript
// Web Vitals monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to analytics service
  analytics.event('web_vitals', {
    metric_name: metric.name,
    metric_value: metric.value,
    metric_rating: metric.rating,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Error Tracking
```typescript
// Error boundary with reporting
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to error tracking service
    console.error('Error:', error, errorInfo);
    
    // Send to analytics
    analytics.event('error', {
      error_message: error.message,
      error_stack: error.stack,
      component_stack: errorInfo.componentStack,
    });
  }
}
```

---

## 🔄 ROLLBACK PROCEDURES

### Quick Rollback

#### Method 1: Cloudflare Pages Dashboard
1. Go to Cloudflare Pages project
2. Navigate to "Deployments"
3. Find previous successful deployment
4. Click "Rollback to this deployment"

#### Method 2: Git Revert
```bash
# Find commit to revert to
git log --oneline

# Revert to specific commit
git revert HEAD
git push origin main

# Or reset to previous commit (use with caution)
git reset --hard COMMIT_HASH
git push origin main --force
```

### Emergency Rollback
```bash
# Immediate rollback to last known good state
git revert HEAD~1..HEAD
git push origin main
```

### Rollback Checklist
- [ ] Identify issue causing rollback
- [ ] Notify team of rollback
- [ ] Execute rollback procedure
- [ ] Verify site is working
- [ ] Document issue
- [ ] Plan fix for next deployment

---

## 🔍 TROUBLESHOOTING

### Common Deployment Issues

#### Issue: Build Fails
**Symptoms:**
- GitHub Actions shows red X
- Build logs show errors

**Solutions:**
```bash
# Test build locally
npm run build

# Check for errors
npm run lint
npm run type-check

# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

#### Issue: Environment Variables Not Working
**Symptoms:**
- Features not working in production
- Console errors about undefined variables

**Solutions:**
1. Check Cloudflare Pages environment variables
2. Ensure variables have `NEXT_PUBLIC_` prefix for client-side
3. Rebuild after adding variables
4. Clear browser cache

#### Issue: Images Not Loading
**Symptoms:**
- Broken image icons
- 404 errors for images

**Solutions:**
1. Verify images exist in `public/images/`
2. Check file paths (case-sensitive)
3. Ensure images are committed to git
4. Check image optimization settings

#### Issue: Slow Performance
**Symptoms:**
- Long load times
- Poor Lighthouse scores

**Solutions:**
1. Optimize images (compress, WebP format)
2. Enable Cloudflare optimizations
3. Check bundle size
4. Implement code splitting
5. Review Core Web Vitals

#### Issue: SSL Certificate Errors
**Symptoms:**
- "Not Secure" warning
- SSL certificate errors

**Solutions:**
1. Check Cloudflare SSL/TLS mode (use Full Strict)
2. Verify DNS settings
3. Wait for certificate provisioning (up to 24 hours)
4. Clear browser cache

#### Issue: 404 Errors
**Symptoms:**
- Pages not found
- Routing not working

**Solutions:**
1. Check Next.js routing configuration
2. Verify file structure in `app/` directory
3. Check `_redirects` file
4. Clear Cloudflare cache

### Debug Mode

#### Enable Debug Logging
```typescript
// next.config.js
module.exports = {
  // ... other config
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.devtool = 'source-map';
    }
    return config;
  },
};
```

#### Check Deployment Logs
1. Go to GitHub Actions
2. Click on failed workflow
3. Review logs for errors
4. Check Cloudflare Pages logs

---

## 📋 DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] Code reviewed and approved
- [ ] All tests passing
- [ ] Build successful locally
- [ ] Environment variables configured
- [ ] Content reviewed and approved
- [ ] Performance tested
- [ ] Security audit completed

### During Deployment
- [ ] Monitor GitHub Actions
- [ ] Watch build logs
- [ ] Check for errors
- [ ] Verify deployment success

### Post-Deployment
- [ ] Test live site functionality
- [ ] Verify all pages load
- [ ] Check mobile responsiveness
- [ ] Test all links
- [ ] Verify analytics tracking
- [ ] Check performance metrics
- [ ] Monitor error logs
- [ ] Update documentation

---

## 🎉 CONCLUSION

This deployment guide covers the complete deployment process for the HLPFL Records website. Follow these procedures for reliable, consistent deployments.

### Quick Reference

**Deploy to Production:**
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

**Rollback:**
```bash
git revert HEAD
git push origin main
```

**Check Status:**
- GitHub Actions: https://github.com/HLPFLCG/hlpflrecords/actions
- Cloudflare Pages: https://dash.cloudflare.com
- Live Site: https://hlpfl.org

### Resources
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

**Last Updated:** 2024  
**Version:** 2.0.0  
**Hosting:** Cloudflare Pages  
**Domain:** hlpfl.org