'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});

  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Measure Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        setMetrics(prev => ({ ...prev, lcp: lastEntry.renderTime || lastEntry.loadTime }));
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            setMetrics(prev => ({ ...prev, cls: clsValue }));
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Time to First Byte
      const navigationEntry = performance.getEntriesByType('navigation')[0] as any;
      if (navigationEntry) {
        setMetrics(prev => ({ ...prev, ttfb: navigationEntry.responseStart }));
      }

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        fcpObserver.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    // Send metrics to analytics
    if (Object.keys(metrics).length > 0 && typeof window !== 'undefined' && (window as any).gtag) {
      Object.entries(metrics).forEach(([key, value]) => {
        if (value !== undefined) {
          (window as any).gtag('event', 'web_vitals', {
            event_category: 'performance',
            event_label: key,
            value: Math.round(value),
            non_interaction: true,
          });
        }
      });
    }
  }, [metrics]);

  // Don't render anything (this is just for tracking)
  return null;
};

// Hook to get performance metrics
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});

  useEffect(() => {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as any;
    if (navigationEntry) {
      setMetrics({
        ttfb: navigationEntry.responseStart,
        fcp: navigationEntry.domContentLoadedEventEnd,
      });
    }
  }, []);

  return metrics;
};