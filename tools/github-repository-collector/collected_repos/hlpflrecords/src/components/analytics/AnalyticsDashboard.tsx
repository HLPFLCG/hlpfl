'use client';

import { useEffect, useState } from 'react';
import { trackPageView, trackUserJourney } from '@/lib/analytics';

interface PageAnalytics {
  pageViews: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  bounceRate: number;
}

export const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<PageAnalytics>({
    pageViews: 0,
    uniqueVisitors: 0,
    avgTimeOnPage: 0,
    bounceRate: 0,
  });

  useEffect(() => {
    // Track page view
    trackPageView(window.location.pathname, document.title);

    // Track user journey
    trackUserJourney('page_load', {
      path: window.location.pathname,
      referrer: document.referrer,
    });

    // Track time on page
    const startTime = Date.now();
    
    return () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      trackUserJourney('page_exit', {
        path: window.location.pathname,
        time_spent: timeOnPage,
      });
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

// Hook to track user interactions
export const useAnalytics = () => {
  useEffect(() => {
    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track at 25%, 50%, 75%, 100%
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          trackUserJourney('scroll_depth', { percentage: scrollPercent });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};