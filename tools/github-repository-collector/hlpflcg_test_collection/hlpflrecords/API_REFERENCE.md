# 📚 HLPFL RECORDS - API REFERENCE

## 📋 TABLE OF CONTENTS
1. [Overview](#overview)
2. [Components API](#components-api)
3. [Hooks API](#hooks-api)
4. [Utilities API](#utilities-api)
5. [Types & Interfaces](#types--interfaces)
6. [Analytics API](#analytics-api)
7. [Cache API](#cache-api)
8. [SEO API](#seo-api)
9. [Error Handling API](#error-handling-api)
10. [Examples](#examples)

---

## 🎯 OVERVIEW

This API reference documents all components, hooks, utilities, and types available in the HLPFL Records codebase.

### Import Conventions
```typescript
// Components
import { ComponentName } from '@/components/ComponentName';
import { UIComponent } from '@/components/ui/UIComponent';

// Hooks
import { useHookName } from '@/hooks/useHookName';

// Utilities
import { utilityFunction } from '@/lib/utilityName';

// Types
import type { TypeName } from '@/types';
```

---

## 🧩 COMPONENTS API

### GlobalSearch

**Location:** `components/ui/GlobalSearch.tsx`

**Description:** Site-wide search component with keyboard shortcuts.

**Props:**
```typescript
interface GlobalSearchProps {
  placeholder?: string;
  maxResults?: number;
  categories?: string[];
  onSelect?: (result: SearchResult) => void;
  className?: string;
}
```

**Usage:**
```typescript
import { GlobalSearch } from '@/components/ui/GlobalSearch';

<GlobalSearch
  placeholder="Search releases, team..."
  maxResults={10}
  categories={['releases', 'team', 'pages']}
  onSelect={(result) => console.log('Selected:', result)}
  className="custom-class"
/>
```

**Keyboard Shortcuts:**
- `Cmd+K` / `Ctrl+K` - Open search
- `↑` / `↓` - Navigate results
- `Enter` - Select result
- `Esc` - Close search

---

### PerformanceDashboard

**Location:** `components/ui/PerformanceDashboard.tsx`

**Description:** Real-time performance monitoring dashboard.

**Props:**
```typescript
interface PerformanceDashboardProps {
  showBudgets?: boolean;
  showRecommendations?: boolean;
  refreshInterval?: number;
  className?: string;
}
```

**Usage:**
```typescript
import { PerformanceDashboard } from '@/components/ui/PerformanceDashboard';

<PerformanceDashboard
  showBudgets={true}
  showRecommendations={true}
  refreshInterval={5000}
/>
```

**Keyboard Shortcut:**
- `Ctrl+Shift+P` - Toggle dashboard

**Metrics Displayed:**
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- TTFB (Time to First Byte)
- FCP (First Contentful Paint)
- TTI (Time to Interactive)

---

### SecretMusicPlayer

**Location:** `components/ui/SecretMusicPlayer.tsx`

**Description:** Music player for unreleased tracks with visualizer.

**Props:**
```typescript
interface SecretMusicPlayerProps {
  track: {
    title: string;
    artist: string;
    audioUrl: string;
    coverUrl?: string;
  };
  onClose: () => void;
  autoPlay?: boolean;
  className?: string;
}
```

**Usage:**
```typescript
import { SecretMusicPlayer } from '@/components/ui/SecretMusicPlayer';

<SecretMusicPlayer
  track={{
    title: '5D',
    artist: 'Alki',
    audioUrl: '/audio/unreleased/5d.mp3',
    coverUrl: '/images/releases/cover.jpg',
  }}
  onClose={() => setShowPlayer(false)}
  autoPlay={true}
/>
```

**Features:**
- Play/pause controls
- Volume control
- Progress bar
- Audio visualizer
- Keyboard controls

---

### CreativeEasterEggs

**Location:** `components/ui/CreativeEasterEggs.tsx`

**Description:** Easter egg detection and triggering system.

**Props:**
```typescript
interface CreativeEasterEggsProps {
  tracks: Track[];
  onTrigger?: (track: Track) => void;
  enabledTriggers?: string[];
  className?: string;
}
```

**Usage:**
```typescript
import { CreativeEasterEggs } from '@/components/ui/CreativeEasterEggs';

<CreativeEasterEggs
  tracks={unreleasedTracks}
  onTrigger={(track) => console.log('Triggered:', track)}
  enabledTriggers={['konamiCode', 'logoClicks', 'scrollDepth']}
/>
```

**Trigger Types:**
- `konamiCode` - Konami code sequence
- `logoClicks` - Multiple logo clicks
- `scrollDepth` - Scroll to specific depth
- `timeBased` - Time-based trigger
- `mousePattern` - Mouse pattern detection
- `hiddenText` - Hidden text input
- `footerClick` - Footer double-click

---

### EnhancedErrorBoundary

**Location:** `components/ui/EnhancedErrorBoundary.tsx`

**Description:** Error boundary with fallback UI and error reporting.

**Props:**
```typescript
interface EnhancedErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: any[];
  className?: string;
}
```

**Usage:**
```typescript
import { EnhancedErrorBoundary } from '@/components/ui/EnhancedErrorBoundary';

<EnhancedErrorBoundary
  fallback={<ErrorFallback />}
  onError={(error, errorInfo) => {
    console.error('Error:', error);
    trackError(error, errorInfo);
  }}
  resetKeys={[userId]}
>
  <YourComponent />
</EnhancedErrorBoundary>
```

---

### WebVitals

**Location:** `components/ui/WebVitals.tsx`

**Description:** Core Web Vitals monitoring component.

**Props:**
```typescript
interface WebVitalsProps {
  onMetric?: (metric: Metric) => void;
  reportToAnalytics?: boolean;
  className?: string;
}
```

**Usage:**
```typescript
import { WebVitals } from '@/components/ui/WebVitals';

<WebVitals
  onMetric={(metric) => console.log('Metric:', metric)}
  reportToAnalytics={true}
/>
```

**Metrics:**
```typescript
interface Metric {
  name: 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'FCP' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}
```

---

### Skeleton

**Location:** `components/ui/Skeleton.tsx`

**Description:** Loading placeholder component.

**Props:**
```typescript
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
  width?: string | number;
  height?: string | number;
}
```

**Usage:**
```typescript
import { Skeleton } from '@/components/ui/Skeleton';

<Skeleton className="w-full h-48" />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="text" animation="wave" />
```

---

### Toast

**Location:** `components/ui/Toast.tsx`

**Description:** Toast notification system.

**API:**
```typescript
interface ToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Toast functions
toast.success(message: string, options?: ToastOptions): void;
toast.error(message: string, options?: ToastOptions): void;
toast.info(message: string, options?: ToastOptions): void;
toast.warning(message: string, options?: ToastOptions): void;
toast.custom(content: React.ReactNode, options?: ToastOptions): void;
```

**Usage:**
```typescript
import { toast } from '@/components/ui/Toast';

// Simple toast
toast.success('Release added successfully!');

// With options
toast.error('Failed to save', {
  duration: 5000,
  position: 'top-right',
  action: {
    label: 'Retry',
    onClick: () => retry(),
  },
});

// Custom toast
toast.custom(
  <div>Custom content</div>,
  { duration: 3000 }
);
```

---

## 🪝 HOOKS API

### useSearch

**Location:** `hooks/useSearch.ts`

**Description:** Search functionality hook.

**API:**
```typescript
function useSearch(options?: SearchOptions): SearchResult;

interface SearchOptions {
  categories?: string[];
  maxResults?: number;
  debounceMs?: number;
}

interface SearchResult {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResultItem[];
  loading: boolean;
  error: Error | null;
}
```

**Usage:**
```typescript
import { useSearch } from '@/hooks/useSearch';

function SearchComponent() {
  const { query, setQuery, results, loading } = useSearch({
    categories: ['releases', 'team'],
    maxResults: 10,
  });

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
```

---

### useEasterEggs

**Location:** `hooks/useEasterEggs.ts`

**Description:** Easter egg detection hook.

**API:**
```typescript
function useEasterEggs(options?: EasterEggOptions): EasterEggResult;

interface EasterEggOptions {
  tracks: Track[];
  enabledTriggers?: string[];
  onTrigger?: (track: Track) => void;
}

interface EasterEggResult {
  activeTrack: Track | null;
  showPlayer: boolean;
  setShowPlayer: (show: boolean) => void;
}
```

**Usage:**
```typescript
import { useEasterEggs } from '@/hooks/useEasterEggs';

function Component() {
  const { activeTrack, showPlayer, setShowPlayer } = useEasterEggs({
    tracks: unreleasedTracks,
    onTrigger: (track) => console.log('Triggered:', track),
  });

  return showPlayer && activeTrack ? (
    <SecretMusicPlayer
      track={activeTrack}
      onClose={() => setShowPlayer(false)}
    />
  ) : null;
}
```

---

### useAnalytics

**Location:** `hooks/useAnalytics.ts`

**Description:** Analytics tracking hook.

**API:**
```typescript
function useAnalytics(): AnalyticsHook;

interface AnalyticsHook {
  trackEvent: (event: string, params?: Record<string, any>) => void;
  trackPageView: (url: string) => void;
  trackClick: (element: string, params?: Record<string, any>) => void;
  trackError: (error: Error, params?: Record<string, any>) => void;
}
```

**Usage:**
```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

function Component() {
  const { trackEvent, trackClick } = useAnalytics();

  const handleClick = () => {
    trackClick('button', { button_name: 'submit' });
    // Handle click
  };

  return <button onClick={handleClick}>Submit</button>;
}
```

---

### useLocalStorage

**Location:** `hooks/useLocalStorage.ts`

**Description:** Local storage state management hook.

**API:**
```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void];
```

**Usage:**
```typescript
import { useLocalStorage } from '@/hooks/useLocalStorage';

function Component() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

---

## 🛠️ UTILITIES API

### Analytics

**Location:** `lib/analytics.ts`

**Description:** Analytics utility functions.

**API:**
```typescript
// Initialize analytics
analytics.init(): void;

// Track page view
analytics.pageView(url: string): void;

// Track event
analytics.event(action: string, params?: Record<string, any>): void;

// Track click
analytics.trackClick(element: string, params?: Record<string, any>): void;

// Track scroll
analytics.trackScroll(depth: number): void;

// Track search
analytics.trackSearch(query: string, results: number): void;

// Track error
analytics.trackError(error: Error, params?: Record<string, any>): void;

// Track performance
analytics.trackPerformance(metric: string, value: number): void;

// Track conversion
analytics.trackConversion(goal: string, value?: number): void;
```

**Usage:**
```typescript
import { analytics } from '@/lib/analytics';

// Track custom event
analytics.event('release_play', {
  release_id: 'reflections-ep',
  release_title: 'Reflections',
});

// Track error
try {
  // Code
} catch (error) {
  analytics.trackError(error, { context: 'release_page' });
}
```

---

### Cache

**Location:** `lib/cache.ts`

**Description:** Multi-tier caching system.

**API:**
```typescript
// Create cache instance
const cache = new Cache<T>(options?: CacheOptions);

interface CacheOptions {
  maxSize?: number;
  ttl?: number;
  strategy?: 'LRU' | 'LFU' | 'FIFO';
}

// Cache methods
cache.get(key: string): T | undefined;
cache.set(key: string, value: T, ttl?: number): void;
cache.has(key: string): boolean;
cache.delete(key: string): boolean;
cache.clear(): void;
cache.size(): number;
```

**Usage:**
```typescript
import { Cache } from '@/lib/cache';

// Create cache
const releaseCache = new Cache<Release>({
  maxSize: 100,
  ttl: 3600000, // 1 hour
  strategy: 'LRU',
});

// Use cache
const release = releaseCache.get('reflections-ep');
if (!release) {
  const fetchedRelease = await fetchRelease('reflections-ep');
  releaseCache.set('reflections-ep', fetchedRelease);
}
```

---

### SEO

**Location:** `lib/advancedSEO.ts`

**Description:** SEO utilities and schema generation.

**API:**
```typescript
// Generate schema
generateSchema(type: SchemaType, data: any): object;

// Schema types
type SchemaType =
  | 'Organization'
  | 'WebSite'
  | 'MusicGroup'
  | 'MusicAlbum'
  | 'MusicRecording'
  | 'Person'
  | 'BreadcrumbList'
  | 'SearchAction';

// Generate meta tags
generateMetaTags(data: MetaData): MetaTags;

interface MetaData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}
```

**Usage:**
```typescript
import { generateSchema, generateMetaTags } from '@/lib/advancedSEO';

// Generate schema
const schema = generateSchema('MusicAlbum', {
  name: 'Reflections',
  artist: 'Alki',
  releaseDate: '2024-01-01',
});

// Generate meta tags
const meta = generateMetaTags({
  title: 'Reflections EP - Alki',
  description: 'New EP by Alki',
  image: '/images/releases/cover.jpg',
});
```

---

### Error Tracking

**Location:** `lib/errorTracking.ts`

**Description:** Error tracking and reporting utilities.

**API:**
```typescript
// Track error
trackError(error: Error, context?: ErrorContext): void;

interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

// Get error stats
getErrorStats(): ErrorStats;

interface ErrorStats {
  total: number;
  byType: Record<string, number>;
  recent: Error[];
}
```

**Usage:**
```typescript
import { trackError } from '@/lib/errorTracking';

try {
  // Code
} catch (error) {
  trackError(error, {
    component: 'ReleaseCard',
    action: 'fetch_release',
    metadata: { releaseId: 'reflections-ep' },
  });
}
```

---

### Image Optimization

**Location:** `lib/imageOptimization.ts`

**Description:** Image optimization utilities.

**API:**
```typescript
// Optimize image
optimizeImage(src: string, options?: ImageOptions): string;

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
}

// Generate blur placeholder
generateBlurPlaceholder(src: string): Promise<string>;

// Get image dimensions
getImageDimensions(src: string): Promise<{ width: number; height: number }>;
```

**Usage:**
```typescript
import { optimizeImage, generateBlurPlaceholder } from '@/lib/imageOptimization';

// Optimize image
const optimizedSrc = optimizeImage('/images/cover.jpg', {
  width: 800,
  quality: 85,
  format: 'webp',
});

// Generate placeholder
const placeholder = await generateBlurPlaceholder('/images/cover.jpg');
```

---

### Performance Budget

**Location:** `lib/performanceBudget.ts`

**Description:** Performance budget monitoring.

**API:**
```typescript
// Check performance budget
checkBudget(metrics: PerformanceMetrics): BudgetResult;

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
  fcp?: number;
  tti?: number;
}

interface BudgetResult {
  passed: boolean;
  violations: Violation[];
  warnings: Warning[];
}

// Get budget status
getBudgetStatus(): BudgetStatus;
```

**Usage:**
```typescript
import { checkBudget } from '@/lib/performanceBudget';

const result = checkBudget({
  lcp: 2100,
  fid: 50,
  cls: 0.05,
});

if (!result.passed) {
  console.warn('Performance budget exceeded:', result.violations);
}
```

---

## 📝 TYPES & INTERFACES

### Release

**Location:** `types/release.ts`

```typescript
interface Release {
  id: string;
  title: string;
  artist: string;
  type: 'Single' | 'EP' | 'Album' | 'Mixtape';
  releaseDate: string;
  coverArt: string;
  streamingLinks?: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    soundcloud?: string;
    tidal?: string;
    amazonMusic?: string;
  };
  tracks?: Track[];
  description?: string;
  credits?: {
    producer?: string[];
    engineer?: string[];
    mixer?: string[];
    mastering?: string[];
    artwork?: string[];
  };
  tags?: string[];
  featured?: boolean;
  hidden?: boolean;
}

interface Track {
  number: number;
  title: string;
  duration: string;
  explicit?: boolean;
  featured?: string[];
}
```

---

### Team Member

**Location:** `types/team.ts`

```typescript
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  achievements?: string[];
  joinDate?: string;
  featured?: boolean;
  order?: number;
}
```

---

### Search Result

**Location:** `types/search.ts`

```typescript
interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'release' | 'team' | 'page';
  url: string;
  image?: string;
  score: number;
}
```

---

## 📊 ANALYTICS API

### Event Tracking

```typescript
// Page view
analytics.pageView(url: string): void;

// Custom event
analytics.event(action: string, params?: {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}): void;

// Click tracking
analytics.trackClick(element: string, params?: Record<string, any>): void;

// Scroll tracking
analytics.trackScroll(depth: number): void;

// Search tracking
analytics.trackSearch(query: string, results: number): void;

// Error tracking
analytics.trackError(error: Error, params?: Record<string, any>): void;

// Performance tracking
analytics.trackPerformance(metric: string, value: number): void;

// Conversion tracking
analytics.trackConversion(goal: string, value?: number): void;

// Engagement tracking
analytics.trackEngagement(type: string, params?: Record<string, any>): void;

// Session tracking
analytics.trackSession(data: SessionData): void;

// User tracking
analytics.trackUser(properties: UserProperties): void;
```

---

## 💾 CACHE API

### Cache Strategies

```typescript
// LRU (Least Recently Used)
const lruCache = new Cache<T>({ strategy: 'LRU', maxSize: 100 });

// LFU (Least Frequently Used)
const lfuCache = new Cache<T>({ strategy: 'LFU', maxSize: 100 });

// FIFO (First In First Out)
const fifoCache = new Cache<T>({ strategy: 'FIFO', maxSize: 100 });

// With TTL
const ttlCache = new Cache<T>({ ttl: 3600000 }); // 1 hour
```

---

## 🔍 SEO API

### Schema Generation

```typescript
// Organization schema
const orgSchema = generateSchema('Organization', {
  name: 'HLPFL Records',
  url: 'https://hlpfl.org',
  logo: 'https://hlpfl.org/logo.png',
});

// Music album schema
const albumSchema = generateSchema('MusicAlbum', {
  name: 'Reflections',
  artist: 'Alki',
  releaseDate: '2024-01-01',
  tracks: [...],
});

// Person schema
const personSchema = generateSchema('Person', {
  name: 'Noah Rank',
  jobTitle: 'Founder & CEO',
  image: 'https://hlpfl.org/team/noah.jpg',
});
```

---

## 🚨 ERROR HANDLING API

### Error Tracking

```typescript
// Track error
trackError(error: Error, context?: {
  component?: string;
  action?: string;
  userId?: string;
  metadata?: Record<string, any>;
}): void;

// Get error stats
getErrorStats(): {
  total: number;
  byType: Record<string, number>;
  recent: Error[];
};

// Clear errors
clearErrors(): void;
```

---

## 💡 EXAMPLES

### Complete Component Example

```typescript
import { useState } from 'react';
import { GlobalSearch } from '@/components/ui/GlobalSearch';
import { Toast, toast } from '@/components/ui/Toast';
import { useAnalytics } from '@/hooks/useAnalytics';
import { EnhancedErrorBoundary } from '@/components/ui/EnhancedErrorBoundary';

export function ExampleComponent() {
  const [query, setQuery] = useState('');
  const { trackEvent } = useAnalytics();

  const handleSearch = (result: SearchResult) => {
    trackEvent('search_result_click', {
      query,
      result_type: result.type,
      result_id: result.id,
    });

    toast.success(`Opening ${result.title}`);
  };

  return (
    <EnhancedErrorBoundary>
      <div className="container">
        <GlobalSearch
          onSelect={handleSearch}
          maxResults={10}
        />
        <Toast />
      </div>
    </EnhancedErrorBoundary>
  );
}
```

---

## 🎉 CONCLUSION

This API reference provides comprehensive documentation for all components, hooks, utilities, and types in the HLPFL Records codebase.

**For More Information:**
- Complete Site Guide
- Developer Guide
- Component source code

**Last Updated:** 2024  
**Version:** 2.0.0  
**Total APIs:** 100+