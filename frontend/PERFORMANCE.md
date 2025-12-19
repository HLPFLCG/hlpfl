# Performance Optimization Guide

This document outlines performance optimization strategies and best practices for the HLPFL frontend application.

## Table of Contents

- [Performance Targets](#performance-targets)
- [Core Web Vitals](#core-web-vitals)
- [Optimization Strategies](#optimization-strategies)
- [Monitoring](#monitoring)
- [Best Practices](#best-practices)

## Performance Targets

### Lighthouse Scores

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Additional Metrics

- **FCP (First Contentful Paint)**: < 1.5s
- **TTI (Time to Interactive)**: < 3.5s
- **TBT (Total Blocking Time)**: < 300ms
- **Speed Index**: < 3.0s

## Core Web Vitals

### Largest Contentful Paint (LCP)

**What it measures**: Loading performance - when the largest content element becomes visible.

**Optimization strategies**:

1. **Optimize images**
   ```typescript
   import Image from 'next/image';
   
   <Image
     src="/hero.jpg"
     alt="Hero image"
     width={1200}
     height={600}
     priority // For above-the-fold images
     placeholder="blur"
   />
   ```

2. **Preload critical resources**
   ```html
   <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
   ```

3. **Use CDN for static assets**
   - Cloudflare CDN automatically enabled
   - Assets served from edge locations

4. **Optimize server response time**
   - Use Cloudflare Workers for edge computing
   - Implement caching strategies
   - Optimize database queries

### First Input Delay (FID)

**What it measures**: Interactivity - time from user interaction to browser response.

**Optimization strategies**:

1. **Code splitting**
   ```typescript
   import dynamic from 'next/dynamic';
   
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <LoadingSpinner />,
   });
   ```

2. **Defer non-critical JavaScript**
   ```typescript
   // Use React.lazy for route-based splitting
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   ```

3. **Optimize event handlers**
   ```typescript
   // Use debounce for expensive operations
   const handleSearch = debounce((query) => {
     performSearch(query);
   }, 300);
   ```

4. **Use web workers for heavy computations**
   ```typescript
   const worker = new Worker('/workers/data-processor.js');
   worker.postMessage(data);
   ```

### Cumulative Layout Shift (CLS)

**What it measures**: Visual stability - unexpected layout shifts.

**Optimization strategies**:

1. **Always specify image dimensions**
   ```typescript
   <Image
     src="/image.jpg"
     width={800}
     height={600}
     alt="Description"
   />
   ```

2. **Reserve space for dynamic content**
   ```typescript
   <div className="min-h-[200px]">
     {loading ? <Skeleton /> : <Content />}
   </div>
   ```

3. **Use CSS aspect ratio**
   ```css
   .video-container {
     aspect-ratio: 16 / 9;
   }
   ```

4. **Avoid inserting content above existing content**
   ```typescript
   // ❌ Bad: Inserts content at top
   <div>
     {newContent}
     {existingContent}
   </div>
   
   // ✅ Good: Appends content at bottom
   <div>
     {existingContent}
     {newContent}
   </div>
   ```

## Optimization Strategies

### 1. Image Optimization

#### Use Next.js Image Component

```typescript
import Image from 'next/image';

// Automatic optimization
<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  quality={85}
  loading="lazy"
/>
```

#### Use Modern Formats

```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};
```

#### Lazy Load Images

```typescript
<Image
  src="/image.jpg"
  alt="Description"
  loading="lazy" // Default for non-priority images
/>
```

### 2. Code Splitting

#### Route-based Splitting

```typescript
// Automatic with Next.js App Router
// Each page is automatically code-split
```

#### Component-based Splitting

```typescript
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./Chart'), {
  loading: () => <Skeleton />,
  ssr: false, // Disable SSR if not needed
});
```

#### Library Splitting

```typescript
// Import only what you need
import { format } from 'date-fns/format';
// Instead of: import { format } from 'date-fns';
```

### 3. Caching Strategies

#### Browser Caching

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

#### API Response Caching

```typescript
// Use SWR for data fetching
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 60000, // Refresh every minute
  });
}
```

#### Service Worker Caching

```typescript
// public/sw.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### 4. Bundle Optimization

#### Analyze Bundle Size

```bash
npm run analyze
```

#### Remove Unused Dependencies

```bash
npm prune
npx depcheck
```

#### Use Tree Shaking

```typescript
// ✅ Good: Named imports enable tree shaking
import { Button, Input } from '@/components';

// ❌ Bad: Default imports don't tree shake well
import * as Components from '@/components';
```

### 5. Font Optimization

#### Use Next.js Font Optimization

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

#### Preload Critical Fonts

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 6. JavaScript Optimization

#### Minimize JavaScript

```typescript
// next.config.js
module.exports = {
  swcMinify: true, // Use SWC for faster minification
};
```

#### Defer Non-Critical Scripts

```typescript
<Script
  src="/analytics.js"
  strategy="lazyOnload"
/>
```

#### Use React Server Components

```typescript
// app/page.tsx (Server Component by default)
async function Page() {
  const data = await fetchData(); // Runs on server
  return <ClientComponent data={data} />;
}
```

### 7. CSS Optimization

#### Use Tailwind CSS Purging

```typescript
// tailwind.config.ts
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // Unused classes automatically removed
};
```

#### Critical CSS Inlining

```typescript
// Automatic with Next.js
// Critical CSS is automatically inlined
```

#### Avoid CSS-in-JS Runtime

```typescript
// ✅ Good: Static CSS with Tailwind
<div className="bg-blue-500 text-white p-4">

// ❌ Bad: Runtime CSS-in-JS
<div style={{ backgroundColor: 'blue', color: 'white', padding: '1rem' }}>
```

### 8. API Optimization

#### Implement Pagination

```typescript
async function getPosts(page = 1, limit = 20) {
  const response = await apiClient.getPosts({ page, limit });
  return response;
}
```

#### Use GraphQL for Precise Data Fetching

```typescript
// Only fetch what you need
const query = `
  query GetUser {
    user {
      id
      name
      email
    }
  }
`;
```

#### Implement Request Deduplication

```typescript
// SWR automatically deduplicates requests
const { data: user1 } = useSWR('/api/user', fetcher);
const { data: user2 } = useSWR('/api/user', fetcher); // Same request, cached
```

## Monitoring

### Lighthouse CI

```bash
# Run Lighthouse audit
npm run lighthouse

# Continuous monitoring in CI/CD
# Configured in .github/workflows/ci.yml
```

### Real User Monitoring (RUM)

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Performance API

```typescript
// Measure custom metrics
const navigationTiming = performance.getEntriesByType('navigation')[0];
console.log('Page load time:', navigationTiming.loadEventEnd - navigationTiming.fetchStart);

// Mark custom events
performance.mark('data-fetch-start');
await fetchData();
performance.mark('data-fetch-end');
performance.measure('data-fetch', 'data-fetch-start', 'data-fetch-end');
```

## Best Practices

### 1. Optimize Initial Load

- Minimize above-the-fold content
- Inline critical CSS
- Defer non-critical JavaScript
- Use server-side rendering
- Implement progressive enhancement

### 2. Optimize Runtime Performance

- Use React.memo for expensive components
- Implement virtualization for long lists
- Debounce/throttle event handlers
- Use web workers for heavy computations
- Optimize re-renders

### 3. Optimize Network Performance

- Enable HTTP/2
- Use CDN for static assets
- Implement resource hints (preload, prefetch, preconnect)
- Compress responses (gzip/brotli)
- Minimize HTTP requests

### 4. Optimize Rendering Performance

- Avoid layout thrashing
- Use CSS transforms for animations
- Implement virtual scrolling
- Batch DOM updates
- Use requestAnimationFrame

### 5. Optimize Memory Usage

- Clean up event listeners
- Cancel pending requests
- Clear intervals/timeouts
- Avoid memory leaks
- Use weak references where appropriate

## Performance Checklist

Before deploying:

- [ ] Run Lighthouse audit (95+ score)
- [ ] Check Core Web Vitals (all green)
- [ ] Analyze bundle size (< 200KB gzipped)
- [ ] Test on slow 3G connection
- [ ] Test on low-end devices
- [ ] Verify image optimization
- [ ] Check font loading
- [ ] Test lazy loading
- [ ] Verify caching headers
- [ ] Test error scenarios
- [ ] Monitor real user metrics

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Remember**: Performance is a feature, not an afterthought! ⚡