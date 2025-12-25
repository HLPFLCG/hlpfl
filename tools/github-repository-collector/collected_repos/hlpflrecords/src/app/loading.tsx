'use client'

import React from 'react'

/**
 * Loading component shown during page transitions
 * Provides visual feedback while content is loading
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="w-24 h-24 bg-gradient-to-br from-gold to-gold-dark rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
          <span className="text-dark text-4xl font-black">H</span>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-4">
          Loading...
        </h2>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  )
}
