'use client'

import { performanceMonitor } from './performance'

/**
 * Web Vitals reporting for Core Web Vitals metrics
 * Integrates with Google Analytics and custom monitoring
 */

type Metric = {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  entries: PerformanceEntry[]
}

export function reportWebVitals(metric: Metric) {
  // Report to performance monitor
  performanceMonitor.reportWebVitals({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
  })

  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    })
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    })
  }
}

// Export for use in layout
export default reportWebVitals
