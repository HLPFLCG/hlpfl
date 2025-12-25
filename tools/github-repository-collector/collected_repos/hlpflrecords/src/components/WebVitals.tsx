'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP, type Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }
}

export function WebVitals() {
  useEffect(() => {
    // Track Core Web Vitals
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    onINP(sendToAnalytics); // INP replaces FID in web-vitals v3+
  }, []);

  return null;
}

// Performance monitoring component
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Monitor navigation timing
    if ('performance' in window && 'getEntriesByType' in window.performance) {
      const navigationEntries = window.performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0] as PerformanceNavigationTiming;
        
        const metrics = {
          dns: nav.domainLookupEnd - nav.domainLookupStart,
          tcp: nav.connectEnd - nav.connectStart,
          ttfb: nav.responseStart - nav.requestStart,
          download: nav.responseEnd - nav.responseStart,
          domInteractive: nav.domInteractive - nav.fetchStart,
          domComplete: nav.domComplete - nav.fetchStart,
          loadComplete: nav.loadEventEnd - nav.fetchStart,
        };

        if (process.env.NODE_ENV === 'development') {
          console.table(metrics);
        }

        // Send to analytics
        if ((window as any).gtag) {
          Object.entries(metrics).forEach(([key, value]) => {
            (window as any).gtag('event', 'timing_complete', {
              name: key,
              value: Math.round(value),
              event_category: 'Performance',
            });
          });
        }
      }
    }

    // Monitor resource timing
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          
          // Log slow resources
          if (resource.duration > 1000) {
            console.warn('Slow resource:', {
              name: resource.name,
              duration: resource.duration,
              size: resource.transferSize,
            });
          }
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, []);

  return null;
}