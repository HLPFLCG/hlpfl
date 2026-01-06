'use client'

import { useEffect } from 'react'
import { useReportWebVitals } from 'next/web-vitals'
import { performanceMonitor } from '@/lib/performance'

/**
 * Performance monitoring component
 * Tracks Core Web Vitals and reports to analytics
 */
export function PerformanceMonitor() {
  useReportWebVitals((metric) => {
    performanceMonitor.reportWebVitals({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    })
  })

  useEffect(() => {
    // Track page load on mount
    performanceMonitor.trackPageLoad()
  }, [])

  return null // This component doesn't render anything
}
