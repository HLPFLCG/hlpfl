# 📊 HLPFL RECORDS - ANALYTICS & DATA TRACKING GUIDE

## 📋 TABLE OF CONTENTS
1. [Overview](#overview)
2. [Analytics Setup](#analytics-setup)
3. [Tracked Events](#tracked-events)
4. [Custom Metrics](#custom-metrics)
5. [Performance Monitoring](#performance-monitoring)
6. [User Behavior Analysis](#user-behavior-analysis)
7. [Easter Egg Analytics](#easter-egg-analytics)
8. [Conversion Tracking](#conversion-tracking)
9. [Reports & Dashboards](#reports--dashboards)
10. [Privacy & Compliance](#privacy--compliance)
11. [Advanced Analytics](#advanced-analytics)
12. [Troubleshooting](#troubleshooting)

---

## 🎯 OVERVIEW

### What We Track
The HLPFL Records website implements comprehensive analytics to understand user behavior, optimize performance, and measure engagement. All tracking is privacy-focused and GDPR-compliant.

### Analytics Stack
- **Google Analytics 4** - Primary analytics platform
- **Custom Analytics** - Proprietary tracking system
- **Performance Monitoring** - Real-time performance metrics
- **Error Tracking** - Automatic error capture
- **Web Vitals** - Core Web Vitals monitoring

### Key Metrics
- **Traffic:** Page views, sessions, users
- **Engagement:** Time on site, bounce rate, pages per session
- **Content:** Popular releases, team member views
- **Features:** Search usage, easter egg discoveries
- **Performance:** Load times, Core Web Vitals
- **Conversions:** Streaming clicks, social follows

---

## 🔧 ANALYTICS SETUP

### Google Analytics 4 Configuration

#### Installation
```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Custom Analytics Library

#### File: lib/analytics.ts
```typescript
// Analytics utility functions
export const analytics = {
  // Initialize analytics
  init: () => {
    if (typeof window !== 'undefined') {
      // Setup custom analytics
      console.log('Analytics initialized');
    }
  },

  // Track page view
  pageView: (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    }
  },

  // Track custom event
  event: (action: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, params);
    }
  },
};
```

---

## 📈 TRACKED EVENTS

### 1. Page View Events

#### Automatic Tracking
```typescript
// Tracks automatically on route change
analytics.pageView(window.location.pathname);
```

#### Custom Page Views
```typescript
// Track specific page views
analytics.event('page_view', {
  page_title: 'Release Detail',
  page_location: window.location.href,
  page_path: window.location.pathname,
});
```

### 2. Click Events

#### Release Clicks
```typescript
// When user clicks on a release
analytics.event('release_click', {
  release_id: 'reflections-ep',
  release_title: 'Reflections',
  release_type: 'EP',
  click_location: 'homepage_featured',
});
```

#### Streaming Platform Clicks
```typescript
// When user clicks streaming link
analytics.event('streaming_click', {
  platform: 'spotify',
  release_id: 'reflections-ep',
  release_title: 'Reflections',
  link_location: 'release_page',
});
```

#### Team Member Clicks
```typescript
// When user clicks team member
analytics.event('team_member_click', {
  member_id: 'noah-rank',
  member_name: 'Noah Rank',
  member_role: 'Founder & CEO',
  click_location: 'team_page',
});
```

#### Social Media Clicks
```typescript
// When user clicks social link
analytics.event('social_click', {
  platform: 'instagram',
  link_type: 'team_member',
  member_id: 'noah-rank',
});
```

### 3. Search Events

#### Search Query
```typescript
// When user performs search
analytics.event('search', {
  search_term: 'reflections',
  search_category: 'all',
  results_count: 5,
});
```

#### Search Result Click
```typescript
// When user clicks search result
analytics.event('search_result_click', {
  search_term: 'reflections',
  result_type: 'release',
  result_id: 'reflections-ep',
  result_position: 1,
});
```

### 4. Easter Egg Events

#### Easter Egg Triggered
```typescript
// When easter egg is triggered
analytics.event('easter_egg_triggered', {
  trigger_type: 'konami_code',
  track_id: '5d',
  track_title: '5D',
  timestamp: new Date().toISOString(),
});
```

#### Track Played
```typescript
// When unreleased track is played
analytics.event('unreleased_track_played', {
  track_id: '5d',
  track_title: '5D',
  trigger_type: 'konami_code',
  play_duration: 180, // seconds
  completed: true,
});
```

### 5. Engagement Events

#### Scroll Depth
```typescript
// Track scroll depth milestones
analytics.event('scroll_depth', {
  depth_percentage: 75,
  page_path: window.location.pathname,
});
```

#### Time on Page
```typescript
// Track time spent on page
analytics.event('time_on_page', {
  duration_seconds: 120,
  page_path: window.location.pathname,
  engaged: true, // user interacted
});
```

#### Video Play
```typescript
// When user plays video
analytics.event('video_play', {
  video_title: 'Behind the Scenes',
  video_url: '/videos/bts.mp4',
  video_duration: 300,
});
```

### 6. Error Events

#### JavaScript Error
```typescript
// Automatic error tracking
analytics.event('error', {
  error_message: error.message,
  error_stack: error.stack,
  error_type: 'javascript',
  page_path: window.location.pathname,
});
```

#### 404 Not Found
```typescript
// Track 404 errors
analytics.event('404_error', {
  page_path: window.location.pathname,
  referrer: document.referrer,
});
```

### 7. Performance Events

#### Page Load Time
```typescript
// Track page load performance
analytics.event('page_load', {
  load_time: 1250, // milliseconds
  page_path: window.location.pathname,
});
```

#### Core Web Vitals
```typescript
// Track Web Vitals
analytics.event('web_vitals', {
  metric_name: 'LCP',
  metric_value: 2100,
  metric_rating: 'good',
});
```

---

## 📊 CUSTOM METRICS

### User Engagement Score
```typescript
// Calculate engagement score
function calculateEngagementScore(user: User): number {
  const metrics = {
    pageViews: user.pageViews * 1,
    timeOnSite: user.timeOnSite * 0.5,
    searchUsage: user.searchCount * 2,
    easterEggsFound: user.easterEggsFound * 5,
    streamingClicks: user.streamingClicks * 3,
    socialClicks: user.socialClicks * 2,
  };

  return Object.values(metrics).reduce((sum, val) => sum + val, 0);
}

// Track engagement score
analytics.event('engagement_score', {
  score: calculateEngagementScore(user),
  user_segment: 'power_user',
});
```

### Content Popularity Index
```typescript
// Calculate content popularity
function calculatePopularityIndex(release: Release): number {
  const metrics = {
    views: release.views * 1,
    streamingClicks: release.streamingClicks * 3,
    timeSpent: release.avgTimeSpent * 0.5,
    shareCount: release.shares * 5,
  };

  return Object.values(metrics).reduce((sum, val) => sum + val, 0);
}

// Track popularity
analytics.event('content_popularity', {
  release_id: 'reflections-ep',
  popularity_index: calculatePopularityIndex(release),
  trending: true,
});
```

### Feature Adoption Rate
```typescript
// Track feature usage
function trackFeatureAdoption(feature: string) {
  const totalUsers = getTotalUsers();
  const featureUsers = getFeatureUsers(feature);
  const adoptionRate = (featureUsers / totalUsers) * 100;

  analytics.event('feature_adoption', {
    feature_name: feature,
    adoption_rate: adoptionRate,
    total_users: totalUsers,
    feature_users: featureUsers,
  });
}
```

---

## ⚡ PERFORMANCE MONITORING

### Core Web Vitals Tracking

#### LCP (Largest Contentful Paint)
```typescript
// Track LCP
import { onLCP } from 'web-vitals';

onLCP((metric) => {
  analytics.event('web_vitals', {
    metric_name: 'LCP',
    metric_value: metric.value,
    metric_rating: metric.rating,
    metric_delta: metric.delta,
  });
});
```

#### FID (First Input Delay)
```typescript
// Track FID
import { onFID } from 'web-vitals';

onFID((metric) => {
  analytics.event('web_vitals', {
    metric_name: 'FID',
    metric_value: metric.value,
    metric_rating: metric.rating,
  });
});
```

#### CLS (Cumulative Layout Shift)
```typescript
// Track CLS
import { onCLS } from 'web-vitals';

onCLS((metric) => {
  analytics.event('web_vitals', {
    metric_name: 'CLS',
    metric_value: metric.value,
    metric_rating: metric.rating,
  });
});
```

### Performance Budgets
```typescript
// Monitor performance budgets
const budgets = {
  lcp: 2500,
  fid: 100,
  cls: 0.1,
  ttfb: 600,
};

function checkPerformanceBudget(metric: string, value: number) {
  const budget = budgets[metric];
  const exceeded = value > budget;

  if (exceeded) {
    analytics.event('performance_budget_exceeded', {
      metric_name: metric,
      metric_value: value,
      budget_value: budget,
      excess_percentage: ((value - budget) / budget) * 100,
    });
  }
}
```

### Resource Timing
```typescript
// Track resource loading times
function trackResourceTiming() {
  const resources = performance.getEntriesByType('resource');

  resources.forEach((resource) => {
    analytics.event('resource_timing', {
      resource_name: resource.name,
      resource_type: resource.initiatorType,
      duration: resource.duration,
      size: resource.transferSize,
    });
  });
}
```

---

## 👥 USER BEHAVIOR ANALYSIS

### Session Tracking
```typescript
// Track user session
interface Session {
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  pageViews: number;
  events: Event[];
  duration?: number;
}

function trackSession(session: Session) {
  analytics.event('session_end', {
    session_id: session.sessionId,
    duration_seconds: session.duration,
    page_views: session.pageViews,
    events_count: session.events.length,
    bounce: session.pageViews === 1,
  });
}
```

### User Journey Mapping
```typescript
// Track user journey
interface Journey {
  steps: Array<{
    page: string;
    timestamp: Date;
    action?: string;
  }>;
}

function trackUserJourney(journey: Journey) {
  analytics.event('user_journey', {
    journey_length: journey.steps.length,
    entry_page: journey.steps[0].page,
    exit_page: journey.steps[journey.steps.length - 1].page,
    journey_duration: calculateDuration(journey),
  });
}
```

### Funnel Analysis
```typescript
// Track conversion funnel
const funnel = {
  steps: [
    'homepage_visit',
    'release_view',
    'streaming_click',
  ],
};

function trackFunnelStep(step: string, completed: boolean) {
  analytics.event('funnel_step', {
    funnel_name: 'streaming_conversion',
    step_name: step,
    step_completed: completed,
    step_index: funnel.steps.indexOf(step),
  });
}
```

### Cohort Analysis
```typescript
// Track user cohorts
interface Cohort {
  cohortId: string;
  joinDate: Date;
  users: number;
  retention: number;
}

function trackCohort(cohort: Cohort) {
  analytics.event('cohort_analysis', {
    cohort_id: cohort.cohortId,
    cohort_size: cohort.users,
    retention_rate: cohort.retention,
    days_since_join: daysSince(cohort.joinDate),
  });
}
```

---

## 🥚 EASTER EGG ANALYTICS

### Discovery Tracking
```typescript
// Track easter egg discoveries
interface EasterEggDiscovery {
  triggerId: string;
  triggerType: string;
  trackId: string;
  timestamp: Date;
  userId?: string;
}

function trackEasterEggDiscovery(discovery: EasterEggDiscovery) {
  analytics.event('easter_egg_discovered', {
    trigger_id: discovery.triggerId,
    trigger_type: discovery.triggerType,
    track_id: discovery.trackId,
    timestamp: discovery.timestamp.toISOString(),
    time_to_discover: calculateTimeToDiscover(discovery),
  });
}
```

### Discovery Rate
```typescript
// Calculate discovery rate
function calculateDiscoveryRate() {
  const totalUsers = getTotalUsers();
  const discoverers = getEasterEggDiscoverers();
  const rate = (discoverers / totalUsers) * 100;

  analytics.event('easter_egg_discovery_rate', {
    total_users: totalUsers,
    discoverers: discoverers,
    discovery_rate: rate,
  });

  return rate;
}
```

### Trigger Difficulty Analysis
```typescript
// Analyze trigger difficulty
interface TriggerStats {
  triggerId: string;
  attempts: number;
  successes: number;
  avgTimeToComplete: number;
}

function analyzeTriggerDifficulty(stats: TriggerStats) {
  const successRate = (stats.successes / stats.attempts) * 100;

  analytics.event('trigger_difficulty', {
    trigger_id: stats.triggerId,
    success_rate: successRate,
    avg_completion_time: stats.avgTimeToComplete,
    difficulty_rating: calculateDifficulty(successRate),
  });
}
```

### Track Popularity
```typescript
// Track unreleased track popularity
interface TrackStats {
  trackId: string;
  plays: number;
  completions: number;
  avgPlayDuration: number;
  shares: number;
}

function trackTrackPopularity(stats: TrackStats) {
  const completionRate = (stats.completions / stats.plays) * 100;

  analytics.event('unreleased_track_popularity', {
    track_id: stats.trackId,
    total_plays: stats.plays,
    completion_rate: completionRate,
    avg_play_duration: stats.avgPlayDuration,
    share_count: stats.shares,
  });
}
```

---

## 🎯 CONVERSION TRACKING

### Streaming Conversions
```typescript
// Track streaming platform conversions
function trackStreamingConversion(release: Release, platform: string) {
  analytics.event('streaming_conversion', {
    release_id: release.id,
    release_title: release.title,
    platform: platform,
    conversion_source: 'release_page',
    timestamp: new Date().toISOString(),
  });
}
```

### Social Media Conversions
```typescript
// Track social media follows
function trackSocialConversion(platform: string, source: string) {
  analytics.event('social_conversion', {
    platform: platform,
    conversion_source: source,
    timestamp: new Date().toISOString(),
  });
}
```

### Email Signups
```typescript
// Track email signups
function trackEmailSignup(source: string) {
  analytics.event('email_signup', {
    signup_source: source,
    timestamp: new Date().toISOString(),
  });
}
```

### Goal Completions
```typescript
// Track custom goals
function trackGoalCompletion(goal: string, value?: number) {
  analytics.event('goal_completion', {
    goal_name: goal,
    goal_value: value,
    timestamp: new Date().toISOString(),
  });
}
```

---

## 📊 REPORTS & DASHBOARDS

### Daily Report
```typescript
// Generate daily analytics report
interface DailyReport {
  date: Date;
  pageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  bounceRate: number;
  topPages: Array<{ page: string; views: number }>;
  topReleases: Array<{ release: string; views: number }>;
  streamingClicks: number;
  easterEggTriggers: number;
}

function generateDailyReport(): DailyReport {
  // Aggregate daily data
  return {
    date: new Date(),
    pageViews: getDailyPageViews(),
    uniqueVisitors: getDailyUniqueVisitors(),
    avgSessionDuration: getAvgSessionDuration(),
    bounceRate: getBounceRate(),
    topPages: getTopPages(5),
    topReleases: getTopReleases(5),
    streamingClicks: getStreamingClicks(),
    easterEggTriggers: getEasterEggTriggers(),
  };
}
```

### Weekly Report
```typescript
// Generate weekly analytics report
interface WeeklyReport extends DailyReport {
  weekNumber: number;
  growthRate: number;
  newUsers: number;
  returningUsers: number;
  topSearchTerms: Array<{ term: string; count: number }>;
}

function generateWeeklyReport(): WeeklyReport {
  // Aggregate weekly data
  return {
    ...generateDailyReport(),
    weekNumber: getWeekNumber(),
    growthRate: calculateGrowthRate(),
    newUsers: getNewUsers(),
    returningUsers: getReturningUsers(),
    topSearchTerms: getTopSearchTerms(10),
  };
}
```

### Performance Dashboard
Access real-time performance metrics:
1. Press `Ctrl+Shift+P` to open dashboard
2. View tabs:
   - **Overview:** Key metrics summary
   - **Performance:** Core Web Vitals
   - **Engagement:** User behavior
   - **Easter Eggs:** Discovery stats
   - **Conversions:** Goal tracking

### Custom Dashboard
```typescript
// Create custom dashboard
interface Dashboard {
  widgets: Array<{
    type: 'metric' | 'chart' | 'table';
    title: string;
    data: any;
  }>;
}

function createCustomDashboard(): Dashboard {
  return {
    widgets: [
      {
        type: 'metric',
        title: 'Total Page Views',
        data: getTotalPageViews(),
      },
      {
        type: 'chart',
        title: 'Traffic Over Time',
        data: getTrafficData(),
      },
      {
        type: 'table',
        title: 'Top Releases',
        data: getTopReleases(10),
      },
    ],
  };
}
```

---

## 🔒 PRIVACY & COMPLIANCE

### GDPR Compliance
```typescript
// Cookie consent management
function handleCookieConsent(consent: boolean) {
  if (consent) {
    // Enable analytics
    analytics.init();
    localStorage.setItem('analytics_consent', 'true');
  } else {
    // Disable analytics
    localStorage.setItem('analytics_consent', 'false');
  }

  analytics.event('cookie_consent', {
    consent_given: consent,
    timestamp: new Date().toISOString(),
  });
}
```

### Data Anonymization
```typescript
// Anonymize user data
function anonymizeUserData(data: any) {
  return {
    ...data,
    userId: hashUserId(data.userId),
    ipAddress: anonymizeIP(data.ipAddress),
    email: undefined, // Remove PII
    name: undefined, // Remove PII
  };
}
```

### Data Retention
```typescript
// Configure data retention
const retentionPolicy = {
  pageViews: 90, // days
  events: 90,
  errors: 30,
  performance: 30,
  userSessions: 90,
};

function enforceRetentionPolicy() {
  Object.entries(retentionPolicy).forEach(([dataType, days]) => {
    deleteOldData(dataType, days);
  });
}
```

### Opt-Out Mechanism
```typescript
// Allow users to opt out
function handleOptOut() {
  // Disable all tracking
  window['ga-disable-' + process.env.NEXT_PUBLIC_GA_ID] = true;
  localStorage.setItem('analytics_opt_out', 'true');

  analytics.event('analytics_opt_out', {
    timestamp: new Date().toISOString(),
  });
}
```

---

## 🚀 ADVANCED ANALYTICS

### A/B Testing
```typescript
// Implement A/B testing
interface ABTest {
  testId: string;
  variants: Array<{
    id: string;
    name: string;
    weight: number;
  }>;
}

function assignVariant(test: ABTest): string {
  const random = Math.random();
  let cumulative = 0;

  for (const variant of test.variants) {
    cumulative += variant.weight;
    if (random < cumulative) {
      analytics.event('ab_test_assignment', {
        test_id: test.testId,
        variant_id: variant.id,
        variant_name: variant.name,
      });
      return variant.id;
    }
  }

  return test.variants[0].id;
}
```

### Predictive Analytics
```typescript
// Predict user behavior
interface Prediction {
  userId: string;
  likelihood: number;
  action: string;
}

function predictUserAction(user: User): Prediction {
  // Machine learning model prediction
  const features = extractFeatures(user);
  const prediction = model.predict(features);

  analytics.event('prediction_made', {
    user_id: user.id,
    predicted_action: prediction.action,
    confidence: prediction.likelihood,
  });

  return prediction;
}
```

### Heatmap Tracking
```typescript
// Track click heatmaps
interface HeatmapData {
  x: number;
  y: number;
  timestamp: Date;
  page: string;
}

function trackHeatmapClick(event: MouseEvent) {
  const data: HeatmapData = {
    x: event.clientX,
    y: event.clientY,
    timestamp: new Date(),
    page: window.location.pathname,
  };

  analytics.event('heatmap_click', {
    x: data.x,
    y: data.y,
    page: data.page,
  });
}
```

### Session Replay
```typescript
// Record user sessions
interface SessionRecording {
  sessionId: string;
  events: Array<{
    type: string;
    timestamp: Date;
    data: any;
  }>;
}

function recordSession(): SessionRecording {
  // Record user interactions
  const recording: SessionRecording = {
    sessionId: generateSessionId(),
    events: [],
  };

  // Track events
  document.addEventListener('click', (e) => {
    recording.events.push({
      type: 'click',
      timestamp: new Date(),
      data: { x: e.clientX, y: e.clientY },
    });
  });

  return recording;
}
```

---

## 🔍 TROUBLESHOOTING

### Issue: Analytics Not Tracking

**Solutions:**
1. Check GA_ID is set correctly
2. Verify gtag script is loaded
3. Check browser console for errors
4. Ensure cookies are enabled
5. Test in incognito mode
6. Verify network requests

### Issue: Events Not Appearing in GA

**Solutions:**
1. Wait 24-48 hours for processing
2. Check real-time reports
3. Verify event parameters
4. Check GA4 configuration
5. Test with GA Debugger extension

### Issue: Performance Metrics Incorrect

**Solutions:**
1. Clear browser cache
2. Test on different devices
3. Check network conditions
4. Verify measurement code
5. Review performance budgets

### Issue: High Bounce Rate

**Possible Causes:**
1. Slow page load times
2. Poor mobile experience
3. Irrelevant traffic sources
4. Technical issues
5. Poor content quality

**Solutions:**
1. Optimize performance
2. Improve mobile design
3. Review traffic sources
4. Fix technical errors
5. Enhance content

---

## 📚 ANALYTICS CHECKLIST

### Daily Tasks
- [ ] Review real-time dashboard
- [ ] Check for errors or anomalies
- [ ] Monitor performance metrics
- [ ] Review top content
- [ ] Check conversion rates

### Weekly Tasks
- [ ] Generate weekly report
- [ ] Analyze user behavior trends
- [ ] Review easter egg discoveries
- [ ] Check goal completions
- [ ] Optimize underperforming content

### Monthly Tasks
- [ ] Comprehensive analytics review
- [ ] Update tracking implementation
- [ ] Review and adjust goals
- [ ] Analyze long-term trends
- [ ] Plan optimization strategies

---

## 🎉 CONCLUSION

This analytics guide provides comprehensive tracking for the HLPFL Records website. Use these insights to:
- Understand user behavior
- Optimize content and features
- Improve performance
- Increase engagement
- Drive conversions

**Key Takeaways:**
- Track everything that matters
- Respect user privacy
- Use data to make decisions
- Continuously optimize
- Monitor performance

**Resources:**
- Complete Site Guide
- Editing Guide
- Easter Eggs Guide
- Developer Guide

**Last Updated:** 2024  
**Version:** 2.0.0  
**Total Events Tracked:** 50+  
**Metrics Monitored:** 100+