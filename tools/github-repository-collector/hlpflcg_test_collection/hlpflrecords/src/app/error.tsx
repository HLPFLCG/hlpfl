'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { logger } from '@/lib/logger'

/**
 * Error page for handling runtime errors
 * Provides user-friendly error UI and logs errors for debugging
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service
    logger.error('Application error occurred', error)
  }, [error])

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-dark-secondary rounded-lg p-8 text-center border border-gray-800">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-white mb-3">
          Something Went Wrong
        </h2>
        
        <p className="text-gray-400 mb-6 leading-relaxed">
          We&apos;re sorry, but something unexpected happened. 
          Our team has been notified and is working on a fix.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-dark p-4 rounded-lg mb-6 text-left">
            <p className="text-red-400 text-sm font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-gray-500 text-xs mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            size="lg"
            className="w-full sm:w-auto"
          >
            Try Again
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </Button>
        </div>

        {/* Support Info */}
        <p className="text-gray-500 text-sm mt-6">
          Need help? Contact us at{' '}
          <a href="mailto:contact@hlpfl.org" className="text-gold hover:underline">
            contact@hlpfl.org
          </a>
        </p>
      </div>
    </div>
  )
}
