'use client'

import React, { useState, useEffect, useRef } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

/**
 * Lazy loading image component with intersection observer
 * Improves performance by loading images only when they enter viewport
 */
export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  priority = false 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px',
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [priority])

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {isInView && (
        <>
          {/* Placeholder while loading */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-dark-tertiary animate-pulse" />
          )}
          
          {/* Actual image */}
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            loading={priority ? 'eager' : 'lazy'}
          />
        </>
      )}
      
      {/* Placeholder before in view */}
      {!isInView && (
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-dark-tertiary" />
      )}
    </div>
  )
}
