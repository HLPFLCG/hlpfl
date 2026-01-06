'use strict';

/**
 * Performance Monitoring for alki.info
 * Tracks Core Web Vitals and other performance metrics
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            lcp: null,
            fid: null,
            cls: null,
            fcp: null,
            ttfb: null
        };
        this.init();
    }

    init() {
        // Wait for page load
        if (document.readyState === 'complete') {
            this.measureMetrics();
        } else {
            window.addEventListener('load', () => this.measureMetrics());
        }
    }

    measureMetrics() {
        // Measure Core Web Vitals
        this.measureLCP();
        this.measureFID();
        this.measureCLS();
        this.measureFCP();
        this.measureTTFB();
        
        // Log results after a delay
        setTimeout(() => this.logResults(), 3000);
    }

    // Largest Contentful Paint (LCP)
    measureLCP() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (error) {
            console.warn('LCP measurement not supported:', error);
        }
    }

    // First Input Delay (FID)
    measureFID() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                });
            });
            observer.observe({ entryTypes: ['first-input'] });
        } catch (error) {
            console.warn('FID measurement not supported:', error);
        }
    }

    // Cumulative Layout Shift (CLS)
    measureCLS() {
        try {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                this.metrics.cls = clsValue;
            });
            observer.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
            console.warn('CLS measurement not supported:', error);
        }
    }

    // First Contentful Paint (FCP)
    measureFCP() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.fcp = entry.startTime;
                    }
                });
            });
            observer.observe({ entryTypes: ['paint'] });
        } catch (error) {
            console.warn('FCP measurement not supported:', error);
        }
    }

    // Time to First Byte (TTFB)
    measureTTFB() {
        try {
            const navigationTiming = performance.getEntriesByType('navigation')[0];
            if (navigationTiming) {
                this.metrics.ttfb = navigationTiming.responseStart - navigationTiming.requestStart;
            }
        } catch (error) {
            console.warn('TTFB measurement not supported:', error);
        }
    }

    // Get performance grade
    getGrade(metric, value) {
        const thresholds = {
            lcp: { good: 2500, needsImprovement: 4000 },
            fid: { good: 100, needsImprovement: 300 },
            cls: { good: 0.1, needsImprovement: 0.25 },
            fcp: { good: 1800, needsImprovement: 3000 },
            ttfb: { good: 800, needsImprovement: 1800 }
        };

        if (!value) return 'N/A';

        const threshold = thresholds[metric];
        if (value <= threshold.good) return 'Good';
        if (value <= threshold.needsImprovement) return 'Needs Improvement';
        return 'Poor';
    }

    // Log results to console
    logResults() {
        console.log('%c🎯 Performance Metrics', 'font-size: 16px; font-weight: bold; color: #10b981;');
        console.log('━'.repeat(50));
        
        console.log('%cCore Web Vitals:', 'font-weight: bold; color: #3b82f6;');
        console.log(`  LCP: ${this.metrics.lcp ? (this.metrics.lcp / 1000).toFixed(2) + 's' : 'N/A'} (${this.getGrade('lcp', this.metrics.lcp)})`);
        console.log(`  FID: ${this.metrics.fid ? this.metrics.fid.toFixed(2) + 'ms' : 'N/A'} (${this.getGrade('fid', this.metrics.fid)})`);
        console.log(`  CLS: ${this.metrics.cls !== null ? this.metrics.cls.toFixed(3) : 'N/A'} (${this.getGrade('cls', this.metrics.cls)})`);
        
        console.log('%cOther Metrics:', 'font-weight: bold; color: #8b5cf6;');
        console.log(`  FCP: ${this.metrics.fcp ? (this.metrics.fcp / 1000).toFixed(2) + 's' : 'N/A'} (${this.getGrade('fcp', this.metrics.fcp)})`);
        console.log(`  TTFB: ${this.metrics.ttfb ? this.metrics.ttfb.toFixed(2) + 'ms' : 'N/A'} (${this.getGrade('ttfb', this.metrics.ttfb)})`);
        
        console.log('━'.repeat(50));
        
        // Overall assessment
        const grades = [
            this.getGrade('lcp', this.metrics.lcp),
            this.getGrade('fid', this.metrics.fid),
            this.getGrade('cls', this.metrics.cls)
        ];
        
        const goodCount = grades.filter(g => g === 'Good').length;
        const poorCount = grades.filter(g => g === 'Poor').length;
        
        if (goodCount === 3) {
            console.log('%c✅ Excellent Performance!', 'font-size: 14px; color: #10b981; font-weight: bold;');
        } else if (poorCount === 0) {
            console.log('%c⚠️ Good Performance (Room for improvement)', 'font-size: 14px; color: #f59e0b; font-weight: bold;');
        } else {
            console.log('%c❌ Performance Needs Attention', 'font-size: 14px; color: #ef4444; font-weight: bold;');
        }
    }

    // Get metrics object
    getMetrics() {
        return this.metrics;
    }
}

// Initialize performance monitoring
if (typeof window !== 'undefined') {
    window.performanceMonitor = new PerformanceMonitor();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}