/**
 * Simple logging utility for the application
 * In production, this can be extended to send logs to external services
 * like Sentry, LogRocket, or custom logging endpoints
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  data?: any
  timestamp: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'
  private isClient = typeof window !== 'undefined'

  /**
   * Format log entry for consistent output
   */
  private formatLog(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString()
    }
  }

  /**
   * Send logs to external service (implement as needed)
   */
  private sendToExternalService(entry: LogEntry): void {
    // TODO: Implement external logging service integration
    // Examples:
    // - Sentry.captureMessage(entry.message, { level: entry.level, extra: entry.data })
    // - fetch('/api/logs', { method: 'POST', body: JSON.stringify(entry) })
    // - LogRocket.log(entry.message, entry.data)
  }

  /**
   * Log info message
   */
  info(message: string, data?: any): void {
    const entry = this.formatLog('info', message, data)
    
    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, data || '')
    }
    
    if (!this.isDevelopment && this.isClient) {
      this.sendToExternalService(entry)
    }
  }

  /**
   * Log warning message
   */
  warn(message: string, data?: any): void {
    const entry = this.formatLog('warn', message, data)
    
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data || '')
    }
    
    if (!this.isDevelopment && this.isClient) {
      this.sendToExternalService(entry)
    }
  }

  /**
   * Log error message
   */
  error(message: string, error?: any): void {
    const entry = this.formatLog('error', message, error)
    
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error || '')
    }
    
    // Always send errors to external service in production
    if (!this.isDevelopment && this.isClient) {
      this.sendToExternalService(entry)
    }
  }

  /**
   * Log debug message (only in development)
   */
  debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      const entry = this.formatLog('debug', message, data)
      console.debug(`[DEBUG] ${message}`, data || '')
    }
  }

  /**
   * Log analytics event
   */
  analytics(event: string, data?: any): void {
    const entry = this.formatLog('info', `Analytics: ${event}`, data)
    
    if (this.isDevelopment) {
      console.log(`[ANALYTICS] ${event}`, data || '')
    }
    
    if (!this.isDevelopment && this.isClient) {
      this.sendToExternalService(entry)
    }
  }
}

// Export singleton instance
export const logger = new Logger()

// Export for testing
export { Logger }