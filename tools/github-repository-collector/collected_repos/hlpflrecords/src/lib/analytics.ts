'use client';

// Enhanced analytics tracking
export const trackEvent = (
  eventName: string,
  eventCategory: string,
  eventLabel?: string,
  value?: number,
  additionalParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: value,
      ...additionalParams,
    });
  }
};

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-7W14RQ0K9W', {
      page_path: url,
      page_title: title,
    });
  }
};

// Track user journey
export const trackUserJourney = (step: string, data?: Record<string, any>) => {
  trackEvent('user_journey', 'navigation', step, undefined, data);
};

// Track conversions
export const trackConversion = (type: string, value?: number) => {
  trackEvent('conversion', 'engagement', type, value);
};

// Track errors
export const trackError = (error: string, fatal: boolean = false) => {
  trackEvent('error', 'technical', error, fatal ? 1 : 0);
};

// Track performance
export const trackPerformance = (metric: string, value: number) => {
  trackEvent('performance', 'web_vitals', metric, Math.round(value));
};

// Track engagement
export const trackEngagement = (action: string, label?: string, value?: number) => {
  trackEvent(action, 'engagement', label, value);
};

// Track social shares
export const trackSocialShare = (platform: string, content: string) => {
  trackEvent('share', 'social', platform, undefined, { content });
};

// Track downloads
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('download', 'content', fileName, undefined, { file_type: fileType });
};

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submission', 'engagement', formName, success ? 1 : 0);
};

// Track video plays
export const trackVideoPlay = (videoId: string, videoTitle: string) => {
  trackEvent('video_play', 'media', videoTitle, undefined, { video_id: videoId });
};

// Track audio plays
export const trackAudioPlay = (trackId: string, trackTitle: string, artist: string) => {
  trackEvent('audio_play', 'media', trackTitle, undefined, {
    track_id: trackId,
    artist: artist,
  });
};

// Track search queries
export const trackSearch = (query: string, resultsCount: number) => {
  trackEvent('search', 'engagement', query, resultsCount);
};

// Track outbound links
export const trackOutboundLink = (url: string, label?: string) => {
  trackEvent('outbound_link', 'navigation', label || url, undefined, { url });
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', 'engagement', `${percentage}%`, percentage);
};

// Track time on page
export const trackTimeOnPage = (seconds: number) => {
  trackEvent('time_on_page', 'engagement', 'duration', seconds);
};