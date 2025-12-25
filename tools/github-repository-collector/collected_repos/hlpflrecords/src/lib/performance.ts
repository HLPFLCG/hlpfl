/**
 * Performance monitoring utilities
 * Tracks Core Web Vitals and custom metrics
 */

interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta?: number
}

class PerformanceMonitor {
  private isDevelopment = process.env.NODE_ENV === 'development'

  /**
   * Report Core Web Vitals
   */
  reportWebVitals(metric: PerformanceMetric): void {
    if (this.isDevelopment) {
      console.log(`[Performance] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
      })
    }

    // In production, send to analytics service
    if (!this.isDevelopment && typeof window !== 'undefined') {
      // Send to Google Analytics
      if (window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.rating,
          non_interaction: true,
        })
      }

      // TODO: Send to other monitoring services (Sentry, New Relic, etc.)
    }
  }

  /**
   * Measure custom performance metric
   */
  measureCustomMetric(name: string, startTime: number): void {
    const duration = performance.now() - startTime
    
    if (this.isDevelopment) {
      console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`)
    }

    // In production, send to analytics
    if (!this.isDevelopment && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: name,
        value: Math.round(duration),
        event_category: 'Performance',
      })
    }
  }

  /**
   * Track page load time
   */
  trackPageLoad(): void {
    if (typeof window === 'undefined') return

    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (perfData) {
        const pageLoadTime = perfData.loadEventEnd - perfData.fetchStart
        
        if (this.isDevelopment) {
          console.log('[Performance] Page Load Time:', {
            total: `${pageLoadTime.toFixed(2)}ms`,
            dns: `${(perfData.domainLookupEnd - perfData.domainLookupStart).toFixed(2)}ms`,
            tcp: `${(perfData.connectEnd - perfData.connectStart).toFixed(2)}ms`,
            request: `${(perfData.responseStart - perfData.requestStart).toFixed(2)}ms`,
            response: `${(perfData.responseEnd - perfData.responseStart).toFixed(2)}ms`,
            dom: `${(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart).toFixed(2)}ms`,
          })
        }

        // Send to analytics
        if (!this.isDevelopment && window.gtag) {
          window.gtag('event', 'page_load', {
            value: Math.round(pageLoadTime),
            event_category: 'Performance',
          })
        }
      }
    })
  }
}

export const performanceMonitor = new PerformanceMonitor()

// Type augmentation for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void
  }
}