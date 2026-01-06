# 🔧 HLPFL RECORDS - TROUBLESHOOTING GUIDE

## 📋 TABLE OF CONTENTS
1. [Quick Diagnostics](#quick-diagnostics)
2. [Build & Deployment Issues](#build--deployment-issues)
3. [Content & Display Issues](#content--display-issues)
4. [Performance Issues](#performance-issues)
5. [Feature-Specific Issues](#feature-specific-issues)
6. [Browser Compatibility](#browser-compatibility)
7. [Mobile Issues](#mobile-issues)
8. [Analytics & Tracking](#analytics--tracking)
9. [Security Issues](#security-issues)
10. [Emergency Procedures](#emergency-procedures)

---

## 🚨 QUICK DIAGNOSTICS

### First Steps for Any Issue
1. **Clear browser cache:** Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. **Check in incognito mode:** Rules out extension conflicts
3. **Try different browser:** Isolates browser-specific issues
4. **Check console:** Look for JavaScript errors (F12)
5. **Verify internet connection:** Ensure stable connection

### Quick Health Check
```bash
# Check if site is accessible
curl -I https://hlpfl.org

# Check DNS
dig hlpfl.org

# Check SSL
openssl s_client -connect hlpfl.org:443
```

### Common Quick Fixes
| Issue | Quick Fix |
|-------|-----------|
| Changes not showing | Clear cache (Cmd+Shift+R) |
| Images not loading | Check file paths, clear cache |
| Slow loading | Check internet, clear cache |
| Search not working | Refresh page, clear cache |
| Easter eggs not triggering | Try different browser |

---

## 🏗️ BUILD & DEPLOYMENT ISSUES

### Issue: Build Fails in GitHub Actions

#### Symptoms
- Red X on GitHub commit
- Deployment fails
- Error messages in Actions log

#### Diagnosis
```bash
# Check build locally
npm run build

# Check for errors
npm run lint
npm run type-check
npm test
```

#### Solutions

**1. JSON Syntax Error**
```bash
# Validate JSON files
cat data/releases.json | jq .
cat data/team.json | jq .

# Or use online validator
# https://jsonlint.com
```

**Common JSON Errors:**
```json
// ❌ Wrong - extra comma
{
  "title": "Track",
  "artist": "Alki",
}

// ✅ Correct
{
  "title": "Track",
  "artist": "Alki"
}

// ❌ Wrong - missing comma
{
  "title": "Track"
  "artist": "Alki"
}

// ✅ Correct
{
  "title": "Track",
  "artist": "Alki"
}
```

**2. TypeScript Errors**
```bash
# Check TypeScript compilation
npx tsc --noEmit

# Fix common issues
npm install --save-dev @types/node @types/react
```

**3. Dependency Issues**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install

# Update dependencies
npm update
```

**4. Environment Variables Missing**
```bash
# Check .env.local exists
cat .env.local

# Verify Cloudflare Pages environment variables
# Go to Cloudflare Dashboard → Pages → Settings → Environment variables
```

### Issue: Deployment Successful but Site Not Updating

#### Symptoms
- GitHub Actions shows success
- Changes not visible on live site
- Old content still showing

#### Solutions

**1. Clear Cloudflare Cache**
```bash
# Via Cloudflare Dashboard
# 1. Go to Caching → Configuration
# 2. Click "Purge Everything"
```

**2. Clear Browser Cache**
```bash
# Hard refresh
Cmd+Shift+R (Mac)
Ctrl+Shift+R (Windows)
Ctrl+F5 (Windows alternative)
```

**3. Check Deployment Status**
```bash
# Go to Cloudflare Pages
# Check latest deployment is active
# Verify deployment time matches your commit
```

**4. Verify Changes Were Committed**
```bash
# Check git status
git status

# Check remote
git log origin/main

# Ensure changes were pushed
git push origin main
```

### Issue: Build Timeout

#### Symptoms
- Build takes too long
- Timeout error in logs
- Deployment fails after 30+ minutes

#### Solutions

**1. Optimize Build**
```javascript
// next.config.js
module.exports = {
  // Reduce build time
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
```

**2. Check Dependencies**
```bash
# Remove unused dependencies
npm prune

# Check for large packages
npm ls --depth=0
```

**3. Increase Timeout (if needed)**
```yaml
# .github/workflows/deploy.yml
jobs:
  deploy:
    timeout-minutes: 30  # Increase if needed
```

---

## 📄 CONTENT & DISPLAY ISSUES

### Issue: Images Not Displaying

#### Symptoms
- Broken image icons
- Alt text showing instead of image
- 404 errors in console

#### Diagnosis
```bash
# Check if image exists
ls public/images/releases/your-image.jpg

# Check file permissions
ls -la public/images/releases/
```

#### Solutions

**1. Verify File Path**
```json
// ❌ Wrong - absolute path
"coverArt": "/workspace/public/images/releases/cover.jpg"

// ❌ Wrong - missing leading slash
"coverArt": "images/releases/cover.jpg"

// ✅ Correct
"coverArt": "/images/releases/cover.jpg"
```

**2. Check File Name**
```bash
# File names are case-sensitive
# If file is: Cover.jpg
# But JSON says: cover.jpg
# It won't work!

# Rename file to lowercase
mv Cover.jpg cover.jpg
```

**3. Verify Image Format**
```bash
# Check file type
file public/images/releases/cover.jpg

# Convert if needed
convert cover.png cover.jpg
```

**4. Check Image Size**
```bash
# Check file size
ls -lh public/images/releases/cover.jpg

# Optimize if > 500KB
# Use https://tinypng.com or
convert cover.jpg -quality 85 cover-optimized.jpg
```

### Issue: Text Not Updating

#### Symptoms
- Old text still showing
- Changes not reflected
- Cached content displaying

#### Solutions

**1. Verify Changes Committed**
```bash
git status
git log --oneline -5
```

**2. Check Correct File**
```bash
# Releases
cat data/releases.json | grep "your-text"

# Team
cat data/team.json | grep "your-text"
```

**3. Clear All Caches**
```bash
# Browser cache
Cmd+Shift+R

# Cloudflare cache
# Dashboard → Caching → Purge Everything

# Service worker cache
# DevTools → Application → Clear storage
```

### Issue: Layout Broken

#### Symptoms
- Elements overlapping
- Misaligned content
- Responsive design not working

#### Solutions

**1. Check CSS**
```bash
# Rebuild Tailwind
npm run build

# Check for CSS conflicts
# Open DevTools → Elements → Styles
```

**2. Verify Responsive Classes**
```typescript
// Ensure responsive classes are correct
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Content */}
</div>
```

**3. Check Browser Compatibility**
```bash
# Test in different browsers
# Chrome, Firefox, Safari, Edge
```

---

## ⚡ PERFORMANCE ISSUES

### Issue: Slow Page Load

#### Symptoms
- Long loading times (> 3 seconds)
- Poor Lighthouse scores
- Users complaining about speed

#### Diagnosis
```bash
# Run Lighthouse audit
# Chrome DevTools → Lighthouse → Generate report

# Check bundle size
npm run build
# Look for large chunks in output

# Check network requests
# DevTools → Network → Reload page
```

#### Solutions

**1. Optimize Images**
```bash
# Compress images
# Use https://tinypng.com

# Convert to WebP
convert image.jpg -quality 85 image.webp

# Ensure lazy loading
<img src="/image.jpg" loading="lazy" alt="Description" />
```

**2. Reduce Bundle Size**
```bash
# Analyze bundle
npm run build
npm run analyze  # If configured

# Remove unused dependencies
npm prune

# Use dynamic imports
const Component = dynamic(() => import('./Component'));
```

**3. Enable Caching**
```typescript
// next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

**4. Optimize Fonts**
```typescript
// Use next/font
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
```

### Issue: High Memory Usage

#### Symptoms
- Browser tab crashes
- Slow performance over time
- "Out of memory" errors

#### Solutions

**1. Check for Memory Leaks**
```typescript
// Ensure cleanup in useEffect
useEffect(() => {
  const subscription = subscribe();
  
  return () => {
    subscription.unsubscribe(); // Cleanup
  };
}, []);
```

**2. Optimize State Management**
```typescript
// Use useMemo for expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Use useCallback for functions
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

**3. Limit Re-renders**
```typescript
// Memoize components
const MemoizedComponent = memo(Component);

// Use React.memo with custom comparison
const MemoizedComponent = memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});
```

---

## 🎮 FEATURE-SPECIFIC ISSUES

### Issue: Global Search Not Working

#### Symptoms
- Search returns no results
- Search modal doesn't open
- Keyboard shortcut not working

#### Solutions

**1. Verify Keyboard Shortcut**
```typescript
// Check if Cmd+K or Ctrl+K is working
// Try clicking search icon instead
```

**2. Check Search Data**
```bash
# Verify data files exist
cat data/releases.json
cat data/team.json
```

**3. Clear Search Index**
```typescript
// Clear localStorage
localStorage.removeItem('search-index');
localStorage.removeItem('recent-searches');
```

**4. Check Console for Errors**
```bash
# Open DevTools → Console
# Look for search-related errors
```

### Issue: Easter Eggs Not Triggering

#### Symptoms
- Konami code not working
- Logo clicks not counting
- No music player appearing

#### Solutions

**1. Konami Code**
```typescript
// Ensure correct sequence
// ↑↑↓↓←→←→BA

// Try slowly
// Wait 1 second between keys
// Use arrow keys, not WASD
```

**2. Logo Clicks**
```typescript
// Click exactly 7 times
// Within 3 seconds
// On the logo element
// Try clicking faster
```

**3. Scroll Depth**
```typescript
// Scroll to exactly 77.7%
// Hold position for 1 second
// Look for visual indicator
// Try on longer pages
```

**4. Check Audio Files**
```bash
# Verify audio files exist
ls public/audio/unreleased/

# Check file format (should be .mp3)
file public/audio/unreleased/5d.mp3
```

**5. Browser Compatibility**
```bash
# Try different browser
# Disable browser extensions
# Check audio permissions
```

### Issue: Performance Dashboard Not Opening

#### Symptoms
- Ctrl+Shift+P doesn't work
- Dashboard doesn't appear
- Keyboard shortcut conflict

#### Solutions

**1. Try Alternative Method**
```typescript
// Try different key combination
// Or add a button to trigger it
```

**2. Check for Conflicts**
```bash
# Disable browser extensions
# Try in incognito mode
# Check for OS-level shortcuts
```

**3. Verify Component**
```bash
# Check if component exists
ls components/ui/PerformanceDashboard.tsx

# Check if imported
grep -r "PerformanceDashboard" app/
```

---

## 🌐 BROWSER COMPATIBILITY

### Issue: Site Not Working in Safari

#### Symptoms
- Features broken in Safari
- Layout issues
- JavaScript errors

#### Solutions

**1. Check Safari Version**
```bash
# Ensure Safari is up to date
# Some features require Safari 14+
```

**2. Check for Safari-Specific Issues**
```typescript
// Add Safari-specific fixes
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (isSafari) {
  // Safari-specific code
}
```

**3. Test Flexbox/Grid**
```css
/* Add Safari prefixes if needed */
.container {
  display: -webkit-flex;
  display: flex;
}
```

### Issue: Site Not Working in Firefox

#### Symptoms
- Different appearance
- Features not working
- Console errors

#### Solutions

**1. Check Firefox Version**
```bash
# Ensure Firefox is up to date
```

**2. Check for Firefox-Specific Issues**
```typescript
// Add Firefox-specific fixes
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

if (isFirefox) {
  // Firefox-specific code
}
```

### Issue: Site Not Working in Internet Explorer

#### Note
Internet Explorer is not supported. Recommend users upgrade to modern browser.

```html
<!-- Add warning for IE users -->
<!--[if IE]>
  <div class="ie-warning">
    This site requires a modern browser. Please upgrade to Chrome, Firefox, or Edge.
  </div>
<![endif]-->
```

---

## 📱 MOBILE ISSUES

### Issue: Mobile Layout Broken

#### Symptoms
- Content overflowing
- Text too small
- Buttons not clickable

#### Solutions

**1. Check Viewport Meta Tag**
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

**2. Test Responsive Classes**
```typescript
// Ensure mobile-first approach
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Content */}
</div>
```

**3. Check Touch Targets**
```css
/* Ensure buttons are large enough */
.button {
  min-height: 44px;
  min-width: 44px;
}
```

### Issue: Mobile Performance Slow

#### Symptoms
- Slow loading on mobile
- Laggy interactions
- High data usage

#### Solutions

**1. Optimize for Mobile**
```typescript
// Reduce image sizes for mobile
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**2. Lazy Load Content**
```typescript
// Lazy load below-the-fold content
const Component = dynamic(() => import('./Component'), {
  loading: () => <Skeleton />,
});
```

**3. Reduce JavaScript**
```typescript
// Use lighter alternatives
// Avoid heavy libraries on mobile
```

### Issue: Touch Events Not Working

#### Symptoms
- Swipe gestures not working
- Tap not registering
- Double-tap issues

#### Solutions

**1. Add Touch Event Listeners**
```typescript
element.addEventListener('touchstart', handleTouch);
element.addEventListener('touchmove', handleTouch);
element.addEventListener('touchend', handleTouch);
```

**2. Prevent Default Behavior**
```typescript
const handleTouch = (e: TouchEvent) => {
  e.preventDefault();
  // Handle touch
};
```

---

## 📊 ANALYTICS & TRACKING

### Issue: Analytics Not Tracking

#### Symptoms
- No data in Google Analytics
- Events not firing
- Real-time reports empty

#### Solutions

**1. Verify GA ID**
```bash
# Check environment variable
echo $NEXT_PUBLIC_GA_ID

# Should be: G-XXXXXXXXXX
```

**2. Check Script Loading**
```bash
# Open DevTools → Network
# Filter: gtag
# Verify script loads successfully
```

**3. Test with GA Debugger**
```bash
# Install GA Debugger extension
# Open DevTools → Console
# Look for GA debug messages
```

**4. Check Ad Blockers**
```bash
# Disable ad blockers
# Test in incognito mode
# Try different browser
```

### Issue: Events Not Appearing

#### Symptoms
- Custom events not showing
- Event parameters missing
- Delayed reporting

#### Solutions

**1. Wait for Processing**
```bash
# GA4 can take 24-48 hours to process
# Check real-time reports for immediate data
```

**2. Verify Event Code**
```typescript
// Ensure correct event format
analytics.event('event_name', {
  parameter1: 'value1',
  parameter2: 'value2',
});
```

**3. Check Event Limits**
```bash
# GA4 has limits:
# - 500 distinct events per property
# - 25 parameters per event
# - 100 characters per parameter value
```

---

## 🔒 SECURITY ISSUES

### Issue: SSL Certificate Error

#### Symptoms
- "Not Secure" warning
- Certificate expired
- Mixed content warnings

#### Solutions

**1. Check SSL Status**
```bash
# Test SSL
openssl s_client -connect hlpfl.org:443

# Check certificate expiry
echo | openssl s_client -connect hlpfl.org:443 2>/dev/null | openssl x509 -noout -dates
```

**2. Verify Cloudflare Settings**
```bash
# Go to Cloudflare Dashboard
# SSL/TLS → Overview
# Ensure "Full (strict)" mode
```

**3. Clear Browser SSL Cache**
```bash
# Chrome: chrome://net-internals/#sockets
# Click "Flush socket pools"
```

### Issue: Mixed Content Warnings

#### Symptoms
- Console warnings about HTTP resources
- Some content not loading
- Security warnings

#### Solutions

**1. Use HTTPS for All Resources**
```typescript
// ❌ Wrong
<img src="http://example.com/image.jpg" />

// ✅ Correct
<img src="https://example.com/image.jpg" />
```

**2. Use Protocol-Relative URLs**
```typescript
// Works for both HTTP and HTTPS
<img src="//example.com/image.jpg" />
```

**3. Enable Automatic HTTPS Rewrites**
```bash
# Cloudflare Dashboard
# SSL/TLS → Edge Certificates
# Enable "Automatic HTTPS Rewrites"
```

---

## 🚨 EMERGENCY PROCEDURES

### Site Down - Complete Outage

#### Immediate Actions
1. **Check Status**
   ```bash
   curl -I https://hlpfl.org
   ```

2. **Check Cloudflare Status**
   - Visit https://www.cloudflarestatus.com
   - Check for ongoing incidents

3. **Rollback if Needed**
   ```bash
   # Via Cloudflare Dashboard
   # Pages → Deployments → Rollback
   
   # Or via Git
   git revert HEAD
   git push origin main
   ```

4. **Notify Team**
   - Post in team Slack/Discord
   - Update status page if available

### Critical Bug in Production

#### Immediate Actions
1. **Assess Severity**
   - Is site functional?
   - Are users affected?
   - Is data at risk?

2. **Quick Fix or Rollback**
   ```bash
   # If quick fix possible (< 5 minutes)
   # Make fix, test, deploy
   
   # Otherwise, rollback
   git revert HEAD
   git push origin main
   ```

3. **Document Issue**
   - Create GitHub issue
   - Document steps to reproduce
   - Note impact and resolution

### Data Loss or Corruption

#### Immediate Actions
1. **Stop Further Damage**
   - Rollback to last known good state
   - Disable affected features

2. **Assess Damage**
   - What data is affected?
   - Can it be recovered?
   - Are backups available?

3. **Restore from Backup**
   ```bash
   # Restore data files
   git checkout HEAD~1 -- data/releases.json
   git checkout HEAD~1 -- data/team.json
   
   # Commit and push
   git commit -m "Restore data from backup"
   git push origin main
   ```

---

## 📋 TROUBLESHOOTING CHECKLIST

### Before Contacting Support
- [ ] Cleared browser cache
- [ ] Tested in incognito mode
- [ ] Tried different browser
- [ ] Checked console for errors
- [ ] Verified internet connection
- [ ] Checked GitHub Actions status
- [ ] Reviewed recent changes
- [ ] Consulted this guide

### Information to Provide
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots or screen recording
- Console error messages
- Network tab information

---

## 🎉 CONCLUSION

This troubleshooting guide covers common issues and their solutions. Most problems can be resolved by:
1. Clearing cache
2. Checking console errors
3. Verifying file paths
4. Testing in different browsers
5. Following the specific solutions above

**Still Having Issues?**
- Check other guides (Complete Site Guide, Developer Guide)
- Review GitHub Issues
- Contact team for support

**Last Updated:** 2024  
**Version:** 2.0.0  
**Coverage:** 50+ Common Issues